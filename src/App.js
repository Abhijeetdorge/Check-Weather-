import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {
  let [cityName, setCityName]= useState("")
  let[wDetails,setWdetails] = useState();
  const [error, setError] = useState(null);
  let [loadIcon, setLoadIcon] = useState(false);
let getCity= (event)=>{
  setLoadIcon(true)
  setWdetails(undefined)
  event.preventDefault();
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=063f8d30adf54c8d20bc1b02ae202db3`)
  .then((response) => response.json())
  .then((finalResponse) => {
    if (finalResponse.cod === "404") {
      setLoadIcon(false)
      setWdetails(undefined);
    } else {
      setLoadIcon(false)
      setWdetails(finalResponse);
      console.log(finalResponse);       
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    setError("No data");
  });

setCityName('');
 

}
  return (
    <>
      <div className='main-bg'>
        <div className='cityInput'>
          <h1>Simple Weather App</h1>
          <div>
            <input type='text' value={cityName} onChange={(event)=> setCityName(event.target.value)} placeholder='City Name' className='input' />
            <button onClick={getCity} className='btn'>Submit</button>
          </div>
        </div>
        <div className='resultBox'>
          <div>
            <img src='https://icon-library.com/images/waiting-icon-gif/waiting-icon-gif-2.jpg' className={(loadIcon)? "showLoad":"hideLoad" }/>
          </div>
          {wDetails !== undefined ? <>
            
            <h1>{wDetails.name} <span>{wDetails.sys.country}</span></h1>
            
             <h2>{wDetails.main.temp}</h2>
             <img src={`https://api.openweathermap.org/img/w/${wDetails.weather[0].icon}.png`} className='flag'/>
             <p>{wDetails.weather[0].description}</p>
          </>
          :
          <h3>No Data</h3>
          
        }
             
        </div>
      </div>
    </>
  );
}

export default App;
