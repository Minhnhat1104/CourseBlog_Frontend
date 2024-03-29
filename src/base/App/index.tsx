import React, { createContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import { Box, Button, Stack, useTheme } from "@mui/material";
import Header from "../Header";
import Footer from "../Footer";
import { Navigate, useRoutes } from "react-router-dom";
import {} from "react-router-dom";
import CourseRoute from "../../Course/routes";
import AuthRoute from "../../Auth/routes";
import homeImage from "../assets/homeBackground.png";
import { User, UserContextValue } from "../types";

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
});

function App() {
  const [user, setUser] = useState<User | null>(null);

  const childrenRoute = user
    ? [
        CourseRoute,
        AuthRoute,
        {
          index: true,
          element: <Navigate to={"/course"} />,
        },
      ]
    : [
        AuthRoute,
        {
          index: true,
          element: <Navigate to={"auth/sign-in"} />,
        },
      ];

  const routes = useRoutes([
    {
      path: "/",
      // children: [
      //   CourseRoute,
      //   AuthRoute,
      //   {
      //     index: true,
      //     element: <Navigate to={user ? "/course" : "auth/sign-in"} />,
      //   },
      // ],
      children: childrenRoute,
    },
  ]);

  // Get user from local storage on mount
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const storedUser = JSON.parse(userJson);
      setUser(storedUser);
    }
  }, []);

  const theme = useTheme();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Stack height={"100vh"}>
        <Header />
        <Box
          p={4}
          sx={{
            backgroundImage: `url(${homeImage})`,
            overflowY: "scroll",
            height: "calc(100vh - 86px)",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            flex: 1,
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* Edge */,
          }}
        >
          {routes}
        </Box>
        <Footer />
      </Stack>
    </UserContext.Provider>
  );
}

export default App;
