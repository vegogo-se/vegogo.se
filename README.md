# Vegogo 🥕🥑🍔

The new guide ⚡️Curated and inspirational ⚡️The best vegan places to eat ⚡️Near you.

The guide will launch soon at [Vegogo.se](https://vegogo.se).

## Tekniker och allmän översikt

- Gatsby JS för att bygga.
- GraphQL för att hämta data.
- Platser som markdown-dokument i
  - `markdown-pages`,
  - `markdown-places, samt
  - `markdown-areas`.
- Google Place ID används för att hitta adress, geolocation, öppettider för en plats. Använd denna sida för att hitta Place ID för en plats: 
https://developers.google.com/places/place-id.

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

- `/sweden/stockholm/södermalm`
- `/sweden/stockholm/sofo`

## Todo

- Använd Google Place ID för att hämta: adress, öppettider, geolocation
- Skapa sidor för areas.
- Används index.md till något vettigt?
- Få in platser och areas.
- filsystem: city/plats, t.ex. stockholm/mahalo.md
- Använda https://www.gatsbyjs.org/packages/gatsby-plugin-json-output/?=json för att få ut JSON med alla platser, typ api som vi kan använda för geolocation-saker
- Använda https://github.com/Creatiwity/gatsby-plugin-favicon för favicon?
