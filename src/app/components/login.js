import React, {Component } from 'react';

function Login() {
    
    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                <a href="/" className="brand-logo"><i className="material-icons">inventory</i>C19 Software Inventary App</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href=""><i className="material-icons left">logout</i>Salir</a></li>
                    <li><a href=''><i className="material-icons left">fingerprint</i>Registrarse</a></li>
                </ul>
                </div>
            </nav>  
            <div className='container'>
                <h1>
                    Welcome
                </h1>
                <p>Welcome to C19 inventory user interface 'please enter your details'</p>
                <div>
                    <label>Name</label>
                    <input className='' placeholder='Enter your name '></input>
                </div> 
                <div>
                    <label>Rut</label>
                    <input className='' placeholder='Enter your rut ' type='text'></input>
                </div> 
                <div>
                    <label> Password </label>
                    <input className='' placeholder='Enter your password 'type='password'></input>
                </div> 
                <div>
                <button className="btn waves-effect waves-light" type="submit" name="action">Enter<i className="material-icons right">send</i></button>
                </div> 
            </div>


        </div>     
    )
}
export default Login;