/**
 * New node file
 */
var fs = require('fs');

function readData(filename, contentType, response)
{
	console.log('providing ' + filename);
	fs.exists(filename, function(exists) {
		if (exists) {		
				fs.readFile(filename, function(error, data) {	
					if (!error)	{
						if (filename === "data/data.json"){
							response.json(JSON.parse(data));
						}else 
						{
						response.writeHead(200, contentType);
						response.end(data);
						}
					}
					else {			
						response.writeHead(500);
						response.end('Internal Server Error');
					}
				});
		}
		else
		{
			response.writeHead(404);
			response.end('Image not found');
		}
	});	
}



exports.provideData = function(filename, contentType, response)
{
	readData(filename,contentType, response);
};

exports.provideList = function(filename, contentType,  response)
{
	readData(filename,contentType, response);
};

exports.queryData = function(filename, query, response) {
	var print = 0;
	fs.exists(filename, function(exists) {
		if (exists) {	
				fs.readFile(filename, function(error, data) {	
					if (!error)	{
						var result = {};
						var filteredData = [];
						var allData = JSON.parse(data);
						if (Array.isArray(allData.characters)) {
							allData.characters.forEach(function(character) {
								Object.keys(query).forEach(function(key) {
									if (character[key] === query[key]) {
										print = 1;
									}else if (character[key] !== query[key]){
										print = 0;
										return false;
									}
									
								});
								if(print === 1){
									filteredData.push(character);
								}
							});
						}
						if (filteredData.length > 0) {
							result[query.type] = filteredData;
							var imageUrl = 'images/' + query.type;
							response.header("Image-Url", 'http://localhost:8221/?image=' + query.type);
						}else {
							response.writeHead(404);
							response.end('no such type');
						}					
							
						response.json(result);
					}
					else {			
						response.writeHead(500);
						response.end('Internal Server Error');
					}
				});
		}
		else
		{
			response.writeHead(404);
			response.end('Image not found');
		}
	});	
};