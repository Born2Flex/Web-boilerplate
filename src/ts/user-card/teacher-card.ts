import {FormattedUser} from "../utils/interfaces";
import {validatedUsers} from "../data";

export function formatTeacherCard(user: FormattedUser) {
    return `
        <div class="card" data-user-id=\'${user.id}\'>
            <div class="teacher-image">
                ${getImageElem(user)}
            </div>
            <div class="teacher-info">
                <h3 class="teacher-name">${user.full_name}</h3>
                <p class="teacher-specialty">${user.course}</p>
                <p class="teacher-country">${user.country}</p>
            </div>
            ${(user.favorite ? '<span class="favorite">★</span>' : '')}
        </div>
    `;
}

export function formatShortTeacherCard(user: FormattedUser) {
    return `
        <div class="card" data-user-id=\'${user.id}\'>
            <div class="teacher-image">
                ${getImageElem(user)}
           </div>
            <div class="teacher-info">
                <h3 class="teacher-name">${user.full_name}</h3>
                <p class="teacher-country">${user.country}</p>
            </div>
        </div>
    `;
}

function getImageElem(user: FormattedUser) {
    return user.picture_large? `<img src=${user.picture_large} alt="picture"/>` : `<span class="teacher-initials">${getInitials(user.full_name)}</span>`;
}

function getInitials(fullName: string) {
    const parts = fullName.split(' ');
    return `${parts[0].charAt(0).toLocaleUpperCase()}.${parts[1].charAt(0).toLocaleUpperCase()}.`;
}

export function findTeacherById(id: string) {
    return validatedUsers.find(user => user.id === id);
}
