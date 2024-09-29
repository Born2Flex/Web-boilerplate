import {FilterParams, filterUsers} from "./utils/filtering";
import {addAllTeachersOnGrid} from "./task1";
import {clearSearchInput} from "./search";
import {appContext} from "./context/app-context";

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
            filters[field] = element.checked;
        }
        if (filters[field] === '') {
            delete filters[field];
        }
        clearSearchInput();
        addAllTeachersOnGrid(filterUsers(appContext.getTeachers(), filters));
    });
}

addSelectFilterEvent(age, 'age');
addSelectFilterEvent(region, 'region');
addSelectFilterEvent(gender, 'gender');
addSelectFilterEvent(withPhoto, 'withPhoto');
addSelectFilterEvent(isFavorite, 'favorite');
