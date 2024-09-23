export default function (authors: string[]) {
  return authors.length <= 2
    ? authors.join(" and ")
    : `${authors.slice(0, -1).join(", ")}, and ${authors.at(-1)}`;
}
