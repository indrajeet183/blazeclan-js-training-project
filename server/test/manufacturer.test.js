const { expect } = require('chai')
const request = require('request')

const baseUrl = 'http://localhost:5004/manufacturer'
let id = null

describe('---- [Manufacturer] REST API Test Suite ----', () => {
    //test case for fetch all result
    it('should get records and success must be true [200]', (done) => {
        request.get(`${baseUrl}`, (err, res, body) => {
            const result = JSON.parse(res.body)
            expect(res.statusCode).to.equal(200)
            expect(result.success).to.equal(true)
            done()
        })
    })

    it('should add record and sucess must be true [200]', (done) => {
        const record = {
            name: 'HP',
            status: 0
        }
        request.post(`${baseUrl}`, {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(record)
        }, (err, res, body) => {
            // console.log(res.body)
            const result = JSON.parse(res.body)
            expect(result.success).to.equal(true)
            id = result.data.id
            expect(id).to.be.a('number')
            done()
        })
    })

    it('should update record and sucess must be true [200]', (done) => {
        const record = {
            id,
            name: 'HP-2',
            status: 0
        }
        request.put(`${baseUrl}/${id}`, {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(record)
        }, (err, res, body) => {
            const result = JSON.parse(res.body)
            // console.log('UPDATE', result)
            expect(result.success).to.equal(true)
            expect(result.data.length).to.equal(1)
            done()
        })
    })

    it('should delete record and sucess must be true [200]', (done) => {
        request.delete(`${baseUrl}/${id}`, (err, res, body) => {
            const result = JSON.parse(res.body)
            // console.log('DELETR', result)
            expect(result.success).to.equal(true)
            expect(result.data).equal(1)
            done()
        })
    })
})