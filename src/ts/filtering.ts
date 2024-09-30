import {FilterParams, filterUsers} from "./utils/filtering";
import {addAllTeachersOnGrid, addTeachersOnPage} from "./task1";
import {clearSearchInput} from "./search";
import {appContext} from "./context/app-context";
import {addPagination} from "./pagination/pagination";
import {clearSorting} from "./sorting";

const age = document.querySelector<HTMLSelectElement>('#age');
const region = document.querySelector<HTMLSelectElement>('#region');
const gender = document.querySelector<HTMLSelectElement>('#sex');
const withPhoto = document.querySelector<HTMLInputElement>('#photo');
const isFavorite = document.querySelector<HTMLInputElement>('#only-favorites');

let filters: FilterParams = {};

export function clearFilters() {
    filters = {};
    age.selectedIndex = 0;
    region.selectedIndex = 0;
    gender.selectedIndex = 0;
    withPhoto.checked = false;
    isFavorite.checked = false;
}

function addSelectFilterEvent(element: HTMLSelectElement | HTMLInputElement, field: string) {
    element.addEventListener('change', () => {
        if (element instanceof HTMLSelectElement) {
            filters[field] = element.options[element.selectedIndex].text;
        } else {
            if (element.checked) {
                filters[field] = true;
            } else {
                delete filters[field];
            }
        }
        if (filters[field] === '') {
            delete filters[field];
        }
        clearSearchInput();
        clearSorting();
        // addAllTeachersOnGrid(filterUsers(appContext.getTeachers(), filters));
        appContext.setDisplayedTeachers(filterUsers(appContext.getTeachers(), filters));

        addTeachersOnPage();
    });
}

addSelectFilterEvent(age, 'age');
addSelectFilterEvent(region, 'region');
addSelectFilterEvent(gender, 'gender');
addSelectFilterEvent(withPhoto, 'withPhoto');
addSelectFilterEvent(isFavorite, 'favorite');
