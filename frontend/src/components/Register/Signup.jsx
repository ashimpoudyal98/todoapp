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

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const password = watch("password"); // watch to get value of "password" field

  return (
    <SignupDiv>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormTitle variant="h1">Create an Account</FormTitle>

        <StyledTextField
          label="First Name"
          variant="outlined"
          {...register("firstname", {
            required: "First Name is required",
          })}
          error={!!errors.firstname}
          helperText={errors.firstname && errors.firstname.message}
        />
        <StyledTextField
          label="Last Name"
          variant="outlined"
          {...register("lastname", {
            required: "Last Name is required",
          })}
          error={!!errors.lastname}
          helperText={errors.lastname && errors.lastname.message}
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
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "The passwords do not match",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword && errors.confirmPassword.message}
        />

        <p>
          Already have an account? <Spanup>Login Here</Spanup>
        </p>

        <StyledButton type="submit" variant="contained" disableElevation>
          Sign Up
        </StyledButton>
      </FormContainer>
    </SignupDiv>
  );
};

export default SignupForm;
