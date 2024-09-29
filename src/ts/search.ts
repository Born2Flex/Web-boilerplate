import {addAllTeachersOnGrid} from "./task1";
import {findUsersByParam} from "./utils/search";
import {clearFilters} from "./filtering";
import {appContext} from "./context/app-context";

const searchInput = document.querySelector<HTMLInputElement>('#search-input')
const searchForm = document.querySelector<HTMLFormElement>('.search-form');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearFilters();
    addAllTeachersOnGrid(findUsersByParam(appContext.getTeachers(), searchInput.value.trim()));
});

export function clearSearchInput() {
    searchInput.value = '';
}
