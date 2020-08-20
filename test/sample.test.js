
describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})



const supertest = require('supertest');
const app = require('../src/app');

describe("Testing the records API", () => {

// Testing the POST /movies endpoint
it("get filtered total counts - success", async () => {

  const response = await supertest(app).post('/totalcounts/').send({
          "startDate": "2016-01-26",
          "endDate": "2016-05-02",
          "minCount": 2700,
          "maxCount":3000
          });

  expect(response.status).toBe(200);
      expect(response.body.length).toBe(24);
      expect("key" in response.body[0]).toBe(true);
      expect("totalCount" in response.body[0]).toBe(true);
      expect("createdAt" in response.body[0]).toBe(true);
      });


      // TODO add error testing

      // for example
      it("get filtered total counts - bad date format", async () => {

          const response = await supertest(app).post('/totalcounts/').send({
              "startDate": "2016.25.26",
              "endDate": "2016.05.02",
              "minCount": 2700,
              "maxCount":3000
              });
  
          expect(response.status).toBe(400);
          expect(response.body.error).toBe("Invalid Date Format");
          
          
          });
  
  });