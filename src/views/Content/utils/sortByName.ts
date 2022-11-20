export const sortByName = (arr: string[]) =>
  [...arr].sort(function (a, b) {
    return a.localeCompare(b);
  });
