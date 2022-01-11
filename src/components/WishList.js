 import React, {useEffect, useState} from 'react'
 import {Link} from 'react-router-dom'
 import axios from 'axios'

 function WishList () {

    const [contents, setContents] = useState([]);

    useEffect (() => {

        axios.get(`https://eshopkh-api.herokuapp.com/api/users/wishlist/${Number(sessionStorage.getItem("user-id"))}`)
        .then((response) => {
            for(const data of response.data)
            {
              setContents(oldContents => [...oldContents, data]);
            }
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        console.log('use effect');
      }, []);

    const handleDropping = (id) => {

        axios.post(`https://eshopkh-api.herokuapp.com/api/users/wishlist/delete/${Number(sessionStorage.getItem("user-id"))}/${id}`)
        .then((response) => {
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        setContents(contents.filter(item => item[0].id !== id));
    }

    const myData = contents.map(val => {
        return(
            <div className="product-container">
                <i className="fa fa-minus-circle pl-2 pt-2" onClick={() => handleDropping(val[0].id)} style={{cursor:"pointer",color:"red"}} aria-hidden="true"></i>
                <div className="image">
                    <Link to={{ pathname: `/${String(val[0].type).toLowerCase()}/${String(val[0].name).toLowerCase()}/${val[0].id}` }}>
                        <img className="product-img" src={val[0].primary_image} alt="" />
                    </Link>
                    <p className="favorite"></p>
                </div>
                <div className="product-detail">
                    <p style={{ fontFamily: "Helvetica Neue", fontWeight: "bold", fontSize: "18px" }}>{val[0].name}</p>
                    <p>{val[0].feature}</p>
                    <p>${val[0].price}</p>
                </div>
            </div>
        )
    })

        return (
            <div className="container p-5">
                <div className="interface-main">
                    <div className="interface-mainbar">
                        {myData}
                    </div>
                </div>
            </div>
        )
    }


 export default WishList;