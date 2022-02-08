import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useSharedFormState} from './home/Home'

function CheckOut(props) {

    var currentDate = new Date();

    const checkedUserID = sessionStorage.getItem("user-id");
    const checkedProducts = sessionStorage.getItem("numOfTempProductsInCart");

    const msToDay = (duration) => {
        let minutes = Math.floor(duration / 60000);
        let  hours = Math.floor((minutes / 60));
        let days = Math.floor(hours / 24);
      
        return days;
    }

    const codeRef = React.createRef();
    const [promoCodes, setPromoCodes] = useState([]);

    const { setNumOfProducts } = useSharedFormState();

    const [logined, setLogined] = useState(false);

    useEffect(() => {

        if(sessionStorage.getItem("user-id") !== null)
        {
            setLogined(true);
        }

    }, [checkedUserID]);

    const [productsInCart, setProductsInCart] = useState([]);
    const [countOfProducts, setCountOfProducts] = useState(0);

    useEffect(() => {

        if(sessionStorage.getItem("numOfTempProductsInCart") !== null)
        {
            let numOfTempProductsInCart = [];
    
            let itemsToCopy = JSON.parse(sessionStorage.getItem("numOfTempProductsInCart"));
            itemsToCopy.forEach(val => numOfTempProductsInCart.push(val));
    
            setCountOfProducts(itemsToCopy.length);
    
            var count = {};
            numOfTempProductsInCart.forEach(item => { count[item.id] = (count[item.id]||0) + 1;});
    
            numOfTempProductsInCart = [...new Map(numOfTempProductsInCart.map(item => [item['id'], item])).values()];
    
            for(let i = 0; i < numOfTempProductsInCart.length; i++)
            {
                numOfTempProductsInCart[i].quantity = count[numOfTempProductsInCart[i].id];
            }

            numOfTempProductsInCart.sort(function(a, b){
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            })
    
            setProductsInCart(numOfTempProductsInCart);
        }
        
    }, [checkedProducts]);

    const handleDroppingProduct = (id, name) => {

        let itemsToCopy = JSON.parse(sessionStorage.getItem("numOfTempProductsInCart"));

        let tempProducts = [];
        itemsToCopy.forEach(val => tempProducts.push(val));

        for(let i = 0; i < tempProducts.length; i++)
        {
            if(tempProducts[i].id === id && tempProducts[i].name === name)
            {
               tempProducts.splice(i,1);
               break;
            }
        }

        setNumOfProducts(tempProducts.length);
        sessionStorage.setItem("numOfTempProductsInCart",JSON.stringify(tempProducts));
    }

    const [payment, setPayment] = useState('Cash');

    const handleCheckout = async (event) => {

        event.preventDefault();

        let detail = [];

        for(const data of productsInCart)
        {
            const temp = {
                product_id: data.id,
                product_name: data.name,
                product_price: data.price,
                quantity: data.quantity
            };

            detail.push(temp);
        }

        const dataObj = {
            user_id: sessionStorage.getItem("user-id"),
            total_cost: totalCost,
            payment: payment,
            is_accepted: false,
            detail: detail
        };

        axios.post('https://eshopkh-p34hw.ondigitalocean.app/api/orders/store',  dataObj)
        .then((response) => {
            if(response.data === 'success')
            {
                sessionStorage.removeItem("numOfTempProductsInCart");
                setNumOfProducts(0);
                props.history.push('/thank-you');
            }
            else
            {
                alert(JSON.stringify(response.data));
            }
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        let setOfCodes = [];

        for(const data of promoCodes)
        {
            setOfCodes.push(data.promo_code);
        }

        axios.post(`https://eshopkh-p34hw.ondigitalocean.app/api/users/promo/delete/${Number(sessionStorage.getItem("user-id"))}`, {promo_code: setOfCodes})
        .then((response) => {
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const [totalCost, setTotalCost] = useState(0);
    const [totalReduction, setTotalReduction] = useState(0);

    useEffect(() => {

        let cost = 0;
        productsInCart.forEach(val => cost += (Number(val.price) * Number(val.quantity)));
        setTotalCost(cost);
        
    }, [productsInCart]);

    const [coupon, setCoupon] = useState([]);

    const handleRedeemCode = (event) => {

        event.preventDefault();

        axios.post(`https://eshopkh-p34hw.ondigitalocean.app/api/users/promo/redeem/${Number(sessionStorage.getItem("user-id"))}`, {promo_code: codeRef.current.value})
        .then((response) => {
            const begunDate =  new Date(String(response.data[0].created_at).split('T')[0]);
            const valid_date = 30 - msToDay(currentDate.getTime() - begunDate.getTime());
            if(valid_date >= 0)
            {
                if(promoCodes.length !== 0)
                {
                    for(const data of promoCodes)
                    {
                        if(data.promo_code !== codeRef.current.value)
                        {
                            setCoupon(response.data[0]);
                            setPromoCodes(oldContents => [...oldContents, response.data[0]]);
                        }
                    }
                }
                else
                {
                    setCoupon(response.data[0]);
                    setPromoCodes(oldContents => [...oldContents, response.data[0]]);
                }
            }
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {

        let reduction = 0;

        for(const data of productsInCart)
        {
            if(Number(data.id) === Number(coupon.product_id))
            {
                if(String(coupon.coupon_type)[0] === 'D')
                {
                    reduction += data.price * (1 - Number(String(coupon.coupon_type).slice(1, String(coupon.coupon_type).length)) / 100);
                }
                else if(String(coupon.coupon_type)[0] === 'S')
                {
                    reduction += Number(String(coupon.coupon_type).slice(1, String(coupon.coupon_type).length));
                }
                else if(String(coupon.coupon_type)[0] === 'B')
                {
                    if(data.quantity >= 3)
                    {
                        reduction += data.price;
                    }
                }
                else
                {
                    reduction += 2;
                    setDeliveryCost(0);
                }
            }
        }
        setTotalReduction(totalReduction + reduction);
        setTotalCost(totalCost - reduction);
        
    }, [coupon])

    const [deliveryCost, setDeliveryCost] = useState(2);

    const myBill = productsInCart.map(val => {
        return(
            <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 className="my-0">
                        <i className="fa fa-minus-circle mr-1" onClick={() => handleDroppingProduct(val.id, val.name)} style={{cursor:"pointer",color:"red"}} aria-hidden="true"></i>
                        {val.name}
                        <span><i class="fa fa-times ml-1 mr-1" aria-hidden="true"></i>{val.quantity}</span>
                    </h6>
                    <small className="text-muted">{val.feature}</small>
                </div>
                <span className="text-muted">${val.price}</span>
            </li>
        )
    })

    return (
        <div className="container p-5">
            <main>
                <div className="text-center">
                    <h2>Checkout form</h2>
                </div>

                <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-primary">Your cart</span>
                        <span className="badge bg-primary rounded-pill">{countOfProducts}</span>
                    </h4>
                    <ul className="list-group mb-3">
                        {myBill}
                        <li className="list-group-item d-flex justify-content-between bg-light">
                            <div className="text-success">
                            <h6 className="my-0">Promo code</h6>
                            </div>
                            <span className="text-success">−${totalReduction.toFixed(2)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between bg-light">
                            <div className="text-success">
                            <h6 className="my-0">Delivery cost</h6>
                            </div>
                            <span className="text-success">${deliveryCost}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (USD)</span>
                            <strong>${(totalCost + deliveryCost).toFixed(2)}</strong>
                        </li>
                    </ul>
                    <form className="card p-2">
                        <div className="input-group">
                            <input type="text" className="form-control" ref={codeRef} placeholder="Promo code" />
                            <button type="submit" className="btn btn-secondary" onClick={(event) => handleRedeemCode(event)}>Redeem</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-7 col-lg-8">
                    {
                        !logined ? 
                        (
                            <div className="text-center">
                                <span> Please login to purchase. </span>
                            </div>
                        )
                        :
                        (
                            <form className="needs-validation" novalidate>
                                <h4 className="mb-3">Payment</h4>
                                <div className="my-3" onChange={(event) => {setPayment(event.target.value)}}>
                                    <div className="form-check">
                                        <input id="aba" name="paymentMethod" type="radio" className="form-check-input" value="ABA" required/>
                                        <label className="form-check-label" for="aba">Transfer ABA</label>
                                    </div>
                                    <div className="form-check">
                                        <input id="wing" name="paymentMethod" type="radio" className="form-check-input" value="Wing" required/>
                                        <label className="form-check-label" for="wing">Transfer Wing</label>
                                    </div>
                                    <div className="form-check">
                                        <input id="cash" name="paymentMethod" type="radio" className="form-check-input" value="Cash" defaultChecked required/>
                                        <label className="form-check-label" for="cash">Cash on delivery</label>
                                    </div>
                                </div>
                                <div className="row gy-3">
                                    {
                                        payment === "Cash" ? (<span> We will contact you as soon as possible </span>)
                                        :
                                        (<React.Fragment>
                                            <div className="col-md-6">
                                                <label for="cc-name" className="form-label">Name on card</label>
                                                <input type="text" className="form-control" id="cc-name" placeholder={payment==="ABA" ? "Chhunheng Leng" : payment==="Wing" ? "Chhunheng Leng" : ""} disabled/>
                                                <div className="invalid-feedback">
                                                    Name on card is required
                                                </div>
                                            </div>
        
                                            <div className="col-md-6">
                                                <label for="cc-number" className="form-label">Card number</label>
                                                <input type="text" className="form-control" id="cc-number" placeholder={payment==="ABA" ? "001 512 647" : payment==="Wing" ? "42880561" : ""} disabled/>
                                                <div className="invalid-feedback">
                                                    Credit card number is required
                                                </div>
                                            </div>  
                                        </React.Fragment>)
                                    }
                                </div>
        
                                <hr className="my-4"/>
        
                                <button className="w-100 btn btn-primary btn-lg" type="submit" onClick={(event) => handleCheckout(event)}>Continue to checkout</button>
                            </form>
                        )
                    }
                </div>
                </div>
            </main>
        </div>
    )
}

export default CheckOut;