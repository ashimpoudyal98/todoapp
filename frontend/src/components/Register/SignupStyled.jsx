import { Button, TextField, Typography } from "@mui/material";
import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;

  gap: 1.5rem;
  max-width: 600px;

  padding: 2rem;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  border-radius: 8px;
  margin: 40px auto;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

export const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    border-radius: 8px;
    background-color: #f9f9f9;
  }
`;

export const StyledButton = styled(Button)`
  background-color: #ff5722;
  color: #ffffff;
  border-radius: 8px;
  font-weight: bold;

  &:hover {
    background-color: #e64a19;
  }
`;

export const FormTitle = styled(Typography)`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
`;

export const SignupDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

export const Spanup = styled.span`
  color: blue;
  cursor: pointer;

  &:hover {
    color: #7878cc;
  }
`;
