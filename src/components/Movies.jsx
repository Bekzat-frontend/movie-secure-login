import {
  Button,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { useNavigate } from "react-router";

const BASE_URL = "https://933b4fca974931db.mokky.dev/movies";

const Movies = ({ token, setToken }) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [fetchik, setFetchik] = useState(false);
  const [titleAndUrl, setAll] = useState({
    title: "",
    url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAll({ ...titleAndUrl, [name]: value });
  };

  const addMovie = async () => {
    const newMovie = {
      title: titleAndUrl.title,
      url: titleAndUrl.url,
      isFavorite: false,
    };
    try {
      await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newMovie),
      });
      setFetchik((prev) => !prev);
      setAll({ title: "", url: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const getAllMovies = async () => {
    try {
      const response = await fetch(BASE_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFetchik((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavorite = async (id, isFavorite) => {
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isFavorite: !isFavorite }),
      });
      setFetchik((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  useEffect(() => {
    if (token) {
      getAllMovies();
    }
  }, [fetchik, token]);

  return (
    <>
      <div>
        <TextInput
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          value={titleAndUrl.title}
          onChange={handleChange}
          required
        />
        <TextInput
          label="URL"
          name="url"
          fullWidth
          margin="normal"
          value={titleAndUrl.url}
          onChange={handleChange}
          required
        />
        <AddButton onClick={addMovie} variant="contained">
          ADD
        </AddButton>
        <LogoutButton onClick={handleLogout} variant="contained">
          Logout
        </LogoutButton>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          marginTop: "20px",
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id}>
            <MovieImage
              component="img"
              height="350"
              image={movie.url}
              alt={movie.title}
            />
            <CardContent>
              <Typography variant="h6">{movie.title}</Typography>
              <FullWidthButton
                onClick={() => toggleFavorite(movie.id, movie.isFavorite)}
                variant="outlined"
                color="primary"
              >
                {movie.isFavorite ? "★" : "☆"}
              </FullWidthButton>
              <FullWidthButton
                onClick={() => deleteMovie(movie.id)}
                variant="outlined"
                color="error"
              >
                ❌ Delete
              </FullWidthButton>
            </CardContent>
          </MovieCard>
        ))}
      </div>
    </>
  );
};

export default Movies;

const MovieCard = styled(Card)({
  width: 280,
  maxWidth: 300,
  padding: "15px",
  boxShadow: 3,
});

const MovieImage = styled(CardMedia)({
  borderRadius: "8px",
});

const AddButton = styled(Button)({
  marginTop: "20px",
  width: 200,
});

const FullWidthButton = styled(Button)({
  width: "100%",
  marginBottom: "10px",
});

const TextInput = styled(TextField)({
  marginBottom: "16px",
  maxWidth: 400,
});

const LogoutButton = styled(Button)({
  marginTop: "20px",
  width: 200,
  backgroundColor: "#ff3333",
});
