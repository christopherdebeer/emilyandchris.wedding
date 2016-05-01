var express = require('express'),
    bodyParser = require('body-parser');

var GoogleSpreadsheet = require("google-spreadsheet");

// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet('1n16EO84Ujt-42d6mgim8JSG6vwmGSB6BncUGJtclWW4');
var sheet;

function setAuth(callback) {
    // see notes below for authentication instructions!
    var creds = require('./emilyandchris-227d2241ff6b.json');
    // OR, if you cannot save the file locally (like on heroku)

    doc.useServiceAccountAuth(creds, callback);
    console.log("connect google sheets api")
  }

function getInfoAndWorksheets(callback) {
	console.log("get worksheet info")
	doc.getInfo(function(err, info) {
		console.log("getInfo():", err, info)
		console.log('Loaded doc: '+info.title+' by '+info.author.email);
		sheet = info.worksheets[0];
		console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
		callback(err, info);
	});
}

function addRow(data, callback) {
	console.log("adding row");
	data.time = (new Date()).toString()
	doc.addRow(1, data, callback);
}



// Constants
var PORT = 8080;

// App
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static( './public', {
  extensions: ['html']
}));

app.post('/rsvp', function (req, res) {

  var data = req.body;
  setAuth( function(){
	getInfoAndWorksheets(function(err,info){
		console.log("Error getting worksheets!", err)
		addRow( data, function(err,result){
			if (err) console.log("Error adding row: ", err)
		});
	});
  });
  res.redirect('/thankyou');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
