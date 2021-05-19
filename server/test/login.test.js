const { expect } = require('chai')
const request = require('request')

const baseUrl = 'http://localhost:5001/user'

const headers = {
    'Content-type': 'application/json'
}

describe('---- [Users] REST API Test Suite ----', () => {
    //test case for fetch all result
    it('should get logged in and token and role must be presnt for correct user details [200]', (done) => {
        const user = {
            email: 'indrajeet.latthe@blazeclan.com',
            password: '12qwaszx'
        }
        request.post(`${baseUrl}/login`, {
            headers: headers,
            body: JSON.stringify(user)
        }, (err, res, body) => {
            const result = JSON.parse(res.body)
            // console.log(result)
            expect(res.statusCode).to.equal(200)
            expect(result.token.length).to.greaterThan(0)
            expect(result.role.length).to.greaterThan(0)
            done()
        })
    })

    it('should fail to get logged in for wrong password [400]', (done) => {
        const user = {
            email: 'indrajeet.latthe@blazeclan.com',
            password: '12qwasz1'
        }
        request.post(`${baseUrl}/login`, {
            headers: headers,
            body: JSON.stringify(user)
        }, (err, res, body) => {
            const result = JSON.parse(res.body)
            // console.log(res.statusCode, result)
            expect(res.statusCode).to.equal(400)
            expect(result.success).to.equal(false)
            done()
        })
    })


})