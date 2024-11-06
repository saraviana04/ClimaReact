import React, { useState } from 'react';
import './App.css';

// Importando as imagens de fundo da pasta src/backgrounds
import sunnyImage from './backgrounds/sunny.jpg';
import cloudyImage from './backgrounds/cloudy.jpg';
import rainyImage from './backgrounds/rainy.jpg';
import snowyImage from './backgrounds/snowy.jpg';
import stormyImage from './backgrounds/stormy.jpg';

const API_KEY = 'ea7252d6c18b456727930e25448f38d6';

function App() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState('');

    const getWeather = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
            const data = await response.json();
            setWeather(data);

            const weatherDescription = data.weather[0].main.toLowerCase(); //definir a descrição do clima em português

            switch (weatherDescription) {
                case 'clear':  // Ensolarado
                    setBackgroundImage(sunnyImage);
                    data.weather[0].description = 'Ensolarado';
                    break;
                case 'clouds':  // Nublado
                    setBackgroundImage(cloudyImage);
                    data.weather[0].description = 'Nublado';
                    break;
                case 'rain':  // Chuvoso
                    setBackgroundImage(rainyImage);
                    data.weather[0].description = 'Chuvoso';
                    break;
                case 'snow':  // Nevando
                    setBackgroundImage(snowyImage);
                    data.weather[0].description = 'Nevando';
                    break;
                case 'thunderstorm':  // Tempestade
                    setBackgroundImage(stormyImage);
                    data.weather[0].description = 'Tempestade';
                    break;
                default:
                    setBackgroundImage('');  // Sem imagem se o clima não for identificado
                    data.weather[0].description = 'Clima desconhecido';
            }
        } catch (error) {
            console.error('Erro ao obter dados do clima:', error);
        }
    };

    return (
        <div
            className="app"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            <h1>Aplicativo do Clima</h1>
            <div className="container">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Digite a cidade"
                />
                <button onClick={getWeather}>Obter Clima</button>

                {weather && (
                    <div>
                        <h2>{weather.name}</h2>
                        <p>{weather.weather[0].description}</p>
                        <p>{Math.round(weather.main.temp - 273.15)}°C</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
