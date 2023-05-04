import React from "react";
import logo from "./logo.svg";
import { Box, Button, useTheme } from "@mui/material";
import Header from "../Header";
import Footer from "../Footer";
import { Navigate, useRoutes } from "react-router-dom";
import {} from "react-router-dom";
import { default as CourseRoute } from "../../Course/routes";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      children: [
        CourseRoute,
        {
          index: true,
          element: <Navigate to="course" />,
        },
      ],
    },
  ]);

  return (
    <Box minHeight={"100vh"}>
      <Header />
      <Box p={6} minHeight={"calc(100vh - 86px)"}>
        {routes}
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
