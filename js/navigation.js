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
        key:"navigation.prices",
        url:"/pages/prices.html"
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

}