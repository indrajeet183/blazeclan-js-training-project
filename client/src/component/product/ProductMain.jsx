import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../store/actions/actions'

const ProductMain = (props) => {

    let dispatch = useDispatch()

    const [qty, setQty] = useState(1)

    const productId = props.match.params.id

    const product = useSelector(state => state.products.productMain)

    useEffect(() => {
        dispatch(actions.getProductById(productId))
        console.log(product)
    }, [])

    const onHandleQtyMinus = (e) => {
        if (qty > 1)
            setQty(qty - 1)
    }

    const onHandleQtyPlus = (e) => {
        setQty(qty + 1)
    }

    const onHandleQtyChange = (e) => {
        let val = e.target.value
        if (val < 0) val = 1
        setQty(val)
    }

    const handeAddToCart = (product) => {
        dispatch(actions.addCartItem({
            id: product.id,
            name: product.name,
            sku: product.sku,
            qty,
            base_image: product.product_images.length > 0 ? product.product_images[0].image_path : "",
            price: parseFloat(product.price) * parseInt(qty),
            base_price: parseFloat(product.price)
        }))
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-5 mt-5">
                    {product.product_images && product.product_images.length > 0 ? <div id="carouselProducts" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            {product.product_images.map((image, _i) => {
                                return <li key={`carousel-ol--${_i}`} data-target="#carouselProducts" data-slide-to={_i} className={_i === 0 ? 'active' : ''}></li>
                            })}
                        </ol>
                        <div className="carousel-inner">
                            {product.product_images.map((image, _i) => {
                                return <div key={`carousel-item--img-${_i}`} className={`carousel-item${_i === 0 ? ' active' : ''}`}>
                                    <div style={{ backgroundImage: `url("http://localhost:5005/${image.image_path}")` }} className="d-block carousel-item--img" alt={product.name} />
                                </div>
                            })}
                        </div>
                        <a className="carousel-control-prev" href="#carouselProducts" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselProducts" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div> : ""}

                </div>

                <div className="col-lg-7 mt-5">
                    <h1>{product.name}</h1>
                    <p>
                        {product.description}
                    </p>
                    <small>
                        {product.short_description}
                    </small>
                    <div className="product-main--add-cart mt-5">
                        <div className="product-main--price mr-5">
                            {product.price} /-
                        </div>
                        <div className="">
                            <button className="btn btn-dark btn-lg" onClick={onHandleQtyMinus}>-</button>
                        </div>
                        <div className="ml-5 mr-5">
                            <input className="product-main--qty" type="number" value={qty} onChange={onHandleQtyChange} />
                        </div>
                        <div className="">
                            <button className="btn btn-dark btn-lg" onClick={onHandleQtyPlus}>+</button>
                        </div>
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-lg btn-block btn-danger" onClick={() => handeAddToCart(product)}>Add To Cart</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductMain