module.exports = (app) => {
    app.get("/gettestdata", (req, res) => {
        let testData = "This is test data!";
        res.status(200).send(testData);
    });
}