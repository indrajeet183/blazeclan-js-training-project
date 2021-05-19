import { Route, Link, Redirect, Switch } from 'react-router-dom';
import Product from "./component/product/Product"
import ProductSaga from "./component/product/ProductSaga"
import ProductTable from "./component/product/ProductTableSaga"
import ProductList from "./component/product/ProductList"
import Home from "./component/Home"
import Registration from './component/user/Registration'
import Login from './component/user/Login'
import Category from './component/category/Category'
import ProductMain from './component/product/ProductMain'
import Checkout from './component/checkout/Checkout'
import Success from './component/checkout/Success'
import Logout from './component/user/Logout';
import { useSelector } from 'react-redux';
import ProductEdit from './component/product/ProductEdit';
import MyAccount from './component/user/MyAccount';
import MyOrders from './component/user/MyOrders';
import Vendor from './component/admin/Vendor';

export const Routes = () => {
    const userState = useSelector(state => state.user)

    if (userState.loggedIn && userState.role === 'admin') {
        return (<Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/products" component={ProductTable}></Route>
            <Route exact path="/category" component={Category}></Route>
            <Route exact path="/product" component={Product}></Route>
            <Route exact path="/logout" component={Logout}></Route>
            <Route exact path="/vendor" component={Vendor}></Route>
            <Redirect to="/"></Redirect>
        </Switch>)
    } else if (userState.loggedIn && userState.role === 'vendor') {
        return (<Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/products" component={ProductTable}></Route>
            <Route exact path="/product" component={ProductSaga}></Route>
            <Route exact path="/product/edit/:id" component={ProductEdit}></Route>
            <Route exact path="/logout" component={Logout}></Route>
            <Redirect to="/"></Redirect>
        </Switch>)
    } else if (userState.loggedIn && userState.role === 'customer') {
        return (<Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/products" component={ProductList}></Route>
            <Route exact path="/product/:id" component={ProductMain}></Route>
            <Route exact path="/products/cat/:id" component={ProductList}></Route>
            <Route exact path="/products/cat/:id/:subid" component={ProductList}></Route>
            <Route exact path="/checkout" component={Checkout}></Route>
            <Route exact path="/success" component={Success}></Route>
            <Route exact path="/myaccount" component={MyAccount}></Route>
            <Route exact path="/myorders" component={MyOrders}></Route>
            <Route exact path="/logout" component={Logout}></Route>
            <Redirect to="/"></Redirect>
        </Switch>)
    } else {
        return (<Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/products" component={ProductList}></Route>
            <Route exact path="/product/:id" component={ProductMain}></Route>
            <Route exact path="/products/cat/:id" component={ProductList}></Route>
            <Route exact path="/products/cat/:id/:subid" component={ProductList}></Route>
            <Route exact path="/signup" component={Registration}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/checkout" component={Checkout}></Route>
            <Redirect to="/"></Redirect>
        </Switch>)
    }
}