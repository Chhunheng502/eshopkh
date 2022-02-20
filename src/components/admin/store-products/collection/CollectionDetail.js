import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Pagination from 'react-bootstrap/Pagination'

function CollectionDetail(props) {

    const [contents, setContent] = useState([]);

    useEffect (() => {

        if(contents.length === 0) {
            setContent(props.data);
        }
        console.log('use effect');
    }, []);
    
    const [paginItems, setPaginItems] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

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

    const handleDeleteProduct = (collection_id, product_id) => {

        const myObj = {
            collection_id: collection_id,
            product_id: product_id
        }

        axios.post(`https://eshopkh-server-4xrg3.ondigitalocean.app/api/collections/delete-product`, myObj)
        .then((response) => {
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        setContent(contents.filter(item => item[0].id !== product_id));
    }

    const products = currentPosts.map(val => {
        return (
            <div className="col mb-3">
                <div className="card shadow-sm">
                <i className="fa fa-minus-circle pl-2 pt-2" onClick={() => handleDeleteProduct(props.id, val[0].id)} style={{cursor:"pointer",color:"red"}} aria-hidden="true"></i>
                    <img src={val[0].primary_image} className="card-img-top" width="100%" height="100" style={{objectFit:"contain"}} alt="" />
                    <div className="card-body">
                        <div style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                            <p3 className="text-muted"> {val[0].name} </p3>
                        </div>
                    </div>
                </div>
            </div>
        )
    });

    return(
        <div className="admin-dashboard">
            <div className="d-flex justify-content-between mb-3">
                <h3> Products in Collections <span> {contents.length} </span> </h3>
                <div className="form-inline">
                    <div className="input-group mr-3">
                        <input type="text" className="form-control" placeholder="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="album py-3 p-3 mr-3">
                    <div className="container">
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                            {products}
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

export default CollectionDetail;