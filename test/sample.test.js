describe('Sample Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
  })



 const supertest = require('supertest');
const app = require('../app');

describe("Testing the movies API", () => {

	// Testing the POST /movies endpoint
	it("tests the post new movies endpoint and returns as success message", async () => {

		const response = await supertest(app).post('/totalcounts/').send({
            "startDate": "2016-01-26",
            "endDate": "2016-05-02",
            "minCount": 2700,
            "maxCount":3000
            });

		expect(response.status).toBe(200);
		expect(response.body.length).toBe(24);
		

	});

});

