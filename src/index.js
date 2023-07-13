import './scss/style.scss';
import getAPIResponse from './api-dico.js';
const form = document.querySelector('form');
const input = document.getElementById('myInput');
const theme = document.querySelector('body');
const logo = document.querySelector('#logo');
let isDark = false;

// Fonction changement de thème
function swapTheme() {
    const element = document.body;
    const styles = getComputedStyle(element);
    const coulTxt = styles.color;
    const coulBg = styles.backgroundColor;
    if (isDark) {
        theme.style.background = coulTxt;
        theme.style.color = coulBg;
        logo.src = "/src/img/logo-dark.png";
    } else {
        theme.style.background = coulTxt;
        theme.style.color = coulBg;
        logo.src = "/src/img/logo.png";
    }
}

// Evénement Submit
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const word = input.value;
    getAPIResponse(word, 'en');
});

// Evénement changement de thème
document.getElementById('lightTheme').addEventListener('click', function () {
    isDark = false;
    swapTheme();
});
document.getElementById('darkTheme').addEventListener('click', function () {
    isDark = true;
    swapTheme();
});

// Evénement Lien Synonymes / Antonymes
document.addEventListener('click', function (event) {
    if (event.target.tagName === 'A' && event.target.className === 'lien') {
        event.preventDefault();
        const content = event.target.textContent;
        getAPIResponse(content, 'en');
        input.value = content;
    }
});


let def = document.getElementById('def');
// Evénement changement de police 
document.querySelectorAll('.switch-toggle input[type="radio"]').forEach(input => {
    input.addEventListener('change', function (e) {
        switch (e.target.id) {
            case 'sanssherif':
                def.style.fontFamily = "sans-serif";
                break;
            case 'sherif':
                def.style.fontFamily = "serif";
                break;

            case 'monospace':
                def.style.fontFamily = "monospace";
                break;
        }
    });
});

// init "Word" par defaut
getAPIResponse("word", 'en');