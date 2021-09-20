import React from 'react'

const Spinner = ({textContent}) => {
    const content = textContent || '';

    return (     
        <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">{content}</span>
            </div>
        </div>        
     );
}
 
export default Spinner;