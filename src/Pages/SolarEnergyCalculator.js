import React, { useState } from 'react';
import axios from 'axios';


const SolarEnergyCalculator = () => {

    const [postalCode, setPostalCode] = useState('');
    const [systemCapacity, setSystemCapacity] = useState('');
    const [moduleType, setModuleType] = useState('0');
    const [losses, setLosses] = useState('');
    const [arrayType, setArrayType] = useState('0');
    const [tilt, setTilt] = useState('');
    const [azimuth, setAzimuth] = useState('');
    const [energyOutput, setEnergyOutput] = useState(null);


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`https://developer.nrel.gov/api/pvwatts/v8.json`, {
                params: {
                    api_key: '37GGUqYyc7ip11YenDSUKIZobYc9NU3hiDzzeRpX', // Replace with your actual API key
                    system_capacity: systemCapacity,
                    module_type: moduleType,
                    losses: losses,
                    array_type: arrayType,
                    tilt: tilt,
                    azimuth: azimuth,
                    address: postalCode, // Using postal code as the address
                },
            });
            setEnergyOutput(response.data.outputs.ac_annual);

            setPostalCode('');
            setSystemCapacity('');
            setModuleType('0');
            setLosses('');
            setArrayType('0');
            setTilt('');
            setAzimuth('');

        } catch (error) {
            console.error('Error fetching solar data:', error);
        }

    };

    return (
        <div className='flex flex-col h-auto lg:h-full w-full lg:w-[48vw] p-8 justify-center items-center'>
            <h2 className='text-3xl lg:text-4xl font-bold'>Solar Energy</h2>
            <p className='text-base lg:text-lg mb-4'>Estimate the potential energy production from Solar energy.</p>
            <div className='border-2 rounded-lg shadow-md p-4 w-[75vw] lg:w-[22vw] bg-white'>
                <h3 className='text-xl lg:text-2xl font-semibold mb-4'>Energy Calculator</h3>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                    <input
                        type='text'
                        placeholder='Enter postal code'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className='border-2 rounded-md p-2 w-full'
                        required
                    />
                    <input
                        type='number'
                        step='0.01'
                        placeholder='Enter system capacity (kW)'
                        value={systemCapacity}
                        onChange={(e) => setSystemCapacity(e.target.value)}
                        className='border-2 rounded-md p-2 w-full'
                        required
                    />
                    <select
                        value={moduleType}
                        onChange={(e) => setModuleType(e.target.value)}
                        className='border-2 rounded-md p-2 w-full'
                        required
                    >
                        <option value='0'>Standard</option>
                        <option value='1'>Premium</option>
                        <option value='2'>Thin film</option>
                    </select>
                    <input
                        type='number'
                        step='0.01'
                        placeholder='Enter system losses (%)'
                        value={losses}
                        onChange={(e) => setLosses(e.target.value)}
                        className='border-2 rounded-md p-2 w-full'
                        required
                    />
                    <select
                        value={arrayType}
                        onChange={(e) => setArrayType(e.target.value)}
                        className='border-2 rounded-md p-2 w-full'
                        required
                    >
                        <option value='0'>Fixed - Open Rack</option>
                        <option value='1'>Fixed - Roof Mounted</option>
                        <option value='2'>1-Axis</option>
                        <option value='3'>1-Axis Backtracking</option>
                        <option value='4'>2-Axis</option>
                    </select>
                    <input
                        type='number'
                        step='0.01'
                        placeholder='Enter tilt angle (degrees)'
                        value={tilt}
                        onChange={(e) => setTilt(e.target.value)}
                        className='border-2 rounded-md p-2 w-full'
                        required
                    />
                    <input
                        type='number'
                        step='0.01'
                        placeholder='Enter azimuth angle (degrees)'
                        value={azimuth}
                        onChange={(e) => setAzimuth(e.target.value)}
                        className='border-2 rounded-md p-2 w-full'
                        required
                    />
                    <button type='submit' className='bg-yellow-500 text-white p-2 rounded-md shadow-md w-full '>
                        Calculate
                    </button>
                </form>
                <br />
                {energyOutput !== null ? (
                    <div className='border-2 rounded-md p-2 text-center w-full '>
                        Result: {energyOutput} kWh
                    </div>
                ) : (
                    <div className='border-2 rounded-md p-2 text-center w-full '>
                        Result: 0 kWh
                    </div>
                )}
            </div>
        </div>

    );
};


export default SolarEnergyCalculator