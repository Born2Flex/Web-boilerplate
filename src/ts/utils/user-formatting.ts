import _ from 'lodash';
import { FormattedUser, Gender } from './interfaces';
import { capitalizeWord, generateId, getRandomCourse } from './utils.ts';

export function mergeUsers(users: FormattedUser[], additionalUsers: FormattedUser[]): FormattedUser[] {
    return getDistinctUsers([...users, ...additionalUsers]);
}

function getDistinctUsers(users: FormattedUser[]): FormattedUser[] {
    return _.uniqBy(users, 'email');
}

export function formatUsersAndAddFields(users: any[]): FormattedUser[] {
    return _.map(users, user => addMissingFields(formatUser(user)));
}

export function addFieldsToUsers(users: any[]): FormattedUser[] {
    return _.map(users, addMissingFields);
}

function addMissingFields(user: any): FormattedUser {
    return _.defaults(user, {
        id: generateId(13),
        favorite: false,
        course: getRandomCourse(),
        bg_color: "#ffffff",
        note: "Note"
    });
}

function formatUser(user: any): Partial<FormattedUser> {
    return {
        gender: capitalizeWord(user.gender) as Gender,
        title: _.get(user, 'name.title'),
        full_name: `${_.get(user, 'name.first')} ${_.get(user, 'name.last')}`,
        city: _.get(user, 'location.city'),
        state: _.get(user, 'location.state'),
        country: _.get(user, 'location.country'),
        postcode: _.get(user, 'location.postcode'),
        coordinates: _.get(user, 'location.coordinates'),
        timezone: _.get(user, 'location.timezone'),
        email: _.get(user, 'email'),
        b_day: _.get(user, 'dob.date'),
        age: _.get(user, 'dob.age'),
        phone: _.get(user, 'phone'),
        picture_large: _.get(user, 'picture.large'),
        picture_thumbnail: _.get(user, 'picture.thumbnail'),
        favorite: _.get(user, 'favorite', false)
    };
}
