import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Pagination from 'react-bootstrap/Pagination'
import { useBetween } from "use-between"

const useFormState = () => {
    const [updateServer, setUpdateServer] = useState(false);
  return {
    updateServer, setUpdateServer
  };
};

const useSharedFormState = () => useBetween(useFormState);

function AdminCollection() {

    const { updateServer, setUpdateServer } = useSharedFormState();

    const contentArr = [];
    const [contents, setContent] = useState([]);

    const getData = async () => {

        axios.get('https://eshopkh-api.herokuapp.com/api/collections/get')
        .then((response) => {
            for(const data of response.data)
            {
                contentArr.push(data);
            }
            setContent(contentArr);
            setUpdateServer(true);
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
    const [postsPerPage] = useState(9);

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

    const [newCollectionModalShow, setNewCollectionModalShow] = useState(false);

    const updateTableAfterAddition =  () => {

        const myObj = {
            name: nameRef.current.value,
            image: imageRef.current.value
        }

        axios.post('https://eshopkh-api.herokuapp.com/api/collections/store',  myObj)
        .then((response) => {
            console.log('Success:', response);
            const temp = {
                id: response.data,
                name: myObj.name,
                image: myObj.image
            };
            setContent(oldContents => [...oldContents, temp]);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        setNewCollectionModalShow(false);
        setUpdateServer(true);
    };

    const [editCollectionModalShow, setEditCollectionModalShow] = useState([]);
    const [deleteCollectionModalShow, setDeleteCollectionModalShow] = useState([]);

    useEffect(() => {

        if(contents.length !== 0)
        {
            let tempArr = [];

            for(let i = 0; i < currentPosts.length; i++)
            {
                tempArr.push(false);
            }

            setEditCollectionModalShow(tempArr);
            setDeleteCollectionModalShow(tempArr);
        }

    }, [contents, currentPosts.length]);

    const hanldeEditCollectionModal = (value, index) => {

        let tempArr = [];

        tempArr[index] = value;

        setEditCollectionModalShow(tempArr);
    }

    const hanldeDeleteCollectionModal = (value, index) => {

        let tempArr = [];

        tempArr[index] = value;

        setDeleteCollectionModalShow(tempArr);
    }

    const updateTableAfterEdition = (id, index) => {

        const myObj = {
            id: id,
            name: nameRef.current.value,
            image: imageRef.current.value
        }

        axios.put(`https://eshopkh-api.herokuapp.com/api/collections/edit/${id}`, myObj)
        .then((response) => {
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        let temp = contents;
        temp[index]['name'] = myObj['name'];
        temp[index]['image'] = myObj['image'];
        setContent(temp);
        hanldeEditCollectionModal(false, index);
    }

    const updateTableAfterDeletion =  (id, index) => {

        axios.delete(`https://eshopkh-api.herokuapp.com/api/collections/delete/${id}`)
        .then((response) => {
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        setContent(contents.filter(item => item.id !== id));
        hanldeDeleteCollectionModal(false, index);
    };

    const collections = currentPosts.map((val,index) => {

        return (
            <div className="col mb-3">
                <div className="card shadow-sm">
                    <Link to={`/admin-control/collections/${String(val.name).replace(/\s+/g, '-').toLowerCase()}`}> <img src={val.image} className="card-img-top" width="295px" height="250px" style={{cursor:"pointer", objectFit:"cover"}} alt="" /> </Link>
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div> 
                                <div style={{width:"150px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                                    <p3 className="text-muted"> {val.name} </p3>
                                </div>
                                <span className="text-muted">
                                    {val.products !== undefined ? val.products.length : 0} 
                                </span> 
                            </div>
                            <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => hanldeEditCollectionModal(true, index)}> <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                                <EditCollectionModal show={editCollectionModalShow[index]} data={val} onHide={() => hanldeEditCollectionModal(false, index)} onEdit={() => updateTableAfterEdition(val.id, index)} />
                                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => hanldeDeleteCollectionModal(true, index)}> <i class="fa fa-trash-o" aria-hidden="true"></i> Delete</button>
                                <DeleteCollectionModal show={deleteCollectionModalShow[index]} data={val} onHide={() => hanldeDeleteCollectionModal(false, index)} onDelete={() => updateTableAfterDeletion(val.id, index)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    });

    return(
        <div className="admin-dashboard">
            <div className="d-flex justify-content-between mb-3">
                <h2> Collections <span> {contents.length} </span> </h2>
                <div className="form-inline">
                    <button className="btn btn-primary" onClick={() => setNewCollectionModalShow(true)}> <i class="fa fa-plus" aria-hidden="true"></i> New Collection </button>
                    <NewCollectionModal show={newCollectionModalShow} onHide={() => setNewCollectionModalShow(false)} onAdd={() => updateTableAfterAddition()}/>
                </div>
            </div>
            <div>
                <div className="album py-3 bg-light">
                    <div className="container">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {collections}
                        </div>
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

const nameRef = React.createRef();
const imageRef = React.createRef();

function NewCollectionModal(props) {

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add New Collection
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
            <div className="form-group">
                <label for="newcollection-name">Name</label>
                <input type="text" className="form-control" ref={nameRef} id="newcollection-name" required />
            </div>
            <div className="form-group">
                <label for="newcollection-img">Image</label>
                <input type="text" className="form-control" ref={imageRef} id="newcollection-img" required />
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

function EditCollectionModal(props) {

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Collection
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
            <div className="form-group">
                <label for="newcollection-name">Name</label>
                <input type="text" className="form-control" ref={nameRef} defaultValue={props.data.name} id="newcollection-name" required />
            </div>
            <div className="form-group">
                <label for="newcollection-img">Image</label>
                <input type="text" className="form-control" ref={imageRef} defaultValue={props.data.image} id="newcollection-img" required />
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

function DeleteCollectionModal(props) {

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete {props.data.name}
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

export {AdminCollection,useSharedFormState};