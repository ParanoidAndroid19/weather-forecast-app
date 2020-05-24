import React from 'react';
import './WeekWeather.css';

class WeekWeather extends React.Component {
  constructor(props){
    super(props)
  }

  // returns weekday to a given Date value
  getDayChar = dateISO => {
    let weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';

    // getDay() function gives the day number of weekdays
    return weekday[new Date(dateISO).getDay()];
  };


  render() {
    return (
      <div className='weather-box'>
        <h1>{this.props.date ? this.getDayChar(this.props.date) : ''}</h1>
        <img
          src={
            this.props.icon
              ? require(`../images/${this.props.icon}.svg`)
              : require('../images/01d.svg')
          }
          alt='sun'
        />
        <span className='temp'>{Math.round(this.props.temp)}°C</span>
      </div>
    );
  }
}


export default WeekWeather;
