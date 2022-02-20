import React from 'react'
import axios from 'axios'
import Auth from './Auth'
import bcrypt from 'bcryptjs'

function AdminLogin(props) {

    const nameRef = React.createRef();
    const passwordRef = React.createRef();

    const centerForm = {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        padding: "30px",
        border: "1px solid black",
        borderRadius: "10px"
    }

    const loginHandler = () => {

        let isLogined = false;

        axios.get('https://eshopkh-server-4xrg3.ondigitalocean.app/api/admin')
        .then((response) => {

            for(const data of response.data)
            {
                if(data.name === nameRef.current.value && bcrypt.compareSync(passwordRef.current.value, data.password))
                {
                    Auth.login(() => {
                        sessionStorage.setItem("is_authenticated", true);
                        props.history.push('/admin-control');
                    });

                    isLogined = true;
                }
            }
            if(!isLogined) {alert("Incorrect credentials. Please try again.")}
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(error);
        });
    }

    return(
        <div style={centerForm}>
            <div className="mb-3 text-center">
                <i className="fa fa-user-circle-o fa-5x" aria-hidden="true"></i>
                <h3> Admin </h3>
            </div>
            <form>
                <div className="form-group">
                    <lable for="name"> Username: </lable>
                    <input ref={nameRef} type="text" class="form-control" style={{width:"300px"}} placeholder="Enter Name" id="email" />
                </div>
                <div className="form-group"> 
                    <label for="password"> Password: </label>
                    <input ref={passwordRef} type="password" class="form-control" style={{width:"300px"}} placeholder="Enter password" id="password" />
                </div>
                <div className="text-center">
                    <button onClick={loginHandler} type="button" id="login-btn" className="btn btn-primary"> Login </button>
                </div>
            </form>
        </div>
    )
}

export default AdminLogin;