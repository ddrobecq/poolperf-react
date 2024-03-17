import React from 'react';
import './loader.css';

/* RETURN SPAN STRUCTURE FOR LOADER IN JSX */
export default class Loader extends React.Component {
render () {
    return (
        <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
    };  
}
