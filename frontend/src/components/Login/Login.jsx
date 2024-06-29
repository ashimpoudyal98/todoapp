import {
  FormContainer,
  FormTitle,
  LoginDiv,
  Spanup,
  StyledButton,
  StyledTextField,
} from "./LoginStyled";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginMutation } from "../Api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: loginMutation,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("Success");
      navigate("/");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    mutate(data);
  };

  return (
    <LoginDiv>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormTitle variant="h1">Login</FormTitle>

        <StyledTextField
          label="Username"
          variant="outlined"
          {...register("username", {
            required: "Username is required",
          })}
          error={!!errors.username}
          helperText={errors.username && errors.username.message}
        />
        <StyledTextField
          label="Password"
          type="password"
          variant="outlined"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password && errors.password.message}
        />

        <p>
          Dont have an account?{" "}
          <Spanup onClick={() => navigate("/signup")}>Register Here</Spanup>
        </p>

        <StyledButton type="submit" variant="contained" disableElevation>
          {isLoading ? "Logging in ...." : "Login"}
        </StyledButton>
      </FormContainer>
    </LoginDiv>
  );
};

export default Login;
