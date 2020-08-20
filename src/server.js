const app = require("./app.js");

const PORT = process.env.PORT || 8082

let server = app.listen(PORT, function () {
    let host = server.address().address
    let port = server.address().port

    console.log("Example app listening at http://%s:%s", "localhost", port)
})