const { expect } = require('chai')
const request = require('request')

const baseUrl = 'http://localhost:5003/category'
const userUrl = 'http://localhost:5001/user'

let token = null
let id = null
const user = {
    email: "indrajeet.latthe@blazeclan.com",
    password: "12qwaszx"
}

const headers = {
    'Content-type': 'application/json'
}


describe('---- [Category] REST API Test Suite ----', () => {

    before((done) => {
        request.post(`${userUrl}/login`, {
            headers: headers,
            body: JSON.stringify(user)
        }, (err, res, body) => {
            const result = JSON.parse(res.body)
            // console.log(result)
            token = result.token
            done()
        })
    })

    //test case for fetch all result
    it('should get records and success must be true [200]', (done) => {
        request.get(`${baseUrl}`, (err, res, body) => {
            const result = JSON.parse(res.body)
            // console.log(result)
            expect(res.statusCode).to.equal(200)
            expect(result.success).to.equal(true)
            done()
        })
    })

    it('should add record and sucess must be true using authorization [200]', (done) => {
        const record = { category_id: 'TEST-01', name: 'TEST', status: 0 }
        // console.log('2', token)
        request.post(`${baseUrl}`, {
            headers: {
                'authorization': token,
                'content-type': 'application/json'
            },
            body: JSON.stringify(record)
        }, (err, res, body) => {
            // console.log(res.body)
            const result = JSON.parse(res.body)
            expect(res.statusCode).to.equal(200)
            expect(result.success).to.equal(true)
            id = result.data.id
            expect(id).to.be.a('number')
            done()
        })
    })

    it('should fail to add record and sucess must be false without using authorization [401]', (done) => {
        const record = { category_id: 'TEST-01', name: 'TEST', status: 0 }
        // console.log('2', token)
        request.post(`${baseUrl}`, {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(record)
        }, (err, res, body) => {
            // console.log(res.body)
            const result = JSON.parse(res.body)
            expect(res.statusCode).to.equal(401)
            expect(result.success).to.equal(false)
            done()
        })
    })

    it('should update record and sucess must be true [200]', (done) => {
        const record = { id, category_id: 'TEST-01-UPDATED', name: 'TEST-UPDATED', status: 0 }
        request.put(`${baseUrl}/${id}`, {
            headers: {
                'authorization': token,
                'content-type': 'application/json'
            },
            body: JSON.stringify(record)
        }, (err, res, body) => {
            const result = JSON.parse(res.body)
            // console.log('UPDATE', result)
            expect(result.success).to.equal(true)
            expect(res.statusCode).to.equal(200)
            expect(result.data.length).to.equal(1)
            done()
        })
    })

    it('should delete record and sucess must be true [200]', (done) => {
        request.delete(`${baseUrl}/${id}`, {
            headers: {
                'authorization': token
            },
        }, (err, res, body) => {
            const result = JSON.parse(res.body)
            // console.log('DELETE', result)
            expect(result.success).to.equal(true)
            expect(res.statusCode).to.equal(200)
            expect(result.data).equal(1)
            done()
        })
    })

    it('should fail to update record and sucess must be false [401]', (done) => {
        const record = { id, category_id: 'TEST-01-UPDATED', name: 'TEST-UPDATED', status: 0 }
        request.put(`${baseUrl}/${id}`, {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(record)
        }, (err, res, body) => {
            const result = JSON.parse(res.body)
            // console.log('UPDATE', result)
            expect(res.statusCode).to.equal(401)
            expect(result.success).to.equal(false)
            done()
        })
    })

    it('should fail to delete record and sucess must be false [401]', (done) => {
        request.delete(`${baseUrl}/${id}`, (err, res, body) => {
            const result = JSON.parse(res.body)
            // console.log('DELETE', result)
            expect(res.statusCode).to.equal(401)
            expect(result.success).to.equal(false)
            done()
        })
    })
})