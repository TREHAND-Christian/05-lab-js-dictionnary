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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getAPI);\nconst erreur = document.querySelector(\"#erreur\");\nconst API_VERSION = 'v2';\nconst LANGUAGE = 'en';\nconst BASE_URL = `https://api.dictionaryapi.dev/api/${API_VERSION}/entries/${LANGUAGE}/`;\nfunction constructAPI(word) {\n  return `${BASE_URL}${word}`;\n}\nfunction handleFetchErrors(response) {\n  if (!response.ok) {\n    const errorMessage = response.status === 404 ? 'Word not found.' : `HTTP error! status: ${response.status}. Something went wrong.`;\n    erreur.textContent = errorMessage;\n    throw new Error(errorMessage);\n  }\n  return response.json();\n}\nfunction groupWordDefinitions(data) {\n  return data.reduce((groupedMeanings, wordDef) => {\n    wordDef.meanings.forEach(meaning => {\n      if (!groupedMeanings[meaning.partOfSpeech]) {\n        groupedMeanings[meaning.partOfSpeech] = [];\n      }\n      groupedMeanings[meaning.partOfSpeech].push(...meaning.definitions);\n    });\n    return groupedMeanings;\n  }, {});\n}\nfunction createTabsAndDefinitions(groupedMeanings, tabsElement, contentElement) {\n  let tabsHTML = \"\";\n  let contentHTML = \"\";\n  Object.keys(groupedMeanings).forEach((partOfSpeech, index) => {\n    const contentId = `def-${index}`;\n    tabsHTML += `<div id=\"tab-${index}\" class=\"tab tab-light\">${partOfSpeech}</div>`;\n    contentHTML += `<ul id=\"${contentId}\" class=\"def\">`;\n    groupedMeanings[partOfSpeech].forEach(def => {\n      contentHTML += `<li>${def.definition}</li>`;\n    });\n    contentHTML += `</ul>`;\n  });\n  tabsElement.innerHTML = tabsHTML;\n  contentElement.innerHTML = contentHTML;\n  const indicator = document.createElement('div');\n  indicator.classList.add('tab-indicator');\n  tabsElement.appendChild(indicator);\n  const deactivateAll = activeId => {\n    document.querySelectorAll('.def, .tab').forEach(el => {\n      if (el.id !== activeId) el.classList.remove('active');\n    });\n  };\n  tabsElement.querySelectorAll('.tab').forEach(tab => {\n    tab.addEventListener('click', function () {\n      const tabIndex = tab.id.split('-')[1];\n      indicator.style.left = tab.offsetLeft + 'px';\n      indicator.style.width = tab.offsetWidth + 'px';\n      indicator.style.height = tab.offsetHeight + 'px';\n      const def = document.getElementById(`def-${tabIndex}`);\n      const isActive = def.classList.contains('active');\n      if (!isActive) {\n        deactivateAll(`tab-${tabIndex}`);\n        deactivateAll(`def-${tabIndex}`);\n        tab.classList.add('active');\n        def.classList.add('active');\n        tab.style.transition = \"all 0.5s ease-in-out\";\n        def.style.transition = \"all 0.5s ease-in-out\";\n      }\n    });\n  });\n  const firstTab = document.getElementById('tab-0');\n  const firstContent = document.getElementById('def-0');\n  if (firstTab && firstContent) {\n    firstTab.classList.add('active');\n    firstContent.classList.add('active');\n    indicator.style.width = `${firstTab.offsetWidth}px`;\n  }\n}\nfunction processRelationWords(data, element, relationType) {\n  let html = `<h2>${relationType}</h2>`;\n  let wordsList = [];\n  for (let wordDef of data) {\n    for (let meaning of wordDef.meanings) {\n      if (meaning[relationType] && meaning[relationType].length > 0) {\n        const words = meaning[relationType].map(word => `<a href=\"#\" class=\"lien\">${word}</a>`).join(' ');\n        wordsList.push(`<li class=\"liSynonym\">${words}</li>`);\n      }\n    }\n  }\n  if (wordsList.length) {\n    html += `<ul>${wordsList.join(\"\")}</ul>`;\n    element.innerHTML = html;\n    element.querySelectorAll('a').forEach(anchor => {\n      anchor.addEventListener('click', function (event) {\n        event.preventDefault();\n        getAPI(anchor.textContent, 'en');\n      });\n    });\n  } else {\n    element.innerHTML = \"\";\n  }\n}\nconst container = document.getElementById('response');\nfunction createAndAppendDiv(parent, id, styleObj = null) {\n  const div = document.createElement('div');\n  div.id = id;\n  if (styleObj) Object.assign(div.style, styleObj);\n  parent.appendChild(div);\n  return div;\n}\nfunction initializeDOMElements() {\n  const container = document.getElementById('response');\n  const createDiv = (parent, id, styles = {}) => {\n    const div = document.createElement('div');\n    div.id = id;\n    Object.assign(div.style, styles);\n    parent.appendChild(div);\n    return div;\n  };\n  return {\n    wordDiv: createDiv(container, 'word'),\n    audioElement: createDiv(createDiv(container, 'vocal'), 'audio'),\n    phoneticElement: createDiv(createDiv(container, 'vocal'), 'phonetic'),\n    tabsElement: createDiv(createDiv(container, 'defs'), 'tabs', {\n      zIndex: '10'\n    }),\n    contentElement: createDiv(createDiv(container, 'defs'), 'def'),\n    synonymsElement: createDiv(container, 'synonyms'),\n    antonymsElement: createDiv(container, 'antonyms')\n  };\n}\nconst domElements = initializeDOMElements();\nfunction getAPI(word) {\n  if (!word) {\n    erreur.textContent = 'You did not enter any word.';\n    return;\n  }\n  const API = constructAPI(word);\n  fetch(API).then(handleFetchErrors).then(data => {\n    if (data && data.length > 0) {\n      const firstWord = data[0];\n      domElements.wordDiv.textContent = firstWord.word;\n\n      // Handle phonetic\n      domElements.phoneticElement.innerHTML = `<span><p>Phonetic </p><p> ${firstWord.phonetic} </p><p id=\"playAudio\"></p></span>`;\n\n      // Handle audio\n      const audioData = firstWord.phonetics.find(item => item.audio);\n      if (audioData) {\n        domElements.audioElement.innerHTML = `<audio id=\"playerAudio\" controls src=\"${audioData.audio}\"></audio>`;\n        document.getElementById(\"playAudio\").addEventListener(\"click\", () => {\n          document.getElementById(\"playerAudio\").play();\n        });\n      } else {\n        domElements.audioElement.innerHTML = \"\";\n      }\n      const groupedMeanings = groupWordDefinitions(data);\n      createTabsAndDefinitions(groupedMeanings, domElements.tabsElement, domElements.contentElement);\n      processRelationWords(data, domElements.synonymsElement, 'synonyms');\n      processRelationWords(data, domElements.antonymsElement, 'antonyms');\n    } else {\n      erreur.textContent = \"Word not found.\";\n    }\n  }).catch(e => {\n    erreur.textContent = e.message === 'Word not found.' ? e.message : \"There was a problem...\";\n    console.error('There was a problem with your fetch operation: ' + e.message);\n  });\n}\n\n//# sourceURL=webpack://my-webpack-project/./src/api-dico.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/style.scss */ \"./src/scss/style.scss\");\n/* harmony import */ var _api_dico_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api-dico.js */ \"./src/api-dico.js\");\n\n\nvar url = __webpack_require__(/*! ../../../../../../src/img/bt-light.webp */ \"./src/img/bt-light.webp\");\nvar url = __webpack_require__(/*! ../../../../../../src/img/bt-dark.webp */ \"./src/img/bt-dark.webp\");\nvar url = __webpack_require__(/*! ../../../../../../src/img/logo.webp */ \"./src/img/logo.webp\");\nvar url = __webpack_require__(/*! ../../../../../../src/img/logo-dark.webp */ \"./src/img/logo-dark.webp\");\nvar url = __webpack_require__(/*! ../../../../../../src/img/audio.webp */ \"./src/img/audio.webp\");\nvar url = __webpack_require__(/*! ../../../../../../src/img/loupe.webp */ \"./src/img/loupe.webp\");\nvar url = __webpack_require__(/*! ../../../../../../src/img/menu.webp */ \"./src/img/menu.webp\");\nlet menuOpen = false;\nconst form = document.querySelector(\"form\");\nconst input = document.getElementById(\"myInput\");\nconst theme = document.querySelector(\"body\");\nconst definition = document.getElementById(\"def\");\nlet isDark = false;\n\n// Fonction changement de thème\nfunction swapTheme() {\n  const menu = document.getElementById(\"styleBt\");\n  const logo = document.getElementById(\"logo\");\n  const element = document.body;\n  const styles = getComputedStyle(element);\n  const coulTxt = styles.color;\n  const coulBg = styles.backgroundColor;\n  const switchThemeImg = document.getElementById(\"switch-theme\");\n  const logoImg = document.getElementById(\"logoImg\");\n  if (isDark) {\n    theme.style.background = coulTxt;\n    theme.style.color = coulBg;\n    logoImg.src = \"/src/img/logo-dark.webp\";\n    switchThemeImg.src = \"/src/img/bt-light.webp\";\n    menu.style.backgroundColor = coulTxt;\n    logo.style.background = \"rgb(29,0,173)\";\n    logo.style.background = \"linear-gradient(0deg, rgba(29,0,173,0) 0%, rgba(4,131,165,0.4) 100%)\";\n  } else {\n    theme.style.background = coulTxt;\n    theme.style.color = coulBg;\n    logoImg.src = \"/src/img/logo.webp\";\n    switchThemeImg.src = \"/src/img/bt-dark.webp\";\n    menu.style.backgroundColor = coulTxt;\n    logo.style.background = \"rgb(198,214,236)\";\n    logo.style.background = \"linear-gradient(0deg, rgba(198,214,236,0) 0%, rgba(198,214,236,1) 100%)\";\n  }\n}\n\n// Événement changement de thème\ndocument.getElementById(\"switch-theme\").addEventListener(\"click\", () => {\n  isDark = !isDark; // Inverse la valeur de isDark\n  swapTheme();\n});\n\n// Événement menu mobile\n\nconst styleBt = document.getElementById(\"styleBt\");\ndocument.getElementById(\"btMenu\").addEventListener(\"click\", () => {\n  if (menuOpen) {\n    menuOpen = false;\n    styleBt.style.opacity = 0;\n  } else {\n    menuOpen = true;\n    styleBt.style.opacity = 1;\n  }\n});\n\n// Événement Submit\nform.addEventListener(\"submit\", event => {\n  event.preventDefault();\n  const word = input.value;\n  (0,_api_dico_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(word, \"en\");\n});\n\n// Événement input focus\ninput.addEventListener(\"focus\", () => {\n  const erreur = document.querySelector(\"#erreur\");\n  erreur.textContent = \"\";\n});\n\n// Événement Lien Synonymes / Antonymes\ndocument.addEventListener(\"click\", event => {\n  const {\n    target\n  } = event;\n  if (target.tagName === \"A\" && target.className === \"lien\") {\n    event.preventDefault();\n    const content = target.textContent;\n    (0,_api_dico_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(content, \"en\");\n    input.value = content;\n  }\n});\n\n// Événement changement de police\ndocument.querySelectorAll('.switch-toggle input[type=\"radio\"]').forEach(input => {\n  input.addEventListener(\"change\", e => {\n    switch (e.target.id) {\n      case \"sansserif\":\n        definition.style.fontFamily = \"sans-serif\";\n        break;\n      case \"serif\":\n        definition.style.fontFamily = \"serif\";\n        break;\n      case \"monospace\":\n        definition.style.fontFamily = \"monospace\";\n        break;\n    }\n  });\n});\n\n// Initialisation du \"mot\" par défaut\n(0,_api_dico_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\"welcome\", \"en\");\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

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