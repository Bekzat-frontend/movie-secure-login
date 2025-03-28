import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const BASE_URL = "https://933b4fca974931db.mokky.dev/auth";

const LoginForm = ({ setToken }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Очистка ошибок перед запросом

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Ошибка авторизации");
        return;
      }

      setToken(data.token); // Сохранение токена
      navigate("/movies"); // Перенаправление после успешного входа
    } catch (error) {
      setError("Ошибка сети, попробуйте ещё раз");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f5f5f5"
      marginTop="150px"
    >
      <Box elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
