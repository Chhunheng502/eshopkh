import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Faq(props) {

    const [general, setGeneral] = useState([]);
    const [buyers, setBuyers] = useState([]);
    const [others, setOthers] = useState([]);



    useEffect(() => {

        axios.get('https://eshopkh-server-4xrg3.ondigitalocean.app/api/faq/get')
        .then(response => {
            for (const data of response.data) {
                if (data.type === 'General') {
                    setGeneral(oldContents => [...oldContents, data]);
                } else if (data.type === 'Buyers') {
                    setBuyers(oldContents => [...oldContents, data]);
                } else if (data.type === 'Others') {
                    setOthers(oldContents => [...oldContents, data]);
                }
            }
            console.log('Success:', response);
        
        }).catch((error) => {
            console.error('Error:', error);
        });

    }, []);


    const general_question = general.map(val => {

        return (
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        {val.question}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>{val.answer}</Card.Body>
                </Accordion.Collapse>
            </Card>
        )
    });

    const buyer_question = buyers.map(val => {

        return (
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        {val.question}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>{val.answer}</Card.Body>
                </Accordion.Collapse>
            </Card>
        )
    });

    const other_question = others.map(val => {

        return (
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        {val.question}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>{val.answer}</Card.Body>
                </Accordion.Collapse>
            </Card>
        )
    });


    return (
        <div className="container">
            <br />
            <br />
            <br />

            <div className="alert alert-warning alert-dismissible" role="alert">
                <button type="button" className="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                This section contains a wealth of information, related to <strong>Eshop-KH</strong> and its <strong>FAQs</strong>. If you cannot find an answer to your question,
                make sure to contact us.
            </div>

            <div className="faqHeader">General questions</div>

            <Accordion defaultActiveKey="0">
                {general_question}
            </Accordion>

            <br />

            <div className="faqHeader">Buyers</div>

            <Accordion defaultActiveKey="0">
                {buyer_question}
            </Accordion>

            <br></br>

            <div className="faqHeader">Others</div>

            <Accordion defaultActiveKey="0">
                {other_question}
            </Accordion>

            <br></br>
        </div>
    )
}

export default Faq;