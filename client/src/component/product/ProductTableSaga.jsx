import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from './ProductContext'
import { MainContext } from '../maincontext'
import ProductService from '../../services/product'
import ProductDetails from './ProductDetails'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../store/actions/actions'
import { Link } from "react-router-dom";

const TableHeader = (props) => {
    return (
        <thead>
            <tr>
                {props.columns.map((header, _i) => {
                    if (typeof props.row[header] !== 'object') {
                        return <th key={`${'table-head-' + header}`}>{header}</th>
                    }
                })}
                <th>Image</th>
                <th>Action</th>
            </tr>
        </thead>
    )
}

const TableRow = (props) => {
    return (
        <tr>
            {props.columns.map((field, _i) => {
                if (typeof props.row[field] !== 'object') {
                    return <td key={`${'table-cell-' + field}`}>{props.row[field]}</td>
                }
            })}
            {console.log(props.row)}
            {(props.isImg) ? <td><img className="table-product-img" src={(props.row[props.isImg].length ? "http://localhost:5005/" + props.row[props.isImg][0]['image_path'] : "")} alt="No Image" /></td> : ""}
            <td>
                <Link to={`/product/edit/${props.row['id']}`}><button type="button" className="btn btn-primary"> Edit</button></Link>
            </td>
        </tr >
    )
}

const Table = () => {
    let dispatch = useDispatch()

    // const [products, setProducts] = useState({products: [], filteredProducts: [] })
    const [searchText, setSearchText] = useState("")
    const [selectedProduct, setSelectedProduct] = useState({})

    let productsState = useSelector(state => state.products)
    let userState = useSelector(state => state.user)

    // dispatch(actions.getProducts())
    useEffect(() => {
        if (userState.role === 'vendor' && userState.roleData.status !== 0)
            dispatch(actions.getProducts())
    }, [])
    // let productsState = useSelector(state => state.products)

    const filterProducts = (val) => {
        setSearchText(val)
        dispatch(actions.searchProducts(val))
    }

    const getProducts = productsState.filteredProducts.length ? productsState.filteredProducts : productsState.products

    if (userState.role === 'vendor' && userState.roleData.status === 0) {
        return (
            <div><h1>Please contact administrator to get approved and start working on Products!</h1></div>
        )
    }

    let component;
    if (getProducts && getProducts.length) {
        let headers = Object.keys(getProducts[0])

        component = (<table className={"table"}>
            <TableHeader columns={headers} row={getProducts[0]} />
            <tbody>
                {getProducts.map((row, _i) => <TableRow onDetail={setSelectedProduct} columns={headers} key={`${'table-row-' + _i}`}
                    row={row} isImg={"product_images"}
                />)}
            </tbody>
        </table>)

    } else {
        component = <div><strong>Invalid or Empty Data Source</strong></div>
    }

    return (
        <div>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Search Product"
                    onChange={(e) => filterProducts(e.target.value)}
                    value={searchText} />
            </div>

            {component}
            <ProductContext.Provider value={{ data: getProducts, setSelectedProduct, selectedProduct }}>
                <ProductDetails />
            </ProductContext.Provider>
        </div>
    )
}

export default Table