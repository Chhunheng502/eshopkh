import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {useSharedFormState} from './Home'

function Header() {

    const checkedUserID = sessionStorage.getItem("user-id");

    const { numOfProducts, setNumOfProducts } = useSharedFormState();

    const [logined, setLogined] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {

        if(sessionStorage.getItem("user-id") !== null)
        {
            setLogined(true);

            axios.get(`https://eshopkh-p34hw.ondigitalocean.app/api/users/${Number(sessionStorage.getItem("user-id"))}`)
            .then((response) => {
                setUser(response.data);
                console.log('Success:', response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }, [checkedUserID]);

    const handleLogout = () => {

        sessionStorage.removeItem("user-id");
        sessionStorage.removeItem("numOfTempProductsInCart");
        setNumOfProducts(0);
        window.location.href = '/';
    }

    return (
        <header className="sticky-top">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">
                    <img
                        alt="logo"
                        src="logo.png"
                        width="90"
                        height="40"
                        className="d-inline-block align-top"
                        style={{objectFit:"contain",borderRadius:"20px"}}
                    />{' '}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="header-menu" />
                <Navbar.Collapse id="header-menu">
                    <Nav className="mr-auto">
                        <NavDropdown title="Men" id="basic-nav-dropdown">
                            <NavDropdown.Item> <Link className="text-secondary text-decoration-none" to="/cm"> Clothing </Link> </NavDropdown.Item>
                            <NavDropdown.Item> <Link className="text-secondary text-decoration-none" to="/sm"> Shoes </Link> </NavDropdown.Item>
                            <NavDropdown.Item> <Link className="text-secondary text-decoration-none" to="/bm"> Bags </Link> </NavDropdown.Item>
                            <NavDropdown.Item> <Link className="text-secondary text-decoration-none" to="/am"> Accessories </Link> </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Women" id="basic-nav-dropdown">
                            <NavDropdown.Item> <Link className="text-secondary text-decoration-none" to="/cw"> Clothing </Link> </NavDropdown.Item>
                            <NavDropdown.Item> <Link className="text-secondary text-decoration-none" to="/sw"> Shoes </Link> </NavDropdown.Item>
                            <NavDropdown.Item> <Link className="text-secondary text-decoration-none" to="/bw"> Bags </Link> </NavDropdown.Item>
                            <NavDropdown.Item> <Link className="text-secondary text-decoration-none" to="/aw"> Accessories </Link> </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link> <Link className="text-secondary text-decoration-none" to="/contact-us"> Contact </Link> </Nav.Link>
                        <Nav.Link> <Link className="text-secondary text-decoration-none" to="/about-us"> About us </Link> </Nav.Link>
                    </Nav>
                    <div className="d-flex">
                        {!logined ? 
                            <Link to="/login" className="mt-2" style={{textDecoration:"none",color:"black"}}> <span style={{cursor:"pointer", marginRight:"4px"}}> Login </span> </Link>
                            :
                            <Nav>
                                <NavDropdown title={user.first_name} id="basic-nav-dropdown">
                                    <NavDropdown.Item> <Link className="text-secondary text-decoration-none" to="/user-profile"> User Profile </Link> </NavDropdown.Item>
                                    <NavDropdown.Item> <Link className="text-secondary text-decoration-none" to="/coupon"> Coupon </Link> </NavDropdown.Item>
                                    <NavDropdown.Item> <Link className="text-secondary text-decoration-none" to="/track-orders"> Track Orders </Link> </NavDropdown.Item>
                                    <NavDropdown.Item><span onClick={handleLogout} style={{cursor:"pointer", marginRight:"4px"}}> Logout </span></NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        }
                        <div className="d-flex mr-1 mt-1">
                            <Link to="/check-out"> <img src="cart.png" width="30px" height="30px" style={{cursor:"pointer", marginRight:"2px"}} alt="" /> </Link>
                            <p className="p-1"> {numOfProducts} </p>
                        </div>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}

export default Header;