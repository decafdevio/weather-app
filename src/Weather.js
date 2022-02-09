import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import SummaryData from './SummaryData';
import Description from './Description'

class Scard extends React.Component {


  render() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const day = new Date(parseInt(this.props.dateString) * 1000);
    const nameDay = days[day.getDay(day)]
    const month = months[day.getMonth(day)]
    const date = day.getDate(day)
    const image = `http://openweathermap.org/img/wn/${this.props.img}@2x.png`
    const maxTemp = Math.round(this.props.max, 1)
    const minTemp = Math.round(this.props.min, 1)
    const windSpeed = Math.round(this.props.wind, 1)
    const dataKey = this.props.dateString + "data"

    return (
      <>
          <Card className="mx-auto text-center mt-2">
            <Card.Header as="h5">{nameDay}{"-"}{date}{"-"}{month}</Card.Header>
            <Image className="mx-auto" src={image} alt={this.props.alt} />
            <Card.Body>
              <Description text={this.props.text} />
              <SummaryData key={dataKey} max={maxTemp} min={minTemp} wind={windSpeed} />
            </Card.Body>
          </Card>
      </>
    );
  }


}

export default Scard;