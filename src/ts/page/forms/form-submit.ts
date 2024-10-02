import {FormattedUser} from "../../utils/interfaces";
import {addTeachersOnPage} from "../main";
import {generateId} from "../../utils/utils";
import {addTeacherPopup} from "./teacher-form";
import {appContext} from "../../context/app-context";
import {clearFilters} from "../operations/filtering";
import {clearSorting} from "../operations/sorting";
import {clearSearchInput} from "../operations/search";

const form = document.querySelector<HTMLFormElement>('#add-teacher-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries()) as Partial<FormattedUser>;
    formObject.age = new Date().getFullYear() - new Date(formObject.b_day).getFullYear();
    formObject.favorite = false;
    formObject.id = generateId(13);

    console.log(formObject);
    appContext.addTeacher(formObject as FormattedUser);
    clearFilters();
    clearSorting();
    clearSearchInput();
    addTeachersOnPage();
    form.reset();
    addTeacherPopup.close();
});
