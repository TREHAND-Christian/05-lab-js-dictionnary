import './scss/style.scss';
import getAPIResponse from './api-dico.js';

const form = document.querySelector('form');
const input = document.getElementById('myInput');
const theme = document.querySelector('body');
const logo = document.querySelector('#logo');
const definition = document.getElementById('def');


let isDark = false;

// Fonction changement de thème
function swapTheme() {
    const lien = document.querySelectorAll('.lien');
    const element = document.body;
    const styles = getComputedStyle(element);
    const coulTxt = styles.color;
    const coulBg = styles.backgroundColor;
    if (isDark) {
        theme.style.background = coulTxt;
        theme.style.color = coulBg;
        logo.src = "/src/img/logo-dark.png";
        for (let i = 0; i < lien.length; i++) {
            lien[i].classList.add('inverted');
          }
    } else {
        theme.style.background = coulTxt;
        theme.style.color = coulBg;
        logo.src = "/src/img/logo.png";
        for (let i = 0; i < lien.length; i++) {
            lien[i].classList.remove('inverted');
          }
    }
}

// Événement Submit
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const word = input.value;
    getAPIResponse(word, 'en');
});

// Événement input focus
input.addEventListener('focus', () => {
    const erreur = document.querySelector("#erreur");
    erreur.textContent = "";
});

// Événement changement de thème
document.getElementById('lightTheme').addEventListener('click', () => {
    isDark = false;
    swapTheme();
});

document.getElementById('darkTheme').addEventListener('click', () => {
    isDark = true;
    swapTheme();
});

// Événement Lien Synonymes / Antonymes
document.addEventListener('click', (event) => {
    const {target} = event;
    if (target.tagName === 'A' && target.className === 'lien') {
        event.preventDefault();
        const content = target.textContent;
        getAPIResponse(content, 'en');
        input.value = content;
    }
});

// Événement changement de police
document.querySelectorAll('.switch-toggle input[type="radio"]').forEach((input) => {
    input.addEventListener('change', (e) => {
        switch (e.target.id) {
            case 'sanssherif':
                definition.style.fontFamily = 'sans-serif';
                break;
            case 'sherif':
                definition.style.fontFamily = 'serif';
                break;
            case 'monospace':
                definition.style.fontFamily = 'monospace';
                break;
        }
    });
});

// Initialisation du "mot" par défaut
getAPIResponse('word', 'en');