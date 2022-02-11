import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiClient } from './ApiClient';
import { TiWeatherWindyCloudy } from 'react-icons/ti';
import { FiSunrise, FiSunset } from 'react-icons/fi';
import { BsArrowUpCircleFill, BsArrowUpLeftCircleFill, BsArrowLeftCircleFill, BsArrowDownLeftCircleFill, BsArrowDownCircleFill, BsArrowDownRightCircleFill, BsArrowRightCircleFill, BsArrowUpRightCircleFill } from 'react-icons/bs';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import * as moment from 'moment';
import "./App.css";

function App() {
  const [weather, changeWeather] = useState({ loading: "", weather: [], } );
  const [fetching, weatherFetching] = useState(false);
  const apiClient = new ApiClient();

  useEffect(() => { refreshWeather(); }, []);

  const updateWeather = (jsonResponse) => { changeWeather( jsonResponse )};

  const refreshWeather=()=>{
   changeWeather({ loading:"loading.....", weather:[], });
   weatherFetching(true);
    apiClient.getWeather()
      .then( (response)=>{ updateWeather(response.data)
          console.log(response.data) } )
      .catch( (error) => { console.log(error); } )
      .finally(weatherFetching(false));
  };

  const buildToday = () => {
    if (!weather.daily) {
      return (<></>)
    };

    return weather.daily.slice(0, 1).map( (current,index) => {
      const nowFeels_like =  Math.round(current.feels_like.day, 10)
      const nowSunrise = (current.sunrise*1000)
      const nowSunset = (current.sunset*1000)
      const nowImage = `http://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`
      const nowAlt = (current.weather[0].description)
      const nowTemp = parseFloat(current.temp.day).toFixed(1)


      const windDeg = () => {
        const degree = (current.wind_deg);
        if (degree>337.5) return <BsArrowUpCircleFill />;
        if (degree>292.5) return <BsArrowUpLeftCircleFill />;
        if (degree>247.5) return <BsArrowLeftCircleFill />;
        if (degree>202.5) return <BsArrowDownLeftCircleFill />;
        if (degree>157.5) return <BsArrowDownCircleFill />;
        if (degree>122.5) return <BsArrowDownRightCircleFill />;
        if (degree>67.5) return <BsArrowRightCircleFill />;
        if (degree>22.5) return <BsArrowUpRightCircleFill />;
        return 'unknown';
      }

    return (
      <div id="now_item">
      <Card key={index}>
        <CardGroup>
          <div style={ {textAlign:'center'} }>
          {/* <img src={nowImage} alt={nowAlt} title={nowImage} style={ {position:'absolute', marginLeft:'-14em', marginTop:'-3em'} } /> */}
          <h2>Currently</h2>
          <p>
          <hr/>
          Temperature: {nowTemp}<br/>
          Wind: {windDeg()} {current.wind_speed} Mph<br/>
          Overview: {nowAlt}
          </p>
          </div>
        </CardGroup>
      </Card>
      <div className="spacer"></div>
      </div>
    )

    })
  }

  const buildHour = () => {
    if (!weather.hourly) {
      return (<></>)
    };

    return weather.hourly.slice(0, 5).map( (hourly,index) => {
      const hourImage = `http://openweathermap.org/img/wn/${hourly.weather[0].icon}.png`
      const hourAlt = (hourly.weather[0].description)
      const hourlyTemp = parseFloat(hourly.temp).toFixed(1)

      return(
      <>
        <div className="hourly_item" key={index}>
            <h2>{moment(hourly.dt*1000).format('HH:mm')}</h2>
          <p style={ {marginTop:'-2em'} }>
            {/* {hourAlt}<br/> */}
          <img src={hourImage} alt={hourAlt} title={hourAlt} /></p>
            <div style={ {marginTop:'-2em'} }>
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

      return weather.daily.slice(0, 7).map((current,index) => {

        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const day = new Date(parseInt(current.dt) * 1000);
        let nameDay = days[day.getDay(day)]
        // const index = {index}
        const month = months[day.getMonth(day)]
        const date = day.getDate(day)
        const image = `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`
        const alt = (current.weather[0].description)
        const feels_like =  Math.round(current.feels_like.day, 10)
        const sunrise = (current.sunrise*1000)
        const sunset = (current.sunset*1000)
        const minTemp = parseFloat(current.temp.min).toFixed(1)
        const maxTemp = parseFloat(current.temp.max).toFixed(1)

        const windDeg = () => {
          const degree = (current.wind_deg);
          if (degree>337.5) return <BsArrowUpCircleFill />;
          if (degree>292.5) return <BsArrowUpLeftCircleFill />;
          if (degree>247.5) return <BsArrowLeftCircleFill />;
          if (degree>202.5) return <BsArrowDownLeftCircleFill />;
          if (degree>157.5) return <BsArrowDownCircleFill />;
          if (degree>122.5) return <BsArrowDownRightCircleFill />;
          if (degree>67.5) return <BsArrowRightCircleFill />;
          if (degree>22.5) return <BsArrowUpRightCircleFill />;
          return 'unknown';
      }
      if(index == "1") {
        let nameDay = "Today"
      }


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
              {moment(sunrise).format('h:mm a') }</p>
              <p><FiSunset /> Sunset<br/>
              {moment(sunset).format('h:mm a') }</p>


              <p><TiWeatherWindyCloudy /> Wind<br/>
              {windDeg() } {current.wind_speed} Mph<br/>
              </p>

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
    <h1>Sheffield / S3 8GW  <button disabled={fetching} onClick={() => refreshWeather()}>Refresh</button>
</h1>
    <Row>
    <div className="horizontal_hours">
      {/* {buildToday()} */}
      <div className="geo">
        <textarea rows="1" id="postcode-text" placeholder="Postal Code"></textarea><br/>
      </div>
      <span className="spacer"></span>
      <span className="spacer"></span>
      <span className="spacer"></span>
      {buildHour()}
    </div>
    </Row>
    <Row>
    <div className="horizontal_days">
      {buildCard()}
    </div>
    </Row>
    </Container>
    </>
  );
}


export default App;
