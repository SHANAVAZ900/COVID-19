import React, {useState,useEffect} from 'react';
import "./App.css";
import{FormControl,Select,MenuItem} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";




function App() {
  const[countries,setCountries]= useState([]);
  //STATE= how to write a variable in REACT
  const[country,setCountry]=useState('worldwide');

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

  const onCountryChange = (event) => {
    const countryCode = event.target.value;



    setCountry(countryCode);


    console.log("hi >>>>>>>>", countryCode);
  };
  
  return (
    <div className="app">
      {/* Header */}
      {/*Header = Title+select input dropdown field */}
      {/*margin adds space outside the element whereas padding adds space inside an element */}
      <div className="app__header">
        <h1>COVID-19 tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange= {onCountryChange} value ={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>

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
      
      
      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" cases={25} total ={200} />

        <InfoBox title="Recovered" cases ={900} total={3000} />

        <InfoBox title="Deaths" cases={14028} total ={5000}/>

        {/* Info boxes title ="Coroanavirus cases"*/}
        {/* Info boxes title="Coroanavirus recoveries"*/}
        {/* Info boxes title=""*/}


      </div>

      

      {/*Table */}
      {/*graph */}

      {/* Map */}
      <Map />
    </div>
  )
}

export default App
