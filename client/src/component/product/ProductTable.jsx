import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from './ProductContext'
import { MainContext } from './../maincontext'
import ProductService from '../../services/product'
import ProductDetails from './ProductDetails'
import { useSelector } from "react-redux";

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
            {/* <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#orderModel" onClick={() => { props.onDetail(props.row) }}>
                Show Order Details
            </button></td> */}
        </tr>
    )
}

const Table = () => {
    const productContext = useContext(ProductContext)
    const mainContext = useContext(MainContext)

    const [products, setProducts] = useState({ products: [], filteredProducts: [] })
    const [searchText, setSearchText] = useState("")
    const [selectedProduct, setSelectedProduct] = useState({})

    const productService = new ProductService()

    const userState = useSelector(state => state.user)

    useEffect(async () => {
        const productResp = await productService.getProducts(userState.role)
        if (productResp.data.success) {
            const productsResult = [...productResp.data.data]
            setProducts({ products: productsResult, filteredProducts: productsResult })
            mainContext.showAlert({ msg: productResp.data.msg, type: "success", toggeled: true })
        } else {
            //TODO
        }

    }, [])

    const filterProducts = (val) => {
        setSearchText(val)
        if (val.length > 0) {
            const filterP = products.products.filter((tempProduct) => {
                let temp = []

                Object.keys(tempProduct).forEach((field) => {
                    // console.log(typeof tempProduct[field])
                    if ((typeof (tempProduct[field]) === "string") && (tempProduct[field].toLowerCase().includes(val.toLowerCase()))) {
                        // console.log(field, tempProduct[field], tempProduct[field].toLowerCase().includes(val.toLowerCase()))
                        temp.push(true)
                    } else if ((typeof (tempProduct[field]) === "number") && (tempProduct[field] === parseInt(val))) {
                        // console.log(field, tempProduct[field], tempProduct[field].toLowerCase().includes(val.toLowerCase()))
                        temp.push(true)
                    } else
                        temp.push(false)
                })
                // console.log(temp.includes(true))
                return temp.includes(true)
            })
            console.log(filterP)
            setProducts({ ...products, filteredProducts: [...filterP] })
        } else {
            setProducts({ ...products, filteredProducts: [...products.products] })
        }
    }

    let component;
    if (products.filteredProducts && products.filteredProducts.length) {
        let headers = Object.keys(products.filteredProducts[0])

        component = (<table className={"table"}>
            <TableHeader columns={headers} row={products.filteredProducts[0]} />
            <tbody>
                {products.filteredProducts.map((row, _i) => <TableRow onDetail={setSelectedProduct} columns={headers} key={`${'table-row-' + _i}`}
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
                <input type="text" class="form-control" placeholder="Search Product" onChange={(e) => filterProducts(e.target.value)} value={searchText} />
            </div>

            { component}
            <ProductContext.Provider value={{ data: products.prodcuts, setSelectedProduct, selectedProduct }}>
                <ProductDetails />
            </ProductContext.Provider>
        </div>
    )
}

export default Table