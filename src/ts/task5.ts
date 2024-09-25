import {FormattedUser} from "./utils/interfaces";
import {validatedUsers} from "./data";
import {addTeachersOnPage} from "./task1";
import {generateId} from "./utils/utils";
import {addTeacherPopup} from "./teacher-form";

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
    validatedUsers.push(formObject as FormattedUser);
    addTeachersOnPage(validatedUsers);
    form.reset();
    addTeacherPopup.close();
});
