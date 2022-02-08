import React, {useEffect, useState} from 'react'
import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Pagination from 'react-bootstrap/Pagination'

function AdminInventory() {

    const [contents, setContent] = useState([]);
    const [fullContents, setfullContents] = useState([]);

    useEffect (() => {

        let tempArr = [];

        axios.get('https://eshopkh-p34hw.ondigitalocean.app/api/products/get')
        .then((response) => {
            for(const data of response.data)
            {
                tempArr.push(data);
            }
            setContent(tempArr);
            setfullContents(tempArr);
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
            const inStock = (newOpt === 'In stock') ? true : false;

            if(inStock)
            {
                setContent(fullContents.filter(item => item.quantity > 0));
            }
            else
            {
                setContent(fullContents.filter(item => item.quantity === 0));
            }
        }

        setCurrentPage(1);
    };

    const [selectedItemCount, setSelectedItemCount] = useState(0);

    const resetSelection = () => {

        currentPosts.forEach(element => {

            if(document.getElementById(`product-inventory-${element.id}`) !== null)
            {
                document.getElementById(`product-inventory-${element.id}`).checked = false;
            }
        });
        setSelectedItemCount(0);

        if(document.getElementById("selectAllProducts-inventory").checked)
        {
            document.getElementById("selectAllProducts-inventory").checked = false;
        }
    }

    const handleAllChecked = (event) => {

        let count = 0;

        currentPosts.forEach(element => {

            if(document.getElementById(`product-inventory-${element.id}`) !== null)
            {
                count += Number(event.target.checked);
                document.getElementById(`product-inventory-${element.id}`).checked = event.target.checked
            }
        });
        setSelectedItemCount(count);
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

        const inputVal = document.getElementById("admin-search-inventory").value;

        let contentArr = [];
        
        for(const data of contents)
        {
            if(String(data.name).toLowerCase().includes(String(inputVal).toLowerCase()))
            {
                contentArr.push(data);
            }
        }
        setContent(contentArr);
    };

    const [updateInventoryModalShow, setUpdateInventoryModalShow] = useState(false);

    const updateQuantity =  (id, myData) => {

        let temp = [];
        for(let data of contents)
        {
            if(data.id === id)
            {
                data.quantity = myData;
                temp.push(data);
            }
            else
            {
                temp.push(data);
            }
        }
        setContent(temp);

        const myObj = {
            id: id,
            quantity: myData
        }

        axios.put(`https://eshopkh-p34hw.ondigitalocean.app/api/products/update/${id}`, myObj)
        .then((response) => {
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    var newQuantity = 0;

    const handleUpdateAllQuantity = () => {

        let temp = [];
        for(let data of contents)
        {
            if(document.getElementById(`product-inventory-${data.id}`) !== null && document.getElementById(`product-inventory-${data.id}`).checked === true)
            {
                data.quantity = quantityRef.current.value;
                temp.push(data);
                document.getElementById(`quantity-input-${data.id}`).value = quantityRef.current.value;
                updateQuantity(data.id, quantityRef.current.value);
            }
            else
            {
                temp.push(data);
            }
        }
        setContent(temp);
        resetSelection();
        setUpdateInventoryModalShow(false);
    }

    const handleNewQuantity = (inputID) => {

        newQuantity = Number(document.getElementById(inputID).value);
    }

    const handleInventoryEdit = (id, inputID, iconID) => {

        const disabledInput = document.getElementById(inputID).disabled;

        if(disabledInput)
        {
            document.getElementById(inputID).disabled = false;
            document.getElementById(iconID).innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
        }
        else
        {
            document.getElementById(inputID).disabled = true;
            document.getElementById(iconID).innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';

            updateQuantity(id, newQuantity);
        }
    }

    const myData = currentPosts.map(val => {
        
        return(
            <tr>
                <td>
                    <div className="d-flex align-items-center">
                        <input type="checkbox" id={`product-inventory-${val.id}`} name="productList" className="mr-3" onClick={(event) => handleCheckedElement(event, `product-inventory-${val.id}`)} />
                        <div>
                            <img src={val.primary_image} width="60px" height="60px" className="rounded-circle mr-3" style={{objectFit:"contain"}} alt="" />
                            <label for="product1">{val.name}</label>
                        </div>
                    </div>
                </td>
                <td>${val.price}</td>
                <td>
                    <div className="d-flex">
                        <input type="text" className="form-control w-50" id={`quantity-input-${val.id}`} key={val.id} onChange={() => {handleNewQuantity(`quantity-input-${val.id}`)}} defaultValue={val.quantity} disabled/>
                        <span className="p-1 ml-3" style={{cursor:"pointer"}} id={`quantity-click-${val.id}`} onClick={() => handleInventoryEdit(val.id, `quantity-input-${val.id}`, `quantity-click-${val.id}`)}> <i class="fa fa-pencil" aria-hidden="true"></i> </span>
                    </div>
                </td>
            </tr>
        )
    });

    return(
        <div className="admin-dashboard">
            <h2 className="mb-4"> Inventory <span> {contents.length} </span> </h2>
            <div className="bg-light">
                <div className="p-3 m-3">
                    <div className="d-flex justify-content-between pb-2 mb-2">
                        <div className="custom-control custom-checkbox mt-2">
                            <input type="checkbox" className="custom-control-input" id="selectAllProducts-inventory" name="selectAll" onClick={handleAllChecked} />
                            <label className="custom-control-label" for="selectAllProducts-inventory">{selectedItemCount === 0 ? <span>Select all</span> : <span>{selectedItemCount} selected</span>}</label>
                        </div>
                        <div className="d-flex flex-wrap justify-content-around w-75">
                            {selectedItemCount === 0 ? 
                                (
                                    <React.Fragment>
                                        <form className="form-inline mb-2">
                                            <label for="filtering">Filter by:</label>
                                            <select name="filtering" className="custom-select ml-2" onChange={(event) => handleSelectOption(event.target.value)}>
                                                <option value="All">All</option>
                                                <option value="In stock">In stock</option>
                                                <option value="Out of stock">Out of stock</option>
                                            </select>
                                        </form>
                                        <div className="input-group mb-2" style={{width:"200px"}}>
                                            <input type="text" className="form-control" id="admin-search-inventory" placeholder="Search" />
                                            <div className="input-group-append">
                                                <button className="btn btn-primary" type="submit" onClick={handleSearchProduct}><i className="fa fa-search" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                                 :
                                (
                                    <React.Fragment>
                                        <Button className="bg-white border border-primary text-primary" onClick={() => setUpdateInventoryModalShow(true)}>Update Inventory</Button>
                                        <UpdateInventoryModal show={updateInventoryModalShow} onUpdate={() => handleUpdateAllQuantity()} onHide={() => setUpdateInventoryModalShow(false)}/>
                                    </React.Fragment>
                                )
                            }
                        </div>
                    </div>
                    <div>
                        <table className="table table-hover table-center-align">
                            <thead>
                                <tr className="text-uppercase">
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Inventory</th>
                                </tr>
                            </thead>
                            <tbody>
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

const quantityRef = React.createRef();

function UpdateInventoryModal(props) {

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update inventory
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div class="form-group">
                    <label for="product-quantity">Enter New Quantity</label>
                    <input type="number" class="form-control" ref={quantityRef} id="product-quantity" required />
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={props.onUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default AdminInventory;