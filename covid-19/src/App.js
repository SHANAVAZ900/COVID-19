import React, {useState,useEffect} from 'react';
import "./App.css";
import{Card,FormControl,Select,MenuItem, CardContent} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";




function App() {
  const[countries,setCountries]= useState([]);
  //STATE= how to write a variable in REACT
  const[country,setCountry]=useState('worldwide');

  const[countryInfo, setCountryInfo] = useState({});

  //https://disease.sh/v3/covid-19/countries

  //useeffect= Runs a place of code
  //based on a given condition

  useEffect(() =>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
  }, []);

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

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
    // https://disease.sh/v3/covid-19/all

    const url = countryCode === 'worldwide' 
    ? 'https://disease.sh/v3/covid-19/all' 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);

      // all of the data
      // from the country response
      setCountryInfo(data);

    });


    setCountry(countryCode);


    console.log("hi >>>>>>>>", countryCode);
  };
  console.log("COUNTRY INFO", countryInfo);
  
  return (
    <div className="app">
      <div className="app__left">
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
        <InfoBox title="Coronavirus Cases" cases= {countryInfo.todayCases} total ={countryInfo.cases} />

        <InfoBox title="Recovered" cases = {countryInfo.todayRecovered} total={countryInfo.recovered} />

        <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total ={countryInfo.deaths}/>

        {/* Info boxes title ="Coroanavirus cases"*/}
        {/* Info boxes title="Coroanavirus recoveries"*/}
        {/* Info boxes title=""*/}


      </div>

      


      {/* Map */}
      <Map />

      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/*Table */}
          <h3>Worldwide New Cases</h3>
          {/*graph */}

        </CardContent>
        
      </Card>
      
    </div>
  );
}

export default App
