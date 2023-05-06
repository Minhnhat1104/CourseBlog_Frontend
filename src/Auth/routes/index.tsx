import { Navigate } from "react-router-dom";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import UserInfoPage from "../pages/UserInfo";

const Routes = {
  path: "/auth",
  children: [
    {
      index: true,
      element: <Navigate to="/auth/sign-in" />,
    },
    {
      path: "/auth/sign-in",
      element: <SignInPage />,
    },
    {
      path: "/auth/sign-up",
      element: <SignUpPage />,
    },
    {
      path: "/auth/user-info",
      element: <UserInfoPage />,
    },
  ],
};
export default Routes;
