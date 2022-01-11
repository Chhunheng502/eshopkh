import React from 'react';
import axios from 'axios'
import bcrypt from 'bcryptjs'
import {Link} from 'react-router-dom'

function LoginForm()
{
    const emailRef = React.createRef();
    const passRef = React.createRef();

    const loginHandler = () => {

        let isLogined = false;

        axios.get('https://eshopkh-api.herokuapp.com/api/users')
        .then((response) => {

            for(const data of response.data)
            {
                if(data.email === emailRef.current.value && bcrypt.compareSync(passRef.current.value, data.password))
                {
                    sessionStorage.setItem("user-id",data.id);
                    window.location.href = '/';
                    isLogined = true;
                }
            }
            if(!isLogined) {alert("Incorrect credentials. Please try again.")};
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(error);
        });
    }

    return (
        <div className="container" style={{minHeight:"100vh"}}>
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <div className="card-title text-center">
                                <img src="logo.png" alt="logo" width="60%" height="60%" style={{objectFit:"contain",borderRadius:"100px"}} />
                                <h4 className="p-2 mt-1">Login Form</h4>
                            </div>
                            <form className="form-signin">
                                <div className="form-label-group">
                                    <input type="email" ref={emailRef} id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
                                    <label for="inputEmail">Email address</label>
                                </div>
                    
                                <div className="form-label-group">
                                    <input type="password" ref={passRef} id="inputPassword" className="form-control" placeholder="Password" required />
                                    <label for="inputPassword">Password</label>
                                </div>
                    
                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" onClick={loginHandler}>Login</button>
                                <div className="p-1 mt-1 text-center">
                                    <p3> Not registered? <Link to="/register"> Create an account </Link> </p3>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default LoginForm;