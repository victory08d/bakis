// HeaderWrapper.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

function HeaderWrapper() {
    const location = useLocation();

    // Only render the Header if the current path is neither the home page nor the signup page
    return (
        <>
            {location.pathname !== '/' && location.pathname !== '/signup' && location.pathname !== '/math-question' && <Header /> }
        </>
    );
}

export default HeaderWrapper;
