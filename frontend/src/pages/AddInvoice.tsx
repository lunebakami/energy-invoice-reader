import { FormEvent, useState } from "react";
import api from "../services/api";
import { deleteFile, uploadFile } from "../services/supabase";
import { useNavigate } from "react-router-dom";

export default function AddInvoice() {
  const [file, setFile] = useState<File>();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!file) {
      alert("Adicione um arquivo!");
      return;
    }

    const { success } = await uploadFile(file);

    if (!success) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await api.post("/invoice", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.status === 200) {
        return navigate("/");
      } else {
        await deleteFile(file.name);
        alert("Erro ao adicionar fatura!");
      }
    } catch (error) {
      alert("Erro!");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="invoice"
      >
        Upload Fatura
      </label>
      <input
        type="file"
        onChange={(e) => e.target.files && setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby="invoice_help"
        id="invoice"
      />
      <div
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="invoice_help"
      >
        Adicione um arquivo .pdf
      </div>
      <button
        type="submit"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Adicionar Fatura
      </button>
    </form>
  );
}
