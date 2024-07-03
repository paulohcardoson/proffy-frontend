import React, { useEffect } from "react";
import { isExpired } from "react-jwt";
import "./global.css";

// Hooks
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { authActions } from "./redux/states/auth";

// Components
import Routes from "./routes";

const App: React.FC = () => {
	// Redux Hooks
	const auth = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!auth.isAuthenticated) return;

		if (!auth.profile || !auth.token || isExpired(auth.token)) {
			dispatch(authActions.logOut());
			return;
		}
	}, []);

	return <Routes />;
};

export default App;
