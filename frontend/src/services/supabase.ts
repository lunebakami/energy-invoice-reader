import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export const uploadFile = async (file: File) => {
  let success = false;
  const { error } = await supabase.storage
    .from("invoices")
    .upload(`${file.name}`, file);

  if (error) {
    alert("Error uploading file: " + error.message);
  } else {
    alert("File uploaded successfully");
    success = true;
  }

  return { success };
};

export const deleteFile = async (filename: string) => {
  let success = false;
  const { error } = await supabase.storage.from("invoices").remove([filename]);

  if (error) {
    console.log("Error deleting file: " + error.message);
  } else {
    success = true;
  }

  return { success };
}

export const downloadFile = (filename: string) => {
  const { data } = supabase.storage
    .from("invoices")
    .getPublicUrl(filename, {
      download: true,
    });

  return data.publicUrl;
};
