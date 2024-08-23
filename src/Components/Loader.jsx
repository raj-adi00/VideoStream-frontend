import React from 'react';
import '../CSS/Loader.css'; // Import the CSS file for animations

const Loader = () => {
    return (

        <div className=' inset-0 flex justify-center items-center bg-white w-screen h-screen'>
            <section className="flex items-center justify-center flex-row">
                <div className="slider" style={{ '--i': 0 }}></div>
                <div className="slider" style={{ '--i': 1 }}></div>
                <div className="slider" style={{ '--i': 2 }}></div>
                <div className="slider" style={{ '--i': 3 }}></div>
                <div className="slider" style={{ '--i': 4 }}></div>
            </section>
        </div>
    );
};


export default Loader;

