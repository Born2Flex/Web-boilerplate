import {setUpAgeChart, setUpCourseChart, setUpGenderChart} from "./chart.ts";
import {appContext} from "../../context/app-context.ts";

const ageButton = document.querySelector('#age-chart');
const genderButton = document.querySelector('#gender-chart');
const courseButton = document.querySelector('#course-chart');

ageButton?.addEventListener('click', () => {
    setUpAgeChart();
    appContext.currentChart = 'age';
});

genderButton?.addEventListener('click', () => {
    setUpGenderChart();
    appContext.currentChart = 'gender';
});

courseButton?.addEventListener('click', () => {
    setUpCourseChart();
    appContext.currentChart = 'course';
});
