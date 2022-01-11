import { Link } from 'react-router-dom'
import React, {createRef, useEffect, useState } from 'react'
import Pagination from '@material-ui/lab/Pagination';
import { MDBCol } from "mdbreact";
import {useSharedFormState} from '../home/Home'

function ProductList(props) {
    
    const [contents, setContents] = useState();
    const currentCart = [];

    const searchRef = createRef();
    // const [products, setProducts] = useState([]);

    const { setNumOfProducts } = useSharedFormState();

    if(sessionStorage.getItem("numOfTempProductsInCart") !== null)
    {
        let itemsToCopy = JSON.parse(sessionStorage.getItem("numOfTempProductsInCart"));
        itemsToCopy.forEach(val => currentCart.push(val));
    }

    const handleSearch = () => {
            setContents(contents.filter(item => String(item.name).toLowerCase().includes(String(searchRef.current.value).toLowerCase())))
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

   

    const [currentPosts, setCurrentPost] = useState();
    const postPerpage = 15;

    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {

        let productArr = [];

        if(props.val === undefined)
        {
            if(sessionStorage.getItem("searchedItem") !== null)
            {
                let itemsToCopy = JSON.parse(sessionStorage.getItem("searchedItem"));
                itemsToCopy.forEach(val => productArr.push(val));
                setContents(productArr);
            }

            console.log(1);
        }
        else
        {
            if (props.type !== undefined) {
                let array = props.val.filter(element => element.type === props.type);
                array = array.filter(element => element.quantity > 0);
                setContents(array);
            }
            else {
                let array = props.val;
                array = array.filter(element => element.quantity > 0);
                setContents(array);
            }

            console.log(2);
        }

    }, [props.type, props.val]);


    useEffect(() => {
        if (contents) {
            setCurrentPost(contents.slice(postPerpage * (page - 1), postPerpage * page))
        }
    }, [contents, page]);


    const handleSelect = (event) => {
        let ordered;
        setPage(1)
        if (event.target.value === "lowtohigh") {
            ordered = contents.sort((a, b) => {
                if (Number(a.price) === Number(b.price)) {
                    return 0
                }

                return Number(a.price) > Number(b.price) ? 1 : -1
            });
            setCurrentPost(ordered.slice(postPerpage * (page - 1), page * postPerpage))
        }
        else if (event.target.value === "hightolow") {

            ordered = contents.sort((a, b) => {
                if (Number(a.price) === Number(b.price)) {
                    return 0
                }

                return Number(a.price) < Number(b.price) ? 1 : -1
            });
            setCurrentPost(ordered.slice(postPerpage * (page - 1), page * postPerpage))
        }
        console.log(currentPosts);
    };


    useEffect(() => {
        if (contents && page === 1) {
            setCurrentPost(contents.slice(0, 15))
        }
        else if (contents) {
            setCurrentPost(contents.slice(postPerpage * (page - 1)), postPerpage * page)
        }
    }, [contents, page]);

    const myData = currentPosts ? currentPosts.map(val => {

        return (
            <div className="product-container">
                <div className="image">
                    <Link to={{ pathname: `/${String(val.type).toLowerCase()}/${String(val.name).toLowerCase()}/${val.id}` }}>
                        <img className="product-img" src={val.primary_image} alt="" />
                    </Link>
                    <p className="favorite"></p>
                </div>
                <div className="product-detail">
                <p className="btn-add">
                    <i className="fa fa-shopping-cart"></i><span className="text-primary" onClick={() => handleAddToCart(val)}  style={{ cursor: "pointer" }}> Add </span>
                </p>
                    <p style={{ fontFamily: "Helvetica Neue", fontWeight: "bold", fontSize: "18px" }}>{val.name}</p>
                    <p>{val.feature}</p>
                    <p>${val.price}</p>
                </div>
            </div>
        )
    }) : null;

    return (
        <div>
            <div className="interface-sidebar mt-5 ml-5 mb-5">
                <select className="custom-select" onChange={(event) => handleSelect(event)} name="Sort By" id="sort-by" style={{ width: "200px" }}>
                    <option selected> Sort By... </option>
                    <option value="lowtohigh">Price : Low to High</option>
                    <option value="hightolow">Price : High to Low</option>
                </select>
                <MDBCol md="6">
                    <form className="form-inline">
                        <input className="form-control form-control ml-70 w-500" type="search" ref={searchRef} placeholder="Search"  />
                        <button className="btn btn-success my-2 my-sm-0" type="button" onClick={handleSearch}>Search</button>
                    </form>
                </MDBCol>
            </div>
            <div className="interface-main">
                <div className="interface-mainbar">
                    {myData}
                </div>
            </div>
            <div className="d-flex justify-content-center">
                {
                    contents ? <Pagination count={Math.ceil(contents.length / postPerpage)} page={page} onChange={handleChange} />
                        : null
                }

            </div>
        </div>
    
    )
}

export default ProductList;