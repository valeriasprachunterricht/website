import { BASE_PATH } from "./config.js";
import { translate } from "./i18n.js";

export const pages = [

    {
        key:"navigation.home",
        url:"/"
    },

    {
        key:"navigation.about",
        url:"/pages/about.html"
    },

    {
        key:"navigation.courses",
        url:"/pages/courses.html"
    },

    {
        key:"navigation.contact",
        url:"/pages/contact.html"
    },
    {
        key:"navigation.legal",
        url:"/pages/legal.html"
    }

];

export function createNavigation(){

    const nav =
        document.getElementById("navigation");

    const menuToggle =
        document.querySelector(".menu-toggle");

    const headerContainer =
        document.querySelector(".header-container");

    nav.innerHTML = "";

    pages.forEach(page=>{

        const link =
            document.createElement("a");

        link.href =
            `${BASE_PATH}${page.url}`;

        link.textContent =
            translate(page.key);

        if(
            window.location.pathname.endsWith(page.url)
        ){
            link.classList.add("active");
        }

        nav.appendChild(link);

    });

    if (
        menuToggle &&
        headerContainer &&
        !menuToggle.dataset.initialized
    ) {
        menuToggle.addEventListener("click", () => {

            const isOpen =
                headerContainer.classList.toggle("nav-open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Navigation schließen" : "Navigation öffnen"
            );

        });

        nav.addEventListener("click", event => {

            if (event.target.tagName !== "A") {
                return;
            }

            headerContainer.classList.remove("nav-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Navigation öffnen");

        });

        document.addEventListener("keydown", event => {

            if (event.key !== "Escape") {
                return;
            }

            headerContainer.classList.remove("nav-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Navigation öffnen");

        });

        menuToggle.dataset.initialized = "true";
    }

}
