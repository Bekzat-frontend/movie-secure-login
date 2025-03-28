import { Navigate, Route, Routes } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import LoginForm from "../Auth/Login";
import RegistrationForm from "../auth/Register";
import Movies from "../Movies";
import { useState, useEffect } from "react";

function AppRoutes() {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route
          index
          element={
            token ? (
              <Navigate to="/movies" replace />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />
        <Route
          path="sign-up"
          element={<RegistrationForm setToken={setToken} />}
        />
        <Route path="sign-in" element={<LoginForm setToken={setToken} />} />
      </Route>

      <Route
        path="/movies"
        element={
          token ? (
            <Movies token={token} setToken={setToken} />
          ) : (
            <Navigate to="/sign-in" replace />
          )
        }
      />
    </Routes>
  );
}

export default AppRoutes;
