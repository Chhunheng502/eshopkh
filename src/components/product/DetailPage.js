import React from 'react'
import {useSharedFormState} from '../home/Home'
import axios from 'axios'

function DetailPage(props) {

    const currentWishlist = [];

    if(sessionStorage.getItem("numOfTempProductsInWishlist") !== null)
    {
        let itemsToCopy = JSON.parse(sessionStorage.getItem("numOfTempProductsInWishlist"));
        itemsToCopy.forEach(val => currentWishlist.push(val));
    }

    const handleAddToWishlist = () => {

        axios.post(`https://eshopkh-server-4xrg3.ondigitalocean.app/api/users/wishlist/${Number(sessionStorage.getItem("user-id"))}/${props.data.id}`)
        .then((response) => {
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const currentCart = [];

    const {setNumOfProducts } = useSharedFormState();

    if(sessionStorage.getItem("numOfTempProductsInCart") !== null)
    {
        let itemsToCopy = JSON.parse(sessionStorage.getItem("numOfTempProductsInCart"));
        itemsToCopy.forEach(val => currentCart.push(val));
    }

    const handleAddToCart = () => {

        let currentDate = new Date();

        let myObj = {
            id: props.data.id,
            name: props.data.name,
            price: props.data.price,
            feature: props.data.feature,
            quantity: 0,
            date: currentDate.getDate()
        };

        currentCart.push(myObj);
        sessionStorage.setItem("numOfTempProductsInCart",JSON.stringify(currentCart));
        setNumOfProducts(currentCart.length);
    }

    var productInfo = String(props.data.highlight).split(",");

    const list_of_info = productInfo.map(val => {

        return(<li>{val}</li>)
    })

    return (
        <div>
        <main className="detail-page-main">
            <div className="detail-page-flex-container">
                <div className="detail-page-primary-img container-1-flex-item-1" style={{backgroundImage: 'url(' + props.data.primary_image + ')'}}></div>
                <div className="detail-page-secondary-img-1 container-1-flex-item-1" style={{backgroundImage: 'url(' + props.data.secondary_image1 + ')'}}></div>
                <div className="detail-page-right-content container-1-flex-item-1">
                    <p style={{lineHeight: "10%"}}><b>{props.data.name}</b></p>
                    <p style={{lineHeight: "80%"}}>{props.data.feature}</p>
                    <p style={{lineHeight: "200%"}}>${props.data.price}</p>
                    <button className="detail-page-add-to-cart-button" onClick={handleAddToCart}>Add To Cart</button>
                    <button className="detail-page-wish-list" onClick={handleAddToWishlist}>Wishlist <i className="fa fa-star-o" aria-hidden="true"></i></button>
                </div>  
            </div>
            <div className="detail-page-lower-part"> 
                <p><b>Name</b></p>
                <p>Feature</p>
            </div>
            <div className="detail-page-flex-container-2">
                <div className="detail-page-info container-2-flex-item-1">{props.data.info}</div>
                <div className="detail-page-highlight container-2-flex-item-2">
                    <p style={{marginLeft: "24px", color: "#727272"}}>Highlights</p>
                    <ul>
                        {list_of_info}
                    </ul>
                </div>
                <div className="detail-page-secondary-img-2 container-2-flex-item-3" style={{backgroundImage: 'url(' + props.data.secondary_image2 + ')'}}></div>  
            </div>
        </main>
        </div>
    )
}

export default DetailPage;