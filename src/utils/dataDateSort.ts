// File: /src/utils/dateSorters.js

export const sortByDateDesc = (data: any, dateField: string) => {
  return data.sort((a: any, b: any) => {
    const dateA = parseDate(a[dateField]);
    const dateB = parseDate(b[dateField]);
    return dateB - dateA;
  });
};

const parseDate = (dateString: string) => {
  if (!dateString) return 0;
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("-");
  return new Date(
    `${year}-${month}-${day}T${timePart || "00:00:00"}`
  ).getTime();
};
