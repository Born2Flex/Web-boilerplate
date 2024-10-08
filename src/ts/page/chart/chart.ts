import { Chart } from 'chart.js/auto';
import { appContext } from "../../context/app-context.ts";
import { regions } from "../../operations/filtering.ts";
import _ from 'lodash';

const chartElem = document.querySelector("#chart") as HTMLCanvasElement;

const countByAttribute = (data, attribute) => _.countBy(data, attribute);

export const setUpRegionChart = () => {
    clearChart();
    const regionCounts = _.mapValues(regions, () => 0);

    appContext.getDisplayedTeachers().forEach(person => {
        _.forOwn(regions, (countries, region) => {
            if (countries.includes(person.country)) {
                regionCounts[region]++;
            }
        });
    });

    appContext.chart = new Chart(chartElem, {
        type: 'doughnut',
        data: {
            labels: _.keys(regionCounts),
            datasets: [{
                label: 'Region Distribution',
                data: _.values(regionCounts),
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }]
        },
    });
    appContext.chart.update();
};

export const setUpGenderChart = () => {
    clearChart();
    const genderCounts = countByAttribute(appContext.getDisplayedTeachers(), 'gender');
    appContext.chart = new Chart(chartElem, {
        type: 'pie',
        data: {
            labels: _.keys(genderCounts),
            datasets: [{
                label: 'Gender Distribution',
                backgroundColor: ['#3e95cd', '#8e5ea2'],
                data: _.values(genderCounts)
            }]
        },
    });
    appContext.chart.update();
};

export const setUpCourseChart = () => {
    clearChart();
    const courseCounts = countByAttribute(appContext.getDisplayedTeachers(), 'course');
    appContext.chart = new Chart(chartElem, {
        type: 'bar',
        data: {
            labels: _.keys(courseCounts),
            datasets: [{
                label: 'Course Distribution',
                backgroundColor: '#3cba9f',
                data: _.values(courseCounts)
            }]
        },
    });
    appContext.chart.update();
};

export function updateChart() {
    switch (appContext.currentChart) {
        case 'age':
            setUpRegionChart();
            break;
        case 'gender':
            setUpGenderChart();
            break;
        default:
            setUpCourseChart();
    }
}

function clearChart() {
    if (appContext.chart) {
        appContext.chart.destroy();
    }
}
