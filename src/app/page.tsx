"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const onSubmit = (data: LoginFormInputs) => {
    if (data.email === "test@mail.com" && data.password === "123456") {
      toast.success("Login efetuado com sucesso!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } else {
      toast.error("Email ou senha inválidos");
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            {...register("email", { required: "Email é obrigatório" })}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label>Senha:</label>
          <br />
          <input
            type="password"
            {...register("password", { required: "Senha é obrigatória" })}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit" style={{ marginTop: "1rem" }}>
          Entrar
        </button>
      </form>

      <ToastContainer />
    </main>
  );
}

