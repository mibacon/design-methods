var request = require('request');
const express = require('express');
var cheerio = require('cheerio');
var fs = require('fs');
var async = require('async');

var  URL = JSON.parse(fs.readFileSync('./history1.json', 'utf8'));

// URL.forEach(function(element) {
//     	console.log(element.link);
// 		});

async.each(URL,
    function (value, callback) {
        
        request(value.link, function (error, response, body) {
        	var $ = cheerio.load(body);

		    $('img').each(function(i, element){
		      var src = $(element).attr("src");
		      var width = $(element).attr("width")
		      var height = $(element).attr("height")
		      console.log(src)

		      checkAPI(src);

		    });
	     }),

	callback();

    }
	
)	

function checkAPI (url) {
	request({
		    method: 'POST',
		    url: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?',
		    headers: {
		        'Content-Type': 'application/json',
		        'Ocp-Apim-Subscription-Key': 'bf87c04a67f742efa4e01427a5883efe'
		    },
		    body: JSON.stringify({
		        url: url
		    })
		}, function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		        var data = JSON.parse(body);
		        data.forEach(function(element) {
		            console.log(element.scores);
		            var q = element.scores
		            var x=Object.keys(q).reduce(function(a, b){ return q[a] > q[b] ? a : b })
		            console.log(x)
		        })
		        
		        
		    }
		})

}