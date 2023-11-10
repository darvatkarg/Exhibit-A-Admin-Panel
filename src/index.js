/**
 * Create React App entry point. This and `public/index.html` files can not be
 * changed or moved.
 */
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import * as _redux from "./redux";
import store, { persistor } from "./redux/store";
import App from "./app/App";
import "./index.scss"; // Standard version
// import "./sass/style.react.rtl.css"; // RTL version
import "./_metronic/_assets/plugins/keenthemes-icons/font/ki.css";
import "socicon/css/socicon.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./_metronic/_assets/plugins/flaticon/flaticon.css";
import "./_metronic/_assets/plugins/flaticon2/flaticon.css";
// import "../../node_modules/react-dropzone-component/styles/filepicker.css";
// import "../../node_modules/dropzone/dist/min/dropzone.min.css";
import "../node_modules/react-dropzone-component/styles/filepicker.css";
import "../node_modules/dropzone/dist/min/dropzone.min.css";
// Datepicker
import "react-datepicker/dist/react-datepicker.css";
import {
  MetronicLayoutProvider,
  MetronicSplashScreenProvider,
  MetronicSubheaderProvider,
} from "./_metronic/layout";
import { MetronicI18nProvider } from "./_metronic/i18n";
import { Providers } from '@microsoft/mgt-element';
import { Msal2Provider } from '@microsoft/mgt-msal2-provider';
/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env;

// /**
//  * Creates `axios-mock-adapter` instance for provided `axios` instance, add
//  * basic Metronic mocks and returns it.
//  *
//  * @see https://github.com/ctimmerm/axios-mock-adapter
//  */
// /* const mock = */ _redux.mockAxios(axios);

// /**
//  * Inject metronic interceptors for axios.
//  *
//  * @see https://github.com/axios/axios#interceptors
//  */
// _redux.setupAxios(axios, store);;

Providers.globalProvider = new Msal2Provider({
  clientId: '34705bd0-92f6-4ac4-9da1-72e9b30c4011',
  scopes: ['email', 'OnlineMeetings.Read', 'OnlineMeetings.ReadWrite', 'openid', 'profile', 'Schedule.Read.All', 'Schedule.ReadWrite.All', 'User.Read'],
  redirectUri: 'http://localhost:3000',
  authority: 'https://login.microsoftonline.com/e319ee55-1597-4220-9749-d2df6f8e2778',


});
ReactDOM.render(
  <MetronicI18nProvider>
    <MetronicLayoutProvider>
      <MetronicSubheaderProvider>
        <MetronicSplashScreenProvider>
          <App store={store} persistor={persistor} basename={PUBLIC_URL} />
        </MetronicSplashScreenProvider>
      </MetronicSubheaderProvider>
    </MetronicLayoutProvider>
  </MetronicI18nProvider>,
  document.getElementById("root")
);
