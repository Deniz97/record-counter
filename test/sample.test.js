
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
      console.log(response.body.msg);
      expect(response.body.code).toBe(0);
      expect(response.body.msg).toBe("Success");
      expect(response.body.records.length).toBe(24);
      expect("key" in response.body.records[0]).toBe(true);
      expect("totalCount" in response.body.records[0]).toBe(true);
      expect("createdAt" in response.body.records[0]).toBe(true);
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
      expect(response.body.code).toBe(2);
      expect(response.body.msg).toBe("Invalid Date Format");
      expect(response.body.records).toBe(null);
      
      
      });
  
  });