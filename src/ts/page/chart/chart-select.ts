import {setUpRegionChart, setUpCourseChart, setUpGenderChart} from "./chart.ts";
import {appContext} from "../../context/app-context.ts";

const ageButton = document.querySelector('#region-chart');
const genderButton = document.querySelector('#gender-chart');
const courseButton = document.querySelector('#course-chart');

ageButton?.addEventListener('click', () => {
    setUpRegionChart();
    appContext.currentChart = 'region';
});

genderButton?.addEventListener('click', () => {
    setUpGenderChart();
    appContext.currentChart = 'gender';
});

courseButton?.addEventListener('click', () => {
    setUpCourseChart();
    appContext.currentChart = 'course';
});
