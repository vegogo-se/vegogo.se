# Vegogo 🥕🥑🍔

The new guide ⚡️Curated and inspirational ⚡️The best vegan places to eat ⚡️Near you.

The guide will launch soon at [Vegogo.se](https://vegogo.se).

## Tekniker och allmän översikt

- Design in Figma: https://www.figma.com/file/RWg83dFW9fejBJV4S4GLc5mP/Vegogo-2019?node-id=127%3A304
- Node version 10. Kör `nvm use` i mappen för att byta till rätt version. Gatsby verkar låsa sig vid build om t.ex. Node 12 används.
- Gatsby JS för att bygga.
- GraphQL för att hämta data.
- Platser som markdown-dokument i
  - `markdown-pages`,
  - `markdown-places`, samt
  - `markdown-areas`.
- Google Place ID används för att hitta adress, geolocation, öppettider för en plats. Använd denna sida för att hitta Place ID för en plats:
  https://developers.google.com/places/place-id.
- [Tailwind CSS](https://tailwindcss.com/docs/) for CSS utilities.
- [styled-jsx](https://github.com/zeit/styled-jsx) for CSS.

## URL-struktur

### Place

A place is a restaurant or a café.
URL:s are created using the following pattern:

`/<country>/<city>/<location>`

Examples:

- `/sweden/stockholm/mahalo`
- `/sweden/stockholm/omnipollos-hatt`

### Areas

An area is an area in a city.
URL:s are created using the following pattern:

`/<country>/<city>/<area>`

Examples:

- `/sweden/stockholm/`
- `/sweden/stockholm/södermalm`
- `/sweden/stockholm/sofo`

## Todo

- Pågår: Gör sidhuvud i tailwind
  - animerad burger
- Skapa sidor https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/
- Använda https://www.gatsbyjs.org/packages/gatsby-plugin-json-output/?=json för att få ut JSON med alla platser, typ api som vi kan använda för geolocation-saker
- Använda https://github.com/Creatiwity/gatsby-plugin-favicon för favicon?
- https://www.gatsbyjs.org/docs/adding-search-with-js-search/
