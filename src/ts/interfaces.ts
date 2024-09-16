export type Gender = "male" | "female";

export type Title = "Mr" | "Ms" | "Miss" | "Mrs" | "Monsieur" | "Madame"; // string?

export type Course = "Mathematics" | "Physics" | "English" | "Computer Science" | "Dancing" | "Chess" | "Biology" | "Chemistry" | "Law" | "Art" | "Medicine" | "Statistics";

export const courses: Course[] = [
    "Mathematics", "Physics", "English", "Computer Science", "Dancing", "Chess", "Biology", "Chemistry",
    "Law", "Art", "Medicine", "Statistics"
];

export interface FormattedUser {
    id: string,
    favorite: boolean,
    course: Course | null,
    bg_color: string,
    note: string | null,

    gender: Gender,
    title: Title,
    full_name: string,
    city: string,
    state?: string,
    country: string,
    postcode: number,
    coordinates: Coordinate,
    timezone: Timezone,
    email?: string,
    b_day?: string,
    age?: number,
    phone?: string,
    picture_large?: string,
    picture_thumbnail?: string
}

export interface Coordinate {
    latitude: string,
    longitude: string
}

export interface Timezone {
    offset: string,
    description: string
}
