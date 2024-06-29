import React from "react";
import {
  FormContainer,
  FormTitle,
  SignupDiv,
  Spanup,
  StyledButton,
  StyledTextField,
} from "./SignupStyled";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signupMutation } from "../Api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SignupForm = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: signupMutation,
    onSuccess: () => {
      console.log("User registered successfully");
      navigate("/login");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    mutate(data);
  };

  const password = watch("password"); // watch to get value of "password" field

  return (
    <SignupDiv>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormTitle variant="h1">Create an Account</FormTitle>

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
          label="First Name"
          variant="outlined"
          {...register("first_name", {
            required: "First Name is required",
          })}
          error={!!errors.first_name}
          helperText={errors.first_name && errors.first_name.message}
        />
        <StyledTextField
          label="Last Name"
          variant="outlined"
          {...register("last_name", {
            required: "Last Name is required",
          })}
          error={!!errors.last_name}
          helperText={errors.last_name && errors.last_name.message}
        />
        <StyledTextField
          label="Email"
          variant="outlined"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
        />
        <StyledTextField
          label="Password"
          type="password"
          variant="outlined"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password && errors.password.message}
        />
        <StyledTextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          {...register("confirm_password", {
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "The passwords do not match",
          })}
          error={!!errors.confirm_password}
          helperText={
            errors.confirm_password && errors.confirm_password.message
          }
        />

        <p>
          Already have an account?{" "}
          <Spanup onClick={() => navigate("/login")}>Login Here</Spanup>
        </p>

        <StyledButton
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          disableElevation
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </StyledButton>
      </FormContainer>
    </SignupDiv>
  );
};

export default SignupForm;
