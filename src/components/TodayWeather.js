import React from 'react';
import './TodayWeather.css'

class TodayWeather extends React.Component {
  constructor(props){
    super(props)

    this.convertDate = this.convertDate.bind(this)
    // this.getCountry = this.getCountry.bind(this)
  }

  getCountry = code => {
    // country-list package used
    const { getCode, getName } = require('country-list');
    const fullName = getName(code)

    if(code === 'GB') {return 'UK'}
    else if(code === 'US') {return 'USA'}
    else if(code === 'KP') {return 'North Korea'}
    else if(code === 'KR') {return 'South Korea'}
    else {return fullName}
  }

  getDayChar = dayNum => {
    let weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';

    return weekday[dayNum];
  };

  convertDate(dateISO) {
    const dateObj = new Date(dateISO)
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
    const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(dateObj)
    var pfix = ''
    var dateLong = ''
    var wday = this.getDayChar(dateObj.getDay())
    // console.log(dateObj.getDay())

    if(day[1] === '1') { pfix = "st"}
    else if(day[1] === '2') { pfix = "nd"}
    else if(day[1] === '1') { pfix = "st"}
    else {pfix = "th"}

    if(day[0] === '0'){ dateLong = `${day[1]}${pfix} ${month} ${year}`}
    else { dateLong = `${wday} ${day}${pfix} ${month} ${year}`}

    return dateLong
  }

  render() {

    return (
      <div className="main" style={{visibility: this.props.city ? 'visible' : 'hidden'}}>
        <img className="icon"
          src={
            this.props.data
              ? require(`../images/${this.props.data.icon}.svg`)
              : require('../images/01d.svg')
          }
          // style ensures that the element is visible only when the city is defined
          style={{
            visibility: this.props.city ? 'visible' : 'hidden',
            opacity: this.props.city ? '1' : '0',
            // width: "700px",
            // height: "700px"
          }}
        />

        <div className='today' style={{ visibility: this.props.city ? 'visible' : 'hidden', opacity: this.props.city ? '1' : '0'}}>
          <p>Today, {this.props.data ? this.convertDate(this.props.data.date) : ''}</p>
          <h1>{this.props.data ? Number(Math.round(this.props.data.temp+'e'+1)+'e-'+1) : 0}°C</h1>
          <p className='des'>{this.props.data ? this.props.data.weather_desc : ''}</p>
          <p>{this.props.city}, {this.getCountry(this.props.country)}</p>
        </div>
      </div>
    )
  }
}

export default TodayWeather;

// max / min
// <p>{this.props.data ? Number(Math.round(this.props.data.maxTemp+'e'+1)+'e-'+1).toString()+' / '+Number(Math.round(this.props.data.minTemp+'e'+1)+'e-'+1).toString() : ''}</p>
