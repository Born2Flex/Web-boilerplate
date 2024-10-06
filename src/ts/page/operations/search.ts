import {addTeachersOnPage} from "../main.ts";
import {findUsersByParam} from "../../operations/search.ts";
import {clearFilters} from "./filtering";
import {appContext} from "../../context/app-context";
import {clearSorting} from "./sorting";

const searchInput = document.querySelector<HTMLInputElement>('#search-input')
const searchForm = document.querySelector<HTMLFormElement>('.search-form');

searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    clearFilters();
    clearSorting();
    if (searchInput) {
        appContext.setDisplayedTeachers(findUsersByParam(appContext.getTeachers(), searchInput.value.trim()));
    }
    addTeachersOnPage();
});

export function clearSearchInput() {
    if (searchInput) {
        searchInput.value = '';
    }
}
