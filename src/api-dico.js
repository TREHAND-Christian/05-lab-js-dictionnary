export default getAPI;

const erreur = document.querySelector("#erreur");
const API_VERSION = 'v2';
const LANGUAGE = 'en';

const constructAPI = (word, language = LANGUAGE, version = API_VERSION) => {
    return `https://api.dictionaryapi.dev/api/${version}/entries/${language}/${word}`;
}

const handleFetchErrors = (response, word, erreur) => {
    if (!response.ok) {
        if (response.status === 404) {
            erreur.textContent = word ? 'No results found for this word.' : 'You did not enter any word.';
        } else {
            erreur.textContent = `HTTP error! status: ${response.status}`;
        }
        throw new Error(erreur.textContent);
    }
    return response.json();
}

function groupWordDefinitions(data) {
    return data.reduce((groupedMeanings, wordDef) => {
        wordDef.meanings.forEach((meaning) => {
            if (!groupedMeanings[meaning.partOfSpeech]) {
                groupedMeanings[meaning.partOfSpeech] = [];
            }
            groupedMeanings[meaning.partOfSpeech].push(...meaning.definitions);
        });
        return groupedMeanings;
    }, {});
}


function createTabsAndDefinitions(groupedMeanings, tabsElement, contentElement) {
    let tabIndex = 0;
    let tabsHTML = "";
    let contentHTML = "";
    for (let partOfSpeech in groupedMeanings) {
        const contentId = `def-${tabIndex}`;
        tabsHTML += `<div id="tab-${tabIndex}" class="tab tab-light">${partOfSpeech}</div>`;
        contentHTML += `<ul id="${contentId}" class="def">`;
        for (let def of groupedMeanings[partOfSpeech]) {
            contentHTML += `<li>${def.definition}</li>`;
        }
        contentHTML += `</ul>`;
        tabIndex++;
    }
    tabsElement.innerHTML = tabsHTML;
    contentElement.innerHTML = contentHTML;

    const tabs = document.getElementsByClassName('tab');
    const indicator = document.createElement('div');
    indicator.classList.add('tab-indicator');
    tabsElement.appendChild(indicator);

    for (let tab of tabs) {
        tab.addEventListener('click', function () {
            const tabIndex = tab.id.split('-')[1];
            indicator.style.left = tab.offsetLeft + 'px';
            indicator.style.width = tab.offsetWidth + 'px';
            indicator.style.height = tab.offsetHeight + 'px';

            const def = document.getElementById(`def-${tabIndex}`);
            const isActive = def.classList.contains('active');

            if (!isActive) {
                const allContents = document.getElementsByClassName('def');
                for (let content of allContents) {
                    if (content.id !== `def-${tabIndex}`) {
                        content.classList.remove('active');
                    }
                }

                const allTabs = document.getElementsByClassName('tab');
                for (let t of allTabs) {
                    if (t.id !== `tab-${tabIndex}`) {
                        t.classList.remove('active');
                    }
                }

                tab.classList.add('active');
                def.classList.add('active');

                tab.style.transition = "all 0.5s ease-in-out";
                def.style.transition = "all 0.5s ease-in-out";
            }
        });
    }

    const firstTab = document.getElementById('tab-0');
    const firstContent = document.getElementById('def-0');
    if (firstTab && firstContent) {
        firstTab.classList.add('active');
        firstContent.classList.add('active');
        indicator.style.width = `${firstTab.offsetWidth}px`;
    }
}


function processRelationWords(data, element, relationType) {
    let html = `<h2>${relationType}</h2>`;
    let list = [];

    for (let wordDef of data) {
        for (let meaning of wordDef.meanings) {
            let i = 0;
            if (meaning[relationType] && meaning[relationType].length > 0) {
                html += `<li>`;
                for (let word of meaning[relationType]) {
                    html += `<a href="" class="lien">${word}</a>`;
                    if (i < meaning[relationType].length - 1) {
                        html += ", ";
                    }
                    i++;
                }
                html += `</li>`;
                list.push(``);
            }
        }
    }

    if (list.length > 0) {
        html += `<ul>${list.join("")}</ul>`;
        element.innerHTML = html;
    } else {
        element.innerHTML = "";
    }

    const anchors = document.querySelectorAll(`#${element.id} a`);

    anchors.forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            const content = anchor.textContent;
            getAPI(content, 'en');
        });
    });
}


// FONCTION getAPI
function getAPI(word, language, version = 'v2') {
    let API = constructAPI(word, language, version);
    // ---------------------------------------------------------------------------------------
    //          TRAITEMENT DE LA REPONSE            
    // ---------------------------------------------------------------------------------------
    fetch(API)
        .then(response => handleFetchErrors(response, word, erreur))
        .then(data => {
            // Récupérer les éléments
            const wordElement = document.getElementById('word');
            const audioElement = document.getElementById('audio');
            const tabsElement = document.getElementById('tabs');
            const contentElement = document.getElementById('def');
            const synonymsElement = document.getElementById('synonyms');
            const antonymsElement = document.getElementById('antonyms');
            // Mettre à jour les éléments
            wordElement.textContent = data[0].word;
            // Chercher l'audio avec une URL
            const audioData = data[0].phonetics.find(item => item.audio !== '');
            if (audioData) {
                audioElement.innerHTML = `<audio controls src="${audioData.audio}"></audio>`;
            } else {
                audioElement.innerHTML = "";
            }
            // Regrouper les définitions
            const groupedMeanings = groupWordDefinitions(data);
            //          CREATION ET GESTION DES ONGLETS ET DES DEFINITIONS            
            createTabsAndDefinitions(groupedMeanings, tabsElement, contentElement);
            //          CREATION ET GESTION DES SYNONYMES           
            processRelationWords(data, synonymsElement, 'synonyms');
            //          CREATION ET GESTION DES ANTONYMES           
            processRelationWords(data, antonymsElement, 'antonyms');        })

            .catch(e => {
            // Si une erreur se produit, affichez-la dans la console
            erreur.value = "There was a problem...."
            console.log('There was a problem with your fetch operation: ' + e.message);
        });
}