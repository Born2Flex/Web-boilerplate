import {Chart} from 'chart.js/auto'
import {appContext} from "../../context/app-context.ts";
import {regions} from "../../operations/filtering.ts";

const chartElem = document.querySelector("#chart") as HTMLCanvasElement;

const countByAttribute = (data, attribute) => {
    return data.reduce((acc, item) => {
        acc[item[attribute]] = (acc[item[attribute]] || 0) + 1;
        return acc;
    }, {});
};

export const setUpAgeChart = () => {
    clearChart();
    const regionCounts = {
        'Europe': 0,
        'Asia': 0,
        'America': 0
    };

    appContext.getDisplayedTeachers().forEach(person => {
        for (let region in regions) {
            if (regions[region].includes(person.country)) {
                regionCounts[region]++;
            }
        }
    });

    appContext.chart = new Chart(chartElem, {
        type: 'doughnut',
        data: {
            labels: Object.keys(regionCounts),
            datasets: [{
                label: 'Region Distribution',
                data: Object.values(regionCounts),
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
            labels: Object.keys(genderCounts),
            datasets: [{
                label: 'Gender Distribution',
                backgroundColor: ['#3e95cd', '#8e5ea2'],
                data: Object.values(genderCounts)
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
            labels: Object.keys(courseCounts),
            datasets: [{
                label: 'Course Distribution',
                backgroundColor: '#3cba9f',
                data: Object.values(courseCounts)
            }]
        },
    });
    appContext.chart.update();
};

export function updateChart() {
    if (appContext.currentChart === 'age') {
        setUpAgeChart();
    } else if (appContext.currentChart === 'gender') {
        setUpGenderChart();
    } else {
        setUpCourseChart();
    }
}

function clearChart() {
    if (appContext.chart) {
        appContext.chart.destroy();
    }
}

