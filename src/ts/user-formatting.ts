// @ts-ignore
import {FormattedUser, courses, Course} from './interfaces';

export function mergeUsers(users: FormattedUser[], additionalUsers: FormattedUser[]): FormattedUser[] {
    return getDistinctUsers(users.concat(additionalUsers));
}

function getDistinctUsers(users: FormattedUser[]): FormattedUser[] {
    return users.filter((item, index, self) => index === self.findIndex((t) => t.full_name === item.full_name));
}

export function formatUsersAndAddFields(users: any[]): FormattedUser[] {
    return users.map(user => addMissingFields(formatUser(user)));
}

function formatUser(user: any) {
    return {
        gender: user.gender,
        title: user.name.title,
        full_name: user.name.first + ' ' + user.name.last,
        city: user.location.city,
        state: user.location.state,
        country: user.location.country,
        postcode: user.location.postcode,
        coordinates: user.location.coordinates,
        timezone: user.location.timezone,
        email: user.email,
        b_day: user.dob.date,
        age: user.dob.age,
        phone: user.phone,
        picture_large: user.picture.large,
        picture_thumbnail: user.picture.thumbnail
    };
}

function addMissingFields(user: any): FormattedUser {
    return {
        id: generateId(13),
        favorite: false,
        course: getRandomCourse(),
        bg_color: "#ffffff",
        note: null,
        ...user,
    };
}

function generateId(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }
    return id;
}

function getRandomCourse(): Course {
    return courses[Math.floor(Math.random() * courses.length)];
}
