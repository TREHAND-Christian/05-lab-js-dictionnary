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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getAPI);\nconst erreur = document.querySelector(\"#erreur\");\nconst API_VERSION = 'v2';\nconst LANGUAGE = 'en';\nconst constructAPI = (word, language = LANGUAGE, version = API_VERSION) => {\n  console.log(`https://api.dictionaryapi.dev/api/${version}/entries/${language}/${word}`);\n  return `https://api.dictionaryapi.dev/api/${version}/entries/${language}/${word}`;\n};\nconst handleFetchErrors = (response, word, erreur) => {\n  if (!response.ok) {\n    if (response.status === 404) {\n      erreur.textContent = word ? 'No results found for this word.' : 'You did not enter any word.';\n    } else {\n      erreur.textContent = `HTTP error! status: ${response.status}`;\n    }\n    throw new Error(erreur.textContent);\n  }\n  return response.json();\n};\nfunction groupWordDefinitions(data) {\n  return data.reduce((groupedMeanings, wordDef) => {\n    wordDef.meanings.forEach(meaning => {\n      if (!groupedMeanings[meaning.partOfSpeech]) {\n        groupedMeanings[meaning.partOfSpeech] = [];\n      }\n      groupedMeanings[meaning.partOfSpeech].push(...meaning.definitions);\n    });\n    return groupedMeanings;\n  }, {});\n}\nfunction createTabsAndDefinitions(groupedMeanings, tabsElement, contentElement) {\n  let tabIndex = 0;\n  let tabsHTML = \"\";\n  let contentHTML = \"\";\n  for (let partOfSpeech in groupedMeanings) {\n    const contentId = `def-${tabIndex}`;\n    tabsHTML += `<div id=\"tab-${tabIndex}\" class=\"tab tab-light\">${partOfSpeech}</div>`;\n    contentHTML += `<ul id=\"${contentId}\" class=\"def\">`;\n    for (let def of groupedMeanings[partOfSpeech]) {\n      contentHTML += `<li>${def.definition}</li>`;\n    }\n    contentHTML += `</ul>`;\n    tabIndex++;\n  }\n  tabsElement.innerHTML = tabsHTML;\n  contentElement.innerHTML = contentHTML;\n  const tabs = document.getElementsByClassName('tab');\n  const indicator = document.createElement('div');\n  indicator.classList.add('tab-indicator');\n  tabsElement.appendChild(indicator);\n  for (let tab of tabs) {\n    tab.addEventListener('click', function () {\n      const tabIndex = tab.id.split('-')[1];\n      indicator.style.left = tab.offsetLeft + 'px';\n      indicator.style.width = tab.offsetWidth + 'px';\n      indicator.style.height = tab.offsetHeight + 'px';\n      const def = document.getElementById(`def-${tabIndex}`);\n      const isActive = def.classList.contains('active');\n      if (!isActive) {\n        const allContents = document.getElementsByClassName('def');\n        for (let content of allContents) {\n          if (content.id !== `def-${tabIndex}`) {\n            content.classList.remove('active');\n          }\n        }\n        const allTabs = document.getElementsByClassName('tab');\n        for (let t of allTabs) {\n          if (t.id !== `tab-${tabIndex}`) {\n            t.classList.remove('active');\n          }\n        }\n        tab.classList.add('active');\n        def.classList.add('active');\n        tab.style.transition = \"all 0.5s ease-in-out\";\n        def.style.transition = \"all 0.5s ease-in-out\";\n      }\n    });\n  }\n  const firstTab = document.getElementById('tab-0');\n  const firstContent = document.getElementById('def-0');\n  if (firstTab && firstContent) {\n    firstTab.classList.add('active');\n    firstContent.classList.add('active');\n    indicator.style.width = `${firstTab.offsetWidth}px`;\n  }\n}\nfunction processRelationWords(data, element, relationType) {\n  let html = `<h2>${relationType}</h2>`;\n  let list = [];\n  for (let wordDef of data) {\n    for (let meaning of wordDef.meanings) {\n      let i = 0;\n      if (meaning[relationType] && meaning[relationType].length > 0) {\n        html += `<li class=\"liSynonym\">`;\n        for (let word of meaning[relationType]) {\n          html += `<a href=\"\" class=\"lien\">${word}</a>`;\n          if (i < meaning[relationType].length - 1) {\n            html += \" \";\n          }\n          i++;\n        }\n        html += `</li>`;\n        list.push(``);\n      }\n    }\n  }\n  if (list.length > 0) {\n    html += `<ul>${list.join(\"\")}</ul>`;\n    element.innerHTML = html;\n  } else {\n    element.innerHTML = \"\";\n  }\n  const anchors = document.querySelectorAll(`#${element.id} a`);\n  anchors.forEach(function (anchor) {\n    anchor.addEventListener('click', function (event) {\n      event.preventDefault();\n      const content = anchor.textContent;\n      getAPI(content, 'en');\n    });\n  });\n}\nconst container = document.getElementById('response');\nconst wordDiv = document.createElement('div');\nwordDiv.id = 'word';\nconst vocalDiv = document.createElement('div');\nvocalDiv.id = 'vocal';\nconst phoneticDiv = document.createElement('div');\nphoneticDiv.id = 'phonetic';\nconst audioDiv = document.createElement('div');\naudioDiv.id = 'audio';\nconst synonymsDiv = document.createElement('div');\nsynonymsDiv.id = 'synonyms';\nconst antonymsDiv = document.createElement('div');\nantonymsDiv.id = 'antonyms';\nconst defsDiv = document.createElement('div');\ndefsDiv.id = 'defs';\nconst tabsDiv = document.createElement('div');\ntabsDiv.id = 'tabs';\ntabsDiv.style.zIndex = '10';\nconst defDiv = document.createElement('div');\ndefDiv.id = 'def';\n\n// Ajouter les éléments dans la structure HTML\nvocalDiv.appendChild(phoneticDiv);\nvocalDiv.appendChild(audioDiv);\ndefsDiv.appendChild(tabsDiv);\ndefsDiv.appendChild(defDiv);\ncontainer.appendChild(wordDiv);\ncontainer.appendChild(vocalDiv);\ncontainer.appendChild(synonymsDiv);\ncontainer.appendChild(antonymsDiv);\ncontainer.appendChild(defsDiv);\n\n// FONCTION getAPI\nfunction getAPI(word, language, version = 'v2') {\n  let API = constructAPI(word, language, version);\n  // ---------------------------------------------------------------------------------------\n  //          TRAITEMENT DE LA REPONSE            \n  // ---------------------------------------------------------------------------------------\n  fetch(API).then(response => handleFetchErrors(response, word, erreur)).then(data => {\n    // Récupérer les éléments\n    const wordElement = document.getElementById('word');\n    const audioElement = document.getElementById('audio');\n    const tabsElement = document.getElementById('tabs');\n    const contentElement = document.getElementById('def');\n    const synonymsElement = document.getElementById('synonyms');\n    const antonymsElement = document.getElementById('antonyms');\n    const phoneticElement = document.getElementById('phonetic');\n    const playerAudio = document.getElementById(\"playerAudio\");\n    console.log(playerAudio);\n    // Mettre à jour les éléments\n    wordElement.textContent = data[0].word;\n\n    // Afficher la phonétique\n\n    phoneticElement.innerHTML = `<span><p>Phonetic </p><p> ${data[0].phonetic} </p><p id=\"playAudio\"></p></span>`;\n    const btAudio = document.getElementById(\"playAudio\");\n\n    // Chercher l'audio avec une URL\n    const audioData = data[0].phonetics.find(item => item.audio !== '');\n    if (audioData) {\n      audioElement.innerHTML = `<audio id=\"playerAudio\" controls src=\"${audioData.audio}\"></audio>`;\n      const playerAudio = document.getElementById(\"playerAudio\");\n      console.dir(playerAudio);\n      // Événement Play Audio\n      btAudio.addEventListener(\"click\", () => {\n        playerAudio.play();\n      });\n    } else {\n      audioElement.innerHTML = \"\";\n    }\n    // Regrouper les définitions\n    const groupedMeanings = groupWordDefinitions(data);\n    //          CREATION ET GESTION DES ONGLETS ET DES DEFINITIONS            \n    createTabsAndDefinitions(groupedMeanings, tabsElement, contentElement);\n    //          CREATION ET GESTION DES SYNONYMES           \n    processRelationWords(data, synonymsElement, 'synonyms');\n    //          CREATION ET GESTION DES ANTONYMES           \n    processRelationWords(data, antonymsElement, 'antonyms');\n  }).catch(e => {\n    // Si une erreur se produit, affichez-la dans la console\n    erreur.value = \"There was a problem....\";\n    console.log('There was a problem with your fetch operation: ' + e.message);\n  });\n}\n\n//# sourceURL=webpack://my-webpack-project/./src/api-dico.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/style.scss */ \"./src/scss/style.scss\");\n/* harmony import */ var _api_dico_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api-dico.js */ \"./src/api-dico.js\");\n\n\nvar url = __webpack_require__(/*! ../../../../../src/img/bt-light.webp */ \"./src/img/bt-light.webp\");\nvar url = __webpack_require__(/*! ../../../../../src/img/bt-dark.webp */ \"./src/img/bt-dark.webp\");\nvar url = __webpack_require__(/*! ../../../../../src/img/logo.webp */ \"./src/img/logo.webp\");\nvar url = __webpack_require__(/*! ../../../../../src/img/logo-dark.webp */ \"./src/img/logo-dark.webp\");\nvar url = __webpack_require__(/*! ../../../../../src/img/audio.webp */ \"./src/img/audio.webp\");\nvar url = __webpack_require__(/*! ../../../../../src/img/loupe.webp */ \"./src/img/loupe.webp\");\nvar url = __webpack_require__(/*! ../../../../../src/img/menu.webp */ \"./src/img/menu.webp\");\nlet menuOpen = false;\nconst form = document.querySelector(\"form\");\nconst input = document.getElementById(\"myInput\");\nconst theme = document.querySelector(\"body\");\nconst definition = document.getElementById(\"def\");\nlet isDark = false;\n\n// Fonction changement de thème\nfunction swapTheme() {\n  const menu = document.getElementById(\"styleBt\");\n  const logo = document.getElementById(\"logo\");\n  const element = document.body;\n  const styles = getComputedStyle(element);\n  const coulTxt = styles.color;\n  const coulBg = styles.backgroundColor;\n  const switchThemeImg = document.getElementById(\"switch-theme\");\n  const logoImg = document.getElementById(\"logoImg\");\n  if (isDark) {\n    theme.style.background = coulTxt;\n    theme.style.color = coulBg;\n    logoImg.src = \"/src/img/logo-dark.webp\";\n    switchThemeImg.src = \"/src/img/bt-light.webp\";\n    menu.style.backgroundColor = coulTxt;\n    logo.style.background = \"rgb(29,0,173)\";\n    logo.style.background = \"linear-gradient(0deg, rgba(29,0,173,0) 0%, rgba(4,131,165,0.4) 100%)\";\n  } else {\n    theme.style.background = coulTxt;\n    theme.style.color = coulBg;\n    logoImg.src = \"/src/img/logo.webp\";\n    switchThemeImg.src = \"/src/img/bt-dark.webp\";\n    menu.style.backgroundColor = coulTxt;\n    logo.style.background = \"rgb(198,214,236)\";\n    logo.style.background = \"linear-gradient(0deg, rgba(198,214,236,0) 0%, rgba(198,214,236,1) 100%)\";\n  }\n}\n\n// Événement changement de thème\ndocument.getElementById(\"switch-theme\").addEventListener(\"click\", () => {\n  isDark = !isDark; // Inverse la valeur de isDark\n  swapTheme();\n});\n\n// Événement menu mobile\n\nconst styleBt = document.getElementById(\"styleBt\");\ndocument.getElementById(\"btMenu\").addEventListener(\"click\", () => {\n  if (menuOpen) {\n    menuOpen = false;\n    styleBt.style.opacity = 0;\n  } else {\n    menuOpen = true;\n    styleBt.style.opacity = 1;\n  }\n});\n\n// Événement Submit\nform.addEventListener(\"submit\", event => {\n  event.preventDefault();\n  const word = input.value;\n  (0,_api_dico_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(word, \"en\");\n});\n\n// Événement input focus\ninput.addEventListener(\"focus\", () => {\n  const erreur = document.querySelector(\"#erreur\");\n  erreur.textContent = \"\";\n});\n\n// Événement Lien Synonymes / Antonymes\ndocument.addEventListener(\"click\", event => {\n  const {\n    target\n  } = event;\n  if (target.tagName === \"A\" && target.className === \"lien\") {\n    event.preventDefault();\n    const content = target.textContent;\n    (0,_api_dico_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(content, \"en\");\n    input.value = content;\n  }\n});\n\n// Événement changement de police\ndocument.querySelectorAll('.switch-toggle input[type=\"radio\"]').forEach(input => {\n  input.addEventListener(\"change\", e => {\n    switch (e.target.id) {\n      case \"sansserif\":\n        definition.style.fontFamily = \"sans-serif\";\n        break;\n      case \"serif\":\n        definition.style.fontFamily = \"serif\";\n        break;\n      case \"monospace\":\n        definition.style.fontFamily = \"monospace\";\n        break;\n    }\n  });\n});\n\n// Initialisation du \"mot\" par défaut\n(0,_api_dico_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\"welcome\", \"en\");\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://my-webpack-project/./src/scss/style.scss?");

