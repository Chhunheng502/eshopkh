import React, {useEffect, useState} from 'react'
import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Pagination from 'react-bootstrap/Pagination'

// error search - go back to default when continue to search new name
// the same for product and inventory

// filter by age

function ContactList() {

    const contentArr = [];
    const [contents, setContent] = useState([]);
    const [fullContents, setfullContents] = useState([]);

    useEffect (() => {

        axios.get('https://eshopkh-server-4xrg3.ondigitalocean.app/api/users')
        .then((response) => {

            for(const data of response.data)
            {
                setContent(oldContents => [...oldContents, data]);
                setfullContents(oldContents => [...oldContents, data]);
            }
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        console.log('use effect');
    }, []);

    const [paginItems, setPaginItems] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = contents.slice(indexOfFirstPost, indexOfLastPost);

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

        if(newOpt === 'All')
        {
            setContent(fullContents);
        }
        else
        {
            setContent(fullContents.filter(item => item.gender === newOpt));
        }

        setCurrentPage(1);
    };

    const resetSelection = () => {

        currentPosts.forEach(element => {

            if(document.getElementById(`contact-${element.id}`) !== null)
            {
                document.getElementById(`contact-${element.id}`).checked = false;
            }
        });
        setSelectedItemCount(0);

        if(document.getElementById("selectAllContact").checked)
        {
            document.getElementById("selectAllContact").checked = false;
        }
    }

    const [selectedItemCount, setSelectedItemCount] = useState(0);

    const handleAllChecked = (event) => {

        let count = 0;

        currentPosts.forEach(element => {

            if(document.getElementById(`contact-${element.id}`) !== null)
            {
                count += Number(event.target.checked);
                document.getElementById(`contact-${element.id}`).checked = event.target.checked
            }
        });
        setSelectedItemCount(count);

        currentPosts.forEach(element => document.getElementById(`contact-${element.id}`).checked = event.target.checked);
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

    const handleSearchProduct = () => {

        const inputVal = document.getElementById("admin-search-contactList").value;
        
        for(const data of contents)
        {
            if(String(data.firstName).toLowerCase().includes(String(inputVal).toLowerCase()))
            {
                contentArr.push(data);
            }
        }
        setContent(contentArr);
    };

    const [giveCouponModalShow, setGiveCouponModalShow] = useState();

    const handleGivingCoupon = () => {

        const code = Math.random().toString(36).substr(2, 6).toUpperCase();

        let myObj = {};

        if(valueRef.current !== null)
        {
            myObj = {
                product_id: Number(productRef.current.value),
                coupon_type: typeRef + valueRef.current.value,
                promo_code: code
            };
        }
        else
        {
            myObj = {
                product_id: Number(productRef.current.value),
                coupon_type: typeRef + 'D',
                promo_code: code
            };
        }

        for(const data of contents)
        {
            if(document.getElementById(`contact-${data.id}`) !== null && document.getElementById(`contact-${data.id}`).checked === true)
            {
                axios.post(`https://eshopkh-server-4xrg3.ondigitalocean.app/api/users/promo/${data.id}`, myObj)
                .then((response) => {
                    console.log('Success:', response);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            }
        }

        setGiveCouponModalShow(false);
        resetSelection();
    }

    const myData = currentPosts.map(val => {
        
        return(
            <tr>
                <td>
                    <div className="d-flex align-items-center">
                        <input type="checkbox" id={`contact-${val.id}`} name="productList" className="mr-3" onClick={(event) => handleCheckedElement(event, val.email)}/>
                        {val.first_name}
                    </div>
                </td>
                <td>{val.last_name}</td>
                <td>{val.email}</td>
                <td>{val.gender}</td>
                <td>{val.age}</td>
                <td>0{val.phone}</td>
                <td>{val.address}</td>
            </tr>
        )
    });

    return(
        <div className="admin-dashboard">
            <h2 className="mb-4"> Contact List <span> {contents.length} </span> </h2>
            <div className="bg-light">
                <div className="p-3 m-3">
                    <div className="d-flex justify-content-between pb-2 mb-2">
                        <div className="custom-control custom-checkbox mt-2">
                            <input type="checkbox" className="custom-control-input" id="selectAllContact" name="selectAll" onClick={handleAllChecked}/>
                            <label className="custom-control-label" for="selectAllContact">Select all</label>
                        </div>
                        {
                            selectedItemCount === 0 ?
                            (
                                <div className="d-flex flex-wrap justify-content-around w-75">
                                    <form className="form-inline mb-2">
                                        <label for="filtering">Filter by:</label>
                                        <select name="filtering" className="custom-select ml-2" onChange={(event) => handleSelectOption(event.target.value)}>
                                            <option value="All">All</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </select>
                                    </form>
                                    <div className="input-group mb-2" style={{width:"200px"}}>
                                        <input type="text" className="form-control" id="admin-search-contactList" placeholder="Search" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="submit" onClick={handleSearchProduct}><i className="fa fa-search" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className="d-flex justify-content-center w-75">
                                    <Button className="bg-white border border-primary text-primary" onClick={() => setGiveCouponModalShow(true)}>Give Coupon</Button>
                                    <GiveCouponModal show={giveCouponModalShow} onHide={() => setGiveCouponModalShow(false)} onGive={handleGivingCoupon} />
                                </div>
                            )
                        }
                    </div>
                    <div className="table-responsive table-style">
                        <table className="table table-striped table-center-align">
                            <thead className="text-center">
                                <tr className="text-uppercase">
                                    <th className="text-left">First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Age</th>
                                    <th>Phone</th>
                                    <th>Address</th>
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

var typeRef = null;
const valueRef = React.createRef();
const productRef = React.createRef();

function GiveCouponModal(props) {

    const [freeDelivery, setFreeDelivery] = useState();
    const [selectOpt, setSelectOpt] = useState('D');

    useEffect(() => {

        if(selectOpt !== 'F')
        {
            setFreeDelivery(false);
        }
        typeRef = selectOpt;

    }, [selectOpt]);

    const [contents, setContent] = useState([]);

    useEffect (() => {

        axios.get('https://eshopkh-server-4xrg3.ondigitalocean.app/api/products/get')
        .then((response) => {
            for(const data of response.data)
            {
                setContent(oldContents => [...oldContents, data]);
            }
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        console.log('use effect');
    }, []);

    const products_list = contents.map(val => {

        return (
            <option value={val.id}>{val.name} ({val.id})</option>
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
              Give Coupon
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
            <div className="form-group">
                <label for="coupon-type">Type of Coupon</label>
                <select className="form-control" id="coupon-type" onChange={(event) => setSelectOpt(event.target.value)}>
                    <option value='D'>Discount</option>
                    <option value='S'>Save</option>
                    <option value='B'>Buy</option>
                    <option value='F'>Free Delivery</option>
                </select>
            </div>
            {
                !freeDelivery ? 
                (
                    <div className="input-group mb-2">
                        <input type="text" className="form-control" ref={valueRef} id="coupon-value" placeholder="Coupon Value" />
                        <div className="input-group-append">
                            <span className="input-group-text">{selectOpt === 'D' ? '%' : selectOpt === 'S' ? '$' : 
                            selectOpt === 'B' ? 'Get one' : setFreeDelivery(true)}</span>
                        </div>
                    </div>
                )
                :
                null
            }
            <div className="form-group">
                <label for="coupon-products">Select Product</label>
                <select className="form-control" id="coupon-products" ref={productRef}>
                    {products_list}
                </select>
            </div>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
              Cancel
            </Button>
            <Button variant="primary" onClick={props.onGive}>
              Give
            </Button>
          </Modal.Footer>
        </Modal>
      );
}

export default ContactList;