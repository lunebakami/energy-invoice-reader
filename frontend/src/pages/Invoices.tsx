import { useEffect, useState } from "react";
import { Invoice } from "./Dashboard";
import api from "../services/api";
import { downloadFile } from "../services/supabase";

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  async function loadInvoices() {
    const { data } = await api.get("/invoice");

    setInvoices(data.invoices);
  }

  useEffect(() => {
    loadInvoices();
  }, []);

  return (
    <div>
      <h1> Invoices </h1>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            <span> Date: {invoice.month} </span>

            <a
              href={downloadFile(invoice.file_name)}
              download
            >
              <button> Download </button>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
