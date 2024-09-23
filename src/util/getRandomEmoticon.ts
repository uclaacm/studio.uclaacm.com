const emoticons = {
  sad: `
( ≧Д≦)
((´д｀))
(∩︵∩)
(▰˘︹˘▰)
（ｉДｉ）
(‘A\`)
(︶︹︺)
╥﹏╥
`
    .trim()
    .split("\n"),
};

export type GetRandomEmoticonParams = {
  emotion: keyof typeof emoticons;
};

export default function ({ emotion }: GetRandomEmoticonParams) {
  const list = emoticons[emotion];
  return list[Math.floor(Math.random() * list.length)];
}
