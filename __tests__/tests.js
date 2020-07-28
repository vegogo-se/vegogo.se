// import React from "react";
// import renderer from "react-test-renderer";
const {
  getPlaceURIFromRelativePath,
  getInfoFromPath,
} = require("../src/helpers");

describe("Place and area file paths", () => {
  it("transforms to URL paths", () => {
    let pathsToUrls = {
      "sweden/stockholm/example-place/index.md":
        "/sweden/stockholm/example-place",
      "sweden/stockholm/mahalo/index.md": "/sweden/stockholm/mahalo",
      "sweden/stockholm/Mahalo/index.md": "/sweden/stockholm/mahalo",
      "sweden/stockholm/index.md": "/sweden/stockholm",
      "sweden/stockholm/sofo/index.md": "/sweden/stockholm/sofo",
      "sweden/stockholm/södermalm/index.md": "/sweden/stockholm/sodermalm",
      "sweden/stockholm/gamla stan/index.md": "/sweden/stockholm/gamla-stan",
    };

    for (const [path, url] of Object.entries(pathsToUrls)) {
      expect(getPlaceURIFromRelativePath(path)).toBe(url);
    }
  });
});

describe("Place and area info from URL", () => {
  it("transforms to URL paths", () => {
    let pathsToObjects = {
      "/sweden/stockholm/example-place": {
        country: "sweden",
        city: "stockholm",
        placeOrArea: "example-place",
      },
      "/sweden/stockholm/sodermalm": {
        country: "sweden",
        city: "stockholm",
        placeOrArea: "sodermalm",
      },
    };

    for (const [path, obj] of Object.entries(pathsToObjects)) {
      expect(getInfoFromPath(path)).toMatchObject(obj);
    }
  });
});
