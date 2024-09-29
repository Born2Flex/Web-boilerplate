import {FormattedUser} from "../utils/interfaces";

export interface AppContext {
    teachers: FormattedUser[],
    addTeacher: (user: FormattedUser) => void;
    setTeachers: (users: FormattedUser[]) => void;
    getTeachers: () => FormattedUser[];
    getTeacherById: (id: string) => FormattedUser;
}

export const appContext: AppContext = {
    teachers: [],

    addTeacher(teacher: FormattedUser) {
        this.teachers.push(teacher);
    },

    setTeachers(teachers: FormattedUser[]) {
        this.teachers = teachers;
    },

    getTeachers() {
        return this.teachers;
    },

    getTeacherById(id: string): FormattedUser {
        return this.teachers.find(t => t.id === id);
    },
};
