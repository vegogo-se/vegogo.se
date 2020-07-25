// import React from "react";
// import renderer from "react-test-renderer";
const { getPlaceURIFromRelativePath } = require("../src/helpers");

describe("Place and area file paths", () => {
  it("transforms to URL paths", () => {
    let pathsToUrls = {
      "sweden/stockholm/example-place/index.md":
        "/sweden/stockholm/example-place",
      "sweden/stockholm/mahalo/index.md": "/sweden/stockholm/mahalo",
      "sweden/stockholm/index.md": "/sweden/stockholm",
      "sweden/stockholm/sofo/index.md": "/sweden/stockholm/sofo",
      "sweden/stockholm/södermalm/index.md": "/sweden/stockholm/södermalm",
      "sweden/stockholm/gamla stan/index.md": "/sweden/stockholm/gamla stan",
    };

    for (const [path, url] of Object.entries(pathsToUrls)) {
      expect(getPlaceURIFromRelativePath(path)).toBe(url);
    }

    expect(
      getPlaceURIFromRelativePath("sweden/stockholm/example-place/index.md")
    ).toBe("/sweden/stockholm/example-place");
  });
});
