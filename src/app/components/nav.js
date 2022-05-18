import React, {Component } from 'react';
import { Link } from "react-router-dom";
function Navigation()  {
    
    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                <a href="/" className="brand-logo"><i className="material-icons">inventory</i>C19 Software Inventary App</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/Login">Login</Link></li>
                    <li><a href="badges.html"><i className="material-icons left">fingerprint</i>Registrarse</a></li>
                </ul>
                </div>
            </nav>      
        </div>     
    )
    
}
export default Navigation;