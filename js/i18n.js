import {
    BASE_PATH,
    DEFAULT_LANGUAGE,
    LANGUAGES
} from "./config.js";

export {
    LANGUAGES
};

let translations = {};

let currentLanguage = DEFAULT_LANGUAGE;

export function getCurrentLanguage() {
    return currentLanguage;
}

function detectLanguage() {

    const stored = localStorage.getItem("language");

    if (LANGUAGES.some(language => language.code === stored)) {
        return stored;
    }

    const browser = navigator.language.slice(0,2);

    if (LANGUAGES.some(language => language.code === browser)) {
        return browser;
    }

    return DEFAULT_LANGUAGE;

}

export async function initLanguage() {

    currentLanguage = detectLanguage();

    await loadLanguage(currentLanguage);

}

export async function loadLanguage(language){

    const response = await fetch(
        `${BASE_PATH}/lang/${language}.json`
    );

    if(!response.ok){
        throw new Error("Could not load language file.");
    }

    translations = await response.json();

    currentLanguage = language;

    localStorage.setItem("language",language);

    document.documentElement.lang = language;

}

export function translate(key, fallback = key){

    return key
        .split(".")
        .reduce((obj,part)=>obj?.[part],translations)
        ?? fallback;

}

export function translatePage(){

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element=>{

            if (!element.dataset.i18nDefault) {
                element.dataset.i18nDefault = element.textContent;
            }

            element.textContent =
                translate(
                    element.dataset.i18n,
                    element.dataset.i18nDefault
                );

        });

    document
        .querySelectorAll("[data-i18n-content]")
        .forEach(element=>{

            if (!element.dataset.i18nContentDefault) {
                element.dataset.i18nContentDefault =
                    element.getAttribute("content") ?? "";
            }

            element.setAttribute(
                "content",
                translate(
                    element.dataset.i18nContent,
                    element.dataset.i18nContentDefault
                )
            );

        });

}
