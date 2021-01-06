/* eslint-disable react/no-danger */

import React from "react";
import { JssProvider } from "react-jss";
import { SheetsRegistry } from "jss";
import getPageContext from "./src/getPageContext";
import { createGenerateClassName } from "@material-ui/core/styles";

import Layout from "./src/layout";
import Root from "./src/root";

let sheets = new SheetsRegistry();

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <style
      type="text/css"
      id="server-side-jss"
      key="server-side-jss"
      dangerouslySetInnerHTML={{ __html: sheets.toString() }}
    />,
  ]);

  // Re-instantiate sheets, so that it isn't reused:
  sheets = new SheetsRegistry();
};

export function wrapPageElement({ element, props }) {
  // return <Layout {...props}>{element}</Layout>;
  return element;
}

// eslint-disable-next-line react/prop-types
export function wrapRootElement({ element }) {
  // Get the context of the page to collected side effects.
  const muiPageContext = getPageContext();

  // The standard class name generator.
  const generateClassName = createGenerateClassName();

  return (
    <JssProvider registry={sheets} generateClassName={generateClassName}>
      <Root muiPageContext={muiPageContext}>{element}</Root>
    </JssProvider>
  );
}
