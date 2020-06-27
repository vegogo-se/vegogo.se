export function highlightWords(html) {
  const words = [
    {
      word: "lorem",
      class: "bg-orange-400",
    },
    {
      word: "Lorem",
      class: "bg-orange-400",
    },
    {
      word: "raw food",
      class: "bg-orange-400",
    },
    {
      word: "Dolorem nihil",
      class: "bg-orange-400",
    },
    {
      word: "beans",
      class: "bg-orange-200",
    },
    {
      word: "consequatur",
      class: "bg-pink-300",
    },
    {
      word: "voluptate",
      class: "bg-pink-300",
    },
    {
      word: "salad",
      class: "bg-pink-300",
    },
    {
      word: "tofu",
      class: "bg-green-300",
    },
    {
      word: "hamburger",
      class: "bg-gray-300",
    },
  ];

  words.forEach((wordOptions) => {
    // Use split + join to search and replace text.
    // Solution from https://stackoverflow.com/a/500144
    html = html
      .split(` ${wordOptions.word} `)
      .join(
        ` <mark class='mark ${wordOptions.class}'>${wordOptions.word}</mark> `
      );
    return html;
  });

  return html;
}
