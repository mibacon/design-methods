var request = require('request');
// var _ = require('lodash');

request({
    method: 'POST',
    url: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': 'bf87c04a67f742efa4e01427a5883efe'
    },
    body: JSON.stringify({
        url: 'https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2017/7-researchersc.jpg'
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
        
        // var x=Object.keys(data).reduce(function(a, b){ return data[a] > data[b] ? a : b })
        // console.log(x)
        // console.dir(data, {depth: null, colors: true})
    }
});