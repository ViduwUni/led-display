import React from 'react';
import './LEDMatrix.css';

const LEDMatrix = ({ matrix }) => {
    return (
        <div className="matrix">
            {matrix.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            className={`led ${cell ? 'on' : 'off'}`}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default LEDMatrix;