import React, { useEffect, useState } from 'react'
import { Input } from '../UI/Input'
import Select from '../UI/Select'
import FileInput from '../UI/FileInput'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import actions from '../../store/actions/actions'

const ProductEdit = (props) => {
    let dispatch = useDispatch()
    const manufacturerState = useSelector(state => state.manufacturers)
    const productState = useSelector(state => state.products)
    const categoryState = useSelector(state => state.categorie)

    const productId = props.match.params.id

    const [product, setProduct] = useState({
        name: "",
        sku: "",
        manufacturer_id: "",
        price: 0,
        weight: 0,
        description: "",
        short_description: "",
        url: "",
        visibilty: 0
    })
    const [productImages, setProductImages] = useState([])

    const [validation, setValidation] = useState({
        name: { required: true, minLength: 3, maxLength: 30, error: true, msg: "Field is required!" },
        sku: { required: true, minLength: 3, maxLength: 30, error: true, msg: "Field is required!" },
        manufacturer_id: { required: true, error: true, msg: "Field is required!" },
        price: { required: true, notzero: true, error: true, msg: "Field is required!" },
        weight: { required: true, notzero: true, error: true, msg: "Field is required!" },
        description: { required: true, minLength: 3, maxLength: 2000, error: true, msg: "Field is required!" },
        short_description: { required: true, minLength: 3, maxLength: 500, error: true, msg: "Field is required!" },
        url: { required: true, minLength: 3, maxLength: 30, error: true, msg: "Field is required!" },
        visibilty: { required: true, error: true, msg: "Field is required!" },
    })

    const setProductManufacturer = (id) => {
        setProduct({ ...product, manufacturer_id: id })
    }

    useEffect(async () => {
        dispatch(actions.getManufacturers())
        dispatch(actions.getProductById(productId))
        dispatch(actions.getCategories())
    }, [])


    useEffect(() => {
        if (productState.productMain !== false)
            setProduct(productState.productMain)
    }, [productState.productMain])

    useEffect(() => {
        validate()
    }, [product])

    // useEffect(() => {
    //     setProduct(productState.selectedProduct)
    // }, [productState])

    const validate = () => {
        let tempObj = { ...validation }
        Object.keys(tempObj).forEach((field) => {
            if (tempObj[field].required && product[field].length === 0) {
                tempObj = {
                    ...tempObj,
                    [field]: {
                        ...tempObj[field],
                        error: true,
                        msg: 'This field is required!'
                    }
                }
            } else if ((product[field].length > tempObj[field].minLength) && !(product[field].length < tempObj[field].maxLength)) {
                tempObj = {
                    ...tempObj,
                    [field]: {
                        ...tempObj[field],
                        error: true,
                        msg: `The field length should be minimum = ${tempObj[field].minLength} and maximum = ${tempObj[field].maxLength}`
                    }
                }
            } else if (tempObj[field].notzero && product[field] <= 0) {
                tempObj = {
                    ...tempObj,
                    [field]: {
                        ...tempObj[field],
                        error: true,
                        msg: 'Value should be positive!'
                    }
                }
            } else {
                tempObj = {
                    ...tempObj,
                    [field]: {
                        ...tempObj[field],
                        error: false,
                        msg: ""
                    }
                }
            }
        })
        setValidation(tempObj)
    }

    const onSave = async () => {
        const formData = new FormData()
        formData.append('product-data', JSON.stringify(product))
        Object.keys(productImages).forEach(file => formData.append('product_images', productImages[file]))
        // await productService.createProduct(formData)
        dispatch(actions.updateProduct(formData, productId))
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-5">
                    <div className="form-group mt-3">
                        <Input label="Name" name="name" value={product.name} type="text"
                            isValid={validation.name.error}
                            msg={validation.name.msg} handleChange={(e) => { setProduct({ ...product, name: e.target.value }) }}
                        />
                        <Input label="SKU" name="sku" value={product.sku} type="text"
                            isValid={validation.sku.error}
                            msg={validation.sku.msg} handleChange={(e) => { setProduct({ ...product, sku: e.target.value }) }}
                        />
                        <Input label="URL" name="url" value={product.url} type="text"
                            isValid={validation.url.error}
                            msg={validation.url.msg} handleChange={(e) => { setProduct({ ...product, url: e.target.value }) }}
                        />
                        <Select name="manufacturer_id" label="Manufacurer" data={manufacturerState.manufacturers}
                            changeSelect={setProductManufacturer} selected={product.manufacturer_id}
                            isValid={validation.manufacturer_id.error} msg={validation.manufacturer_id.msg}
                        />
                        <Input label="Price" name="price" value={product.price} type="number"
                            isValid={validation.price.error}
                            msg={validation.price.msg} handleChange={(e) => { setProduct({ ...product, price: e.target.value }) }}
                        />
                        <Input label="Weight" name="weight" value={product.weight} type="number"
                            isValid={validation.weight.error}
                            msg={validation.weight.msg} handleChange={(e) => { setProduct({ ...product, weight: e.target.value }) }}
                        />
                        <Input label="Description" name="description" value={product.description} type="text"
                            isValid={validation.description.error}
                            msg={validation.description.msg} handleChange={(e) => { setProduct({ ...product, description: e.target.value }) }}
                        />
                        <Input label="Short Description" name="short_description" value={product.short_description} type="text"
                            isValid={validation.short_description.error}
                            msg={validation.short_description.msg} handleChange={(e) => { setProduct({ ...product, short_description: e.target.value }) }}
                        />
                        <Select name="visible" label="Visibility" data={[{ id: 1, name: 'Visible' }, { id: 0, name: 'Hidden' }]}
                            changeSelect={(val) => { setProduct({ ...product, visibilty: val }) }} selected={product.visibilty}
                            isValid={validation.visibilty.error} msg={validation.visibilty.msg}
                        />
                        <FileInput handleChange={setProductImages} />
                        <button className="btn btn-success" onClick={onSave}>Save</button>
                        <button className="btn btn-warning ml-5">Clear</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProductEdit