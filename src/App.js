import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiClient } from './ApiClient';
import { TiWeatherWindyCloudy } from 'react-icons/ti';
import { FiSunrise, FiSunset } from 'react-icons/fi';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import * as moment from 'moment';
import "./App.css";

function App() {
  const [weather, cWeather] = useState({
    loading: "",
    weather: []
  });

  const [fetching, cFetching] = useState(false);
  const apiClient = new ApiClient();

  useEffect(() => {
    refreshWeather();
  }, []);

  const updateWeather = (jsonResponse) => {
    cWeather(
      jsonResponse
    )};

  const refreshWeather=()=>{
    cWeather({
      loading:"loading.....",
      weather:[],
    });

   cFetching(true);
   apiClient.getWeather()
   .then((response)=>{
     updateWeather(response.data)
     console.log(response.data)
   })

   .catch((error) => {
    console.log(error);
  })

  .finally(cFetching(false));
  };

  const buildToday = () => {
    if (!weather.daily) {
      return (<></>)
    };

    return weather.daily.slice(0, 1).map((current,index) => {
      const nowFeels_like =  Math.round(current.feels_like.day, 10)
      const nowSunrise = (current.sunrise*1000)
      const nowSunset = (current.sunset*1000)
      // const tmpImage = (current.weather.slice(0, 1).map( (current,0) ))
      const nowImage = `http://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`
      const nowAlt = (current.weather[0].description)
      // const nowTemp = parseFloat(hourly.temp).toFixed(1)

    return (
      <>
      <Card key={index}>
        <CardGroup>
          <div style={ {textAlign:'center'} }>
          <img src={nowImage} alt={nowAlt} title={nowImage} style={ {position:'absolute', marginLeft:'-14em', marginTop:'-3em'} } />
          <h3>NOW</h3>
          <p>{nowAlt}<br/>
          <span>TEMP</span><br/>
          {current.wind_speed} Mph<br/>
          {current.clouds}%
          </p>
          </div>
          <p>just some more information to add<br/>
          something else to test alignment.</p>
        </CardGroup>
      </Card>
      <div className="spacer"></div>
      </>
    )

    })
  }

  const buildHour = () => {
    if (!weather.hourly) {
      return (<></>)
    };

    return weather.hourly.slice(0, 5).map( (hourly,index) => {
      const hourImage = `http://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png`
      const hourAlt = (hourly.weather[0].description)
      const hourlyTemp = parseFloat(hourly.temp).toFixed(1)

      return(
      <>
        <div className="hourly_item" key={index}>
            <h2>{moment(hourly.dt*1000).format('h a')}</h2>
          <p>{hourAlt}<br/>
          <img src={hourImage} alt={hourAlt} title={hourAlt} /></p>
            <div style={ {marginTop:'-3em'} }>
              <h3>{hourlyTemp}°C</h3>
            </div>


        </div>
        <div className="spacer"></div>
      </>
      )

    })
  }

  const buildCard = () => {
    console.log(weather);

    if (!weather.daily) {
      return (<></>)
    };

      return weather.daily.slice(1, 8).map((current,index) => {

        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const day = new Date(parseInt(current.dt) * 1000);
        const nameDay = days[day.getDay(day)]
        const month = months[day.getMonth(day)]
        const date = day.getDate(day)
        const image = `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`
        const alt = (current.weather[0].description)
        const feels_like =  Math.round(current.feels_like.day, 10)
        const sunrise = (current.sunrise*1000)
        const sunset = (current.sunset*1000)
        const minTemp = parseFloat(current.temp.min).toFixed(1)
        const maxTemp = parseFloat(current.temp.max).toFixed(1)

        return (
        <>
          <Card className="day_item">
          <Col key={index} >
            <CardGroup>
              <h2>{nameDay}</h2>
              <h4>{month} {date}</h4>

              <p>{alt}<br/>
              <img src={image} alt={alt} title={alt} /><br/>
              <span className="temp_bold">{minTemp}°C - {maxTemp}°C</span><br/>
              <span className="small_italic">Feels Like {feels_like}°C</span></p>

              <p><FiSunrise /> Sunrise<br/>
              {moment(sunrise).format('h:mm a')}</p>
              <p><FiSunset /> Sunset<br/>
              {moment(sunset).format('h:mm a')}</p>


              <p><TiWeatherWindyCloudy /> Wind<br/>
              {current.wind_speed} Mph</p>

              {/* <p>humidity={current.humidity}</p> */}
            </CardGroup>
          </Col>
          </Card>
          <div className="spacer"></div>
        </>
        );
      });


  };



  return (
    <>
    <Container>
    <h1>Sheffield</h1>
    <Row>
    <div className="horizontal_hours">
      {buildToday()}
      {buildHour()}
    </div>
    </Row>
    <br/><br/>
    <Row>
    <div className="horizontal_hours">
      {buildCard()}
    </div>
    </Row>
    </Container>
    <button disabled={fetching} onClick={() => refreshWeather()}></button>

    </>
  );
}


export default App;
