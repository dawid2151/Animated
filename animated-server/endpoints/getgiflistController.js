module.exports = (app, con) => {
    app.get("/getgiflist/:page", (req, res) => {
        console.log("Received /getgiflist request...");
        const { page } = req.params;
        //CHECK FOR PAGE VALIDITY!!! - SANITIZE
        let imagesPerPage = 25;
        let startIndex = imagesPerPage * page;
        let paramQuery = "";

        if (req.query.q != null) {
            console.log("Parametarized get...", req.query.q);
            //Sanitize req.query.q !!!
            paramQuery = "having tags like '%" + req.query.q + "%' ";
        }

        let limitQuery = "limit " + imagesPerPage + " offset " + startIndex;
        let baseQuery = "select images.uniqueid, path, GROUP_CONCAT(tag SEPARATOR '\",\"') as tags from images join tags on images.uniqueid=tags.uniqueid group by images.uniqueid " + paramQuery + limitQuery + ";";
        console.log(baseQuery);
        con.query(baseQuery, (err, result) => {
            if (err)
                throw (err);
            if (result.length == 0)
                res.status(404).end();
            else {
                result.map(image => {
                    let newData = image;
                    newData.tags = JSON.parse("[\"" + image.tags + "\"]");
                    return newData;
                })
                res.json(result);
            }
        });
    });
}