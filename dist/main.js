/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api-dico.js":
/*!*************************!*\
  !*** ./src/api-dico.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getAPI);\nconst erreur = document.querySelector(\"#erreur\");\nfunction constructAPI(word, language, version = 'v2') {\n  return `https://api.dictionaryapi.dev/api/${version}/entries/${language}/${word}`;\n}\n\n// FONCTION getAPI\nfunction getAPI(word, language, version = 'v2') {\n  let API = constructAPI(word, language, version);\n\n  // ---------------------------------------------------------------------------------------\n  //          TRAITEMENT DE LA REPONSE            \n  // ---------------------------------------------------------------------------------------\n  // Gestion des erreurs\n  fetch(API).then(response => {\n    if (!response.ok) {\n      if (response.status === 404) {\n        if (word === \"\") {\n          erreur.innerHTML = \"<div id='erreur'>You did not enter any word.</div>\";\n        } else {\n          erreur.innerHTML = '<div id=\"erreur\">No results found for this word.</div>';\n          throw new Error('No results found for this word');\n        }\n      } else {\n        erreur.innerHTML = '<div id=\"erreur\">' + `HTTP error! status: ${response.status}` + '</div';\n        throw new Error(`HTTP error! status: ${response.status}`);\n      }\n    } else {\n      erreur.innerHTML = \"\";\n    }\n    return response.json();\n  }).then(data => {\n    // Récupérer les éléments\n    const wordElement = document.getElementById('word');\n    const audioElement = document.getElementById('audio');\n    const tabsElement = document.getElementById('tabs');\n    const contentElement = document.getElementById('def');\n    const synonymsElement = document.getElementById('synonyms');\n    const antonymsElement = document.getElementById('antonyms');\n\n    // Mettre à jour les éléments\n    wordElement.textContent = data[0].word;\n\n    // Chercher l'audio avec une URL\n    const audioData = data[0].phonetics.find(item => item.audio !== '');\n    if (audioData) {\n      audioElement.innerHTML = `<audio controls src=\"${audioData.audio}\"></audio>`;\n    } else {\n      audioElement.innerHTML = \"\";\n    }\n\n    // Regrouper les définitions\n    const groupedMeanings = {};\n    for (let wordDef of data) {\n      for (let meaning of wordDef.meanings) {\n        if (!groupedMeanings[meaning.partOfSpeech]) {\n          groupedMeanings[meaning.partOfSpeech] = [];\n        }\n        for (let definition of meaning.definitions) {\n          groupedMeanings[meaning.partOfSpeech].push(definition);\n        }\n      }\n    }\n\n    // ---------------------------------------------------------------------------------------\n    //          CREATION ET GESTION DES ONGLETS ET DES DEFINITIONS            \n    // ---------------------------------------------------------------------------------------\n    let tabIndex = 0;\n    let tabsHTML = \"\";\n    let contentHTML = \"\";\n    for (let partOfSpeech in groupedMeanings) {\n      const contentId = `def-${tabIndex}`;\n      tabsHTML += `<div id=\"tab-${tabIndex}\" class=\"tab tab-light\">${partOfSpeech}</div>`;\n      contentHTML += `<ul id=\"${contentId}\" class=\"def\">`;\n      for (let def of groupedMeanings[partOfSpeech]) {\n        contentHTML += `<li>${def.definition}</li>`;\n      }\n      contentHTML += `</ul>`;\n      tabIndex++;\n    }\n    tabsElement.innerHTML = tabsHTML;\n    contentElement.innerHTML = contentHTML;\n    const tabs = document.getElementsByClassName('tab');\n\n    // Créer l'indicateur\n    const indicator = document.createElement('div');\n    indicator.classList.add('tab-indicator');\n    tabsElement.appendChild(indicator);\n\n    // Ajouter un événement de clic à chaque onglet\n    for (let tab of tabs) {\n      tab.addEventListener('click', function () {\n        // Récupérer l'index de l'onglet\n        const tabIndex = tab.id.split('-')[1];\n\n        // Déplacer l'indicateur à la position de l'onglet\n        indicator.style.left = tab.offsetLeft + 'px';\n        indicator.style.width = tab.offsetWidth + 'px';\n        indicator.style.height = tab.offsetHeight + 'px';\n\n        // Récupérer le contenu correspondant à l'onglet\n        const def = document.getElementById(`def-${tabIndex}`);\n\n        // Vérifier si le contenu est déjà ouvert ou non\n        const isActive = def.classList.contains('active');\n\n        // Ne rien faire si l'onglet est déjà actif\n        if (isActive) {\n          return;\n        }\n\n        // Fermer tous les contenus sauf l'onglet actif\n        const allContents = document.getElementsByClassName('def');\n        for (let content of allContents) {\n          if (content.id !== `def-${tabIndex}`) {\n            content.classList.remove('active');\n          }\n        }\n\n        // Fermer tous les onglets sauf l'onglet actif\n        const allTabs = document.getElementsByClassName('tab');\n        for (let t of allTabs) {\n          if (t.id !== `tab-${tabIndex}`) {\n            t.classList.remove('active');\n          }\n        }\n\n        // Ouvrir l'onglet et le contenu correspondant\n        tab.classList.add('active');\n        def.classList.add('active');\n\n        // Ajouter un effet de transition\n        tab.style.transition = \"all 0.5s ease-in-out\";\n        def.style.transition = \"all 0.5s ease-in-out\";\n      });\n    }\n    // Ouvrir le premier onglet et le contenu correspondant par défaut\n    const firstTab = document.getElementById('tab-0');\n    const firstContent = document.getElementById('def-0');\n    if (firstTab && firstContent) {\n      firstTab.classList.add('active');\n      firstContent.classList.add('active');\n    }\n    if (firstTab) {\n      indicator.style.width = `${firstTab.offsetWidth}px`;\n    }\n\n    // ---------------------------------------------------------------------------------------\n    //          CREATION ET GESTION DES SYNONYMES           \n    // ---------------------------------------------------------------------------------------\n    // Afficher les synonymes\n    let synonymsHTML = `<h2>Synonymes</h2>`;\n    let synonymsList = [];\n    for (let wordDef of data) {\n      for (let meaning of wordDef.meanings) {\n        let i = 0;\n        if (meaning.synonyms && meaning.synonyms.length > 0) {\n          synonymsHTML += `<li>`;\n          for (let synonym of meaning.synonyms) {\n            synonymsHTML += `<a href=\"\" class=\"lien\">${synonym}</a>`;\n            if (i < meaning.synonyms.length - 1) {\n              synonymsHTML += \", \";\n            }\n            i++;\n            console.log(synonym);\n          }\n          console.log(meaning);\n          synonymsHTML += `</li>`;\n          synonymsList.push(``);\n        }\n      }\n    }\n    if (synonymsList.length > 0) {\n      synonymsHTML += `<ul>${synonymsList.join(\"\")}</ul>`;\n      synonymsElement.innerHTML = synonymsHTML; // Only update the def if there are synonyms\n    } else {\n      synonymsElement.innerHTML = \"\"; // Reset the def if no synonyms found\n    }\n\n    // Récupérer la liste des balises <a> des antonymes\n    const antonymAnchors = document.querySelectorAll(\"#antonymsElement a\");\n\n    // Ajouter un écouteur d'événement sur chaque balise <a>\n    antonymAnchors.forEach(function (anchor) {\n      anchor.addEventListener('click', function (event) {\n        event.preventDefault(); // Bloquer l'action href de la balise <a>\n        const content = anchor.textContent; // Contenu de la balise <a>\n        getAPIResponse(content, 'en'); // Appeler la fonction getAPIResponse avec le contenu de la balise <a>\n      });\n    });\n\n    // ---------------------------------------------------------------------------------------\n    //          CREATION ET GESTION DES ANTONYMES           \n    // ---------------------------------------------------------------------------------------\n    // Afficher les antonymes\n    let antonymsHTML = `<h2>Antonymes</h2>`;\n    let antonymsList = [];\n    for (let wordDef of data) {\n      for (let meaning of wordDef.meanings) {\n        let i = 0;\n        if (meaning.antonyms && meaning.antonyms.length > 0) {\n          antonymsHTML += `<li>`;\n          for (let antonym of meaning.antonyms) {\n            antonymsHTML += `<a href=\"\" class=\"lien\">${antonym}</a>`;\n            if (i < meaning.antonyms.length - 1) {\n              antonymsHTML += \", \";\n            }\n            i++;\n          }\n          antonymsHTML += `</li>`;\n          antonymsList.push(``);\n        }\n      }\n    }\n    if (antonymsList.length > 0) {\n      antonymsHTML += `<ul>${antonymsList.join(\"\")}</ul>`;\n      antonymsElement.innerHTML = antonymsHTML; // Only update the def if there are antonyms\n    } else {\n      antonymsElement.innerHTML = \"\"; // Reset the def if no antonyms found\n    }\n  })\n\n  // ---------------------------------------------------------------------------------------\n  //       !!!! DATA  !!!! ERREUR !!!!!               \n  // ---------------------------------------------------------------------------------------\n  .catch(e => {\n    // Si une erreur se produit, affichez-la dans la console\n    erreur.value = \"There was a problem....\";\n    console.log('There was a problem with your fetch operation: ' + e.message);\n  });\n}\n\n//# sourceURL=webpack://my-webpack-project/./src/api-dico.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/scss/style.scss */ \"./src/assets/scss/style.scss\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n/* harmony import */ var _api_dico_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api-dico.js */ \"./src/api-dico.js\");\n\n\n\nconst form = document.querySelector('form');\nconst input = document.getElementById('myInput');\nconst theme = document.querySelector('body');\nconst logo = document.querySelector('#logo');\nlet isDark = false;\n\n// Fonction changement de thème\nfunction swapTheme() {\n  const element = document.body;\n  const styles = getComputedStyle(element);\n  const coulTxt = styles.color;\n  const coulBg = styles.backgroundColor;\n  if (isDark) {\n    theme.style.background = coulTxt;\n    theme.style.color = coulBg;\n    logo.src = \"/src/img/logo-dark.png\";\n  } else {\n    theme.style.background = coulTxt;\n    theme.style.color = coulBg;\n    logo.src = \"/src/img/logo.png\";\n  }\n}\n\n// Evénement Submit\nform.addEventListener('submit', function (event) {\n  event.preventDefault();\n  const word = input.value;\n  (0,_api_dico_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(word, 'en');\n});\n\n// Evénement changement de thème\ndocument.getElementById('lightTheme').addEventListener('click', function () {\n  isDark = false;\n  swapTheme();\n});\ndocument.getElementById('darkTheme').addEventListener('click', function () {\n  isDark = true;\n  swapTheme();\n});\n\n// Evénement Lien Synonymes / Antonymes\ndocument.addEventListener('click', function (event) {\n  if (event.target.tagName === 'A' && event.target.className === 'lien') {\n    event.preventDefault();\n    const content = event.target.textContent;\n    (0,_api_dico_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(content, 'en');\n    input.value = content;\n  }\n});\n\n// Evénement changement de police \ndocument.querySelectorAll('.switch-toggle input[type=\"radio\"]').forEach(input => {\n  input.addEventListener('change', function (e) {\n    switch (e.target.id) {\n      case 'sherif':\n        def.style.fontFamily = \"serif\";\n        break;\n      case 'sanssherif':\n        def.style.fontFamily = \"sans-serif\";\n        break;\n      case 'monospace':\n        def.style.fontFamily = \"monospace\";\n        break;\n    }\n  });\n});\n\n// init \"Word\" par defaut\n(0,_api_dico_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"word\", 'en');\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

/***/ }),

/***/ "./src/assets/scss/style.scss":
/*!************************************!*\
  !*** ./src/assets/scss/style.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://my-webpack-project/./src/assets/scss/style.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;