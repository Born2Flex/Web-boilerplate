import {addAllTeachersOnGrid} from "./task1";
import {findUsersByParam} from "./utils/search";
import {validatedUsers} from "./data";
import {clearFilters} from "./task2";

const searchInput = document.querySelector<HTMLInputElement>('#search-input')
const searchForm = document.querySelector<HTMLFormElement>('.search-form');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearFilters();
    addAllTeachersOnGrid(findUsersByParam(validatedUsers, searchInput.value.trim()));
});

export function clearSearchInput() {
    searchInput.value = '';
}
