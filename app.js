//@ts-check
const express = require('express');
var MongoClient = require('mongodb').MongoClient;
//const cors = require('cors');
const app = express();
app.use(express.json());
const url = "mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true";

// TODO refactor to promise
let getTotalCount = function(min_date, max_date, min_count, max_count, callback){ // callback(err, result)
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("getir-case-study");
        var query = {  };
        dbo.collection("records").aggregate([
            {
               "$match": {
                   "createdAt": { "$lt": new Date(max_date+"T00:00:00.000Z"), "$gt": new Date(min_date + "T00:00:00.000Z"), } // TODO check lte gte // TODO better date parsing
               }
            },
            {
                "$project": {
                    "_id" : 0 , //carry this to after thye last match if neccesey
                    "totalCount" : { "$sum" : "$counts"},
                    "createdAt" : 1,
                    "key" : 1
                   
               }
            },
            {
                "$match": {
                    "totalCount": { "$lt": max_count, "$gt":min_count} // TODO check lte gte
                }
            }
       ]).toArray(callback
        );
        });
}



app.post('/enpoint/', function (req, res) {
    let response_json = req.body

    
    getTotalCount(response_json.startDate, response_json.endDate, response_json.minCount, response_json.maxCount, (err,data) => {
        res.setHeader('Content-Type', 'application/json');
        console.log(err); // TODO handle error
        console.log(data);
        res.end(JSON.stringify(data));
    })

   
})

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
    //console.log(`Example app listening at http://localhost:${port}`)
  })









