import React, {useEffect, useState} from 'react'
import axios from 'axios'

import {Line, Pie} from 'react-chartjs-2';

// add more info... most purchased products ...

function SalesReport() {

    const [contents, setContent] = useState([]);

    useEffect (() => {

        axios.get('https://eshopkh-server-4xrg3.ondigitalocean.app/api/orders/get')
        .then((response) => {
            
            for(const data of response.data)
            {
                if(data.is_accepted === 1)
                {
                    setContent(oldContents => [...oldContents, data]);
                }
            }
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        console.log('use effect');
    }, []);

    useEffect(() => {

        let temp = contents;

        temp.sort(function(a, b){
            if(String(a.date) < String(b.date)) { return 1; }
            if(String(a.date) > String(b.date)) { return -1; }
            return 0;
        });

        setContent(temp);
    }, [contents]);

    const [selectedMonth, setSelectedMonth] = useState(0);
    let currentDate = new Date();
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Wee 4'];

    var sales_data = [];
    var line_labels = [];
    var line_title = "";

    if(sales_data.length === 0 && contents.length !== 0 && selectedMonth !== undefined)
    {
        if(selectedMonth === 0)
        {
            for(const data of contents)
            {
                let temp = {
                    total_cost: data.total_cost,
                    date: String(data.date).split('T')[0].split('-')
                };
    
                if(Number(temp.date[0]) === Number(currentDate.getFullYear()) && Number(temp.date[1]) <= Number(currentDate.getMonth() + 1))
                {
                    sales_data.push(temp);
                }
            }
    
            let result = [];
    
            for(let i = 0; i < currentDate.getMonth() + 1; i++)
            {
                result.push(0);
            }
    
            for(let i = 0; i < sales_data.length; i++)
            {
                result[Number(sales_data[i].date[1])-1] += sales_data[i].total_cost;
            }
    
            sales_data = result;
            line_labels = months;
            line_title = "Monthly Sales Report";
        }
        else
        {
            for(const data of contents)
            {
                let temp = {
                    total_cost: data.total_cost,
                    date: String(data.date).split('T')[0].split('-')
                };
    
                if(Number(temp.date[0]) === Number(currentDate.getFullYear()) && Number(temp.date[1]) === selectedMonth)
                {
                    sales_data.push(temp);
                }
            }
    
            let result = [];
    
            for(let i = 0; i < Math.ceil(currentDate.getDate() / 7); i++)
            {
                result.push(0);
            }

            for(let i = 0; i < sales_data.length; i++)
            {
                if(result.length === 4 && Number(sales_data[i].date[2]) > 28)
                {
                    result[3] += sales_data[i].total_cost;
                }
                else
                {
                    result[Math.ceil(Number(sales_data[i].date[2]) / 7) - 1] += sales_data[i].total_cost;
                }
            }
    
            sales_data = result;
            line_labels = weeks;
            line_title = "Sales Report";
        }
    }

    var line_data = {
        labels: line_labels,
        datasets: [
          {
            label: 'Revenue',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: sales_data
          }
        ]
    };

    var listOfProducts = [];
    const mostPurchasedProducts_name = [];
    const mostPurchasedProducts_quantity = [];

    if(listOfProducts.length === 0 && contents.length !== 0 && selectedMonth !== undefined)
    {
        for(const i of contents)
        {
            let date = String(i.date).split('T')[0].split('-');

            for(const j of i.order_data)
            {
                let temp = {
                    id: j.product_data.product_id,
                    name: j.product_data.product_name,
                    quantity: j.quantity,
                };

                if(selectedMonth === 0)
                {
                    if(Number(date[0]) === Number(currentDate.getFullYear()) && Number(date[1]) <= Number(currentDate.getMonth() + 1))
                    {
                        listOfProducts.push(temp);
                    }
                }
                else
                {
                    if(Number(date[0]) === Number(currentDate.getFullYear()) && Number(date[1]) === selectedMonth)
                    {
                        listOfProducts.push(temp);
                    }
                }
            }
        }
        
        listOfProducts.sort(function(a, b){
            if(a.quantity < b.quantity) { return 1; }
            if(a.quantity > b.quantity) { return -1; }
            return 0;
        });

        if(listOfProducts.length > 5)
        {
            for(let i = 0; i < 5; i++)
            {
                mostPurchasedProducts_name.push(listOfProducts[i].name + " ( id: " + listOfProducts[i].id + " )");
                mostPurchasedProducts_quantity.push(listOfProducts[i].quantity);
            }
        }
        else
        {
            for(let i = 0; i < listOfProducts.length; i++)
            {
                mostPurchasedProducts_name.push(listOfProducts[i].name + " ( id: " + listOfProducts[i].id + " )");
                mostPurchasedProducts_quantity.push(listOfProducts[i].quantity);
            }
        }
    }

    const pie_data = {
        labels: mostPurchasedProducts_name,
        datasets: [
          {
            label: 'Most Purchased Products',
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(63, 252, 142)',
                'rgb(201, 81, 252)'
            ],
            borderColor: 'rgba(0,0,0,1)',
            fontColor: "white",
            borderWidth: 2,
            data: mostPurchasedProducts_quantity
          }
        ]
    }

    var total_orders = 0;

    if(total_orders === 0 && contents.length !== 0 && selectedMonth !== undefined)
    {
        for(const data of contents)
        {
            let date = String(data.date).split('T')[0].split('-');

            if(selectedMonth === 0)
            {
                if(Number(date[0]) === Number(currentDate.getFullYear()) && Number(date[1]) <= Number(currentDate.getMonth() + 1))
                {
                    total_orders++;
                }
            }
            else
            {
                if(Number(date[0]) === Number(currentDate.getFullYear()) && Number(date[1]) === selectedMonth)
                {
                    total_orders++;
                }
            }
        }
    }

    var total_users = 0;

    if(total_users === 0 && users_data !== 0 && selectedMonth !== undefined)
    {
        for(const data of users_data)
        {
            let date = String(data.created_at).split('T')[0].split('-');

            if(selectedMonth === 0)
            {
                if(Number(date[0]) === Number(currentDate.getFullYear()) && Number(date[1]) <= Number(currentDate.getMonth() + 1))
                {
                    total_users++
                }
            }
            else
            {
                if(Number(date[0]) === Number(currentDate.getFullYear()) && Number(date[1]) === selectedMonth)
                {
                    total_users++;
                }
            }
        }
    }

    return(
        <div className="admin-dashboard">
            <div className="d-flex justify-content-between">
                <h1 className="h2">Report</h1>
                <form className="form-inline">
                    <select name="filterDate" className="custom-select" onChange={(event) => setSelectedMonth(Number(event.target.value))}>
                        <option value='0'>All</option>
                        <option value='1'>January</option>
                        <option value='2'>February</option>
                        <option value='3'>March</option>
                        <option value='4'>April</option>
                        <option value='5'>May</option>
                        <option value='6'>June</option>
                        <option value='7'>July</option>
                        <option value='8'>August</option>
                        <option value='9'>September</option>
                        <option value='10'>October</option>
                        <option value='11'>November</option>
                        <option value='12'>December</option>
                    </select>
                </form>
            </div>
            <div className="container">
                <div>
                    <Line
                        data={line_data}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: line_title,
                                    font: {
                                        size: 20
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-xl-6 col-md-6">
                        <Pie
                            data={pie_data}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Most Purchased Products',
                                        font: {
                                            size: 20
                                        }
                                    },
                                    legend: {
                                        labels: {
                                            color: "black"
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                    <div className="col-xl-6 col-md-6">
                        <div className="d-flex flex-column justify-content-between mt-4">
                            <div>
                                <div className="card card-stats">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h5 className="card-title text-uppercase text-muted mb-0">Total revenue</h5>
                                                <span className="h2 font-weight-bold mb-0">{(Math.round(sales_data.reduce((a,b) => a + b, 0) * 100) / 100).toLocaleString()}</span>
                                            </div>
                                            <div className="col-auto">
                                                <div className="icon icon-shape text-success">
                                                    <i class="fa fa-usd fa-2x" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-xl-4">
                                <div className="card card-stats">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h5 className="card-title text-uppercase text-muted mb-0">Total users</h5>
                                                <span className="h2 font-weight-bold mb-0">{(Math.round(total_users * 100) / 100).toLocaleString()}</span>
                                            </div>
                                            <div className="col-auto">
                                                <div className="icon icon-shape text-primary">
                                                    <i class="fa fa-user fa-2x" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-xl-4">
                                <div className="card card-stats">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h5 className="card-title text-uppercase text-muted mb-0">Total orders</h5>
                                                <span className="h2 font-weight-bold mb-0">{(Math.round(total_orders * 100) / 100).toLocaleString()}</span>
                                            </div>
                                                <div className="col-auto">
                                                <div className="icon icon-shape text-danger">
                                                    <i class="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

var users_data = [];

if(users_data.length === 0)
{
    axios.get('https://eshopkh-server-4xrg3.ondigitalocean.app/api/users')
    .then((response) => {

        for(const data of response.data)
        {
            users_data.push(data);
        }
        console.log('Success:', response);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

export default SalesReport;

