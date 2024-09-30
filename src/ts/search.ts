import {addTeachersOnPage} from "./task1";
import {findUsersByParam} from "./utils/search";
import {clearFilters} from "./filtering";
import {appContext} from "./context/app-context";
import {clearSorting} from "./sorting";

const searchInput = document.querySelector<HTMLInputElement>('#search-input')
const searchForm = document.querySelector<HTMLFormElement>('.search-form');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearFilters();
    clearSorting();
    // addAllTeachersOnGrid(findUsersByParam(appContext.getTeachers(), searchInput.value.trim()));
    appContext.setDisplayedTeachers(findUsersByParam(appContext.getTeachers(), searchInput.value.trim()));
    addTeachersOnPage();
});

export function clearSearchInput() {
    searchInput.value = '';
}
