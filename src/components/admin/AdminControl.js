import React, {useEffect, useState} from 'react'
import { FaBars } from 'react-icons/fa';
import axios from 'axios'

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import Auth from './Auth'
import Dashboard from './Dashboard'
import ProductOrder from './ProductOrder'
import AdminProduct from './store-products/AdminProduct'
import AdminInventory from './store-products/AdminInventory'
import {AdminCollection} from './store-products/collection/AdminCollection'
import CollectionDetail from './store-products/collection/CollectionDetail'
import ContactList from './customers/ContactList'
import SalesReport from './SalesReport'
import AdminHome from './contents/AdminHome'
import AdminFaq from './contents/AdminFaq'

import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {useSharedFormState} from './store-products/collection/AdminCollection'

function AdminControl(props) {

    const { updateServer, setUpdateServer } = useSharedFormState();

    const contentArr = [];
    const [contents, setContent] = useState([]);

    useEffect (() => {
        axios.get('https://eshopkh-server-4xrg3.ondigitalocean.app/api/collections/get')
        .then((response) => {
            for(const data of response.data)
            {
                contentArr.push(data);
            }
            setContent(contentArr);
            console.log('Success:', response);
            setUpdateServer(false);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        console.log('use effect');
    }, [updateServer]);

    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false);
    
    const handleToggleSidebar = (checked) => {

        setToggled(checked);
    }

    const collection_routes = contents.map(val => {

        return(
            <Route path={`/admin-control/collections/${String(val.name).replace(/\s+/g, '-').toLowerCase()}`} exact component={() => <CollectionDetail id={val.id} data={val.products}> </CollectionDetail>} />
        )
    });

    return(
        <div className="admin-dashboard">
            <Router>
                <div className="row">
                    <div className="col-auto sidebar">
                        <ProSidebar collapsed={collapsed} toggled={toggled} onToggle={handleToggleSidebar} breakPoint="lg">
                            <SidebarHeader>
                                <Menu>
                                    <MenuItem icon={<i class="fa fa-shopping-bag" aria-hidden="true"></i>}> <h5> eShop KH </h5> <Link onClick={() => {Auth.logout(() => {props.history.push('/')})}}/></MenuItem>
                                </Menu>
                            </SidebarHeader>
                            <SidebarContent>
                                <Menu iconShape="square">
                                    <MenuItem active icon={<i className="fa fa-home" aria-hidden="true"></i>}> Dashboard <Link to="/admin-control" /></MenuItem>
                                    <MenuItem icon={<i className="fa fa-file-text" aria-hidden="true"></i>}> Orders <Link to="/admin-control/product-order"/></MenuItem>
                                    <SubMenu title="Store Products" icon={<i className="fa fa-shopping-cart mr-1" aria-hidden="true"></i>}>
                                        <MenuItem> Products <Link to="/admin-control/products"/></MenuItem>
                                        <MenuItem> Inventory <Link to="/admin-control/inventory"/></MenuItem>
                                        <MenuItem> Collections <Link to="/admin-control/collections"/></MenuItem>
                                    </SubMenu>
                                    <MenuItem icon={<i className="fa fa-user mr-1" aria-hidden="true"></i>}> Contact List <Link to="/admin-control/contact-list"/></MenuItem>
                                    <MenuItem icon={<i class="fa fa-line-chart" aria-hidden="true"></i>}> Reports <Link to="/admin-control/reports"/></MenuItem>
                                    <hr />
                                    <MenuItem> Edit Contents </MenuItem>
                                    <MenuItem icon={<i class="fa fa-code" aria-hidden="true"></i>}> Home Page <Link to="/admin-control/admin-home"/></MenuItem>
                                    <MenuItem icon={<i class="fa fa-code" aria-hidden="true"></i>}> FAQ <Link to="/admin-control/faq"/></MenuItem>
                                    <MenuItem className="text-center">
                                        {collapsed ?
                                        <i onClick={() => setCollapsed(false)} className="fa fa-angle-double-right fa-lg" aria-hidden="true"></i>
                                        : 
                                        <i onClick={() => setCollapsed(true)} className="fa fa-angle-double-left fa-lg" aria-hidden="true"></i> } 
                                    </MenuItem>
                                </Menu>
                            </SidebarContent>
                            <SidebarFooter>
                                <Menu>
                                    <MenuItem icon={<i class="fa fa-sign-out" aria-hidden="true"></i>}> Logout <Link onClick={() => {Auth.logout(() => {props.history.push('/')})}}/></MenuItem>
                                </Menu>
                            </SidebarFooter>
                        </ProSidebar>
                    </div>
                    <div className="col m-0 p-5">
                        <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                            <FaBars />
                        </div>
                        <Switch>
                            <Route path="/admin-control" exact component={Dashboard} />
                            <Route path="/admin-control/product-order" component={ProductOrder} />
                            <Route path="/admin-control/products" component={AdminProduct} />
                            <Route path="/admin-control/inventory" component={AdminInventory} />
                            <Route path="/admin-control/collections" exact component={AdminCollection} />
                            {collection_routes}
                            <Route path="/admin-control/contact-list" component={ContactList}/>
                            <Route path="/admin-control/reports" component={SalesReport} />
                            <Route path="/admin-control/admin-home" component={AdminHome} />
                            <Route path="/admin-control/faq" component={AdminFaq} />
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    )
}

export default AdminControl;