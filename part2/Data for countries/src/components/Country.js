import { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ country, single }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  return (
    <>
      {single ? (
        <CountrieInfo country={country} />
      ) : (
        <dt>
          {country.name}{" "}
          <input type="button" value="show" onClick={handleClick} />
          {show && <CountrieInfo country={country} />}
        </dt>
      )}
    </>
  );
};

const CountrieInfo = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>Capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <Languages languages={country.languages} />
      <Img img={country.flag} />
      <Weather capital={country.capital} />
      <hr />
    </>
  );
};

const Languages = ({ languages }) => {
  return (
    <ul>
      {languages.map((language) => (
        <Language language={language.name} key={language.iso639_1} />
      ))}
    </ul>
  );
};

const Language = ({ language }) => {
  return <li>{language}</li>;
};

const Img = ({ img }) => {
  return <img src={img} alt="flag" width="200px" />;
};

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({});
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${capital}&unit=m`
      )
      .then((weather) => {
        setWeather(weather.data);
      });
  }, [capital]);

  return (
    <>
      {Object.keys(weather).length === 0 || weather.error ? (
        <h2>'Loading...'</h2>
      ) : (
        <>
          <h2>Weather in {capital}</h2>
          <p>temperature {weather.current.temperature} Celsius</p>
          <img src={weather.current.weather_icons} alt="weather_icon"/>
          <p>wind {weather.current.wind_speed} km/h</p>
        </>
      )}
    </>
  );
};

export default Country;
