import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { createTheme } from "./theme";
import { PreferenceProvider, usePreferences } from "./context/PreferenceContext";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClient";

// Inner component so it can read from PreferenceContext before ChakraProvider mounts.
function ThemedApp() {
  const { accentColor, borderRadius } = usePreferences();

  // Re-create the Chakra theme whenever accentColor or borderRadius changes.
  const theme = useMemo(() => createTheme(accentColor, borderRadius), [accentColor, borderRadius]);

  return (
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
        <PreferenceProvider>
          <ThemedApp />
        </PreferenceProvider>
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
);

reportWebVitals();
