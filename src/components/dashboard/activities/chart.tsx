import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    Filler,
    ScriptableContext,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useMemo } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export const options = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                precision: 0,
            },
        },
    },
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        }
    },
};

const labels = ['JAN', 'FEB', 'MAR', 'APR', 'May', 'JUN'];

type ChartProps = {
    data: Record<string, number>
}

function getChartData(data: { labels: string[], data: number[] }): ChartData<"line", number[], string> {
    return {
        labels: data.labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: data.data,
                tension: 0.4,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: (context: ScriptableContext<"line">) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 700);
                    gradient.addColorStop(0, "#FFD0D0");
                    gradient.addColorStop(1, "#FDD6D600");
                    return gradient;
                },
                fill: true,
            }
        ],
    };
}

export function Chart(props: ChartProps) {
    const { data } = props

    const chartData = useMemo(() => formatDataForChart(data), [JSON.stringify(data)])

    return <Line options={options} data={getChartData(chartData)} />;
}


function formatDataForChart(_inputData: Record<string, number>): { labels: string[], data: number[] } {
    const labels: string[] = [];
    const data: number[] = [];
    const inputData: Record<string, number> = {};

    // Update key-value pairs with the provided updated values
    for (const key in _inputData) {
        inputData[formatDateToDayOfWeek(key)] = _inputData[key]
    }

    const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    daysOfWeek.forEach(day => {
        if (inputData.hasOwnProperty(day)) {
            labels.push(day);
            data.push(inputData[day]);
        } else {
            labels.push(day);
            data.push(0);
        }
    });

    return { labels, data };
}

function formatDateToDayOfWeek(inputDate: string): string {
    const date = new Date(inputDate);
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const dayIndex = date.getUTCDay();
    const dayOfWeek = dayNames[dayIndex];

    return dayOfWeek;
}