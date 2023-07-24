import "./scss/style.scss";
import getAPIResponse from "./api-dico.js";

var url = require("/src/img/bt-light.webp");
var url = require("/src/img/bt-dark.webp");
var url = require("/src/img/logo.webp");
var url = require("/src/img/logo-dark.webp");
var url = require("/src/img/audio.webp");
var url = require("/src/img/loupe.webp");
var url = require("/src/img/menu.webp");
let menuOpen = false;

const form = document.querySelector("form");
const input = document.getElementById("myInput");
const theme = document.querySelector("body");
const definition = document.getElementById("def");


let isDark = false;

// Fonction changement de thème
function swapTheme() {
    const menu = document.getElementById("styleBt");
    const logo = document.getElementById("logo");
    const element = document.body;
    const styles = getComputedStyle(element);
    const coulTxt = styles.color;
    const coulBg = styles.backgroundColor;
    const switchThemeImg = document.getElementById("switch-theme");
    const logoImg = document.getElementById("logoImg");

    if (isDark) {
        theme.style.background = coulTxt;
        theme.style.color = coulBg;
        logoImg.src = "/src/img/logo-dark.webp";
        switchThemeImg.src = "/src/img/bt-light.webp";
        menu.style.backgroundColor = coulTxt;

        logo.style.background = "rgb(29,0,173)";
        logo.style.background = "linear-gradient(0deg, rgba(29,0,173,0) 0%, rgba(4,131,165,0.4) 100%)";

    } else {
        theme.style.background = coulTxt;
        theme.style.color = coulBg;
        logoImg.src = "/src/img/logo.webp";
        switchThemeImg.src = "/src/img/bt-dark.webp";
        menu.style.backgroundColor = coulTxt;
        logo.style.background = "rgb(198,214,236)";
        logo.style.background = "linear-gradient(0deg, rgba(198,214,236,0) 0%, rgba(198,214,236,1) 100%)";

    }
}

// Événement changement de thème
document.getElementById("switch-theme").addEventListener("click", () => {
    isDark = !isDark; // Inverse la valeur de isDark
    swapTheme();
});


// Événement menu mobile

const styleBt = document.getElementById("styleBt");
document.getElementById("btMenu").addEventListener("click", () => {
    if (menuOpen) {
        menuOpen = false;
        styleBt.style.opacity = 0;
    } else {
        menuOpen = true;
        styleBt.style.opacity = 1;
    }
    

});

// Événement Submit
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const word = input.value;
    getAPIResponse(word, "en");
});

// Événement input focus
input.addEventListener("focus", () => {
    const erreur = document.querySelector("#erreur");
    erreur.textContent = "";
});

// Événement Lien Synonymes / Antonymes
document.addEventListener("click", (event) => {
    const {
        target
    } = event;
    if (target.tagName === "A" && target.className === "lien") {
        event.preventDefault();
        const content = target.textContent;
        getAPIResponse(content, "en");
        input.value = content;
    }
});

// Événement changement de police
document
    .querySelectorAll('.switch-toggle input[type="radio"]')
    .forEach((input) => {
        input.addEventListener("change", (e) => {
            switch (e.target.id) {
                case "sansserif":
                    definition.style.fontFamily = "sans-serif";
                    break;
                case "serif":
                    definition.style.fontFamily = "serif";
                    break;
                case "monospace":
                    definition.style.fontFamily = "monospace";
                    break;
            }
        });
    });


// Initialisation du "mot" par défaut
getAPIResponse("welcome", "en");