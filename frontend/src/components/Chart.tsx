import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Invoice } from "../pages/Dashboard";

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const energyOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Energia (kWh)",
    },
  },
};

const monetaryOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Valores Monetários (R$)",
    },
  },
};

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
};

export default function Chart({ invoices }: { invoices: Invoice[] }) {
  const [energyChartData, setEnergyChartData] = useState<ChartData>({
    labels,
    datasets: [],
  });
  const [monetaryChartData, setMonetaryChartData] = useState<ChartData>({
    labels,
    datasets: [],
  });

  useEffect(() => {
    const energyData = {
      labels,
      datasets: [
        {
          label: "Consumo de Energia Elétrica (kWh)",
          data: invoices.map(
            (invoice: Invoice) => invoice.eletric_energy + invoice.sceee_energy,
          ),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Energia Compensada (kWh)",
          data: invoices.map(
            (invoice: Invoice) =>
              invoice.compensated_energy + invoice.sceee_energy,
          ),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };

    const monetaryData = {
      labels,
      datasets: [
        {
          label: "Valor Total sem GD (R$)",
          data: invoices.map(
            (invoice: Invoice) =>
              invoice.eletric_energy_value +
              invoice.sceee_energy_value +
              invoice.public_ilumination,
          ),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Economia GD (R$)",
          data: invoices.map(
            (invoice: Invoice) => invoice.compensated_energy_value,
          ),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };

    setEnergyChartData(energyData);
    setMonetaryChartData(monetaryData);
  }, [invoices]);

  return (
    <div>
      <Line options={energyOptions} data={energyChartData} />
      <Line options={monetaryOptions} data={monetaryChartData} />
    </div>
  );
}
