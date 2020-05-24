import React from 'react';
import './App.css';
import CityInput from './components/CityInput';
import TodayWeather from './components/TodayWeather';
import WeekWeather from './components/WeekWeather';

// git project https://github.com/erikflowers/weather-icons
import 'weather-icons/css/weather-icons.css';

const API_KEY = "ef7b3e775066b56ae79afbd0b3068de3";


class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      city: '',
      country: '',
      // days contain today and next 4 days
      // for each day there is: date, weather_desc, icon, temp
      days: new Array(5)
    }

    // this.handleChange = this.handleChange.bind(this);
  }


  // creates the day objects and updates the state
  updateState = data => {
    // city is from the API data
    const city = data.city.name;
    const country = data.city.country;
    const days = [];
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

    // This will give us readings for only 06:00pm UTC on each day
    const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))

    for (let i=0; i<5; i++) {
      days.push({
        date: dailyData[i].dt_txt,
        weather_desc: dailyData[i].weather[0].description,
        icon: dailyData[i].weather[0].icon,
        temp: dailyData[i].main.temp,
        minTemp: dailyData[i].main.temp_min,
        maxTemp: dailyData[i].main.temp_max
      })
    }

    // console.log(data);
    // console.log(dailyData);

    console.log(data);
    // console.log(typeof(days[0].date))

    this.setState({
      city: city,
      country: country,
      days: days
    });
  };

  // tries to make an API call with the given city name and triggers state update
  makeApiCall = async city => {
    // this city passed is from the user entered input
    const api_data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}&units=metric`
    ).then(resp => resp.json());

    if (api_data.cod === '200') {
      await this.updateState(api_data);
      // console.log(this.state.days)
      return true;
    } else return false;
  };

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

    return (
      <div className="App">
        <header className="App-header">
          <CityInput city={this.state.city} makeApiCall={this.makeApiCall.bind(this)}/>
          <TodayWeather data={this.state.days[0]} city={this.state.city} country={this.state.country}/>
          <Forecast />
        </header>
      </div>
    )
  }
}

export default App;
