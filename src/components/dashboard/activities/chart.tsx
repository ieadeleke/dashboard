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
import { faker } from '@faker-js/faker';

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

export const data: ChartData<"line", number[], string> = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: 5, max: 100 })),
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
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: 5, max: 100 })),
            tension: 0.4,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: (context: ScriptableContext<"line">) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 700);
                gradient.addColorStop(0, "#EAE8FB");
                gradient.addColorStop(1, "#EAE8FB00");
                return gradient;
            },
            fill: true
        },
    ],
};

export function Chart() {
    return <Line options={options} data={data} />;
}
