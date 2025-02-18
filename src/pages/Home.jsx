import { Container, Typography, Button, Box, Grid, Card, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; 
import bannerImg from "../assets/banner.png"; 
import tabla1 from "../assets/tabla1.jpg"; 
import tabla2 from "../assets/tabla2.jpg";
import tabla3 from "../assets/tabla3.jpg";
import tabla4 from "../assets/tabla4.jpg";
import tabla5 from "../assets/tabla5.jpg";
import tabla6 from "../assets/tabla6.jpg";
import tabla7 from "../assets/tabla7.jpg";
import tabla8 from "../assets/tabla8.jpg";
import tabla9 from "../assets/tabla9.jpg";
import tabla10 from "../assets/tabla10.jpg";

const tablas = [
  { id: 1, img: tabla1 },
  { id: 2, img: tabla2 },
  { id: 3, img: tabla3 },
  { id: 4, img: tabla4 },
  { id: 5, img: tabla5 },
  { id: 6, img: tabla6 },
  { id: 7, img: tabla7 },
  { id: 8, img: tabla8 },
  { id: 9, img: tabla9 },
  { id: 10, img: tabla10 },
];

const Home = () => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/practica/${id}`);
  };

  return (
    <>
      <Navbar /> 

      <Box sx={{ width: "100vw", minHeight: "100vh", textAlign: "center", paddingTop: "64px" }}>
        <Box
          sx={{
            width: "100vw",
            height: { xs: "250px", md: "500px" },
            backgroundImage: `url(${bannerImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "10px"
            }}
          >
            🏫 Aprende las Tablas de Multiplicar 📚
          </Typography>
        </Box>

        <Container sx={{ mt: 4, maxWidth: "lg", mb: 4 }}> 
          <Typography variant="h4" sx={{ mb: 3 }}>
            ¿Qué tablas de multiplicar deseas practicar?
          </Typography>

          <section>
            <Grid container spacing={4} justifyContent="center">
              {tablas.map(tabla => (
                <Grid item xs={12} sm={6} md={2.4} key={tabla.id}>
                  <Card onClick={() => handleCardClick(tabla.id)} sx={{ cursor: "pointer", margin: "auto" }}>
                    <CardMedia
                      component="img"
                      image={tabla.img}
                      alt={`Tabla ${tabla.id}`}
                      sx={{ height: "250px", objectFit: "cover" }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </section>
        </Container>
      </Box>
    </>
  );
};

export default Home;
