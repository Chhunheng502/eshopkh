import React, {useEffect, useState} from 'react'
import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Pagination from 'react-bootstrap/Pagination'

function AdminProduct() {

    var contentArr = [];
    const [contents, setContent] = useState([]);
    const [fullContents, setfullContents] = useState([]);
    const [subContents, setSubContents] = useState([]);

    useEffect (() => {

        let tempArr = [];

        axios.get('https://eshopkh-api.herokuapp.com/api/products/get')
        .then((response) => {
            for(const data of response.data)
            {
                tempArr.push(data);
            }
            setContent(tempArr);
            setfullContents(tempArr);
            setSubContents(tempArr);
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

    const handleSelectCollection = (newOpt) => {

        if(newOpt === 'All products')
        {
            setContent(fullContents);
            setSubContents(fullContents);
        }
        else
        {
            setContent(fullContents.filter(item => String(item.type).includes(newOpt)));
            setSubContents(fullContents.filter(item => String(item.type).includes(newOpt)));
        }

        setCurrentPage(1);
    };

    const handleSelectFilter = (newOpt) => {

        if(newOpt === 'All')
        {
            setContent(subContents);
        }
        else if(newOpt === 'In stock' || newOpt === 'Out of stock' )
        {
            const inStock = (newOpt === 'In stock') ? true : false;

            if(inStock)
            {
                setContent(subContents.filter(item => item.quantity > 0));
            }
            else
            {
                setContent(subContents.filter(item => item.quantity === 0));
            }
        }

        setCurrentPage(1);
    };

    const [selectedItemCount, setSelectedItemCount] = useState(0);

    const resetSelection = () => {

        currentPosts.forEach(element => {

            if(document.getElementById(`product-list-${element.id}`) !== null)
            {
                document.getElementById(`product-list-${element.id}`).checked = false;
            }
        });
        setSelectedItemCount(0);

        if(document.getElementById("selectAllProducts-list").checked)
        {
            document.getElementById("selectAllProducts-list").checked = false;
        }
    }

    const handleAllChecked = (event) => {

        let count = 0;

        currentPosts.forEach(element => {

            if(document.getElementById(`product-list-${element.id}`) !== null)
            {
                count += Number(event.target.checked);
                document.getElementById(`product-list-${element.id}`).checked = event.target.checked
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

    const updateTableAfterDeletion =  (id) => {

        axios.delete(`https://eshopkh-api.herokuapp.com/api/products/delete/${id}`)
        .then((response) => {
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const handleAllDeletion = () => {

        contentArr = [];

        for(const data of fullContents)
        {
            if(document.getElementById(`product-list-${data.id}`) !== null && document.getElementById(`product-list-${data.id}`).checked === true)
            {
                ;
            }
            else
            {
                contentArr.push(data);
            }
        }

        setfullContents(contentArr);
        contentArr = [];

        for(const data of contents)
        {
            if(document.getElementById(`product-list-${data.id}`) !== null && document.getElementById(`product-list-${data.id}`).checked === true)
            {
                updateTableAfterDeletion(data.id);
            }
            else
            {
                contentArr.push(data);
            }
        }

        setContent(contentArr);
        contentArr = [];

        resetSelection();
        setDeleteModalShow(false);
    }

    const handleDeletion = (id) => {

        setfullContents(fullContents.filter(item => item.id !== id));
        setContent(contents.filter(item => item.id !== id));

        updateTableAfterDeletion(id)
    }

    const updateTableAfterAddition =  () => {

        const myObj = {
            name: nameRef.current.value,
            price: priceRef.current.value,
            feature: featureRef.current.value,
            quantity: quantityRef.current.value,
            type: typeRef.current.value,
            primary_image: primary_imageRef.current.value,
            secondary_image1: secondary_image1Ref.current.value,
            secondary_image2: secondary_image2Ref.current.value,
            info: infoRef.current.value,
            highlight: highlightRef.current.value
        };

        axios.post('https://eshopkh-api.herokuapp.com/api/products/store',  myObj)
        .then((response) => {
            const temp = {
                id: response.data,
                name: myObj.name,
                price: myObj.price,
                feature: myObj.feature,
                quantity: myObj.quantity,
                type: myObj.type,
                primary_image: myObj.primary_image,
                secondary_image1: myObj.secondary_image1,
                secondary_image2: myObj.secondary_image2,
                info: myObj.info,
                highlight: myObj.highlight
            };
            setfullContents(oldContents => [...oldContents, temp]);
            setContent(oldContents => [...oldContents, temp]);
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        setNewProductModalShow(false);
    }

    // live-update

    const updateTableAfterEdition = (id, index) => {

        const myObj = {
            id: id,
            name: nameRef.current.value,
            price: priceRef.current.value,
            feature: featureRef.current.value,
            primary_image: primary_imageRef.current.value,
            secondary_image1: secondary_image1Ref.current.value,
            secondary_image2: secondary_image2Ref.current.value,
            info: infoRef.current.value,
            highlight: highlightRef.current.value,
            quantity: quantityRef.current.value
        }

        axios.put(`https://eshopkh-api.herokuapp.com/api/products/edit/${id}`, myObj)
        .then((response) => {
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        let fullTempIndex = fullContents.findIndex((obj => obj.id === id));
        let tempIndex = contents.findIndex((obj => obj.id === id));

        let fullTemp = fullContents;
        let temp = contents;

        fullTemp[fullTempIndex] = myObj
        temp[tempIndex] = myObj;

        setfullContents(fullTemp);
        setContent(temp);
        setEditProductModalShow(false, index);
    }

    const handleSearchProduct = () => {

        const inputVal = document.getElementById("admin-search-product").value;

        setContent(subContents.filter(item => String(item.name).toLowerCase().includes(String(inputVal).toLowerCase())));
    };

    const [collectionModalShow, setCollectionModalShow] = useState(false);

    const handleAddToCollection = () => {

        let temp = [];

        for(const data of contents)
        {
            if(document.getElementById(`product-list-${data.id}`) !== null && document.getElementById(`product-list-${data.id}`).checked === true)
            {
                temp.push(data);
            }
        }

        let myObj = {
            'products': temp
        };

        axios.post(`https://eshopkh-api.herokuapp.com/api/collections/add-products/${collectionRef.current.value}`, myObj)
        .then((response) => {
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        resetSelection();
        setCollectionModalShow(false);
    }

    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [newProductModalShow, setNewProductModalShow] = useState(false);
    const [editProductModalShow, setEditProductModalShow] = useState([]);

    useEffect(() => {

        if(contents.length !== 0)
        {
            let tempArr = [];

            for(let i = 0; i < currentPosts.length; i++)
            {
                tempArr.push(false);
            }

            setEditProductModalShow(tempArr);
        }

    }, [contents, currentPosts.length]);

    const hanldeEditProductModal = (value, index) => {

        let tempArr = [];

        tempArr[index] = value;

        setEditProductModalShow(tempArr);
    }

    useEffect(() => {

        console.log(editProductModalShow);

    }, [editProductModalShow])

    const myData = currentPosts.map((val,index) => {
        
        return(
            <tr>
                <td>
                    <div className="d-flex align-items-center">
                        <input type="checkbox" id={`product-list-${val.id}`} name="productList" className="mr-3" onClick={(event) => handleCheckedElement(event, `product-list-${val.id}`)}/>
                        <div>
                            <img src={val.primary_image} width="60px" height="60px" className="rounded-circle mr-3" style={{objectFit:"contain"}} alt="" />
                            <label for="product1">{val.name}</label>
                        </div>
                    </div>
                </td>
                <td>${val.price}</td>
                <td>{(Number(val.quantity) > 0) ? "In stock" : "Out of stock"}</td>
                <td>
                    <div className="d-flex">
                        <div className="popover-style popover-blue mr-1" onClick={() => hanldeEditProductModal(true,index)}><i class="fa fa-files-o" aria-hidden="true"></i> </div>
                        <EditProductModal show={editProductModalShow[index]} val={val} onHide={() => hanldeEditProductModal(false,index)} onEdit={() => updateTableAfterEdition(val.id, index)} />
                        <div className="popover-style popover-red" onClick={() => handleDeletion(val.id)}><i class="fa fa-trash-o" aria-hidden="true"></i> </div>
                    </div>
                </td>
            </tr>
        )
    });

    return(
        <div className="admin-dashboard">
            <div className="d-flex justify-content-between">
                <h2> Products <span> {contents.length} </span> </h2>
                <form>
                    <div className="btn-group">
                        <Button className="border border-secondary" onClick={() => setNewProductModalShow(true)}> <i class="fa fa-plus" aria-hidden="true"></i> New Product </Button>
                        <NewProductModal show={newProductModalShow} onHide={() => setNewProductModalShow(false)} onAdd={() => updateTableAfterAddition()}/>
                    </div>
                </form>
            </div>
            <div className="bg-light">
                <div className="p-3 m-3">
                    <div className="d-flex justify-content-between pb-2 mb-2">
                        <div className="custom-control custom-checkbox mt-2">
                            <input type="checkbox" className="custom-control-input" id="selectAllProducts-list" name="selectAll" onClick={handleAllChecked} />
                            <label className="custom-control-label" for="selectAllProducts-list"> {selectedItemCount === 0 ? <span>Select all</span> : <span>{selectedItemCount} selected</span>} </label>
                        </div>
                        <div className="d-flex flex-wrap justify-content-around w-75">
                            {selectedItemCount === 0 ?
                                (
                                    <React.Fragment>
                                        <form className="form-inline mb-2">
                                            <label for="collection">Collection</label>
                                            <select name="collection" className="custom-select ml-2" onChange={(event) => handleSelectCollection(event.target.value)}>
                                                <option value="All products">All products</option>
                                                <option value="C">Clothings</option>
                                                <option value="S">Shoes</option>
                                                <option value="B">Bags</option>
                                                <option value="A">Accessories</option>
                                            </select>
                                        </form>
                                        <form className="form-inline mb-2">
                                            <label for="filtering">Filter by:</label>
                                            <select name="filtering" className="custom-select ml-2" onChange={(event) => handleSelectFilter(event.target.value)}>
                                                <option value='All'>All</option>
                                                <option value="In stock">In stock</option>
                                                <option value="Out of stock">Out of stock</option>
                                            </select>
                                        </form>
                                        <div className="input-group mb-2" style={{width:"200px"}}>
                                            <input type="text" className="form-control" id="admin-search-product" placeholder="Search"/>
                                            <div className="input-group-append">
                                                <button className="btn btn-primary" type="submit" onClick={handleSearchProduct}><i className="fa fa-search" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                                 :
                                (
                                    <React.Fragment>
                                        <Button className="bg-white border border-primary text-primary mb-2" onClick={() => setDeleteModalShow(true)}><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</Button>
                                        <DeleteItemsModal show={deleteModalShow} quantity={selectedItemCount} onHide={() => setDeleteModalShow(false)} onDelete={() => handleAllDeletion()}/>
                                        <Button className="bg-white border border-primary text-primary mb-2" onClick={() => setCollectionModalShow(true)}><i class="fa fa-plus" aria-hidden="true"></i> Add to Collection</Button>
                                        <AddToCollectionModal show={collectionModalShow} numOfProducts={selectedItemCount} onHide={() => setCollectionModalShow(false)} onAdd={() => handleAddToCollection()}/>
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

const collectionRef = React.createRef();

function AddToCollectionModal(props) {

    const [contents, setContent] = useState([]);

    useEffect (() => {
        axios.get('https://eshopkh-api.herokuapp.com/api/collections/get')
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

    const myCollections = contents.map(val => {

        return(
            <option value={val.id}> {val.name} </option>
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
            Add {Number(props.numOfProducts) > 1 ? Number(props.numOfProducts) + ' Products' : Number(props.numOfProducts) + ' Product'} to Collection
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div className="form-group">
                    <label for="add-to-collection">List of Collection</label>
                    <select className="form-control" id="add-to-collection" ref={collectionRef}>
                        {myCollections}
                    </select>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={props.onAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

function DeleteItemsModal(props) {

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete {props.quantity} Items
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                Are you sure you want to delete it ?
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={props.onDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

const nameRef = React.createRef();
const priceRef = React.createRef();
const featureRef = React.createRef();
const primary_imageRef = React.createRef();
const secondary_image1Ref = React.createRef();
const secondary_image2Ref = React.createRef();
const infoRef = React.createRef();
const highlightRef = React.createRef();
const quantityRef = React.createRef();
const typeRef = React.createRef();

function NewProductModal(props) {

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add New Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
            <div className="form-group">
                <label for="newproduct-name">Name</label>
                <input type="text" className="form-control" ref={nameRef} id="newproduct-name" required />
            </div>
            <div className="form-group">
                <label for="newproduct-price">Price</label>
                <input type="number" className="form-control" ref={priceRef} id="newproduct-price" required />
            </div>
            <div className="form-group">
                <label for="newproduct-feature">Feature</label>
                <textarea className="form-control" ref={featureRef} id="newproduct-feature" rows="3" required></textarea>
            </div>
            <div className="form-group">
                <label for="newproduct-pri-img">Primary Image</label>
                <input type="text" className="form-control" ref={primary_imageRef} id="newproduct-pri-img" required />
            </div>
            <div className="form-group">
                <label for="newproduct-sec-img1">Secondary Image 1</label>
                <input type="text" className="form-control" ref={secondary_image1Ref} id="newproduct-sec-img1" required />
            </div>
            <div className="form-group">
                <label for="newproduct-sec-img2">Secondary Image 2</label>
                <input type="text" className="form-control" ref={secondary_image2Ref} id="newproduct-sec-img2" required />
            </div>
            <div className="form-group">
                <label for="newproduct-info">Info</label>
                <textarea className="form-control" id="newproduct-info" ref={infoRef} rows="3" required></textarea>
            </div>
            <div className="form-group">
                <label for="newproduct-highlight">Highlight</label>
                <textarea className="form-control" id="newproduct-highlight" ref={highlightRef} rows="3" required></textarea>
            </div>
            <div className="form-group">
                <label for="newproduct-quantity">Quantity</label>
                <input type="number" className="form-control" ref={quantityRef} id="newproduct-quantity" required />
            </div>
            <div className="form-group">
                <label for="newproduct-type">Type of product</label>
                <select className="form-control" id="newproduct-type" ref={typeRef}>
                    <option value="CM">Clothing for men</option>
                    <option value="CW">Clothing for women</option>
                    <option value="SM">Shoes for men</option>
                    <option value="SW">Shoes for women</option>
                    <option value="BM">Bag for men</option>
                    <option value="BW">Bag for women</option>
                    <option value="AM">Accessories for men</option>
                    <option value="AW">Accessories for women</option>
                </select>
            </div>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
              Cancel
            </Button>
            <Button variant="primary" onClick={props.onAdd}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      );
}

function EditProductModal(props) {

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
            <div className="form-group">
                <label for="newproduct-name">Name</label>
                <input type="text" className="form-control" id="newproduct-name" ref={nameRef} defaultValue={props.val.name} required />
            </div>
            <div className="form-group">
                <label for="newproduct-price">Price</label>
                <input type="number" className="form-control" id="newproduct-price" ref={priceRef} defaultValue={props.val.price} required />
            </div>
            <div className="form-group">
                <label for="newproduct-feature">Feature</label>
                <textarea className="form-control" id="newproduct-feature" rows="3" ref={featureRef} defaultValue={props.val.feature} required></textarea>
            </div>
            <div className="form-group">
                <label for="newproduct-pri-img">Primary Image</label>
                <input type="text" className="form-control" id="newproduct-pri-img" ref={primary_imageRef} defaultValue={props.val.primary_image} required />
            </div>
            <div className="form-group">
                <label for="newproduct-sec-img1">Secondary Image 1</label>
                <input type="text" className="form-control" id="newproduct-sec-img1" ref={secondary_image1Ref} defaultValue={props.val.secondary_image1} required />
            </div>
            <div className="form-group">
                <label for="newproduct-sec-img2">Secondary Image 2</label>
                <input type="text" className="form-control" id="newproduct-sec-img2" ref={secondary_image2Ref} defaultValue={props.val.secondary_image2} required />
            </div>
            <div className="form-group">
                <label for="newproduct-info">Info</label>
                <textarea className="form-control" id="newproduct-info" rows="3" ref={infoRef} defaultValue={props.val.info} required></textarea>
            </div>
            <div className="form-group">
                <label for="newproduct-highlight">Highlight</label>
                <textarea className="form-control" id="newproduct-highlight" rows="3" ref={highlightRef} defaultValue={props.val.highlight} required></textarea>
            </div>
            <div className="form-group">
                <label for="newproduct-quantity">Quantity</label>
                <input type="number" className="form-control" id="newproduct-quantity" ref={quantityRef} defaultValue={props.val.quantity} required />
            </div>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
              Cancel
            </Button>
            <Button variant="primary" onClick={props.onEdit}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      );
}

export default AdminProduct;