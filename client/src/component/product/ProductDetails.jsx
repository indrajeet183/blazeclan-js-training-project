import React, { useContext } from 'react'
import { ProductContext } from './ProductContext'

const ProductDetails = () => {
    const productContext = useContext(ProductContext)

    const { selectedProduct } = productContext
    // console.log(selectedProduct)

    return (
        <div className="modal fade" id="orderModel" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Product Details</h5>
                        <button type="button" className="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="card">
                            {
                                (selectedProduct.product_images && selectedProduct.product_images.length) > 0 ? <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner">
                                        {
                                            selectedProduct.product_images.map((img, _i) =>
                                                <div key={"product_detail_caro" + _i} className={_i === 0 ? "carousel-item active" : "carousel-item"}>
                                                    <div style={{ backgroundImage: `url(${"http://localhost:5005/" + img.image_path})`, backgroundSize: 'cover', height: '500px' }}
                                                        //src={"http://localhost:5005/" + img.image_path} 
                                                        className="w-100" alt={img.name} />
                                                </div>
                                            )
                                        }
                                    </div>
                                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </div> : ""
                            }
                            <div className="card-body">
                                <h5 className="card-title"><strong>{selectedProduct.name}</strong></h5>
                                <p className="card-text">{selectedProduct.description}</p>
                                <p className="card-text">Price : {selectedProduct.price}/-</p>
                                <p className="card-text">SKU : {selectedProduct.sku}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails