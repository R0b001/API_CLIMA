import React, { useState } from "react";
import { useWeather } from "../hooks/useClima";
import {
  Form,
  Button,
  Container,
  Alert,
  Row,
  Col,
  Card,
  InputGroup,
} from "react-bootstrap";
import "./apiClima.css";

function Weather() {
  const { weatherData, loading, error, setSearchCity } = useWeather();

  //El valor que escribirá el usuario.
  const [cityInput, setCityInput] = useState("");

  const handleSubmit = (e) => {
    //Evita la recarga de la página.
    e.preventDefault();

    if (cityInput.trim() !== "") {
      //Al buscar, actualizamos 'searchCity' con el valor del input.
      setSearchCity(cityInput.trim());
    }
  };

  return (
    <div className="app-background d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1 className="text-center text-white mb-4 fw-bold display-5 text-shadow">
        Consulta el Clima en tu Ciudad o Estado 🌤️
      </h1>
      <Container className="text-center">
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            {/* --- Formulario --- */}
            <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <Form.Control
                  size="lg"
                  type="text"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  placeholder="Nombre de la ciudad o estado..."
                  aria-label="Nombre de la ciudad o estado..."
                />
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? "⟳ Buscando..." : "🔍Buscar"}
                </Button>
              </InputGroup>
            </Form>

            {/* --- Alertas de Estado --- */}
            {loading && (
              <Alert variant="info" className="text-center">
                Cargando clima...
              </Alert>
            )}
            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}

            {/* --- Mensaje Inicial --- */}
            {!loading && !error && !weatherData && (
              <div className="text-center text-muted mt-5">
                <h2>Esperando Ciudad/Estado a ver clima :D</h2>
              </div>
            )}

            {/* --- Tarjeta de Resultados --- */}
            {weatherData && (
              <Card className="bg-Card shadow-sm">
                <Card.Body className="text-center">
                  <Card.Title as="h2">Clima en {weatherData.name}</Card.Title>
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                      alt="Icono del clima"
                      style={{ width: "100px", height: "100px" }}
                    />
                    <h3 className="display-4 ms-3">
                      {Math.round(weatherData.main.temp)}°C
                    </h3>
                  </div>
                  <Card.Subtitle className="text-capitalize text-muted mb-3">
                    {weatherData.weather[0].description}
                  </Card.Subtitle>

                  <ul className="bg-Card list-group list-group-flush">
                    <li className="list-group-item">
                      Sensación térmica:{" "}
                      {Math.round(weatherData.main.feels_like)}
                      °C
                    </li>
                    <li className="list-group-item">
                      Humedad: {weatherData.main.humidity}%
                    </li>
                    <li className="list-group-item">
                      Visibilidad: {weatherData.visibility / 1000} km
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            )}
          </Col>{" "}
        </Row>{" "}
      </Container>
    </div>
  );
}

export default Weather;
