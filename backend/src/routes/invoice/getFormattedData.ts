import { getFormattedMonth } from "./getFormattedMonth";
import { GenericObject } from ".";

export const getFormattedData = (invoiceData: GenericObject<string, string>) => {
  const formattedMonth = getFormattedMonth(invoiceData.month);

  return {
    eletric_energy: Number(invoiceData.eletric_energy),
    eletric_energy_value: parseFloat(
      invoiceData.eletric_energy_value?.replace(",", ".")
    ),
    sceee_energy: Number(invoiceData.sceee_energy),
    sceee_energy_value: parseFloat(
      invoiceData.sceee_energy_value?.replace(",", ".")
    ),
    compensated_energy: Number(invoiceData.compensated_energy),
    compensated_energy_value: parseFloat(
      invoiceData.compensated_energy_value?.replace(",", ".")
    ),
    month: formattedMonth,
    public_ilumination: parseFloat(
      invoiceData.public_ilumination?.replace(",", ".")
    ),
    client_number: invoiceData.client_number.split(" ")[0],
    file_name: invoiceData.file_name,
  };
};

