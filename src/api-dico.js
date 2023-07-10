export default getAPI;
const erreur = document.querySelector("#erreur");

function constructAPI(word, language, version = 'v2') {
    return `https://api.dictionaryapi.dev/api/${version}/entries/${language}/${word}`;
}

// FONCTION getAPI
function getAPI(word, language, version = 'v2') {
    let API = constructAPI(word, language, version);

    // ---------------------------------------------------------------------------------------
    //          TRAITEMENT DE LA REPONSE            
    // ---------------------------------------------------------------------------------------
    // Gestion des erreurs
    fetch(API)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    if (word === "") {
                        erreur.innerHTML = "<div id='erreur'>You did not enter any word.</div>";
                    } else {
                        erreur.innerHTML = '<div id="erreur">No results found for this word.</div>';
                        throw new Error('No results found for this word');
                    }
                } else {
                    erreur.innerHTML = '<div id="erreur">' + `HTTP error! status: ${response.status}` + '</div';
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } else {
                erreur.innerHTML = "";
            }
            return response.json();
        })


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
            const groupedMeanings = {};
            for (let wordDef of data) {
                for (let meaning of wordDef.meanings) {
                    if (!groupedMeanings[meaning.partOfSpeech]) {
                        groupedMeanings[meaning.partOfSpeech] = [];
                    }
                    for (let definition of meaning.definitions) {
                        groupedMeanings[meaning.partOfSpeech].push(definition);
                    }
                }
            }


            // ---------------------------------------------------------------------------------------
            //          CREATION ET GESTION DES ONGLETS ET DES DEFINITIONS            
            // ---------------------------------------------------------------------------------------
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

            // Créer l'indicateur
            const indicator = document.createElement('div');
            indicator.classList.add('tab-indicator');
            tabsElement.appendChild(indicator);

            // Ajouter un événement de clic à chaque onglet
            for (let tab of tabs) {
                tab.addEventListener('click', function () {
                    // Récupérer l'index de l'onglet
                    const tabIndex = tab.id.split('-')[1];

                    // Déplacer l'indicateur à la position de l'onglet
                    indicator.style.left = tab.offsetLeft + 'px';
                    indicator.style.width = tab.offsetWidth + 'px';
                    indicator.style.height = tab.offsetHeight + 'px';

                    // Récupérer le contenu correspondant à l'onglet
                    const def = document.getElementById(`def-${tabIndex}`);

                    // Vérifier si le contenu est déjà ouvert ou non
                    const isActive = def.classList.contains('active');

                    // Ne rien faire si l'onglet est déjà actif
                    if (isActive) {
                        return;
                    }

                    // Fermer tous les contenus sauf l'onglet actif
                    const allContents = document.getElementsByClassName('def');
                    for (let content of allContents) {
                        if (content.id !== `def-${tabIndex}`) {
                            content.classList.remove('active');
                        }
                    }

                    // Fermer tous les onglets sauf l'onglet actif
                    const allTabs = document.getElementsByClassName('tab');
                    for (let t of allTabs) {
                        if (t.id !== `tab-${tabIndex}`) {
                            t.classList.remove('active');
                        }
                    }

                    // Ouvrir l'onglet et le contenu correspondant
                    tab.classList.add('active');
                    def.classList.add('active');

                    // Ajouter un effet de transition
                    tab.style.transition = "all 0.5s ease-in-out";
                    def.style.transition = "all 0.5s ease-in-out";

                });
            }
            // Ouvrir le premier onglet et le contenu correspondant par défaut
            const firstTab = document.getElementById('tab-0');
            const firstContent = document.getElementById('def-0');
            if (firstTab && firstContent) {
                firstTab.classList.add('active');
                firstContent.classList.add('active');
            }
            if (firstTab) {
                indicator.style.width = `${firstTab.offsetWidth}px`;
            }


            // ---------------------------------------------------------------------------------------
            //          CREATION ET GESTION DES SYNONYMES           
            // ---------------------------------------------------------------------------------------
            // Afficher les synonymes
            let synonymsHTML = `<h2>Synonymes</h2>`;
            let synonymsList = [];

            for (let wordDef of data) {
                for (let meaning of wordDef.meanings) {
                    let i = 0;
                    if (meaning.synonyms && meaning.synonyms.length > 0) {
                        synonymsHTML += `<li>`;
                        for (let synonym of meaning.synonyms) {
                            synonymsHTML += `<a href="" class="lien">${synonym}</a>`;
                            if (i < meaning.synonyms.length - 1) {
                                synonymsHTML += ", ";
                            }
                            i++;
                            console.log(synonym);
                        }
                        console.log(meaning);
                        synonymsHTML += `</li>`;
                        synonymsList.push(``);
                    }
                }
            }
            if (synonymsList.length > 0) {
                synonymsHTML += `<ul>${synonymsList.join("")}</ul>`;
                synonymsElement.innerHTML = synonymsHTML; // Only update the def if there are synonyms
            } else {
                synonymsElement.innerHTML = ""; // Reset the def if no synonyms found
            }

            // Récupérer la liste des balises <a> des antonymes
            const antonymAnchors = document.querySelectorAll("#antonymsElement a");

            // Ajouter un écouteur d'événement sur chaque balise <a>
            antonymAnchors.forEach(function (anchor) {
                anchor.addEventListener('click', function (event) {
                    event.preventDefault(); // Bloquer l'action href de la balise <a>
                    const content = anchor.textContent; // Contenu de la balise <a>
                    getAPIResponse(content, 'en'); // Appeler la fonction getAPIResponse avec le contenu de la balise <a>
                });
            });


            // ---------------------------------------------------------------------------------------
            //          CREATION ET GESTION DES ANTONYMES           
            // ---------------------------------------------------------------------------------------
            // Afficher les antonymes
            let antonymsHTML = `<h2>Antonymes</h2>`;
            let antonymsList = [];

            for (let wordDef of data) {
                for (let meaning of wordDef.meanings) {
                    let i = 0;
                    if (meaning.antonyms && meaning.antonyms.length > 0) {
                        antonymsHTML += `<li>`;
                        for (let antonym of meaning.antonyms) {
                            antonymsHTML += `<a href="" class="lien">${antonym}</a>`;
                            if (i < meaning.antonyms.length - 1) {
                                antonymsHTML += ", ";
                            }
                            i++;
                        }
                        antonymsHTML += `</li>`;
                        antonymsList.push(``);
                    }
                }
            }

            if (antonymsList.length > 0) {
                antonymsHTML += `<ul>${antonymsList.join("")}</ul>`;
                antonymsElement.innerHTML = antonymsHTML; // Only update the def if there are antonyms
            } else {
                antonymsElement.innerHTML = ""; // Reset the def if no antonyms found
            }
        })

// ---------------------------------------------------------------------------------------
//       !!!! DATA  !!!! ERREUR !!!!!               
// ---------------------------------------------------------------------------------------
        .catch(e => {
            // Si une erreur se produit, affichez-la dans la console
            erreur.value = "There was a problem...."
            console.log('There was a problem with your fetch operation: ' + e.message);
        });
}