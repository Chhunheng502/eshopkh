import React, { createRef, useEffect, useState } from 'react'
import axios from 'axios'

function AdminHome() {

    const m1 = createRef();
    const t1 = createRef();
    const c1 = createRef();

    const m2 = createRef();
    const t2 = createRef();
    const c2 = createRef();

    const m3 = createRef();
    const t3 = createRef();
    const c3 = createRef();

    const image1Ref = [m1, m2, m3];
    const title1Ref = [t1, t2, t3];
    const content1Ref = [c1, c2, c3];

    const m4 = createRef();
    const t4 = createRef();
    const c4 = createRef();

    const m5 = createRef();
    const t5 = createRef();
    const c5 = createRef();

    const m6 = createRef();
    const t6 = createRef();
    const c6 = createRef();

    const image2Ref = [m4, m5, m6];
    const title2Ref = [t4, t5, t6];
    const content2Ref = [c4, c5, c6];

    const [content1, setContent1] = useState([]);
    const [content2, setContent2] = useState([]);

    useEffect(() => {

        axios.get('https://eshopkh-api.herokuapp.com/api/home/content/get')
        .then((response) => {
            for (const data of response.data) {
                if(Number(data.type) === 1)
                {
                    setContent1(oldContent => [...oldContent, data]);
                }
                else
                {
                    setContent2(oldContent => [...oldContent, data]);
                }
            }
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    const [editContent1, setEditContent1] = useState(false);
    const [editContent2, setEditContent2] = useState(false);

    const enableEditContent1 = () => {

        setEditContent1(true);

        for(let i = 1; i <= 3; i++)
        {
            document.getElementById(`highlight-image${i}`).disabled = false;
            document.getElementById(`highlight-title${i}`).disabled = false;
            document.getElementById(`highlight-content${i}`).disabled = false;
        }
    }

    const handleEditContent1 = () => {

        setEditContent1(false);

        for(let i = 1; i <= 3; i++)
        {
            document.getElementById(`highlight-image${i}`).disabled = true;
            document.getElementById(`highlight-title${i}`).disabled = true;
            document.getElementById(`highlight-content${i}`).disabled = true;
        }

        let myData = [
            {
                id: 1,
                image: image1Ref[0].current.value,
                title: title1Ref[0].current.value,
                content: content1Ref[0].current.value
            },
            {
                id: 2,
                image: image1Ref[1].current.value,
                title: title1Ref[1].current.value,
                content: content1Ref[1].current.value
            },
            {
                id: 3,
                image: image1Ref[2].current.value,
                title: title1Ref[2].current.value,
                content: content1Ref[2].current.value
            }
        ];

        axios.post('https://eshopkh-api.herokuapp.com/api/home/content', {data: myData})
        .then((response) => {
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const enableEditContent2 = () => {

        setEditContent2(true);

        for(let i = 4; i <= 6; i++)
        {
            document.getElementById(`best-image${i}`).disabled = false;
            document.getElementById(`best-title${i}`).disabled = false;
            document.getElementById(`best-content${i}`).disabled = false;
        }
    }

    const handleEditContent2 = () => {

        setEditContent2(false);

        for(let i = 4; i <= 6; i++)
        {
            document.getElementById(`best-image${i}`).disabled = true;
            document.getElementById(`best-title${i}`).disabled = true;
            document.getElementById(`best-content${i}`).disabled = true;
        }

        let myData = [
            {
                id: 4,
                image: image2Ref[0].current.value,
                title: title2Ref[0].current.value,
                content: content2Ref[0].current.value
            },
            {
                id: 5,
                image: image2Ref[1].current.value,
                title: title2Ref[1].current.value,
                content: content2Ref[1].current.value
            },
            {
                id: 6,
                image: image2Ref[2].current.value,
                title: title2Ref[2].current.value,
                content: content2Ref[2].current.value
            }
        ];

        axios.post('https://eshopkh-api.herokuapp.com/api/home/content', {data: myData})
        .then((response) => {
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const myContent1 = content1.map((val,index) => {

        return (
            <form>
                <div className="form-group">
                    <label for={`highlight-image${val.id}`}>Image</label>
                    <input type="text" className="form-control" ref={image1Ref[index]} defaultValue={val.image} id={`highlight-image${val.id}`} disabled required />
                </div>
                <div className="form-group">
                    <label for={`highlight-title${val.id}`}>Title</label>
                    <input className="form-control" ref={title1Ref[index]} defaultValue={val.title} id={`highlight-title${val.id}`} disabled required></input>
                </div>
                <div className="form-group">
                    <label for={`highlight-content${val.id}`}>Content</label>
                    <input className="form-control" ref={content1Ref[index]} defaultValue={val.content} id={`highlight-content${val.id}`} disabled required></input>
                </div>
            </form>   
        )
    })

    const myContent2 = content2.map((val,index) => {

        return (
            <form>
                <div className="form-group">
                    <label for={`best-image${val.id}`}>Image</label>
                    <input type="text" className="form-control" ref={image2Ref[index]} defaultValue={val.image} id={`best-image${val.id}`} disabled required />
                </div>
                <div className="form-group">
                    <label for={`best-title${val.id}`}>Title</label>
                    <input className="form-control" ref={title2Ref[index]} defaultValue={val.title} id={`best-title${val.id}`} disabled required></input>
                </div>
                <div className="form-group">
                    <label for={`best-content${val.id}`}>Content</label>
                    <input className="form-control" ref={content2Ref[index]} defaultValue={val.content} id={`best-content${val.id}`} disabled required></input>
                </div>
            </form>   
        )
    })

    return (
        <div className="admin-dashboard p-3 m-1">
            <div>
                <h2 className="mb-4"> This week's highlights </h2>
                <div className="bg-light">
                    <div className="p-3 m-3">
                        <div className="d-flex justify-content-between">
                            {myContent1}
                        </div>
                        <div className="d-flex justify-content-end">
                            {
                                !editContent1 ?
                                (
                                    <button type="button" className="btn btn-primary" onClick={() => enableEditContent1()}> Edit </button>
                                )
                                :
                                (
                                    <button type="button" className="btn btn-success" onClick={() => handleEditContent1()}> Done </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="mb-4"> Best Collection of This Month </h2>
                <div className="bg-light">
                    <div className="p-3 m-3">
                        <div className="d-flex justify-content-between">
                            {myContent2}
                        </div>
                        <div className="d-flex justify-content-end">
                            {
                                !editContent2 ?
                                (
                                    <button type="button" className="btn btn-primary" onClick={() => enableEditContent2()}> Edit </button>
                                )
                                :
                                (
                                    <button type="button" className="btn btn-success" onClick={() => handleEditContent2()}> Done </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHome;