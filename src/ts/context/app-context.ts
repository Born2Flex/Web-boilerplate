import {FormattedUser} from "../utils/interfaces";
import {addTablePage, recordsPerPage} from "../page/pagination/pagination";
import {Map} from "leaflet";
import {Chart} from "chart.js/auto";

export interface AppContext {
    teachers: FormattedUser[],
    displayedTeachers: FormattedUser[],
    currentPage: number,
    numOfPages: number,
    map: Map | undefined,
    chart: Chart<any, any, any> | undefined,
    currentChart: string,
    currentTeacher: FormattedUser | undefined,
    addTeacher: (user: FormattedUser) => void;
    addTeachersList: (user: FormattedUser[]) => void;
    setTeachers: (users: FormattedUser[]) => void;
    getTeachers: () => FormattedUser[];
    getDisplayedTeachers: () => FormattedUser[];
    setDisplayedTeachers: (users: FormattedUser[]) => void;
    getTeacherById: (id: string) => FormattedUser | null;
}

export const appContext: AppContext = {
    teachers: [],
    displayedTeachers: [],
    currentPage: 1,
    numOfPages: 5,
    map: undefined,
    chart: undefined,
    currentTeacher: undefined,
    currentChart: "age",

    addTeacher(teacher: FormattedUser) {
        this.numOfPages = Math.ceil(this.teachers.length / recordsPerPage);
        this.teachers.push(teacher);
        this.displayedTeachers = this.teachers;
        if (this.numOfPages < Math.ceil(this.teachers.length / recordsPerPage)) {
            addTablePage();
        }
        this.numOfPages = Math.ceil(this.teachers.length / recordsPerPage);
    },

    addTeachersList(teachers: FormattedUser[]) {
        this.numOfPages = Math.ceil(this.teachers.length / recordsPerPage);
        this.teachers = this.teachers.concat(teachers);
        this.displayedTeachers = this.teachers;
        if (this.numOfPages < Math.ceil(this.teachers.length / recordsPerPage)) {
            addTablePage();
        }
        this.numOfPages = Math.ceil(this.teachers.length / recordsPerPage);
        this.currentPage = 1;
    },

    setTeachers(teachers: FormattedUser[]) {
        this.teachers = teachers;
        this.displayedTeachers = teachers;
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

    getTeacherById(id: string): FormattedUser | null {
        return this.teachers.find(t => t.id === id) ?? null;
    },
};
