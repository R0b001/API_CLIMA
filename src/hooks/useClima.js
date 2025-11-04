import { useState, useEffect } from "react";
import axios from "axios";

/*El hook o el anzuelo para realizar las operaciones 
y mostrar la vista de forma separada.*/

export function useWeather() {
  // Estados para datos, carga y error
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Para buscar el valor escrito.
  const [searchCity, setSearchCity] = useState("");

  //La llave de la API.
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    //No se ejecuta la búsqueda hasta agregar un valor.
    if (searchCity === "") {
      return;
    }

    const fetchWeather = async () => {
      if (!apiKey) {
        setError("API Key no encontrada. Asegúrate de configurar .env");
        return;
      }
      setLoading(true);
      setError(null);
      setWeatherData(null);

      try {
        //Agregamos la variables de entorno y del usuario.
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric&lang=es`;

        //Para la obtención de los resultados del enlace.
        const response = await axios.get(url);
        setWeatherData(response.data);
      } catch (err) {
        //Manejo de errores del clima.
        if (err.response && err.response.status === 404) {
          setError(
            "Lugar no encontrado, vuelva a escribir el lugar de forma correcta."
          );
        } else {
          setError("No se pudo obtener la información del clima.");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [searchCity, apiKey]);

  //Y al final se retornan las variables necesarias.
  return { weatherData, loading, error, setSearchCity };
}
