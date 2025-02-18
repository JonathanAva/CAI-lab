// Practica.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Button, TextField, Card, CardContent, CardActions, Modal } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material"; 
import Navbar from "../components/Navbar";
import happyFace from "../assets/happy_face.jpg"; 
import studying from "../assets/studying.jpg"; 
import fondo from "../assets/fondo.jpg"; 

const randomOrder = () => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return nums.sort(() => Math.random() - 0.5);
};

const getRandomFeedback = (type) => {
  const correctFeedback = ["¡Muy bien!", "¡Excelente!", "¡Buen trabajo!", "Keep up the good work!"];
  const incorrectFeedback = ["No, inténtelo de nuevo.", "Error, una vez más.", "Don't give up!", "No. Keep trying."];

  const feedback = type === "correct" ? correctFeedback : incorrectFeedback;
  return feedback[Math.floor(Math.random() * feedback.length)];
};

const Practica = () => {
  const { id } = useParams();
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [order, setOrder] = useState(randomOrder());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const handleAnswerChange = (num, value) => {
    setAnswers({ ...answers, [num]: value });
  };

  const handleCheckAnswers = () => {
    const newFeedback = {};
    let correctCount = 0;

    order.forEach(num => {
      const correctAnswer = id * num;
      const userAnswer = parseInt(answers[num]);
      if (userAnswer === correctAnswer) {
        newFeedback[num] = getRandomFeedback("correct");
        correctCount++;
      } else {
        newFeedback[num] = getRandomFeedback("incorrect");
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
          <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>Practicando la tabla de multiplicar del {id}</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
            {order.map(num => (
              <Card key={num} sx={{ width: 300, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>{id} x {num} =</Typography>
                  <TextField
                    variant="outlined"
                    type="number"
                    value={answers[num] || ""}
                    onChange={(e) => handleAnswerChange(num, e.target.value)}
                    fullWidth
                  />
                  {feedback[num] && (
                    <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                      {feedback[num]}
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

export default Practica;
