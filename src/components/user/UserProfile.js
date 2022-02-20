import React,{useState, useEffect} from 'react';
import axios from 'axios';

function UserProfile() {

    const checkedUserID = sessionStorage.getItem("user-id");

    const fNameRef = React.createRef();
    const lNameRef = React.createRef();
    const emailRef = React.createRef();
    const passRef = React.createRef();
    const cpassRef = React.createRef();
    const phoneRef = React.createRef();
    const addressRef = React.createRef();

    const [user, setUser] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [couponCount, setCouponCount] = useState(0);
    const [wishlist, setWishlist] = useState(0);

    useEffect(() => {

        if(sessionStorage.getItem("user-id") !== null)
        {
            axios.get(`https://eshopkh-server-4xrg3.ondigitalocean.app/api/users/${Number(sessionStorage.getItem("user-id"))}`)
            .then((response) => {
                setUser(response.data);
                console.log('Success:', response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            axios.get(`https://eshopkh-server-4xrg3.ondigitalocean.app/api/orders/show/${Number(sessionStorage.getItem("user-id"))}`)
            .then((response) => {
                let temp = [];
                for(const data of response.data)
                {
                    if(data.is_accepted === 1)
                    {
                        temp.push(data);
                    }
                }
                setOrderData(temp);
                console.log('Success:', response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            axios.get(`https://eshopkh-server-4xrg3.ondigitalocean.app/api/users/promo/${Number(sessionStorage.getItem("user-id"))}`)
            .then((response) => {
                setCouponCount(response.data.length);
                console.log('Success:', response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            axios.get(`https://eshopkh-server-4xrg3.ondigitalocean.app/api/users/wishlist/${Number(sessionStorage.getItem("user-id"))}`)
            .then((response) => {
                setWishlist(response.data.length);
                console.log('Success:', response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }, [checkedUserID]);

    const [reset, setReset] = useState(false);

    const handleReset = (isTrue) => {

        document.getElementById('profile-first_name').disabled = !isTrue;
        document.getElementById('profile-last_name').disabled = !isTrue;
        document.getElementById('profile-email').disabled = !isTrue;
        document.getElementById('profile-phone').disabled = !isTrue;
        document.getElementById('profile-address').disabled = !isTrue;
        setReset(isTrue);
    }

    const handleSave = () => {

        if(passRef.current.value === cpassRef.current.value || passRef.current.value === null)
        {
            const myObj = {
                first_name: fNameRef.current.value,
                last_name: lNameRef.current.value,
                email: emailRef.current.value,
                phone: phoneRef.current.value,
                address: addressRef.current.value,
                password: passRef.current.value !== null ? passRef.current.value : null
            }
    
            axios.put(`https://eshopkh-server-4xrg3.ondigitalocean.app/api/users/${Number(sessionStorage.getItem("user-id"))}`, myObj)
            .then((response) => {
                setUser(response.data);
                console.log('Success:', response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            handleReset(false);
        }
        else
        {
            alert("Wrong Password");
        }
    }
 
    return (
        <div className="container bootstrap snippet">
            <div className="row">
                <div className="col-sm-4"> 
                
                    <div className="col-sm-10"><h3>{user.first_name + " " + user.last_name}</h3></div>

                    <ul className="list-group">
                        <li className="list-group-item text-muted">Activity <i className="fa fa-dashboard fa-1x"></i></li>
                        <li className="list-group-item text-right"><span className="pull-left"><strong>Orders</strong></span> {orderData.length}</li>
                        <li className="list-group-item text-right"><span className="pull-left"><strong>Total Cost</strong></span> ${orderData.reduce((accumulator, current) => accumulator + current.total_cost, 0)}</li>
                        <li className="list-group-item text-right"><span className="pull-left"><strong>Coupon</strong></span> {couponCount}</li>
                        <li className="list-group-item text-right"><span className="pull-left"><a href="/wish-list"><strong>Wishlist</strong></a></span> {wishlist}</li>
                    </ul> 
                
                </div>
                <div className="col-sm-8">
                    
                    <div className="tab-content">
                        <div className="tab-pane active" id="home">
                            <hr />
                            <form className="form" action="##" method="post" id="registrationForm">
                                <div className="form-group">
                                    
                                    <div className="col-xs-6">
                                        <label for="profile-first_name"><h4>First name</h4></label>
                                        <input type="text" className="form-control" ref={fNameRef} name="first_name" id="profile-first_name" defaultValue={user.first_name} disabled />
                                    </div>
                                </div>
                                <div className="form-group">
                                    
                                    <div className="col-xs-6">
                                        <label for="profile-last_name"><h4>Last name</h4></label>
                                        <input type="text" className="form-control" ref={lNameRef} name="last_name" id="profile-last_name" defaultValue={user.last_name} disabled />
                                    </div>
                                </div>

                                <div className="form-group">
                                    
                                    <div className="col-xs-6">
                                        <label for="profile-email"><h4>Email</h4></label>
                                        <input type="email" className="form-control" ref={emailRef} name="email" id="profile-email" defaultValue={user.email} disabled />
                                    </div>
                                </div>

                                <div className="form-group">
                                    
                                    <div className="col-xs-6">
                                        <label for="profile-phone"><h4>Phone</h4></label>
                                        <input type="text" className="form-control" ref={phoneRef} name="phone" id="profile-phone" defaultValue={user.phone} disabled />
                                    </div>
                                </div>

                                <div className="form-group">
                                    
                                    <div className="col-xs-6">
                                        <label for="profile-address"><h4>Address</h4></label>
                                        <input type="text" className="form-control" ref={addressRef} id="profile-address" defaultValue={user.address} disabled />
                                    </div>
                                </div>

                                {
                                    reset ?
                                    (
                                        <React.Fragment>
                                            <div className="form-group">
                                            
                                                <div className="col-xs-6">
                                                    <label for="password"><h4>New Password</h4></label>
                                                    <input type="password" className="form-control" ref={passRef} name="password" id="password" placeholder="New password" />
                                                </div>
                                            </div>
            
                                            <div className="form-group">
                                                
                                                <div className="col-xs-6">
                                                    <label for="password2"><h4>Verify Password</h4></label>
                                                    <input type="password" className="form-control" ref={cpassRef} name="password2" id="password2" placeholder="Verify password" />
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    ) : null
                                }
                                <div className="form-group">
                                    <div className="col-xs-12">
                                        <br />
                                        {reset ? <button className="btn btn-lg btn-success" type="submit" onClick={handleSave}><i className="glyphicon glyphicon-ok-sign"></i> Save</button> : null}
                                        <button className="btn btn-lg" type="reset" onClick={() => handleReset(true)}><i className="glyphicon glyphicon-repeat"></i> Reset</button>
                                    </div>
                                </div>
                            </form>
                        
                        <hr />
                        
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UserProfile;