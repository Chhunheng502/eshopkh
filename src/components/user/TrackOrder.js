import React,{useState, useEffect} from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function TrackOrder() {

    const checkedUserID = sessionStorage.getItem("user-id");

    const [pendingOrder, setPendingOrder] = useState([]);
    const [acceptedOrder, setAcceptedOrder] = useState([]);

    useEffect(() => {

        if(sessionStorage.getItem("user-id") !== null)
        {
            axios.get(`https://eshopkh-server-4xrg3.ondigitalocean.app/api/orders/show/${Number(sessionStorage.getItem("user-id"))}`)
            .then((response) => {
                for(const data of response.data)
                {
                    if(data.is_accepted === 0)
                    {
                        setPendingOrder(oldContents => [...oldContents, data]);
                    }
                    else
                    {
                        setAcceptedOrder(oldContents => [...oldContents, data]);
                    }
                }
                console.log('Success:', response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }, [checkedUserID]);

    useEffect(() => {

        let tempPending = pendingOrder;
        let tempAccepted = acceptedOrder;
        tempPending.sort(function(a, b){
            if(String(a.date) < String(b.date)) { return 1; }
            if(String(a.date) > String(b.date)) { return -1; }
            return 0;
        });
        tempAccepted.sort(function(a, b){
            if(String(a.date) < String(b.date)) { return 1; }
            if(String(a.date) > String(b.date)) { return -1; }
            return 0;
        });
        setPendingOrder(tempPending);
        setAcceptedOrder(tempAccepted);
        
    }, [pendingOrder, acceptedOrder]);

    const [cancelOrderModalShow, setCancelOrderModalShow] = useState([]);

    useEffect(() => {

        let tempArr = [];

        for(let i = 0; i < pendingOrder.length; i++)
        {
            tempArr.push(false);
        }

        setCancelOrderModalShow(tempArr);

    }, [pendingOrder]);

    const hanldeCancelOrderModal = (value, index) => {

        let tempArr = [];

        tempArr[index] = value;

        setCancelOrderModalShow(tempArr);
    }

    const [viewInfoModalShow, setViewInfoModalShow] = useState([]);

    useEffect(() => {

        let tempArr = [];

        for(let i = 0; i < acceptedOrder.length; i++)
        {
            tempArr.push(false);
        }

        setViewInfoModalShow(tempArr);

    }, [acceptedOrder]);

    const hanldeViewInfoModal = (value, index) => {

        let tempArr = [];

        tempArr[index] = value;

        setViewInfoModalShow(tempArr);
    }

    const updateTableAfterCancel = (id) => {
    
        axios.delete(`https://eshopkh-server-4xrg3.ondigitalocean.app/api/orders/delete/${id}`)
        .then((response) => {
            console.log('Success:', response);
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const myPendingOrders = pendingOrder.map((val, index) => {

        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="prefix">Date created:</span>
                        <span className="label label-success"> {String(val.date).split('T')[0]}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="prefix">Total cost:</span>
                        <span className="label label-success"> ${val.total_cost}</span>
                    </li>
                    <li className="list-group-item">Once the order is accepted, you cannot cancel.</li>
                    <li className="list-group-item">
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" style={{width:"100%"}}>
                                Pending
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item"><button type="button" className="btn btn-primary" onClick={() => hanldeCancelOrderModal(true, index)}>Cancel Order</button></li>
                    <CancelOrderModal show={cancelOrderModalShow[index]} onHide={() => hanldeCancelOrderModal(false, index)} onCancel={() => updateTableAfterCancel(val.id)}  />
                </ul>
                <hr />
            </div>
        )
    });

    const myAcceptedOrders = acceptedOrder.map((val,index) => {

        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="prefix">Date created:</span>
                        <span className="label label-success"> {String(val.date).substr(0,19).split('T')[0]}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="prefix">Total cost:</span>
                        <span className="label label-success"> ${val.total_cost}</span>
                    </li>
                    <li className="list-group-item">
                        <div className="progress">
                            <div className="progress-bar bg-primary" style={{width:"100%"}}>
                                Accepted
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item"><button type="button" className="btn btn-primary" onClick={() => hanldeViewInfoModal(true, index)}>View Detail</button></li>
                    <ViewInfoModal show={viewInfoModalShow[index]} data={val} onHide={() => hanldeViewInfoModal(false, index)} />
                </ul>
                <hr />
            </div>
        )
    });

    return (
        <div className="container mt-3 mb-3" style={{minHeight:"100vh"}}>
            <h4>Your Order Status:</h4>

            <hr />

            {myPendingOrders}
            
            <div>
                <h4>Order History</h4>

                {myAcceptedOrders}
            </div>
        </div>
    )
}

function CancelOrderModal(props) {

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Cancel Order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                Are you sure you want to cancel order ?
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="secondary" onClick={props.onCancel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

function ViewInfoModal(props) {

    const myData = props.data.order_data.map(val => {
        
        return(
            <tr>
                <td>{val.product_data.product_id}</td>
                <td>{val.product_data.product_name}</td>
                <td>${val.product_data.product_price}</td>
                <td>{val.quantity}</td>
                <td>${Number(val.product_data.product_price) * Number(val.quantity)}</td>
            </tr>
        )
    });

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Purchase Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <table className="table table-striped table-center-align">
                    <thead className="text-center">
                        <tr className="text-uppercase">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {myData}
                    </tbody>
                </table>
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

export default TrackOrder;