
const express = require('express');
var MongoClient = require('mongodb').MongoClient;
//const cors = require('cors');
const app = express();
app.use(express.json());
const mongo_url = "mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true";

// const PORT = 8081
const PORT = process.env.PORT

// TODO refactor to promise
let getTotalCount = function(min_date, max_date, min_count, max_count){
    return new Promise((resolve, reject) => { // TODO use reject
        MongoClient.connect(mongo_url, (err, db) => {
            if (err){
                reject(err)
            }
            var dbo = db.db("getir-case-study");

            dbo.collection("records").aggregate([
                {
                "$match": {
                    "createdAt": { "$lte": new Date(max_date+"T00:00:00.000Z"), "$gte": new Date(min_date + "T00:00:00.000Z"), } // TODO check gt gte (not specified in pdf) // TODO better date parsing
                }
                },
                {
                    "$project": {
                        "_id" : 0 , // 0->dont show //carry this to after the last match if neccesery (or remove altogether)
                        "totalCount" : { "$sum" : "$counts"}, // sum over counts array
                        "createdAt" : 1, // 1 -> show
                        "key" : 1
                    
                }
                },
                {
                    "$match": {
                        "totalCount": { "$lte": max_count, "$gte":min_count} // TODO check lte gte (not specified in pdf)
                    }
                }
        ]).toArray((err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        }
            );
            });
})};



app.post('/totalcounts/', function (req, res) {
    // MM-DD-YYYY is expected
    // TODO assert json format
    let response_json = req.body


    
    getTotalCount(response_json.startDate, response_json.endDate, response_json.minCount, response_json.maxCount).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }).catch((err) => {
        throw err;
    })

   
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/home.html");
})


let server = app.listen(PORT, function () {
    let host = server.address().address
    let port = server.address().port

    console.log("Example app listening at http://%s:%s", "localhost", port)
})

//exposed for jest/superset, remove if possible, testing should not change appcode
module.exports = app









