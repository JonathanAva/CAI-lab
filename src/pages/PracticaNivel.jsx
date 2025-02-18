// PracticaNivel.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Box, Button, TextField, Card, CardContent, CardActions, Modal } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material"; // Importamos el icono de verificación
import Navbar from "../components/Navbar";
import happyFace from "../assets/happy_face.jpg"; // Imagen de carita feliz
import studying from "../assets/studying.jpg"; // Imagen de estudiando
import fondo from "../assets/fondo.jpg"; // Imagen de fondo

const randomOrder = (start, end, numQuestions) => {
  const nums = [];
  for (let i = start; i <= end; i++) {
    for (let j = 1; j <= 10; j++) {
      nums.push({ x: i, y: j });
    }
  }
  return nums.sort(() => Math.random() - 0.5).slice(0, numQuestions);
};

const getRandomFeedback = (type) => {
  const correctFeedback = ["¡Muy bien!", "¡Excelente!", "¡Buen trabajo!", "Keep up the good work!"];
  const incorrectFeedback = ["No, inténtelo de nuevo.", "Error, una vez más.", "Don't give up!", "No. Keep trying."];

  const feedback = type === "correct" ? correctFeedback : incorrectFeedback;
  return feedback[Math.floor(Math.random() * feedback.length)];
};

const PracticaNivel = () => {
  const location = useLocation();
  const nivel = location.state?.nivel || "Fácil";
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [order, setOrder] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    let start, end;
    if (nivel === "Fácil") {
      start = 1; end = 4;
    } else if (nivel === "Medio") {
      start = 5; end = 8;
    } else {
      start = 9; end = 11;
    }
    setOrder(randomOrder(start, end, 6)); // Generamos 6 preguntas
  }, [nivel]);

  const handleAnswerChange = (num, value) => {
    setAnswers({ ...answers, [num.x * 10 + num.y]: value });
  };

  const handleCheckAnswers = () => {
    const newFeedback = {};
    let correctCount = 0;

    order.forEach(num => {
      const correctAnswer = num.x * num.y;
      const userAnswer = parseInt(answers[num.x * 10 + num.y]);
      if (userAnswer === correctAnswer) {
        newFeedback[num.x * 10 + num.y] = getRandomFeedback("correct");
        correctCount++;
      } else {
        newFeedback[num.x * 10 + num.y] = getRandomFeedback("incorrect");
      }
    });

    setFeedback(newFeedback);

    const percentage = (correctCount / order.length) * 100;
    const modalData = {};
    if (percentage >= 75) {
      modalData.image = happyFace;
      modalData.message = `¡Felicidades! Has obtenido un ${percentage}%. ${getRandomFeedback("correct")}`;
    } else {
      modalData.image = studying;
      modalData.message = `¡Sigue intentándolo! Has obtenido un ${percentage}%. ${getRandomFeedback("incorrect")}`;
    }

    setModalContent(modalData);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ backgroundImage: `url(${fondo})`, backgroundSize: "cover", minHeight: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", pt: "20px" }}>
        <Container sx={{ paddingTop: "40px", backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "10px", boxShadow: 3, maxWidth: "900px" }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>Practicando la tabla de multiplicar - Nivel {nivel}</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
            {order.map(num => (
              <Card key={`${num.x}-${num.y}`} sx={{ width: 300, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>{num.x} x {num.y} =</Typography>
                  <TextField
                    variant="outlined"
                    type="number"
                    value={answers[num.x * 10 + num.y] || ""}
                    onChange={(e) => handleAnswerChange(num, e.target.value)}
                    fullWidth
                  />
                  {feedback[num.x * 10 + num.y] && (
                    <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                      {feedback[num.x * 10 + num.y]}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
          <CardActions sx={{ justifyContent: "center", mt: 4 }}>
            <Button variant="contained" color="primary" onClick={handleCheckAnswers} startIcon={<CheckCircleOutline />}>
              Verificar Respuestas
            </Button>
          </CardActions>
        </Container>
      </Box>

      {/* Modal */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "white", borderRadius: "10px", boxShadow: 3, padding: 4, width: 300, margin: "auto", mt: 10 }}>
          <img src={modalContent.image} alt="Resultado" style={{ width: "100px", marginBottom: "20px" }} />
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {modalContent.message}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleCloseModal} sx={{ mt: 2 }}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default PracticaNivel;
