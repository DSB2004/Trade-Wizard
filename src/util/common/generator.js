import { months } from "../../asset/static/dashboard";

export function generateMonthArray() {
  const currentMonth = new Date().getMonth();
  const lastYear = new Date().getFullYear() - 1;

  const result = [];

  for (let i = currentMonth + 7; i <= currentMonth + 12; i++) {
    const monthIndex = i % 12;
    const year = lastYear + Math.floor(i / 12);

    const monthName = months[monthIndex];
    const formattedMonth = `${monthName} ${year.toString().slice(-2)}`;

    result.push(formattedMonth);
  }

  return result;
}
