import React from 'react';
import './spinner.css';

const Spinner = ({isLoading}) => {
    return (
        <>
            {
                isLoading && <div className="loader"></div>
            }
        </>
    );
}

export default Spinner;