/***/ }),

/***/ "./src/img/audio.webp":
/*!****************************!*\
  !*** ./src/img/audio.webp ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"src/img/audio.webp\";\n\n//# sourceURL=webpack://my-webpack-project/./src/img/audio.webp?");

/***/ }),

/***/ "./src/img/bt-dark.webp":
/*!******************************!*\
  !*** ./src/img/bt-dark.webp ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"src/img/bt-dark.webp\";\n\n//# sourceURL=webpack://my-webpack-project/./src/img/bt-dark.webp?");

/***/ }),

/***/ "./src/img/bt-light.webp":
/*!*******************************!*\
  !*** ./src/img/bt-light.webp ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"src/img/bt-light.webp\";\n\n//# sourceURL=webpack://my-webpack-project/./src/img/bt-light.webp?");

/***/ }),

/***/ "./src/img/logo-dark.webp":
/*!********************************!*\
  !*** ./src/img/logo-dark.webp ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"src/img/logo-dark.webp\";\n\n//# sourceURL=webpack://my-webpack-project/./src/img/logo-dark.webp?");

/***/ }),

/***/ "./src/img/logo.webp":
/*!***************************!*\
  !*** ./src/img/logo.webp ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"src/img/logo.webp\";\n\n//# sourceURL=webpack://my-webpack-project/./src/img/logo.webp?");

/***/ }),

/***/ "./src/img/loupe.webp":
/*!****************************!*\
  !*** ./src/img/loupe.webp ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"src/img/loupe.webp\";\n\n//# sourceURL=webpack://my-webpack-project/./src/img/loupe.webp?");

/***/ }),

/***/ "./src/img/menu.webp":
/*!***************************!*\
  !*** ./src/img/menu.webp ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"src/img/menu.webp\";\n\n//# sourceURL=webpack://my-webpack-project/./src/img/menu.webp?");

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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;