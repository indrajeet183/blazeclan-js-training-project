import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../store/actions/actions'
import { Link } from 'react-router-dom'

const ProductList = (props) => {
    let dispatch = useDispatch()

    // const [products, setProducts] = useState({ products: [], filteredProducts: [] })
    const [searchText, setSearchText] = useState("")
    const [selectedProduct, setSelectedProduct] = useState({})

    let productsState = useSelector(state => state.products)
    let categoryState = useSelector(state => state.categories)

    const catId = props.match.params && props.match.params.id
    const subCatId = props.match.params && props.match.params.subid

    // dispatch(actions.getProducts())
    useEffect(() => {
        // console.log('[adad]', catId, subCatId)
        if (!catId && !subCatId)
            dispatch(actions.getProducts())
        else if (catId && !subCatId) {
            // console.log('[adad]', catId, subCatId)
            dispatch(actions.getProductsByCategoryId(catId))
        }
        else if (catId && subCatId)
            dispatch(actions.getProductsByCategoryIdAndSubCategoryId(catId, subCatId))

        dispatch(actions.getCategories())
    }, [catId, subCatId])

    const getProducts = productsState.filteredProducts.length ? productsState.filteredProducts : productsState.products
    const categories = categoryState.categories


    const filterProducts = (e) => {
        setSearchText(e.target.value)
        dispatch(actions.searchProducts(e.target.value))
    }

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-lg-3 col-md-3">
                    <div className="card product-list-sidebar" style={{ width: '25rem' }}>
                        <div className="card-body">
                            <nav className="nav flex-column">
                                {
                                    categories.length ?
                                        categories.map((category, _i) => {
                                            if (category.categories.length > 0) {
                                                let nav = <Link className={"nav-link" + `${(catId == category.id && !subCatId) ? ' active' : ""}`} data-toggle="collapse" to={`/products/cat/${category.id}`} role="button">
                                                    {category.name} &gt;
                                                    </Link>

                                                let sub = category.categories.map((subCat, _i) => {
                                                    return <Link key={`sidebar-sub-category-nav--${_i}`} className={"nav-link" + `${subCatId == subCat.id ? ' active' : ""}`} to={`/products/cat/${category.id}/${subCat.id}`} role="button">{subCat.name}</Link>
                                                })
                                                return <React.Fragment key={`sidebar-category-nav--${_i}`}>
                                                    {nav}<div className={`collapse ml-3${catId == category.id ? " show" : ""}`} id={`collapse-${category.id}`}> {sub} </div>
                                                </React.Fragment>
                                            } else if (category.parent_id === null) {
                                                return <Link key={`sidebar-category-nav--${_i}`} className={"nav-link" + `${catId == category.id ? ' active' : ""}`} to={`/products/cat/${category.id}`}>{category.name}</Link>
                                            }
                                        })
                                        : ""
                                }
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Search Product" value={searchText} onChange={filterProducts} />
                    </div>
                    <div className="row">
                        {getProducts && getProducts.length ?

                            getProducts.map((product, _i) => {
                                return <div key={`product-list-${_i}`} className="col-md-4 p-3 product-list">
                                    <div className="card" >
                                        <img src={`${product.product_images.length ? "http://localhost:5005/" + product.product_images[0].image_path : ""}`} className="card-img-top product-list-thumb mt-3" alt={`${product.name}`} />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p><strong className="text-danger h2">₹ {product.price} /-</strong></p>
                                            <p><small>{product.short_description}</small></p>
                                            <div className="product-list-item--footer">
                                                <span><strong>SKU :</strong> {product.sku} </span>
                                                <Link to={`/product/${product.id}`} className="btn btn-primary btn-block mt-2">Show Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })


                            : <div>No Products available !</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList