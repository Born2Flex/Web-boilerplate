import {addAllTeachersOnGrid} from "./task1";
import {findUsersByParam} from "./utils/search";
import {validatedUsers} from "./data";
import {clearFilters} from "./task2";

const searchInput = document.querySelector<HTMLInputElement>('#search-input')
const searchBtn = document.querySelector('#search-btn');

export function clearSearchInput() {
    searchInput.value = '';
}

searchBtn.addEventListener('click', () => {
    const searchValue = searchInput.value.trim();
    clearFilters();
    addAllTeachersOnGrid(findUsersByParam(validatedUsers, searchValue));
})
