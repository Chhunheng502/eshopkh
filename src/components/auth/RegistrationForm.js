import React, {useState} from 'react';
import axios from 'axios'

function RegisterForm(props)
{
    const fNameRef = React.createRef();
    const lNameRef = React.createRef();
    const emailRef = React.createRef();
    const passRef = React.createRef();
    const cpassRef = React.createRef();
    const [genderRef, setGenderRef] = useState();
    const ageRef = React.createRef();
    const phoneRef = React.createRef();
    const addressRef = React.createRef();

    const handleRegistrationForm = (event) => {

        event.preventDefault();

        if(String(emailRef.current.value).includes('@') && String(emailRef.current.value).includes('.com'))
        {
            if(passRef.current.value === cpassRef.current.value)
            {
                if(String(passRef.current.value).length >= 6)
                {
                    const dataObj = {
                        first_name: fNameRef.current.value,
                        last_name: lNameRef.current.value,
                        email: emailRef.current.value,
                        password: passRef.current.value,
                        gender: genderRef, 
                        age: ageRef.current.value,  
                        phone: phoneRef.current.value,
                        address: addressRef.current.value 
                    };
            
                    axios.post('https://eshopkh-server-4xrg3.ondigitalocean.app/api/users',  dataObj)
                    .then((response) => {
                        props.history.push('/login');
                        console.log('Success:', response);
                    })
                    .catch((error) => {
                        alert("This account is already exist");
                        console.error('Error:', error);
                    });
                }
                else
                {
                    alert("Password length must be at least 6 digits");
                }
            }
            else
            {
                alert("Incorrect password");
            }
        }
        else
        {
            alert("Incorrect email");
        }
    };

    return (
        <div className="w-50 p-5 mx-auto" style={{minHeight:"100vh"}}>
            <div className="mb-3 text-center">
                <h3> Create Account </h3>
            </div>
            <form>
                <div className="row mb-1">
                    <div className="col-md-6">
                        <label for="inputFName">First Name</label>
                        <input type="text" ref={fNameRef} id="inputFName" className="form-control" placeholder="Enter first name" required autofocus />
                    </div>
                    <div className="col-md-6">
                        <label for="inputLName">Last Name</label>
                        <input type="text" ref={lNameRef} id="inputLName" className="form-control" placeholder="Enter last Name" required autofocus />
                    </div>
                </div>
                <div className="mb-1">
                    <label for="inputEmail">Email</label>
                    <input type="email" ref={emailRef} id="inputEmail" className="form-control" placeholder="Enter email" required autofocus />
                </div>
                <div className="row mb-1">
                    <div className="col-md-6">
                        <label for="inputPassword">Password</label>
                        <input type="password" ref={passRef} id="inputPassword" className="form-control" placeholder="Enter password" required autofocus />
                    </div>
                    <div className="col-md-6">
                        <label for="inputCPassword">Confirm Password</label>
                        <input type="password" ref={cpassRef} id="inputCPassword" className="form-control" placeholder="Enter password again" required autofocus />
                    </div>
                </div>
                <div className="row mt-3 mb-1">
                    <div className="col-md-6" onChange={(event) => {setGenderRef(event.target.value)}}>
                        <label className="form-check-label mr-3"> Gender </label>
                        <div className="form-check mr-3">
                            <input className="form-check-input" type="radio" name="gender" id="male" value="M" />
                            <label className="form-check-label" for="male">
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" id="female" value="F" />
                            <label className="form-check-label" for="female">
                                Female
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6 mt-2">
                        <label for="age" className="form-label">Age</label>
                        <input type="range" className="form-range" ref={ageRef} id="age" defaultValue="18" min="1" max="100" onChange={(event) => {document.getElementById("userAge").innerHTML = event.target.value}}/>
                        <output id="userAge">18</output>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label for="inputPhone">Phone</label>
                        <input type="number" ref={phoneRef} id="inputPhone" className="form-control" placeholder="Enter phone" required autofocus />
                    </div>
                    <div className="col-md-6">
                        <label for="inputAddress">Address</label>
                        <input type="text" ref={addressRef} id="inputAddress" className="form-control" placeholder="Russey Keo, Phnom Penh" required autofocus />
                    </div>
                </div>
                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={handleRegistrationForm}>Create</button>
            </form>
        </div>
    )   
}

export default RegisterForm;