import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";

const DEFAULT_VALUE = "--";
function App() {
  const [searchValue, setSearchValue] = useState("");
  const [citySearch, setCitySearch] = useState("Can Tho");
  const [name, setName] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [icon, setIcon] = useState("");
  const [sunRise, setSunRise] = useState("");
  const [sunSet, setSunSet] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric&lang=vi&appid=c2c1399cbbcf85968137a895a98e19fd`
      )
      .then((res) => {
        const data = res.data;
        setName(data.name);
        setWeather(data.weather[0].description);
        setTemp(Math.round(data.main.temp));
        setIcon(
          `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        );
        setSunRise(moment.unix(data.sys.sunrise).format("H:mm"));
        setSunSet(moment.unix(data.sys.sunset).format("H:mm"));
        setHumidity(data.main.humidity + " %");
        setWind((data.wind.speed * 3.6).toFixed(2) + " Km/Giờ");
        setLon(data.coord.lon + " độ");
        setLat(data.coord.lat + " độ");
        console.log(data);
      })
      .catch(() => {
        alert("Không tìm thấy tên thành phố này !!");
      });
  }, [citySearch]);

  return (
    <div className="container">
      <div className="main-secsion">
        <div className="search-bar">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input
            type="text"
            className="search-city"
            placeholder="Tìm kiếm thành phố..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="search-button"
            onClick={(e) => setCitySearch(searchValue)}
          >
            Tìm kiếm
          </button>
        </div>
        <div className="wrapper">
          <p className="city-name">{name || DEFAULT_VALUE}</p>
          <p className="weather-state">{weather || DEFAULT_VALUE}</p>
          <img
            className="weather-icon"
            src={icon || DEFAULT_VALUE}
            alt="weather-icon"
          />
          <p className="temperature">{temp || DEFAULT_VALUE}</p>
        </div>
        <div className="additional-secsion">
          <div className="row">
            <div className="item">
              <div className="label">Mặt trời mọc</div>
              <div className="value">{sunRise || DEFAULT_VALUE}</div>
            </div>
            <div className="item">
              <div className="label">Mặt trời lặn</div>
              <div className="value">{sunSet || DEFAULT_VALUE}</div>
            </div>
          </div>
          <div className="row">
            <div className="item">
              <div className="label">Độ ẩm</div>
              <div className="value">{humidity || DEFAULT_VALUE}</div>
            </div>
            <div className="item">
              <div className="label">Tốc độ gió</div>
              <div className="value">{wind || DEFAULT_VALUE}</div>
            </div>
          </div>
          <div className="row">
            <div className="item">
              <div className="label">Kinh độ</div>
              <div className="value">{lon || DEFAULT_VALUE}</div>
            </div>
            <div className="item">
              <div className="label">Vĩ độ</div>
              <div className="value">{lat || DEFAULT_VALUE}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
