import React, {useEffect, useState} from 'react'
import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Pagination from 'react-bootstrap/Pagination'

// error search - go back to default when continue to search new name
// the same for product and inventory

// filter by age

function ProductOrder() {

    const contentArr = [];
    const [contents, setContent] = useState([]);

    const getData = async () => {

        axios.get('https://eshopkh-p34hw.ondigitalocean.app/api/orders/get')
        .then((response) => {
            for(const data of response.data)
            {
                if(data.is_accepted === 0)
                {
                    contentArr.push(data);
                }
            }
            contentArr.sort(function(a, b){
                if(String(a.date) < String(b.date)) { return 1; }
                if(String(a.date) > String(b.date)) { return -1; }
                return 0;
            });
            setContent(contentArr);
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    useEffect (() => {

        if(contents.length === 0) {
            getData();
        }
        console.log('use effect');
    }, []);

    
    const [paginItems, setPaginItems] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const [currentPosts, setCurrentPosts] = useState([]);

    useEffect(() => {
        setCurrentPosts(contents.slice(indexOfFirstPost, indexOfLastPost));
    }, [contents, indexOfFirstPost, indexOfLastPost]);

    useEffect(() => {

        const paginationArr = [];

        for(let i = 1; i <= Math.ceil(contents.length / postsPerPage); i++)
        {
            paginationArr.push(
                <Pagination.Item key={i} onClick={() => paginate(i)} active={i === currentPage}>
                  {i}
                </Pagination.Item>,
            );
        }
        setPaginItems(paginationArr);

        console.log('use effect');
    }, [contents, currentPage, postsPerPage]);

    const paginate = (pageNumer) => setCurrentPage(pageNumer);

    const handleSelectOption = (newOpt) => {

        let tempArr = contents;

        if(newOpt === 'htl')
        {
            tempArr.sort(function(a, b){
                if(Number(a.total_cost) < Number(b.total_cost)) { return 1; }
                if(Number(a.total_cost) > Number(b.total_cost)) { return -1; }
                return 0;
            });
        }
        else if(newOpt === 'lth')
        {
            tempArr.sort(function(a, b){
                if(Number(a.total_cost) > Number(b.total_cost)) { return 1; }
                if(Number(a.total_cost) < Number(b.total_cost)) { return -1; }
                return 0;
            });
        }
        else if(newOpt === 'ld')
        {
            tempArr.sort(function(a, b){
                if(String(a.date) < String(b.date)) { return 1; }
                if(String(a.date) > String(b.date)) { return -1; }
                return 0;
            });
        }
        else
        {
            tempArr.sort(function(a, b){
                if(String(a.date) > String(b.date)) { return 1; }
                if(String(a.date) < String(b.date)) { return -1; }
                return 0;
            });
        }

        setCurrentPosts(tempArr.slice(indexOfFirstPost, indexOfLastPost));
        setCurrentPage(1);
    };

    const resetSelection = () => {

        currentPosts.forEach(element => {

            if(document.getElementById(`order-${element.id}`) !== null)
            {
                document.getElementById(`order-${element.id}`).checked = false;
            }
        });
        setSelectedItemCount(0);

        if(document.getElementById("selectAllOrder").checked)
        {
            document.getElementById("selectAllOrder").checked = false;
        }
    }

    const [selectedItemCount, setSelectedItemCount] = useState(0);

    const handleAllChecked = (event) => {

        let count = 0;

        currentPosts.forEach(element => {

            if(document.getElementById(`order-${element.id}`) !== null)
            {
                count += Number(event.target.checked);
                document.getElementById(`order-${element.id}`).checked = event.target.checked
            }
        });
        setSelectedItemCount(count);

        currentPosts.forEach(element => document.getElementById(`order-${element.id}`).checked = event.target.checked);
    }
    
    const handleCheckedElement = (event, elementID) => {

        let count = selectedItemCount;

        if(document.getElementById(elementID) != null)
        {
            document.getElementById(elementID).checked = event.target.checked;
        }

        count += event.target.checked ? 1 : -1;

        setSelectedItemCount(count);
    }

    const [viewInfoModalShow, setViewInfoModalShow] = useState([]);

    useEffect(() => {

        if(contents.length !== 0)
        {
            let tempArr = [];

            for(let i = 0; i < currentPosts.length; i++)
            {
                tempArr.push(false);
            }

            setViewInfoModalShow(tempArr);
        }

    }, [contents, currentPosts.length]);

    const hanldeViewInfoModal = (value, index) => {

        let tempArr = [];

        tempArr[index] = value;

        setViewInfoModalShow(tempArr);
    }

    useEffect(() => {

        console.log(viewInfoModalShow);

    }, [viewInfoModalShow])

    const handleCancelOrder = (id) => {

        axios.delete(`https://eshopkh-p34hw.ondigitalocean.app/api/orders/delete/${id}`)
        .then((response) => {
            console.log('Success:', response);
            setContent(contents.filter(item => item.id !== id));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const handleAcceptOrder = (id) => {

        axios.put(`https://eshopkh-p34hw.ondigitalocean.app/api/orders/update/${id}`)
        .then((response) => {
            console.log('Success:', response);
            setContent(contents.filter(item => item.id !== id));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const handleCancelAll = () => {

        let tempArr = [];

        for(const data of contents)
        {
            if(document.getElementById(`order-${data.id}`) !== null && document.getElementById(`order-${data.id}`).checked === true)
            {
                axios.delete(`https://eshopkh-p34hw.ondigitalocean.app/api/orders/delete/${data.id}`)
                .then((response) => {
                    console.log('Success:', response);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            }
            else
            {
                tempArr.push(data);
            }
        }

        setContent(tempArr);
        resetSelection();
    }

    const handleAcceptAll = () => {

        let tempArr = [];

        for(const data of contents)
        {
            if(document.getElementById(`order-${data.id}`) !== null && document.getElementById(`order-${data.id}`).checked === true)
            {
                axios.put(`https://eshopkh-p34hw.ondigitalocean.app/api/orders/update/${data.id}`)
                .then((response) => {
                    console.log('Success:', response);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            }
            else
            {
                tempArr.push(data);
            }
        }

        setContent(tempArr);
        resetSelection();
    }

    const myData = currentPosts.map((val,index) => {
        
        return(
            <tr>
                <td>
                    <div className="d-flex align-items-center">
                        <input type="checkbox" id={`order-${val.id}`} name="productList" className="mr-3" onClick={(event) => handleCheckedElement(event, `order-${val.id}`)}/>
                        {val.user.email}
                    </div>
                </td>
                <td>0{val.user.phone}</td>
                <td>${val.total_cost}</td>
                <td>{val.payment}</td>
                <td>{String(val.date).split('T')[0]}</td>
                <td>{val.user.address}</td>
                <td>
                    <div className="d-flex">
                        <span className="mr-2" style={{cursor:"pointer"}} onClick={() => hanldeViewInfoModal(true, index)}><i class="fa fa-info-circle fa-lg text-primary" aria-hidden="true"></i></span>
                        <ViewInfoModal show={viewInfoModalShow[index]} data={val} onHide={() => hanldeViewInfoModal(false, index)} />
                        <span className="mr-2" style={{cursor:"pointer"}} onClick={() => handleCancelOrder(val.id)}><i class="fa fa-ban fa-lg text-danger" aria-hidden="true"></i></span>
                        <span style={{cursor:"pointer"}} onClick={() => handleAcceptOrder(val.id)}><i class="fa fa-check-circle fa-lg text-success" aria-hidden="true"></i></span>
                    </div>
                </td>
            </tr>
        )
    });

    return(
        <div className="admin-dashboard">
            <h2 className="mb-4"> Orders <span> {contents.length} </span> </h2>
            <div className="bg-light">
                <div className="p-3 m-3">
                    <div className="d-flex justify-content-between pb-2 mb-2">
                        <div className="custom-control custom-checkbox mt-2">
                            <input type="checkbox" className="custom-control-input" id="selectAllOrder" name="selectAll" onClick={handleAllChecked}/>
                            <label className="custom-control-label" for="selectAllOrder">{selectedItemCount === 0 ? <span>Select all</span> : <span>{selectedItemCount} selected</span>}</label>
                        </div>
                        {
                            selectedItemCount === 0 ?
                            (
                                <div className="d-flex justify-content-around w-75">
                                    <form className="form-inline">
                                        <label for="filtering">Sort by:</label>
                                        <select name="filtering" className="custom-select ml-2" onChange={(event) => handleSelectOption(event.target.value)}>
                                            <option selected>Choose option...</option>
                                            <option value="htl">Price: High to Low</option>
                                            <option value="lth">Price: Low to High</option>
                                            <option value="ld">Latest date</option>
                                            <option value="ed">Earliest date</option>
                                        </select>
                                    </form>
                                </div>
                            )
                            :
                            (
                                <div className="d-flex justify-content-around w-50">
                                    <Button className="bg-white border border-primary text-primary" onClick={handleCancelAll}>Cancel All</Button>
                                    <Button className="bg-white border border-primary text-primary" onClick={handleAcceptAll}>Accept All</Button>
                                </div>
                            )
                        }
                    </div>
                    <div className="table-responsive table-style">
                        <table className="table table-striped table-center-align">
                            <thead className="text-center">
                                <tr className="text-uppercase">
                                    <th className="text-left">Email</th>
                                    <th>Phone</th>
                                    <th>Total Cost</th>
                                    <th>Payment</th>
                                    <th>Date</th>
                                    <th>Address</th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {myData}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div>
                <Pagination>
                    {paginItems}
                </Pagination>
            </div>
        </div>
    )
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
            <div className="d-flex justify-content-between">
                <ul>
                    <li> First Name: <u> {props.data.user.first_name} </u> </li>
                    <li> Last Name: <u> {props.data.user.last_name} </u> </li>
                    <li> Email: <u> {props.data.user.email} </u> </li>
                    <li> Phone: <u> 0{props.data.user.phone} </u> </li>
                    <li> Address: <u> {props.data.user.address} </u> </li>
                </ul>
                <ul>
                    <li> Date: <u> {String(props.data.date).split('T')[0]} </u> </li>
                    <li> Total Cost: <u> ${props.data.total_cost} </u> </li>
                </ul>
            </div>
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

export default ProductOrder;