import { ApolloProvider } from "@apollo/client";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "normalize.css/normalize.css";
import { render } from "react-dom";
import { BrowserRouter as Router} from "react-router-dom";
import { RecoilRoot } from "recoil";
import { createGlobalStyle } from "styled-components";

import apolloClient from "#root/api/apolloClient";
import Root from "#root/components/Root";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  html, body, #app {
    height: 100%;
    width: 100%;
  }
`;

render(
  <ApolloProvider client={apolloClient}>
    <RecoilRoot>
      <Router>
        <GlobalStyle />
        <Root />
      </Router>
    </RecoilRoot>
  </ApolloProvider>, 
  document.getElementById("app")
);