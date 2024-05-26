export const getFormattedMonth = (month: string) => {
  const fullMonth = month.slice(0, 8);

  const [literalMonth, year] = fullMonth.split("/");

  let monthNumber = "01";
  switch (literalMonth) {
    case "JAN":
      monthNumber = "01";
      break;
    case "FEV":
      monthNumber = "02";
      break;
    case "MAR":
      monthNumber = "03";
      break;
    case "ABR":
      monthNumber = "04";
      break;
    case "MAI":
      monthNumber = "05";
      break;
    case "JUN":
      monthNumber = "06";
      break;
    case "JUL":
      monthNumber = "07";
      break;
    case "AGO":
      monthNumber = "08";
      break;
    case "SET":
      monthNumber = "09";
      break;
    case "OUT":
      monthNumber = "10";
      break;
    case "NOV":
      monthNumber = "11";
      break;
    case "DEZ":
      monthNumber = "12";
      break;
    default:
      break;
  }

  return `${monthNumber}/${year}`;
};

