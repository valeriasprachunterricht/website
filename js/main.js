import { loadComponent } from "./components.js";
import { createNavigation } from "./navigation.js";
import { createLanguageSwitcher } from "./language-switcher.js";

import {
    initLanguage,
    translatePage
} from "./i18n.js";

async function init(){

    await initLanguage();

    await loadComponent(
        "header",
        "/components/header.html"
    );

    createNavigation();

    createLanguageSwitcher();

    translatePage();

}

init();