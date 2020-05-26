import React from 'react';
import './App.css';
import CityInput from './components/CityInput';
import TodayWeather from './components/TodayWeather';
import WeekWeather from './components/WeekWeather';
// import Bbackground from './images/mspace.jpg';

// git project https://github.com/erikflowers/weather-icons
import 'weather-icons/css/weather-icons.css';

const API_KEY = "ef7b3e775066b56ae79afbd0b3068de3";


class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      city: '',
      country: '',
      units: 'metric',
      // days contain today and next 4 days
      // for each day there is: date, weather_desc, icon, temp
      days: new Array(5)
    }

    // this.handleChange = this.handleChange.bind(this);
  }


  // creates the day objects and updates the state
  updateState = (data, uunits) => {
    // city is from the API data
    const city = data.city.name;
    const country = data.city.country;
    const days = [];
    var nota = '°C'
    // const dayIndices = this.getDayIndices(data);
    //
    // for (let i = 0; i < 5; i++) {
    //   days.push({
    //     date: data.list[dayIndices[i]].dt_txt,
    //     weather_desc: data.list[dayIndices[i]].weather[0].description,
    //     icon: data.list[dayIndices[i]].weather[0].icon,
    //     temp: data.list[dayIndices[i]].main.temp
    //   });
    // }

    if(uunits === 'imperial') { nota = '°F' }
    else { nota = '°C' }

    // This will give us readings for only 06:00pm UTC on each day
    const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))

    for (let i=0; i<5; i++) {
      days.push({
        date: dailyData[i].dt_txt,
        weather_desc: dailyData[i].weather[0].description,
        icon: dailyData[i].weather[0].icon,
        temp: dailyData[i].main.temp,
        notation: nota,
        minTemp: dailyData[i].main.temp_min,
        maxTemp: dailyData[i].main.temp_max
      })
    }

    console.log(data);
    // console.log(dailyData);
    // console.log(typeof(days[0].date))

    this.setState({
      city: city,
      country: country,
      days: days,
      units: uunits
    });

    console.log(this.state.days)
  };

  // tries to make an API call with the given city name and triggers state update,
  // here city and uunits refer to the props updated by the child component CityInput, this is case of Child component passing updated state to parent component
  makeApiCall = async(city, uunits) => {
    // this city passed is from the user entered input
    const api_data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}&units=${uunits}`
    ).then(resp => resp.json());

    if (api_data.cod === '200') {
      await this.updateState(api_data, uunits);
      // console.log(this.state.days)
      return true;
    } else return false;
  };

  // This code is not required anymore
  // returns array with Indices of the next five days in the list
  // from the API data (every day at 12:00 pm)
  // I have no idea how the code inside this component works!
  // getDayIndices = data => {
  //   let dayIndices = [];
  //   dayIndices.push(0);
  //
  //   let index = 0;
  //   let tmp = data.list[index].dt_txt.slice(8, 10);
  //
  //   for (let i = 0; i < 4; i++) {
  //     while (
  //       tmp === data.list[index].dt_txt.slice(8, 10) ||
  //       data.list[index].dt_txt.slice(11, 13) !== '15'
  //     ) {
  //       index++;
  //     }
  //     dayIndices.push(index);
  //     tmp = data.list[index].dt_txt.slice(8, 10);
  //   }
  //   return dayIndices;
  // };
  //
  // handleChange(e) {
  //   this.setState({
  //     city: e.target.value
  //   });
  // }


  render() {
    const Forecast = () => {
      // slice(1) is equivalent to days[1:], days array consists of 5 days total
      const boxes = this.state.days.slice(1).map(day => (
        // console.log(day),
        <li key={day.date}>
          <WeekWeather day={day} />
        </li>
      ));

      return <ul className='weather-box-list'>{boxes}</ul>;
    };

    // ./images/mspace.jpg
    // style={{ backgroundImage: `url(require("../images/mspace.jpg"))`}}
    // this.state.days[0].icon

    // const test = "50d"

    const bgStyle = {
      backgroundImage: this.state.city ? `url(/backgrounds/${this.state.days[0].icon}_bg.jpg)` : `url(/backgrounds/mspace.jpg)`,
      backgroundSize: 'cover',
      transition: 'all 2s ease-out'
    }

    return (
      <div className="App" style={bgStyle}>
        <header className="App-header">
          <CityInput city={this.state.city} units={this.state.units} makeApiCall={this.makeApiCall.bind(this)}/>
          <TodayWeather data={this.state.days[0]} city={this.state.city} country={this.state.country}/>
          <Forecast />
        </header>
      </div>
    )
  }
}

export default App;
