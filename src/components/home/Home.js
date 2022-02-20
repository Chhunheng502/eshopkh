import axios from 'axios'
import React, {createRef, useEffect, useState} from 'react'
import $ from 'jquery';
import {Link, useHistory} from 'react-router-dom'
import { useBetween } from "use-between"
const useFormState = () => {
    var num = 0;
    if(sessionStorage.getItem("numOfTempProductsInCart") !== null)
    {
        num = JSON.parse(sessionStorage.getItem("numOfTempProductsInCart")).length;
    }
    const [numOfProducts, setNumOfProducts] = useState(num);
  return {
    numOfProducts, setNumOfProducts
  };
};

const useSharedFormState = () => useBetween(useFormState);

function Home() {

    if(sessionStorage.getItem("is_authenticated") !== undefined)
    {
        sessionStorage.removeItem("is_authenticated");
    }

    let history = useHistory();

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

    const collection_list = collections.map(val => {
        return (
            <ProductCollections key={val.id} data={val}> </ProductCollections>
        )
    });

    const [productsFromCollection, setProductsFromCollection] = useState([]);

    useEffect (() => {

        if(productsFromCollection.length === 0 && collections.length > 0) {
            for(const data of collections)
            {
                if(data.name === "Top Sellers")
                {
                    setProductsFromCollection(data.products);
                    break;
                }
            }
        }
        console.log('use effect');
    }, [collections, productsFromCollection]);

    const currentCart = [];

    const { setNumOfProducts } = useSharedFormState();

    if(sessionStorage.getItem("numOfTempProductsInCart") !== null)
    {
        let itemsToCopy = JSON.parse(sessionStorage.getItem("numOfTempProductsInCart"));
        itemsToCopy.forEach(val => currentCart.push(val));
    }

    const handleAddToCart = (item) => {

        let currentDate = new Date();

        let myObj = {
            id: item.id,
            name: item.name,
            price: item.price,
            feature: item.feature,
            quantity: 0,
            date: currentDate.getDate()
        };

        currentCart.push(myObj);
        sessionStorage.setItem("numOfTempProductsInCart",JSON.stringify(currentCart));
        setNumOfProducts(currentCart.length);
    }

    const product_list = productsFromCollection.map(val => {
        return (
            <ProductSlides key={val[0].id} data={val[0]} onAdd={() => handleAddToCart(val[0])}> </ProductSlides>
        )
    });

    var sliderIndex = [0,0];

    const slideLeft = (i, itemID) => {

        sliderIndex[i] = (sliderIndex[i] < 1) ? 0 : sliderIndex[i] - 1;
        var pct = sliderIndex[i] * (-105);
        $(".slider-method" + itemID).css("transform", "translateX(" + pct + "%)");
    }

    const slideRight = (i, itemID) => {

        sliderIndex[i] = (sliderIndex[i] >= ((itemID === "#home-slider-1") ? collections.length -1 : productsFromCollection.length - 1)) ? 0 : sliderIndex[i] + 1;
        var pct = sliderIndex[i] * (-105);
        $(".slider-method" + itemID).css("transform", "translateX(" + pct + "%)");
    }

    const [content1, setContent1] = useState([]);
    const [content2, setContent2] = useState([]);

    useEffect(() => {

        axios.get('https://eshopkh-server-4xrg3.ondigitalocean.app/api/home/content/get')
        .then((response) => {
            for (const data of response.data) {
                if(Number(data.type) === 1)
                {
                    setContent1(oldContent => [...oldContent, data]);
                }
                else
                {
                    setContent2(oldContent => [...oldContent, data]);
                }
            }
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    const searchRef = createRef();
    const [products, setProducts] = useState([]);

    useEffect(() => {

        console.log(products);
        sessionStorage.setItem("searchedItem", JSON.stringify(products));

        if(JSON.parse(sessionStorage.getItem("searchedItem")).length !== 0)
        {
            history.push("/products/search");
        }
    }, [products, history]);

    const handleSearch = async () => {

        await axios.get('https://eshopkh-server-4xrg3.ondigitalocean.app/api/products/get')
        .then((response) => {
            setProducts(response.data.filter(item => String(item.name).toLowerCase().includes(String(searchRef.current.value).toLowerCase())));
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const myContent1 = content1.map(val => {

        return (
            <div className="card border-0" style={{width:"22rem"}}>
                <img className="card-img-top" src={val.image} alt="" />
                <div class="card-body">
                    <h5 class="card-title">{val.title}</h5>
                    <p class="card-text">{val.content}</p>
                </div>
            </div>
        )
    })

    const myContent2 = content2.map(val => {

        return (
            <div className="d-flex align-items-center justify-content-center mb-5">
                <h5 className="p-1 mr-2"> {val.title} <br /> <span className="text-primary"> {val.content} </span>  </h5> 
                <img src={val.image} width="150px" height="180px" alt="" />
            </div> 
        )
    })

    return (
        <main>
            <div className="text-center p-0 m-0">
                <div className="background-image">
                    <img src="background.jpg" width="100%" height="600px" style={{objectFit:"cover"}} alt="" />
                    <div className="center-items-inImage">
                        <div>
                            <h1>eShop KH</h1>
                            <p>A place you can find everything in one click</p>
                        </div>
                        <form className="form-inline">
                            <input className="form-control mr-sm-2" type="search" ref={searchRef} placeholder="Search" aria-label="Search" />
                            <button className="btn btn-success my-2 my-sm-0" type="button" onClick={handleSearch}>Search</button>
                        </form>
                    </div>
                </div>
            </div>
            <hr />
            <div className="position-relative m-3">
                <h3 style={{marginLeft:"80px"}}> Shop Top Categories </h3>
                <div className="d-flex p-2 mt-2" style={{width:"90%",margin:"auto",overflow:"hidden"}}>
                    {collection_list}
                </div>
                <div className="headslider-Lbtn"> <button onClick={() => slideLeft(0,"#home-slider-1")}> <i class="fa fa-arrow-left" aria-hidden="true"></i> </button></div>
                <div className="headslider-Rbtn"> <button onClick={() => slideRight(0,"#home-slider-1")}> <i class="fa fa-arrow-right" aria-hidden="true"></i> </button></div> 
            </div>
            <hr />
            <div className="position-relative m-3">
                <h3 style={{marginLeft:"80px"}}> eShopKH Top Sellers </h3>
                <div className="headslider">
                    {product_list}
                </div>
                <div className="headslider-Lbtn"> <button onClick={() => slideLeft(1,"#home-slider-2")}> <i class="fa fa-arrow-left" aria-hidden="true"></i> </button></div>
                <div className="headslider-Rbtn"> <button onClick={() => slideRight(1,"#home-slider-2")}> <i class="fa fa-arrow-right" aria-hidden="true"></i> </button></div> 
            </div>
            <hr />
            <div>
                <h2 className="text-center m-3"> This week's highlights </h2>
                <div className="d-flex justify-content-around flex-wrap">
                    {myContent1}
                </div>
            </div>
            <hr />
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1> Best Collection of <br /> This Month </h1>
                        <p> Give your wardrobe a re-vamp for the season ahead with the <br/> impressive collection of men’s designer clothes at eShop KH. </p>
                        <div className="text-center" style={{marginTop:"100px"}}>
                        <Link to='/collection/best-collection-monthly'> <button type="button" className="btn btn-primary"> Show now </button> </Link>
                            <div className="p-3 mt-5">
                                <img src="https://preview.colorlib.com/theme/estore/assets/img/collection/collection1.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col p-3">
                        <div className="d-flex justify-content-center">
                            <img src="https://preview.colorlib.com/theme/estore/assets/img/collection/collection2.png" alt="" />
                        </div>
                    </div>
                    <div className="col">
                        {myContent2}
                    </div>
                </div>
            </div>
        </main>
    )
}

function ProductCollections(props) {

    return(
        <div className="slider-method mr-3" style={{transition:"all 0.3s"}} id="home-slider-1">
            <div className="card shadow-sm" style={{width:"320px",height:"350px"}}>
                <Link to={`/collection/${String(props.data.name).replace(/\s+/g, '-').toLowerCase()}`}> <img src={props.data.image} className="card-img-top" width="100%" height="280px" style={{cursor:"pointer",objectFit:"cover"}} alt="" /> </Link>
                <div className="card-body">
                    <h5 class="card-title">{props.data.name}</h5>
                </div>
            </div>
        </div>
    )
}

function ProductSlides(props) {

    return (
        <div className="headslider-display slider-method" id="home-slider-2">
            <div className="info">
                <div className="row">
                    <div className="price col-md-6">
                        <h5 style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{props.data.name}</h5>
                        <h5 className="price-text-color">${props.data.price}</h5>
                    </div>
                    <div className="rating hidden-sm col-md-6">
                        <i className="price-text-color fa fa-star"></i>
                        <i className="price-text-color fa fa-star"></i>
                    </div>
                </div>
                <div className="product-image">
                    <img src={props.data.primary_image} alt="" />
                </div>
                <div className="info">
                    <div className="separator clear-left">
                        <p className="btn-add">
                            <i className="fa fa-shopping-cart"></i><span className="text-primary" onClick={props.onAdd} style={{cursor:"pointer"}}>Add to cart</span>
                        </p>
                        <p className="btn-details">
                            <Link to={{pathname: `/${props.data.type}/${props.data.name}/${props.data.id}`}} style={{textDecoration:"none",color:"black"}}>
                                <i className="fa fa-list"></i><span className="text-primary" style={{cursor:"pointer"}}>More details</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {Home,useSharedFormState};