import { BASE_PATH } from "./config.js";

export async function loadComponent(id, path) {

    const response = await fetch(`${BASE_PATH}${path}`);

    if (!response.ok) {
        throw new Error(`Could not load component: ${path}`);
    }

    document.getElementById(id).innerHTML = await response.text();

}