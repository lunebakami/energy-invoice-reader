import { FormEvent, useState } from "react";
import api from "../services/api";
import { uploadFile } from "../services/supabase";
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
        alert("Erro ao adicionar fatura!");
      }
    } catch (error) {
      alert("Erro!");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => e.target.files && setFile(e.target.files[0])}
      />
      <button type="submit">Adicionar Fatura</button>
    </form>
  );
}
