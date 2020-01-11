import React from "react";
import TextPage from "../components/TextPage";

const FourOhFourPage = props => {
  const html = `
      <p>We could not find that page.</p>
      <p>Sorry about that. <code>¯\\_(ツ)_/¯</code></p>
    `;

  return <TextPage title="Page not found" html={html}></TextPage>;
};

export default FourOhFourPage;
