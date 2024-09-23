import {randomUserMock, additionalUsers} from './FE4U-Lab2-mock';
import {addFieldsToUsers, formatUsersAndAddFields, mergeUsers} from './utils/user-formatting';
import {FormattedUser} from './utils/interfaces';
import {validateUsers} from "./utils/validation";

const teacherContainer = document.querySelector(".all-teachers");
const mergedUsers = mergeUsers(formatUsersAndAddFields(randomUserMock), addFieldsToUsers(additionalUsers));
const validatedUsers = validateUsers(mergedUsers);

addTeachers();

function addTeachers() {
    let html = '';
    validatedUsers.forEach(user => {
        html += formatUserCard(user);
    })
    teacherContainer.innerHTML = html;
}

function formatUserCard(user: FormattedUser) {
    let image: string;
    if (user.picture_large) {
        image = `<img src=${user.picture_large} alt="picture"/>`;
    } else {
        image = `<span class="teacher-initials">${getInitials(user.full_name)}</span>`;
    }
    return `
        <div class="card">
            <div class="teacher-image">${image}</div>
            <div class="teacher-info">
                <h3 class="teacher-name">${user.full_name}</h3>
                <p class="teacher-specialty">${user.course}</p>
                <p class="teacher-country">${user.country}</p>
            </div>
        </div>
    `;
}

function getInitials(fullName: string) {
    const parts = fullName.split(' ');
    return `${parts[0].charAt(0).toLocaleUpperCase()}.${parts[1].charAt(0).toLocaleUpperCase()}.`;
}
