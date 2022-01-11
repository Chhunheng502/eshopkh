import {Link} from 'react-router-dom';

function Footer()
{
    return (
        <footer className="bg-secondary text-white text-center" style={{marginTop:"auto"}}>
            <div className="container p-4">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">eShop KH</h5>
                        <p>
                        Welcome to Eshop KH – the web's one-stop shop for apparel of all kinds.
                        We offer a wide selection of blank apparel styles, and brands for wearing every day.
                        Our goal is to satisfy the apparel needs of online shoppers with plenty of options, 
                        a user-friendly site and affordable prices.
                        </p>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Follow Us</h5>
                        <ul className="list-unstyled mb-0">
                            <li>
                            <a href="https://twitter.com/EshopKh" className="text-white"><i class="fa fa-facebook-official mr-2" aria-hidden="true"></i>Facebook</a>
                            </li>
                            <li>
                            <a href="https://twitter.com/EshopKh" className="text-white"><i class="fa fa-instagram mr-2" aria-hidden="true"></i>Instagram</a>
                            </li>
                            <li>
                            <a href="https://twitter.com/EshopKh" className="text-white"><i class="fa fa-twitter mr-2" aria-hidden="true"></i>Twitter</a>
                            </li>
                        </ul>
                    </div>  
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase mb-0">Let Us Help You</h5>
                        <ul className="list-unstyled">
                            <li>
                            <Link to="/user-profile" className="text-white">Your Account</Link>
                            </li>
                            <li>
                            <Link to="/track-orders" className="text-white">Your Order</Link>
                            </li>
                            <li>
                            <Link to="/shopping-policies" className="text-white">Shopping Policies</Link>
                            </li>
                            <li>
                            <Link to="/faq" className="text-white">Help</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-center p-3" style={{backgroundColor:"rgba(0, 0, 0, 0.2);"}}>
                © 2021 Copyright:
                <a className="text-white ml-1" href="https://eshopkh.netlify.app/">eshopkh.netifly.app</a>
            </div>
        </footer>
    );
}

export default Footer;