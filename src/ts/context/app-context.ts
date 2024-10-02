import {FormattedUser} from "../utils/interfaces";
import {addTablePage, recordsPerPage} from "../page/pagination/pagination";

export interface AppContext {
    teachers: FormattedUser[],
    displayedTeachers: FormattedUser[],
    currentPage: number,
    numOfPages: number,
    addTeacher: (user: FormattedUser) => void;
    setTeachers: (users: FormattedUser[]) => void;
    getTeachers: () => FormattedUser[];
    getDisplayedTeachers: () => FormattedUser[];
    setDisplayedTeachers: (users: FormattedUser[]) => void;
    getTeacherById: (id: string) => FormattedUser;
}

export const appContext: AppContext = {
    teachers: [],
    displayedTeachers: [],
    currentPage: 1,
    numOfPages: 5,

    addTeacher(teacher: FormattedUser) {
        this.teachers.push(teacher);
        this.displayedTeachers.push(teacher);
        if (this.numOfPages < Math.ceil(this.teachers.length / recordsPerPage)) {
            addTablePage();
        }
        this.numOfPages = Math.ceil(this.teachers.length / recordsPerPage);
    },

    setTeachers(teachers: FormattedUser[]) {
        this.teachers = teachers;
        this.numOfPages = Math.ceil(this.teachers.length / recordsPerPage);
        this.currentPage = 1;
    },

    getTeachers() {
        return this.teachers;
    },

    getDisplayedTeachers() {
        return this.displayedTeachers;
    },

    setDisplayedTeachers(teachers: FormattedUser[]) {
        this.displayedTeachers = teachers;
        this.numOfPages = Math.ceil(this.displayedTeachers.length / recordsPerPage);
        this.currentPage = 1;
    },

    getTeacherById(id: string): FormattedUser {
        return this.teachers.find(t => t.id === id);
    },
};
