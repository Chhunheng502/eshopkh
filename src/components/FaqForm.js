import React, { useState } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


function FaqForm(props){

    const [text,setText] = useState({
        question: "", 
        type: "", 
        answer: ""
    })

    const handleChange = (e) => {
        setText(prevState => ({
            ...prevState, 
            [e.target.name] : e.target.value
        }))
    }

    const postFaq = async()=>{
        props.onHide();     
        try{
            let temp_id = null;
            await axios.post('https://eshopkh-api.herokuapp.com/api/faq/post', text)
            .then(response => {
                temp_id = response.data;
                console.log('success', response);
            });
            
            const data = {
                id: temp_id,
                question: text.question,
                type: text.type,
                answer: text.answer
            };
            props.addContent(data); 
        }
        catch(e){
            console.log(e.response); 
        }
    }
    
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Add FAQs
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div className="form-group">
                    <label for="type">Type</label>
                    <input type="text" className="form-control" id="type" name="type" value={text.type} onChange={(e)=>handleChange(e)} required />
                </div>
                <div className="form-group">
                    <label for="question">Question</label>
                    <textarea className="form-control" id="question" name="question" value={text.question}  onChange={(e)=>handleChange(e)} required></textarea>
                </div>
                <div className="form-group">
                    <label for="answer">Answer</label>
                    <textarea className="form-control" id="answer" name="answer" value={text.answer} onChange={(e)=>handleChange(e)} required></textarea>
                </div>
                <div className="form-group">
                    
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
                Cancel
            </Button>
            <Button variant="primary" onClick={()=>postFaq()}>
                Add
            </Button>
        </Modal.Footer>
    </Modal>
    )
}

export default FaqForm