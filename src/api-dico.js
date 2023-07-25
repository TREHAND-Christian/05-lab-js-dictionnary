export default getAPI;

const erreur = document.querySelector("#erreur");
const API_VERSION = 'v2';
const LANGUAGE = 'en';
const BASE_URL = `https://api.dictionaryapi.dev/api/${API_VERSION}/entries/${LANGUAGE}/`;

function constructAPI(word) {
    return `${BASE_URL}${word}`;
}

function handleFetchErrors(response) {
    if (!response.ok) {
        const errorMessage = response.status === 404 ? 'Word not found.' : `HTTP error! status: ${response.status}. Something went wrong.`;
        erreur.textContent = errorMessage;
        throw new Error(errorMessage);
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
    let tabsHTML = "";
    let contentHTML = "";
    Object.keys(groupedMeanings).forEach((partOfSpeech, index) => {
        const contentId = `def-${index}`;
        tabsHTML += `<div id="tab-${index}" class="tab tab-light">${partOfSpeech}</div>`;
        contentHTML += `<ul id="${contentId}" class="def">`;
        groupedMeanings[partOfSpeech].forEach(def => {
            contentHTML += `<li>${def.definition}</li>`;
        });
        contentHTML += `</ul>`;
    });
    tabsElement.innerHTML = tabsHTML;
    contentElement.innerHTML = contentHTML;
    const indicator = document.createElement('div');
    indicator.classList.add('tab-indicator');
    tabsElement.appendChild(indicator);
    const deactivateAll = (activeId) => {
        document.querySelectorAll('.def, .tab').forEach(el => {
            if (el.id !== activeId) el.classList.remove('active');
        });
    };
    tabsElement.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function () {
            const tabIndex = tab.id.split('-')[1];
            indicator.style.left = tab.offsetLeft + 'px';
            indicator.style.width = tab.offsetWidth + 'px';
            indicator.style.height = tab.offsetHeight + 'px';
            const def = document.getElementById(`def-${tabIndex}`);
            const isActive = def.classList.contains('active');
            if (!isActive) {
                deactivateAll(`tab-${tabIndex}`);
                deactivateAll(`def-${tabIndex}`);
                tab.classList.add('active');
                def.classList.add('active');
                tab.style.transition = "all 0.5s ease-in-out";
                def.style.transition = "all 0.5s ease-in-out";
            }
        });
    });
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
    let wordsList = [];
    for (let wordDef of data) {
        for (let meaning of wordDef.meanings) {
            if (meaning[relationType] && meaning[relationType].length > 0) {
                const words = meaning[relationType].map(word => `<a href="#" class="lien">${word}</a>`).join(' ');
                wordsList.push(`<li class="liSynonym">${words}</li>`);
            }
        }
    }
    if (wordsList.length) {
        html += `<ul>${wordsList.join("")}</ul>`;
        element.innerHTML = html;
        element.querySelectorAll('a').forEach(anchor => {
            anchor.addEventListener('click', function (event) {
                event.preventDefault();
                getAPI(anchor.textContent, 'en');
            });
        });
    } else {
        element.innerHTML = "";
    }
}

const container = document.getElementById('response');

function createAndAppendDiv(parent, id, styleObj = null) {
    const div = document.createElement('div');
    div.id = id;
    if (styleObj) Object.assign(div.style, styleObj);
    parent.appendChild(div);
    return div;
}

function initializeDOMElements() {
    const container = document.getElementById('response');
    const createDiv = (parent, id, styles = {}) => {
        const div = document.createElement('div');
        div.id = id;
        Object.assign(div.style, styles);
        parent.appendChild(div);
        return div;
    };

    return {
        wordDiv: createDiv(container, 'word'),
        audioElement: createDiv(createDiv(container, 'vocal'), 'audio'),
        phoneticElement: createDiv(createDiv(container, 'vocal'), 'phonetic'),
        tabsElement: createDiv(createDiv(container, 'defs'), 'tabs', { zIndex: '10' }),
        contentElement: createDiv(createDiv(container, 'defs'), 'def'),
        synonymsElement: createDiv(container, 'synonyms'),
        antonymsElement: createDiv(container, 'antonyms')
    };
}

const domElements = initializeDOMElements();

function getAPI(word) {
    if (!word) {
        erreur.textContent = 'You did not enter any word.';
        return;
    }

    const API = constructAPI(word);
    fetch(API)
        .then(handleFetchErrors)
        .then(data => {
            if (data && data.length > 0) {
                const firstWord = data[0];
                domElements.wordDiv.textContent = firstWord.word;

                // Handle phonetic
                domElements.phoneticElement.innerHTML = `<span><p>Phonetic </p><p> ${firstWord.phonetic} </p><p id="playAudio"></p></span>`;
                
                // Handle audio
                const audioData = firstWord.phonetics.find(item => item.audio);
                if (audioData) {
                    domElements.audioElement.innerHTML = `<audio id="playerAudio" controls src="${audioData.audio}"></audio>`;
                    document.getElementById("playAudio").addEventListener("click", () => {
                        document.getElementById("playerAudio").play();
                    });
                } else {
                    domElements.audioElement.innerHTML = "";
                }
                
                const groupedMeanings = groupWordDefinitions(data);
                createTabsAndDefinitions(groupedMeanings, domElements.tabsElement, domElements.contentElement);

                processRelationWords(data, domElements.synonymsElement, 'synonyms');
                processRelationWords(data, domElements.antonymsElement, 'antonyms');
            } else {
                erreur.textContent = "Word not found.";
            }
        })
        .catch(e => {
            erreur.textContent = e.message === 'Word not found.' ? e.message : "There was a problem...";
            console.error('There was a problem with your fetch operation: ' + e.message);
        });
}

