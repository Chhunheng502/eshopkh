import React,{useState, useEffect} from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function Coupon() {

    var currentDate = new Date();

    const checkedUserID = sessionStorage.getItem("user-id");

    const msToDay = (duration) => {
        let minutes = Math.floor(duration / 60000);
        let  hours = Math.floor((minutes / 60));
        let days = Math.floor(hours / 24);
      
        return days;
    }

    const [contents, setContent] = useState([]);

    useEffect(() => {

        if(sessionStorage.getItem("user-id") !== null)
        {
            axios.get(`https://eshopkh-server-4xrg3.ondigitalocean.app/api/users/promo/${Number(sessionStorage.getItem("user-id"))}`)
            .then((response) => {
                for(let data of response.data)
                {
                    data.coupon_type = String(data.coupon_type)[0] === 'D' ? 'Discount ' + String(data.coupon_type).slice(1, String(data.coupon_type).length) + '%'
                    : String(data.coupon_type)[0] === 'S' ? 'Save ' + String(data.coupon_type).slice(1, String(data.coupon_type).length) + '$' :
                    String(data.coupon_type)[0] === 'B' ? 'Buy ' + String(data.coupon_type).slice(1, String(data.coupon_type).length) + ' Get One' : 'Free Delivery';
                    setContent(oldContents => [...oldContents, data]);
                }
                console.log('Success:', response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }, [checkedUserID]);

    useEffect(() => {

        let temp = contents;
        temp.sort(function(a, b){
            if(String(a.date) < String(b.date)) { return 1; }
            if(String(a.date) > String(b.date)) { return -1; }
            return 0;
        });
        setContent(temp);

    }, [contents]);

    const [viewPromoCodeModalShow ,setViewPromoCodeModalShow] = useState([]);

    useEffect(() => {

        let tempArr = [];

        for(let i = 0; i < contents.length; i++)
        {
            tempArr.push(false);
        }

        setViewPromoCodeModalShow(tempArr);

    }, [contents]);

    const hanldeViewPromoCodeModal = (value, index) => {

        let tempArr = [];

        tempArr[index] = value;

        setViewPromoCodeModalShow(tempArr);
    }

    const myData = contents.map((val,index) => {

        const begunDate =  new Date(String(val.date).split('T')[0]);
        const valid_date = 30 - msToDay(currentDate.getTime() - begunDate.getTime());

        return (
            <div className="col-md-6">
                <div className="coupon bg-white rounded mb-3 d-flex justify-content-between">
                    <div className="kiri p-3">
                        <div className="icon-container ">
                            <div className="icon-container_box">
                                <img src="coupon.png" width="85" alt="coupon" className="" />
                            </div>
                        </div>
                    </div>
                    <div className="tengah py-3 d-flex w-100 justify-content-start">
                        <div>
                            {
                                valid_date > 0 ? 
                                (
                                    <span className="badge badge-success">Valid</span>
                                )
                                :
                                (
                                    <span className="badge badge-danger">Invalid</span>
                                )
                            }
                            <h3 className="lead">{val.coupon_type}</h3>
                            <p className="text-muted mb-0"><span className="text-primary">{val.product_name}</span> - {val.product_feature}</p>
                        </div>
                    </div>
                    <div className="kanan">
                        <div className="info m-3 d-flex align-items-center text-center">
                            <div className="w-100">
                                <div className="block">
                                    <span className="time font-weight-light">
                                        <span>{valid_date} days</span>
                                    </span>
                                </div>
                                <button className="btn btn-sm btn-outline-danger btn-block" onClick={() => hanldeViewPromoCodeModal(true, index)}> show </button>
                                <ViewPromoCodeModal show={viewPromoCodeModalShow[index]} data={val} onHide={() => hanldeViewPromoCodeModal(false, index)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div className="container my-5" style={{minHeight:"100vh"}}>
            <h4 className="mb-2"> Your Coupon: </h4>
            <div className="row">
                {myData}
            </div>
        </div>
    )
}

function ViewPromoCodeModal(props) {

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Promo Code
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="text-center">
                {props.data.promo_code}
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default Coupon;