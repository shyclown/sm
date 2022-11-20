import { Post } from "../../../redux/reducers/posts";

export const sortByDate = (arr: Post[], reverse: boolean) =>
  [...arr].sort(function (a, b) {
    const result =
      new Date(b.created_time).getTime() - new Date(a.created_time).getTime();
    return reverse ? result * -1 : result;
  });
