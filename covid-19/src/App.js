import React, {useState,useEffect} from 'react';
import "./App.css";
import{FormControl,Select,MenuItem} from "@material-ui/core";

function App() {
  const[countries,setCountries]= useState([]);
  //STATE= how to write a variable in REACT

  //https://disease.sh/v3/covid-19/countries

  //useeffect= Runs a place of code
  //based on a given condition

  useEffect(()=>{
    //The code inside here will run once
    //when the component loads and not again
    //async ->sends a request,wait for it. do something with
    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name:country.country, // United states, United Kingdom
            value:country.countryInfo.iso2, // UK, USA, 
          }
        ));

        setCountries(countries);
        

      }); 
    };

    getCountriesData();
  }, []);
  
  return (
    <div className="app">
      {/* Header */}
      {/*Header = Title+select input dropdown field */}
      {/*margin adds space outside the element whereas padding adds space inside an element */}
      <div className="app__header">
        <h1>COVID-19 tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value ="abc">

            {/* Loop through all the countries and shown a drop down list of the options */}
            {
              countries.map(country =>(
              <MenuItem value={country.value}>{country.name}</MenuItem>))
            }
            {/*
            <MenuItem value="worldwide">Worldwide</MenuItem>
            */}

          </Select>
        </FormControl>
      </div>
      
      
      

      {/* Info boxes */}
      {/* Info boxes */}
      {/* Info boxes */}

      {/*Table */}
      {/*graph */}

      {/* Map */}
    </div>
  )
}

export default App
