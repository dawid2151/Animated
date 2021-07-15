module.exports = (app, con, formidable, fs, path) => {
	const entryPath = path.join(__dirname, "..", "public", "build");
	const minId = 1;
	const maxId = 999999999;

	app.post("/postimagedata", (req, res) => {
		let form = formidable.IncomingForm({
			uploadDir: __dirname + '/../public/build/tmp',
			keepExtensions: true
		});
		form.parse(req, (err, fields, files) => {



			//saveImageData(err, fields, files);
			getRandomId(minId, maxId, err, fields, files);
			
			p = path.join(__dirname, "../public/build", "addImage.html");
			res.sendFile(p);
		});
	});

	function saveNewImageData(err, fields, files, newId) {
		//Get image paths
		let oldPath = files.image.path;
		let relPath = path.join("images", newId + ".gif")
		let newPath = path.join(entryPath, relPath);
		//save to disk

		fs.rename(oldPath, newPath, (err) => {
			if (err)
				throw err;
		});

		//addImage to DB
		let mainQuery =
			"insert into images(uniqueid, path) values('" + newId + "','" + "/images/" + newId + ".gif" + "');";
		con.query(mainQuery, (err, result) => {
			if (err)
				throw err;
			console.log("Inserted");
		});

		//add tags to DB
		let values = []
		if (fields.tag1 != "")
			values.push([newId, fields.tag1]);
		if (fields.tag2 != "")
			values.push([newId, fields.tag2]);
		if (fields.tag3 != "")
			values.push([newId, fields.tag3]);

		let tagQuery = "insert into tags(uniqueid, tag) values ?";
		console.log(tagQuery, values);
		con.query(tagQuery, [values], (err, result) => {
			if (err)
				throw err;
		})
	}


	function saveImageData(err, fields, files) {
		//Get image paths
		let oldPath = files.image.path;
		let newId = fields.id;
		let relPath = path.join("images", newId + ".gif")
		let newPath = path.join(entryPath, relPath);
		//save to disk

		fs.rename(oldPath, newPath, (err) => {
			if (err)
				throw err;

		});

		//addImage to DB
		let mainQuery =
			"insert into images(uniqueid, path) values('" + newId + "','" + "/images/" + newId + ".gif" + "');";
		con.query(mainQuery, (err, result) => {
			if (err)
				throw err;
			console.log("Inserted");
		});

		//add tags to DB
		let values = []
		if (fields.tag1 != "")
			values.push([newId, fields.tag1]);
		if (fields.tag2 != "")
			values.push([newId, fields.tag2]);
		if (fields.tag3 != "")
			values.push([newId, fields.tag3]);

		let tagQuery = "insert into tags(uniqueid, tag) values ?";
		console.log(tagQuery, values);
		con.query(tagQuery, [values], (err, result) => {
			if (err)
				throw err;
		})
    }

	function getRandomId(min, max, err, fields, files) {
		console.log("Getting new id...");
		let rId = getRandomNumber(min, max);
		if (isIdValid(min, max, rId, err, fields, files) === true)
		{
			console.log("Inside the 'if' for ", rId);
        }

	}
	function getRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}



	function isIdValid(min, max, id, err, fields, files) {
		let query = "select * from images where uniqueid='" + id + "';";
		return con.query(query, (err, result) => {
			if (result.length == 0)
			{
				console.log(id, " is free...");
				saveNewImageData(err, fields, files, id);
				return true;
			}
			else
			{
				console.log(id, " is already taken...");
				return getRandomId(min, max);
            }
		});
	}

};
