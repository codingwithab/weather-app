import React, { useState } from "react"
const api = {
  key: "640fa0d75fc7d6ea932e857017dff447",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState("")
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery("")
          console.log(result)
        })
    }
  }

  const dateCaller = d => {
    let monthInYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]

    let daysInWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ]

    let dayOfWeek = daysInWeek[d.getDay()]
    let date = d.getDate()
    let month = monthInYear[d.getMonth()]
    let year = d.getFullYear()

    return `${dayOfWeek} ${date} ${month} ${year}`
  }

  return (
    <div
      className={
        typeof weather.weather != "undefined"
          ? weather.weather[0].main === "Clear"
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="searchbox">
          <input
            type="text"
            className="searchbar"
            placeholder="Search"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="locationbox">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateCaller(new Date())}</div>
            </div>
            <div className="weatherbox">
              <div className="temp">
                {Math.round(weather.main.temp)}&#x2103;
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  )
}

export default App
