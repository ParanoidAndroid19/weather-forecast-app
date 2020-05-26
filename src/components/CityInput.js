import React from 'react';
import './CityInput.css';
import Switch from "react-switch";

class CityInput extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      checked: false,
      units: 'metric'
    };

    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange(checked) {
  //   var deg = ''
  //   if(checked === false) { deg = 'metric'}
  //   else { deg = 'imperial' }
  //
  //   this.setState({ checked,
  //     units: deg
  //   });
  //
  //   if(this.props.city){
  //     // API is called only if the city is defined
  //     if (await this.props.makeApiCall(this.props.city, this.state.units)) e.target.placeholder = 'Enter a City...';
  //     else e.target.placeholder = 'Something went wrong, try again...';
  //   }
  //
  // }

  render() {
    // console.log(this.state.units)
    // here e corresponds to the input box (e.target.value) and the key pressed (e.keyCode)
    const onKlickHandler = async e => {
      e.persist(); //I don't know what tf is this

      //both .which and .keyCode do the samething, but some browsers support only one. So here if e.which is true then use that, else use e.keyCode
      const eventKey = e.which ? e.which : e.keyCode;

      //user input city
      const city = e.target.value;
      const units = this.state.units

      // check if input contains only letters after Enter was pressed, 13 is the code for enter key
      if (eventKey === 13) {
        // if input consists of only letters
        if (/^[a-zA-ZäöüÄÖÜß ]+$/.test(city)) {
          // adding the className loading so that the loading gif is displayed when api call is being made
          e.target.classList.add('loading');

          // if api call returns true, else
          if (await this.props.makeApiCall(city, units)) e.target.placeholder = 'Enter a City...';
          else e.target.placeholder = 'City was not found, try again...';
        }
        // if input has any numbers
        else e.target.placeholder = 'Please enter a valid city name...';

        e.target.classList.remove('loading');
        e.target.value = ''; //making the input box value empty again
      }
    };

    const handleChange = async checked => {
      var deg = ''
      if(checked === false) { deg = 'metric'}
      else { deg = 'imperial' }

      this.setState({ checked,
        units: deg
      });

      // this.props.units = deg

      // console.log(deg)
      // console.log(this.props.city)

      if(this.props.city){
        // API is called only if the city is defined
        if (await this.props.makeApiCall(this.props.city, deg)) console.log("API call made successfully")
        else console.log('Something went wrong, try again...');
      }
    };

    return (
      <div>
      <input
        className='city-input'
        type='text'
        placeholder='Enter a City...'
        onKeyPress={onKlickHandler}
      />
      <label>
        <span>C</span>
        <Switch
          onChange={handleChange}
          checked={this.state.checked}
          className="react-switch"
        />
        <span>F</span>
      </label>
      </div>
    );

  }
}

export default CityInput;
