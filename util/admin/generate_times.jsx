export const generateTimes = (start, end, date) => {
  const times = [];
  const splitStart = start.split(":");
  const sHour = parseInt(splitStart[0]);
  const sMinute = parseInt(splitStart[1]);
  const sDate = !!date ? new Date(date) : new Date();
  sDate.setHours(sHour, sMinute, 0, 0);

  const splitEnd = end.split(":");
  const eHour = parseInt(splitEnd[0]);
  const eMinute = parseInt(splitEnd[1]);

  const eDate = new Date(sDate.getTime());
  if (eHour === 0) {
    eDate.setDate(eDate.getDate() + 1); // Move to the next day if end time is 00:xx
  }
  eDate.setHours(eHour, eMinute, 0, 0);

  let curr = new Date(sDate.getTime());

  while (curr < eDate) {
    const next = new Date(curr.getTime());
    next.setHours(next.getHours() + 1, 0, 0, 0);

    if (next > eDate) {
      next.setTime(eDate.getTime()); // Ensure we don't overshoot the end time
    }

    const value = `${curr.toString()}UNTIL${next.toString()}`;

    times.push(value);
    curr = next;
  }
  return times;
};


const convertedTime = (date) => {
  const fromDate = new Date(date);
  let formattedHour =
    fromDate.getHours() < 10
      ? `0${fromDate.getHours()}`
      : `${fromDate.getHours()}`;
  let formattedMinute =
    fromDate.getMinutes() < 10
      ? `0${fromDate.getMinutes()}`
      : `${fromDate.getMinutes()}`;
  const formatted = `${formattedHour}:${formattedMinute}`;
  return formatted;
};
