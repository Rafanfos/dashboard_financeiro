"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "react-toastify/dist/ReactToastify.css";
import {
  Wrapper,
  LoginBox,
  Title,
  Form,
  Label,
  Button,
  PasswordWrapper,
} from "./styles";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const onSubmit = (data: LoginFormInputs) => {
    if (data.email === "test@mail.com" && data.password === "123456") {
      toast.success("Login efetuado com sucesso!");
      setTimeout(() => router.push("/dashboard"), 1500);
    } else {
      toast.error("Email ou senha inválidos");
    }
  };

  return (
    <Wrapper>
      <LoginBox>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Label>Email</Label>
          <TextField
            type="email"
            fullWidth
            variant="outlined"
            {...register("email", { required: "Email é obrigatório" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <Label>Senha</Label>
          <PasswordWrapper>
            <TextField
              {...register("password", { required: "Senha é obrigatória" })}
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </PasswordWrapper>

          <Button type="submit">Entrar</Button>
        </Form>
      </LoginBox>
      <ToastContainer />
    </Wrapper>
  );
}
