import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useSignIn from "../../hooks/useSignIn";
import { UserContext } from "../../../base/App";

const SignIn = () => {
  const { user, setUser } = useContext(UserContext);
  const [getUser, setGetUser] = useState<Boolean>(false);
  const [loginData, setLoginData] = useState();
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { data } = useSignIn(loginData, getUser);
  console.log("🚀 ~ file: index.tsx:33 ~ getUser:", getUser);
  console.log("🚀 ~ file: index.tsx:33 ~ data:", data);

  useEffect(() => {
    if (data?.data?.data) {
      localStorage.setItem("user", JSON.stringify(data?.data?.data));
      setUser(data?.data?.data);
      navigate("/", {
        replace: true,
      });
    }
    setGetUser(false);
  }, [data]);

  useEffect(() => {
    if (loginData) {
      setGetUser(true);
    }
  }, [loginData]);

  const onSubmit = (data: any) => {
    setLoginData(data);
  };

  const handleClickRegister = () => {
    navigate("/auth/sign-up", {
      replace: true,
    });
  };

  return (
    <Box
      sx={{ background: theme.palette.common.white }}
      p={2}
      width="fit-content"
      margin="auto"
    >
      <Stack spacing={1}>
        <Typography
          textAlign="center"
          fontSize={"1.2rem"}
          fontWeight={600}
          py={2}
        >
          Sign In To Course Studio
        </Typography>
        <Box width="fit-content">
          <Typography variant="subtitle2" width="fit-content">
            Username
          </Typography>
          <TextField
            size="small"
            {...register("username")}
            variant="outlined"
            sx={{ width: 400 }}
            // rows={3}
          />
        </Box>
        <Box width="fit-content">
          <Typography variant="subtitle2" width="fit-content">
            Password
          </Typography>
          <TextField
            size="small"
            {...register("password")}
            variant="outlined"
            sx={{ width: 400 }}
            type="password"

            // rows={3}
          />
        </Box>
        <Button
          variant="contained"
          sx={{ borderRadius: "99px" }}
          onClick={() => handleSubmit((data: any) => onSubmit(data))()}
        >
          Sign In
        </Button>
        <Stack direction="row" spacing={1}>
          <Typography variant="subtitle2">Do not have account?</Typography>{" "}
          <Typography
            variant="subtitle2"
            color={theme.palette.primary.main}
            sx={{ cursor: "pointer" }}
            onClick={handleClickRegister}
          >
            Register
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SignIn;
