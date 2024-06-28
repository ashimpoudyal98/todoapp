import React from "react";
import {
  FormContainer,
  FormTitle,
  LoginDiv,
  Spanup,
  StyledButton,
  StyledTextField,
} from "./LoginStyled";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <LoginDiv>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormTitle variant="h1">Create an Account</FormTitle>

        <StyledTextField
          label="Email"
          variant="outlined"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
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
          Don't have an account? <Spanup>Register Here</Spanup>
        </p>

        <StyledButton type="submit" variant="contained" disableElevation>
          Sign Up
        </StyledButton>
      </FormContainer>
    </LoginDiv>
  );
};

export default Login;
