let fs = require('fs');

function readData(filename, contentType, response)
{
	console.log('providing ' + filename);
	fs.exists(filename, function(exists) {
		if (exists) {		
				fs.readFile(filename, function(error, data) {	
					if (!error)	{
						response.writeHead(200, contentType);
						response.end(data);
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

exports.queryData = function(filename, headers, query, response) {
	fs.exists(filename, function(exists) {
		if (exists) {		
				fs.readFile(filename, function(error, data) {	
					if (!error)	{
						let result = {};
						let filteredData = [];
						let allData = JSON.parse(data);
						if (Array.isArray(allData.characters)){
							allData.characters.forEach(function(character) {
								let match = true;
								for(let key in query){
									if(query[key] != character[key]){
										match = false;
										break;
									}
								}
								if(match){
									filteredData.push(character);
								}
							});
						}
						if (filteredData.length > 0) {
							result = filteredData;
							let imageUrl = 'images/' + query.type;
							headers["Image-Url"] = 'http://localhost:8106/?image=' + query.type;
						}
						
							
						response.writeHead(200, headers);
						response.end(JSON.stringify(result));
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
