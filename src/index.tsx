import React from "react";
import ReactDOM from "react-dom/client";
import Modal from "react-modal";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import store from "./redux/store";
import persistStore from "redux-persist/es/persistStore";

Modal.setAppElement("#root");

// Redux Persist
const persistor = persistStore(store);

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);

root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>

		<ToastContainer />
	</Provider>,
);
