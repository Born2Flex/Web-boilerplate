import {FilterParams, filterUsers} from "../../operations/filtering.ts";
import {addTeachersOnPage} from "../main.ts";
import {clearSearchInput} from "./search";
import {appContext} from "../../context/app-context";
import {clearSorting} from "./sorting";

const age = document.querySelector<HTMLSelectElement>('#age');
const region = document.querySelector<HTMLSelectElement>('#region');
const gender = document.querySelector<HTMLSelectElement>('#sex');
const withPhoto = document.querySelector<HTMLInputElement>('#photo');
const isFavorite = document.querySelector<HTMLInputElement>('#only-favorites');

let filters: FilterParams = {};

export function clearFilters() {
    filters = {};
    if (age) {
        age.selectedIndex = 0;
    }
    if (region) {
        region.selectedIndex = 0;
    }
    if (gender) {
        gender.selectedIndex = 0;
    }
    if (withPhoto) {
        withPhoto.checked = false;
    }
    if (isFavorite) {
        isFavorite.checked = false;
    }
}

function addSelectFilterEvent(element: HTMLSelectElement | HTMLInputElement | null, field: keyof FilterParams) {
    element?.addEventListener('change', () => {
        if (element instanceof HTMLSelectElement) {
            filters[field] = element.options[element.selectedIndex].text as any;
        } else if (element.checked) {
            filters[field] = true as any;
        } else {
            delete filters[field];
        }
        if (filters[field] === '') {
            delete filters[field];
        }
        clearSearchInput();
        clearSorting();
        appContext.setDisplayedTeachers(filterUsers(appContext.getTeachers(), filters));
        addTeachersOnPage();
    });
}

addSelectFilterEvent(age, 'age');
addSelectFilterEvent(region, 'region');
addSelectFilterEvent(gender, 'gender');
addSelectFilterEvent(withPhoto, 'withPhoto');
addSelectFilterEvent(isFavorite, 'favorite');
