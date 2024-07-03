import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Landing from "@pages/Landing";
import TeacherList from "@pages/TeacherList";
import TeacherForm from "@pages/TeacherForm";
import Register from "@base/pages/Register";
import Login from "@base/pages/Login";
import Profile from "@base/pages/Profile";
import ForgotPassword from "@base/pages/ForgotPassword";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Landing />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/forgot-password",
		element: <ForgotPassword />,
	},
	{
		path: "/profile/me",
		element: <Profile />,
	},
	{
		path: "/study",
		element: <TeacherList />,
	},
	{
		path: "/give-classes",
		element: <TeacherForm />,
	},
]);

const Routes: React.FC = () => <RouterProvider {...{ router }} />;

export default Routes;
