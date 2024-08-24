import React, { useEffect, useState } from 'react';
import { FaBolt, FaTimes, FaBars } from 'react-icons/fa';
import { PiBrainLight, PiWindmill } from "react-icons/pi";
import { WiSolarEclipse } from "react-icons/wi";
import { Link } from 'react-scroll';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import 'tailwindcss/tailwind.css'; // Ensure you import TailwindCSS
import WindEnergyCalculator from './WindEnergyCalculator';
import SolarEnergyCalculator from './SolarEnergyCalculator';

const AffordableCleanEnergy = () => {
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
        });

        // Simulate loading time
        setTimeout(() => {
            setLoading(false);
        }, 2000); // Adjust the loading time as needed
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 p-8 bg-white">
            <nav className='fixed top-0 left-0 w-full bg-white py-4 z-50 shadow-md'>
                <div className='flex justify-between items-center px-4'>
                    <div className='text-2xl font-bold'>
                        <span className='text-black'>Sustainify</span>
                    </div>

                    {/* Hamburger Menu Button */}
                    <div className='lg:hidden cursor-pointer' onClick={handleToggle}>
                        {isOpen ? <FaTimes className='text-black text-2xl' /> : <FaBars className='text-black text-2xl' />}
                    </div>

                    {/* Navbar Links */}
                    <div className={`lg:flex lg:items-center lg:gap-6 flex-col lg:flex-row absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent lg:p-0 p-4 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
                        <ul className='flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0'>
                            <li>
                                <Link to="about" smooth={true} duration={500} className='cursor-pointer text-black hover:text-blue-700 transition-colors text-lg font-semibold'>About</Link>
                            </li>
                            <li>
                                <Link to="objectives-solutions" smooth={true} duration={500} className='cursor-pointer text-black hover:text-blue-700 transition-colors text-lg font-semibold'>Objectives & Solutions</Link>
                            </li>
                            <li>
                                <Link to="solar-energy" smooth={true} duration={500} className='cursor-pointer text-black hover:text-blue-700 transition-colors text-lg font-semibold'>Solar Energy</Link>
                            </li>
                            <li>
                                <Link to="wind-energy" smooth={true} duration={500} className='cursor-pointer text-black hover:text-blue-700 transition-colors text-lg font-semibold'>Wind Energy</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* About Affordable Clean Energy */}
            <div id="about" className='flex flex-col lg:flex-row h-auto lg:h-[70vh] gap-5 justify-between items-center border-2 rounded-lg shadow-xl border-green-500 overflow-hidden bg-white bg-opacity-30 backdrop-blur-3xl mt-20' data-aos="fade-up">
                <div className='flex flex-col h-auto lg:h-5/6 w-full lg:w-[48vw] justify-evenly items-start p-8'>
                    <div className='flex items-center space-x-4'>
                        <h1 className='text-3xl lg:text-5xl font-bold'>Affordable And Clean Energy</h1>
                    </div>
                    <p className='text-base lg:text-lg'>
                        Affordable and Clean Energy aims to ensure access to affordable, reliable, sustainable, and modern energy for all. This goal recognizes the critical role of energy in advancing human development and economic growth.
                    </p>
                </div>
                <div className='flex h-[30vh] lg:h-[100vh] w-full lg:w-[48vw] bg-gradient-to-r from-white to-green-500 justify-center items-center'>
                    <FaBolt className="text-green-500 lg:text-white text-[5rem] lg:text-[10rem]" />
                </div>
            </div>

            {/* Objectives and Solutions Card */}
            <div id="objectives-solutions" className='flex flex-col lg:flex-row h-auto lg:h-[70vh] gap-5 justify-between items-center border-2 rounded-lg shadow-xl border-cyan-500 overflow-hidden bg-white bg-opacity-30 backdrop-blur-3xl' data-aos="fade-up">
                <div className='flex h-[30vh] lg:h-[100vh] w-full lg:w-[48vw] bg-gradient-to-r from-cyan-500 to-white justify-center items-center'>
                    <PiBrainLight className="text-cyan-500 lg:text-white text-[5rem] lg:text-[10rem]" />
                </div>
                <div className='flex flex-col space-x-4 h-auto lg:h-5/6 w-full lg:w-[48vw] justify-evenly items-start p-8'>
                    <div className='flex items-center space-x-4'>
                        <h1 className='text-3xl lg:text-5xl font-bold'>OBJECTIVES</h1>
                    </div>
                    <ul className='list-disc text-base lg:text-lg'>
                        <li>Reduce Costs</li>
                        <li>Promote Sustainable Practices</li>
                    </ul>
                    <div className='flex items-center space-x-4'>
                        <h1 className='text-3xl lg:text-5xl font-bold'>SOLUTIONS</h1>
                    </div>
                    <ul className='list-disc text-base lg:text-lg'>
                        <li>Invest in Renewable Energy Technologies</li>
                        <li>Implement Energy Efficiency Programs</li>
                    </ul>
                </div>
            </div>

            {/* Solar Energy Card */}
            <div id="solar-energy" className='flex flex-col lg:flex-row h-auto lg:h-[90vh] gap-5 justify-between items-center border-2 rounded-lg shadow-xl border-yellow-500 overflow-hidden bg-white bg-opacity-30 backdrop-blur-3xl' data-aos="fade-up">
                <SolarEnergyCalculator />
                <div className='flex h-[30vh] lg:h-[100vh] w-full lg:w-[48vw] bg-gradient-to-r from-white to-yellow-500 justify-center items-center'>
                    <WiSolarEclipse className="text-yellow-500 lg:text-white text-[5rem] lg:text-[10rem]" />
                </div>
            </div>

            {/* Wind Energy Card */}
            <div id="wind-energy" className='flex flex-col lg:flex-row h-auto lg:h-[90vh] gap-5 justify-between items-center border-2 rounded-lg shadow-xl border-purple-500 overflow-hidden bg-white bg-opacity-30 backdrop-blur-3xl' data-aos="fade-up">
                <div className='flex h-[30vh] lg:h-[100vh] w-full lg:w-[48vw] bg-gradient-to-r from-purple-500 to-white justify-center items-center'>
                    <PiWindmill className="text-purple-500 lg:text-white text-[5rem] lg:text-[10rem]" />
                </div>
                {/* <div className='flex flex-col h-auto lg:h-full w-full lg:w-[48vw] p-8 justify-center items-center'>
                    <h2 className='text-3xl lg:text-4xl font-bold'>Wind Energy</h2>
                    <p className='text-base lg:text-lg mb-4'>Estimate the potential energy production from Wind energy.</p>
                    <div className='border-2 rounded-lg shadow-md p-4 w-[75vw] lg:w-[22vw] bg-white'>
                        <h3 className='text-xl lg:text-2xl font-semibold mb-4'>Energy Calculator</h3>
                        <div className='flex flex-col space-y-4'>
                            <input type='text' placeholder='Enter wind speed (m/s)' className='border-2 rounded-md p-2 w-full' />
                            <input type='text' placeholder='Enter turbine efficiency (%)' className='border-2 rounded-md p-2 w-full' />
                            <input type='text' placeholder='Enter swept area (m²)' className='border-2 rounded-md p-2 w-full' />
                            <button className='bg-purple-500 text-white p-2 rounded-md shadow-md w-full'>Calculate</button>
                            <div className='border-2 rounded-md p-2 text-center w-full'>Result: 0 kWh</div>
                        </div>
                    </div>
                </div> */}
                <WindEnergyCalculator />
            </div>
        </div>
    );
};

export default AffordableCleanEnergy;
