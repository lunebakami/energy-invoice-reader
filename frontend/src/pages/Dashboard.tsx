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
      <h1> Infos </h1>
      <div>
        <button>
          {" "}
          <Link to="add-invoices"> Add Invoice </Link>{" "}
        </button>
      </div>
      <div>
        <Chart invoices={invoices} />
      </div>
    </>
  );
}
