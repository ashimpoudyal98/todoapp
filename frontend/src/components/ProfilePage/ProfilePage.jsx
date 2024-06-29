import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchUserData, updateUserData } from "../Api/api"; // Adjust imports as per your API file
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [imageSrc, setImageSrc] = useState("/assets/"); // Initial image source
  const [imageFile, setImageFile] = useState(null); // File object for image
  const navigate = useNavigate();
  // Fetch user data using React Query
  const {
    data: userData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
  });

  // State to manage form data
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    additionalPhoneNumber: "",
  });

  // Mutation function to update user data
  const { mutate: editUser, isLoading: isEditing } = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      console.log("Updated");
      navigate("/");
      refetch(); // Example: Refetch user data after successful update
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  // useEffect to populate form data when userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || "",
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        email: userData.email || "",
        additionalPhoneNumber: userData.profile?.phone_number || "",
      });
      setImageSrc(userData.profile?.profile_image || "/assets/");
    }
  }, [userData]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // Update image source
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedUserData = {
      username: formData.username,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      profile: {
        phone_number: formData.additionalPhoneNumber,
      },
    };

    try {
      await editUser(updatedUserData);
      if (imageFile) {
        const formData = new FormData();
        formData.append("profile.profile_image", imageFile);
        axios
          .patch("http://localhost:8000/api/user", formData, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {})
          .catch((error) => {});
      }
    } catch (error) {
      // Handle error, e.g., show error message
      console.error("Failed to update user data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching user data</div>;

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "100px",
          mt: 20,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                marginTop: "70px",
              }}
            >
              <Avatar
                alt="Profile Picture"
                src={imageSrc}
                sx={{ width: 150, height: 150 }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginTop: "10px" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              User Profile
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="userName"
                    name="username"
                    label="Username"
                    variant="outlined"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="firstName"
                    name="first_name"
                    label="First Name"
                    variant="outlined"
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    name="last_name"
                    label="Last Name"
                    variant="outlined"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="additionalPhoneNumber"
                    name="additionalPhoneNumber"
                    label="Additional Phone Number"
                    variant="outlined"
                    value={formData.additionalPhoneNumber}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProfilePage;
