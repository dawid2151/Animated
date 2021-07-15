const fs = require("fs");
const express = require("express");

const imagesFolder = "/public/images";
const localFolderPath = "." + imagesFolder;
const app = express();


app.get("/public/images/:page", (req, res) => {
    const { page } = req.params;

    let imagesPerPage = 25;
    let startIndex = imagesPerPage * page;
    let endIndex = startIndex + imagesPerPage;

    let images = fs.readdirSync(localFolderPath).map(item => {
        return imagesFolder + "/" + item;
    })

    if (endIndex > images.length)
        endIndex = images.length;

    let returnImages = images.slice(startIndex, endIndex);
    console.log(images, page);
    res.status(200).json(returnImages);
});

app.get("/public/images/:id/", (req, res) => {
    const { id } = req.params;
    let path = localFolderPath + "/" + id;

    res.status(200).sendfile(path);
});


app.get("/", (req, res) => {

});


app.listen(3111, () => { console.log("Listening on 3111") });