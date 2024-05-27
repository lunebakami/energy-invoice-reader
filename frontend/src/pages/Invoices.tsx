import { useEffect, useState } from "react";
import { Invoice } from "./Dashboard";
import api from "../services/api";
import { downloadFile } from "../services/supabase";
import InvoiceCard from "../components/InvoiceCard";

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
      <div className="grid grid-cols-4 gap-4 place-items-center m-8">
        {invoices.map((invoice) => (
            <InvoiceCard invoice={invoice} />
        ))}
      </div>
  );
}
