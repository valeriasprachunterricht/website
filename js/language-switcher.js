import { LANGUAGES } from "./config.js";

import {
    getCurrentLanguage,
    loadLanguage,
    translatePage
} from "./i18n.js";

import { createNavigation } from "./navigation.js";

let outsideClickListenerRegistered = false;

export function createLanguageSwitcher() {

    const container =
        document.getElementById("language-switcher");

    const current =
        LANGUAGES.find(
            l => l.code === getCurrentLanguage()
        );

    container.innerHTML = `
        <div class="language-dropdown">

            <button class="language-current" type="button" aria-expanded="false">

                ${current.flag}
                ${current.name}
                ▼

            </button>

            <div class="language-menu"></div>

        </div>
    `;

    const menu =
        container.querySelector(".language-menu");

    const currentButton =
        container.querySelector(".language-current");

    currentButton.addEventListener("click", (event) => {

        event.stopPropagation();

        const isOpen =
            menu.classList.toggle("open");

        currentButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

    menu.addEventListener("click", (event) => {

        event.stopPropagation();

    });

 if (!outsideClickListenerRegistered) {

    document.addEventListener("click", () => {

        document
            .querySelectorAll(".language-menu")
            .forEach(menu => {

                menu.classList.remove("open");

            });

        document
            .querySelectorAll(".language-current")
            .forEach(button => {

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

    });

    outsideClickListenerRegistered = true;

}

    LANGUAGES.forEach(language => {

        const button =
            document.createElement("button");

        button.type = "button";

        button.textContent =
            `${language.flag} ${language.name}`;

        button.addEventListener("click", async () => {

            await loadLanguage(language.code);

            createNavigation();

            createLanguageSwitcher();

            translatePage();

        });

        menu.appendChild(button);

    });

}
