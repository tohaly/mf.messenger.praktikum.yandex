export const range = (start: number, end?: number, step = 1): number[] => {
  const arr: number[] = [];
  let counter = !end ? 0 : start;

  if (start === 0 && end === undefined) {
    return arr;
  }

  if (start < 0) {
    step = -1;
  }

  if (end === undefined) {
    end = start;
  }

  while (Math.abs(counter) < Math.abs(end)) {
    if (step !== 0) {
      arr.push(counter);
      counter = counter + step;
    } else {
      arr.push(start);
      counter += 1;
    }
  }
  return arr;
};
