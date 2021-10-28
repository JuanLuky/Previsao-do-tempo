import { useState } from "react";
import "./app.css";

function App() {
 const [city, setCity] = useState("");
 const [forecast, setForecast] = useState(null);


  const searchPrevisao = () => {
    fetch(`
    http://api.weatherapi.com/v1/current.json?key=adde71ffde14456eac0160154212410&q=${city}&lang=pt
    `).then((response) => {
      if (response.status === 200) {
        return response.json()
      }
    }).then((data) => {
      console.log(data)
      setForecast(data)
    })
  }

  const handleCityChange = (event) => {
    setCity(event.target.value)
  };


  return (
    <div className="banner">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-5 d-flex justify-content-center">
        <a className="navbar-brand " href="#search">
          <h3> Previsão de Tempo </h3>
        </a>
      </nav>
      <main className="container col-md-6 " id="search">
        <div className="jumbotron">
          <h2> Verifique agora a previsão do tempo na sua cidade! </h2>
          <p className="lead"> Digite a sua cidade no campo abaixo </p>
          <div className="mb-4">
            <div>
              <input type="text" className="form-control" value={city} onChange={handleCityChange} />
            </div>
          </div>
          <button className="btn btn-lg btn-primary" onClick={searchPrevisao}> Pesquisar </button>


          {
            // Está perguntando se existe
            forecast ? (
              <div className="resultado d-flex align-items-center">
                <div>
                  <h3 className="text1"> Hoje o dia está {forecast.current.condition.text} </h3>
                  <div className="text-temp">
                    <div className="col-sm-1">
                      <img src={forecast.current.condition.icon} alt="Icon"/>
                    </div>
                    <p className="text temperatura">
                      {forecast.current.temp_c}°C <br/>
                    </p>
                    <p className="bar">
                      |
                    </p>
                    <p className="text2">
                      Fahrenheit: {forecast.current.temp_f}°F  <br/>
                      Umidade: {forecast.current.humidity}% <br/>
                      Vento: {forecast.current.wind_kph} km/h
                    </p>
                  </div>
                </div>
              </div>
            ) : null
          }

        </div>
      </main>
    </div>
  );
}

export default App;
