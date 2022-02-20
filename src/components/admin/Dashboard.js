import React, {useEffect, useState} from 'react'
import axios from 'axios'

import {Bar, Doughnut} from 'react-chartjs-2';

// add more info... most purchased products ...

function Dashboard() {

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

    const currentDate = new Date();
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    var sales_weekly = [];
    var last_sales_revenue = 0;

    if(sales_weekly.length === 0 && contents.length !== 0)
    {
        for(const data of contents)
        {
            let temp = {
                total_cost: data.total_cost,
                date: String(data.date).split('T')[0].split('-')
            };

            if(Number(temp.date[1]) === Number(currentDate.getMonth() + 1))
            {
                sales_weekly.push(temp);
            }

            if(Number(temp.date[1]) === (Number(currentDate.getMonth()) === 0 ? 12 : Number(currentDate.getMonth())))
            {
                last_sales_revenue += temp.total_cost;
            }
        }

        let result = [0,0,0,0];

        for(let i = 0; i < sales_weekly.length; i++)
        {
            if(Number(sales_weekly[i].date[2]) > 28)
            {
                result[3] += sales_weekly[i].total_cost;
            }
            else
            {
                result[Math.ceil(Number(sales_weekly[i].date[2]) / 7) - 1] += sales_weekly[i].total_cost;
            }
        }

        sales_weekly = result;
    }

    const bar_data = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Total Revenue',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: sales_weekly
          }
        ]
    }

    var listOfProducts = [];
    const mostPurchasedProducts_name = [];
    const mostPurchasedProducts_quantity = [];

    if(listOfProducts.length === 0 && contents.length !== 0)
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

                if(Number(date[1]) === Number(currentDate.getMonth() + 1))
                {
                    listOfProducts.push(temp);
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

    const doughnut_data = {
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

    var this_month_orders = 0;
    var last_month_orders = 0;

    if(this_month_orders === 0 && contents.length !== 0)
    {
        for(const data of contents)
        {
            let date = String(data.date).split('T')[0].split('-');

            if(Number(date[1]) === Number(currentDate.getMonth() + 1))
            {
                this_month_orders++;
            }

            if(Number(date[1]) === (Number(currentDate.getMonth()) === 0 ? 12 : Number(currentDate.getMonth())))
            {
                last_month_orders++;
            }
        }
    }

    var revenue_growth = ((sales_weekly.reduce((a,b) => a + b, 0) - last_sales_revenue) / last_sales_revenue)*100;
    var newUsers_growth = ((numberOfUsers - last_numberOfUsers) / last_numberOfUsers)*100;
    var orders_growth = ((this_month_orders - last_month_orders) / last_month_orders)*100;

    const table_data = contents.map(val => {

        let date = String(val.date).split('T')[0].split('-');

        if(Number(date[1]) === Number(currentDate.getMonth() + 1))
        {
            let date_msg = "";

            if(Number(date[2]) === currentDate.getDate())
            {
                date_msg = "Today";
            }
            else
            {
                let checkPlural = (currentDate.getDate() - Number(date[2])) === 1 ? " day ago" : " days ago";

                date_msg = currentDate.getDate() - Number(date[2]) + checkPlural;
            }

            return(
                <tr>
                    <td>{val.user.first_name + " " + val.user.last_name }</td>
                    <td>0{val.user.phone}</td>
                    <td>{val.user.address}</td>
                    <td>${val.total_cost}</td>
                    <td>{date_msg}</td>
                </tr>
            )
        }
        else
        {
            return null;
        }
    })

    return(
        <div className="admin-dashboard">
            <div className="d-flex justify-content-between">
                <h1 className="h2">Dashboard <span className="badge badge-pill badge-primary">{months[currentDate.getMonth()]}</span></h1>
                <div className="mb-2 mb-md-0">
                    <h5> {currentDate.getDate()}/{currentDate.getMonth()+1}/{currentDate.getFullYear()} </h5>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-xl-4">
                    <div className="card card-stats">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <h5 className="card-title text-uppercase text-muted mb-0">Total revenue</h5>
                                    <span className="h2 font-weight-bold mb-0">{(Math.round(sales_weekly.reduce((a,b) => a + b, 0) * 100) / 100).toLocaleString()}</span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape text-success">
                                        <i class="fa fa-usd fa-2x" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-3 mb-0 text-sm">
                                {revenue_growth >= 0 ?
                                    <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> {revenue_growth.toFixed(2)}%</span>
                                    :
                                    <span className="text-danger mr-2"><i className="fa fa-arrow-down"></i> {revenue_growth.toFixed(2)}%</span>
                                }
                                <span className="text-nowrap">Since last month</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="card card-stats">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <h5 className="card-title text-uppercase text-muted mb-0">New users</h5>
                                    <span className="h2 font-weight-bold mb-0">{(Math.round(numberOfUsers * 100) / 100).toLocaleString()}</span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape text-primary">
                                        <i class="fa fa-user fa-2x" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-3 mb-0 text-sm">
                                {newUsers_growth >= 0 ?
                                    <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> {newUsers_growth.toFixed(2)}%</span>
                                    :
                                    <span className="text-danger mr-2"><i className="fa fa-arrow-down"></i> {newUsers_growth.toFixed(2)}%</span>
                                }
                                <span className="text-nowrap">Since last month</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="card card-stats">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <h5 className="card-title text-uppercase text-muted mb-0">Orders</h5>
                                    <span className="h2 font-weight-bold mb-0">{(Math.round(this_month_orders * 100) / 100).toLocaleString()}</span>
                                </div>
                                    <div className="col-auto">
                                    <div className="icon icon-shape text-danger">
                                        <i class="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-3 mb-0 text-sm">
                                {orders_growth >= 0 ?
                                    <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> {orders_growth.toFixed(2)}%</span>
                                    :
                                    <span className="text-danger mr-2"><i className="fa fa-arrow-down"></i> {orders_growth.toFixed(2)}%</span>
                                }
                                <span className="text-nowrap">Since last month</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-xl-8 col-md-8">
                    <Bar
                        data={bar_data}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Sales Report',
                                    font: {
                                        size: 20
                                    }
                                }
                            }
                        }}
                    />
                </div>
                <div className="col-xl-4 col-md-4 bg-primary mt-2">
                    <Doughnut
                        data={doughnut_data}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Most Purchased Products',
                                    font: {
                                        size: 20
                                    },
                                    color: "white"
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
            </div>
            <div className="mt-4">
                <h2>Recent Purchases</h2>
                <div className="table-responsive table-style">
                    <table className="table table-striped table-sm table-center-align">
                        <thead className="text-center">
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Total Cost</th>
                                <th>Purchased</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {table_data}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

var numberOfUsers = 0;
var last_numberOfUsers = 0;

if(numberOfUsers === 0)
{
    let currentDate = new Date();

    axios.get('https://eshopkh-server-4xrg3.ondigitalocean.app/api/users')
    .then((response) => {

        for(let data of response.data)
        {
            let date = String(data.created_at).split('T')[0].split('-');

            if(Number(date[1]) === Number(currentDate.getMonth() + 1))
            {
                numberOfUsers++;
            }

            if(Number(date[1]) === (Number(currentDate.getMonth()) === 0 ? 12 : Number(currentDate.getMonth())))
            {
                last_numberOfUsers++;
            }
        }
        console.log('Success:', response);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

export default Dashboard;