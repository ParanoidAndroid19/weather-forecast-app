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

    // console.log(dateISO)
    // getDay() function gives the day number of weekdays
    return weekday[new Date(dateISO).getDay()];
  };


  render() {
    return (
      <div className='weather-box'>
        <h1>{this.props.day.date ? this.getDayChar(this.props.day.date) : ''}</h1>
        <img
          src={
            this.props.day.icon
              ? require(`../images/${this.props.day.icon}.svg`)
              : require('../images/01d.svg')
          }
          alt='sun'
        />
        <span className='temp'>{Number(Math.round(this.props.day.temp+'e'+1)+'e-'+1)+this.props.day.notation}</span>
      </div>
    );
  }
}


export default WeekWeather;
