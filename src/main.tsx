import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { Provider } from "react-redux";

import "./index.css";
import App from "./app/App.tsx";
import client from "./shared/api/apolloClient.ts";
import { store } from "./app/store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
);
