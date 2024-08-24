import React, { useState } from 'react';
import axios from 'axios';

const WindEnergyCalculator = () => {
  const [zipCode, setZipCode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [turbineCapacity, setTurbineCapacity] = useState('');
  const [turbineEfficiency, setTurbineEfficiency] = useState('');
  const [airDensity, setAirDensity] = useState('1.225'); // Default air density in kg/m³
  const [hoursOfOperation, setHoursOfOperation] = useState('');
  const [energyOutput, setEnergyOutput] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Fetch latitude and longitude from zip code using Nominatim API
      const geoResponse = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          postalcode: zipCode,
          country: countryCode,
          format: 'json',
          limit: 1,
        },
      });

      if (geoResponse.data.length === 0) {
        throw new Error('Invalid zip code or country code');
      }

      const { lat, lon } = geoResponse.data[0];

      // Fetch wind speed data from Open-Meteo API
      const weatherResponse = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: lat,
          longitude: lon,
          hourly: 'windspeed_10m',
        },
      });

      const windSpeed = weatherResponse.data.hourly.windspeed_10m[0]; // Wind speed in meters per second

      // Example wind energy calculation (replace with actual formula or API)
      const energy = 0.5 * airDensity * Math.pow(windSpeed, 3) * turbineCapacity * (turbineEfficiency / 100) * hoursOfOperation;

      setEnergyOutput(energy);

      // Reset the input fields
      setZipCode('');
      setCountryCode('');
      setTurbineCapacity('');
      setTurbineEfficiency('');
      setAirDensity('1.225');
      setHoursOfOperation('');
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='flex flex-col h-auto lg:h-full w-full lg:w-[48vw] p-8 justify-center items-center'>
      <h2 className='text-3xl lg:text-4xl font-bold'>Wind Energy</h2>
      <p className='text-base lg:text-lg mb-4'>Estimate the potential energy production from Wind turbines.</p>
      <div className='border-2 rounded-lg shadow-md p-4 w-[75vw] lg:w-[22vw] bg-white'>
        <h3 className='text-xl lg:text-2xl font-semibold mb-4'>Energy Calculator</h3>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
          <input
            type='text'
            placeholder='Enter zip code'
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className='border-2 rounded-md p-2 w-full'
            required
          />
          <input
            type='text'
            placeholder='Enter country code (e.g. IN)'
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className='border-2 rounded-md p-2 w-full'
            required
          />
          <input
            type='number'
            step='0.01'
            placeholder='Enter turbine capacity (kW)'
            value={turbineCapacity}
            onChange={(e) => setTurbineCapacity(e.target.value)}
            className='border-2 rounded-md p-2 w-full'
            required
          />
          <input
            type='number'
            step='0.01'
            placeholder='Enter turbine efficiency (%)'
            value={turbineEfficiency}
            onChange={(e) => setTurbineEfficiency(e.target.value)}
            className='border-2 rounded-md p-2 w-full'
            required
          />
          <input
            type='number'
            step='0.01'
            placeholder='Enter air density (kg/m³)'
            value={airDensity}
            onChange={(e) => setAirDensity(e.target.value)}
            className='border-2 rounded-md p-2 w-full'
          />
          <input
            type='number'
            step='0.1'
            placeholder='Enter hours of operation'
            value={hoursOfOperation}
            onChange={(e) => setHoursOfOperation(e.target.value)}
            className='border-2 rounded-md p-2 w-full'
            required
          />
          <button type='submit' className='bg-purple-500 text-white p-2 rounded-md shadow-md w-full'>
            Calculate
          </button>
        </form>
        <br/>
        {energyOutput !== null ? (
          <div className='border-2 rounded-md p-2 text-center w-full'>
            Result: {energyOutput.toFixed(2)} kWh
          </div>
        ) : (
          <div className='border-2 rounded-md p-2 text-center w-full'>
            Result: 0 kWh
          </div>
        )}
      </div>
    </div>
  );
};

export default WindEnergyCalculator;

