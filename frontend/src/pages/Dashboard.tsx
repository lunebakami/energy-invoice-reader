import { useEffect, useState } from "react";
import api from "../services/api";
import Chart from "../components/Chart";
import { Link } from "react-router-dom";

export type Invoice = {
  id: string;
  client_number: string;
  month: string;
  eletric_energy: number;
  eletric_energy_value: number;
  sceee_energy: number;
  sceee_energy_value: number;
  compensated_energy: number;
  compensated_energy_value: number;
  public_ilumination: number;
  file_name: string;
};

export default function Dashboard() {
  const [invoices, setInvoices] = useState([]);

  async function loadInvoices() {
    const result = await api.get("/invoice");

    setInvoices(result.data.invoices);
  }

  useEffect(() => {
    loadInvoices();
  }, []);

  return (
    <>
      <div className="w-100 flex justify-end pt-4 pr-4">
        <Link to="add-invoices">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Add Invoice
          </button>
        </Link>{" "}
      </div>
      <div className="w-full p-10">
        <Chart invoices={invoices} />
      </div>
    </>
  );
}
