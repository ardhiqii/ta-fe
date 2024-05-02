import { formatCurrency } from "react-native-format-currency";

const format = (value) =>{
  if (value === "") {
    value = 0;
  }
  value = parseInt(value, 10);
  const data = formatCurrency({ amount: value, code: "IDR" });
  const splitData = data[1].split(",");
  const formatted = splitData.join(".");
  return formatted;
}

export const Currency = {
  format
}