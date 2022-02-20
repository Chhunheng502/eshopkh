import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FaqForm from "../../FaqForm.js"

function AdminFaq() {

    const [content, setContent] = useState([]);

    useEffect(() => {

        axios.get('https://eshopkh-server-4xrg3.ondigitalocean.app/api/faq/get')
        .then((response) => {
            for (const data of response.data) {
                setContent(oldContents => [...oldContents, data]);
            }
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    const handleDeletion = (id) => {
        console.log(id)
        axios.delete(`https://eshopkh-server-4xrg3.ondigitalocean.app/api/faq/${id}`)
        .then((response) => {
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        setContent(content.filter(item => item.id !== id));
    }

    const [editFaqModalShow, setEditFaqModalShow] = useState([]);

    useEffect(() => {

        if (content.length !== 0) {
            let tempArr = [];

            for (let i = 0; i < content.length; i++) {
                tempArr.push(false);
            }

            setEditFaqModalShow(tempArr);
        }

    }, [content]);

    const hanldeEditFaqModal = (value, index) => {
        let temp = [];
        temp[index] = value;
        setEditFaqModalShow(temp);
    }

    useEffect(() => {

        console.log(editFaqModalShow);

    }, [editFaqModalShow])

    const updateTableAfterEdition = (id, index) => {

        const myObj = {
            id: id,
            type: typeRef.current.value,
            question: questionRef.current.value,
            answer: answerRef.current.value,
        }

        axios.put(`https://eshopkh-server-4xrg3.ondigitalocean.app/api/faq/${id}`, myObj)
        .then((response) => {
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        let tempIndex = content.findIndex((obj => obj.id === id));
        let temp = content;
        temp[tempIndex] = myObj;

        setContent(temp);
        setEditFaqModalShow(false, index);
    }

    const myData = content.map((val, index) => {

        return (
            <tr>
                <td>
                    <div className="d-flex align-items-center">
                        {val.type}
                    </div>
                </td>
                <td>{val.question}</td>
                <td>{val.answer}</td>
                <td>
                    <div className="d-flex">
                        <div className="popover-style popover-blue mr-1" onClick={() => hanldeEditFaqModal(true, index)}><i class="fa fa-files-o" aria-hidden="true"></i> </div>
                        <EditFaqModal show={editFaqModalShow[index]} val={val} onHide={() => hanldeEditFaqModal(false, index)} onEdit={() => updateTableAfterEdition(val.id, index)} />
                        <div className="popover-style popover-red" onClick={() => handleDeletion(val.id)}><i class="fa fa-trash-o" aria-hidden="true"></i> </div>
                    </div>
                </td>
            </tr>
        )
    });

    const [showAddModal, setShowAddModal] = useState(false);
    const showModal = () => {
        setShowAddModal(!showAddModal); 
        console.log(showAddModal); 
    }

    const closeModal = () => {
        setShowAddModal(false); 
    }

    const addContent = (text) => {
        setContent([...content, text]); 
    }
    return (
        <div className="admin-dashboard p-3 m-1">
            <div className="d-flex justify-content-end">
                <form>
                    <div className="btn-group">
                        <Button className="border border-secondary" onClick={()=> showModal()} ><i class="fa fa-plus" aria-hidden="true"></i> Add FAQ </Button>
                        {
                           showAddModal ? <FaqForm show={showModal} onHide={closeModal} addContent={addContent}></FaqForm> : null 
                        }
                    </div>
                </form>
            </div>
            <div className="bg-light">
                <div className="p-3 m-3">
                    <div className="d-flex justify-content-between pb-2 mb-2">
                        <div className="d-flex justify-content-around w-75">
                        </div>
                    </div>
                    <div>
                        <table className="table table-hover table-center-align">
                            <thead className="text-center">
                                <tr className="text-uppercase">
                                    <th className="text-left">Type</th>
                                    <th>Questions</th>
                                    <th>Answers</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {myData}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

const typeRef = React.createRef();
const questionRef = React.createRef();
const answerRef = React.createRef();

function EditFaqModal(props) {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit FAQs
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label for="type">Type</label>
                        <input type="text" className="form-control" id="type" ref={typeRef} defaultValue={props.val.type} required />
                    </div>
                    <div className="form-group">
                        <label for="question">Question</label>
                        <textarea className="form-control" id="question" ref={questionRef} defaultValue={props.val.question} required></textarea>
                    </div>
                    <div className="form-group">
                        <label for="answer">Answer</label>
                        <textarea className="form-control" id="answer" ref={answerRef} defaultValue={props.val.answer} required></textarea>
                    </div>
                    <div className="form-group">

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

export default AdminFaq;