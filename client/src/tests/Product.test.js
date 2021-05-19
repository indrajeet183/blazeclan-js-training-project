import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act, Simulate } from 'react-dom/test-utils'
import Product from '../component/product/Product'

const inputValues = {
    name: "Dummy Name",
    sku: "Dummy SKU",
    manufacturer_id: 1,
    price: 2500,
    weight: 2,
    description: "This is test description",
    short_description: "This is test short-description",
    url: "test-url",
    visibilty: 1
}

describe('Product Form Test Suite', () => {
    let domContainer = null

    beforeEach(() => {
        domContainer = document.createElement('div')
        document.body.appendChild(domContainer)
    })

    it("should render the product form and feedback div's should be 8", () => {
        act(() => {
            render(<Product />, domContainer)
        })

        let feedbackMsgs = document.querySelectorAll('.invalid-message')
        // console.log(feedbackMsgs.length)
        expect(feedbackMsgs.length).toBe(8)
    })

    it("should render the product form and after change simulation feedback div's should be 7", () => {
        act(() => {
            render(<Product />, domContainer)
        })

        const inputs = domContainer.querySelectorAll('input')

        act(() => {
            inputs.forEach((input, _i) => {
                console.log(_i)
                Simulate.change(input, { target: { value: inputValues[input.getAttribute('name')] } })
            })
        })

        console.log(domContainer.innerHTML)

        let feedbackMsgs = document.querySelectorAll('.invalid-message')
        console.log(feedbackMsgs.length)
        expect(feedbackMsgs.length).toBe(7)
        // expect(nameInput.getAttribute('value')).toBe('dummy')
    })

    afterEach(() => {
        // unload the container from DOM
        unmountComponentAtNode(domContainer);
        // remove it
        domContainer.remove();
        domContainer = null; // release it from memory
    });
})