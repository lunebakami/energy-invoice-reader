export const checkUsefulLocation = (x: number, y: number): string | boolean => {
  const usefulLocations = new Map([
    ["12.725/14.856", "eletric_energy"],
    ["18.847/14.856", "eletric_energy_value"],
    ["12.725/15.456", "sceee_energy"],
    ["18.847/15.456", "sceee_energy_value"],
    ["12.725/16.056", "compensated_energy"],
    ["18.822/16.056", "compensated_energy_value"],
    ["18.725/16.656", "public_ilumination"],
    ["14.809/3.9219999999999997", "month"],
    ["0.634/9.272", "client_number"],
  ]);

  const index = `${x}/${y}`;

  if (usefulLocations.has(index)) {
    return usefulLocations.get(index)!;
  }

  return false;
};

