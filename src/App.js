import Header from './components/home/Header'
import {Home} from './components/home/Home'
import Footer from './components/home/Footer'
import CheckOut from './components/CheckOut'
import ThankYou from './components/ThankYou'
import LoginForm from './components/auth/LoginForm'
import UserProfile from './components/user/UserProfile'
import Coupon from './components/user/Coupon'
import TrackOrder from './components/user/TrackOrder'
import RegistrationForm from './components/auth/RegistrationForm'
import ProductList from './components/product/ProductList'
import AdminLogin from './components/admin/AdminLogin'
import AdminControl from './components/admin/AdminControl'
import Auth from './components/admin/Auth'
import DetailPage from './components/product/DetailPage'
import ContactUs from './components/ContactUs'
import AboutUs from './components/AboutUs'
import Faq from './components/Faq'
import ShoppingPolicies from './components/ShoppingPolicies'
import WishList from './components/WishList'

import {useState, useEffect} from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'


function App() {

  const [products, setProduct] = useState([]);

  useEffect (() => {

    axios.get('https://eshopkh-server-4xrg3.ondigitalocean.app/api/products/get')
    .then((response) => {
        for(const data of response.data)
        {
          setProduct(oldContents => [...oldContents, data]);
        }
        console.log('Success:', response);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    console.log('use effect');
  }, []);

  const product_detail_routes = products.map(val => {

    return(
      <Route path={`/${val.type}/${val.name}/${val.id}`} strict component={() => <DetailPage key={val.id} data={val} />} />
    )
  });

  var product_type = ['cm','cw','sm','sw','bm','bw','am','aw'];var product_type = ['cm','cw','sm','sw','bm','bw','am','aw'];

  const products_type_routes = product_type.map(val => {

    return(
      <Route path={`/${String(val).toLowerCase()}`} exact component={() => <ProductList type={val} val={products} > </ProductList>} />
    )
  })

  const [collections, setCollection] = useState([]);

  useEffect (() => {
    axios.get('https://eshopkh-server-4xrg3.ondigitalocean.app/api/collections/get')
      .then((response) => {
          for(const data of response.data)
          {
            setCollection(oldContents => [...oldContents, data]);
          }
          console.log('Success:', response);
      })
      .catch((error) => {
          console.error('Error:', error);
      });
      console.log('use effect');
  }, []);

  const collection_routes = collections.map(val => {

    let data = [];

    for(const i of val.products)
    {
      data.push(i[0]);
    }

    return(
      <Route path={`/collection/${String(val.name).replace(/\s+/g, '-').toLowerCase()}`} exact component={() => <ProductList val={data} > </ProductList>} />
    )
  })

  return (
    <Router>
      <Switch>
        <Route path="/admin-login" component={AdminLogin} />
        <PrivateRoute path="/admin-control" component={AdminControl} />
        <div>
          <Header> </Header>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/check-out" component={CheckOut}/>
            <Route path="/thank-you" component={ThankYou}/>
            <Route path="/login" component={LoginForm}/>
            <Route path="/user-profile" component={UserProfile}/>
            <Route path="/coupon" component={Coupon}/>
            <Route path="/track-orders" component={TrackOrder}/>
            <Route path="/register" component={RegistrationForm}/>
            {products_type_routes}
            {product_detail_routes}
            {collection_routes}
            <Route path="/products/search" component={ProductList} />
            <Route path="/contact-us" component = {ContactUs}/>
            <Route path="/detail-page" component = {DetailPage}/>
            <Route path="/about-us" component = {AboutUs}/>
            <Route path="/faq" component = {Faq}/>
            <Route path="/shopping-policies" component = {ShoppingPolicies}/>
            <Route path="/wish-list" component = {WishList}/>
          </Switch>
          <Footer> </Footer>
        </div>
      </Switch>
    </Router>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        Auth.isAuthenticated || sessionStorage.getItem("is_authenticated") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default App;
