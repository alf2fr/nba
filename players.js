var cheerio = require('cheerio'),
  request = require('request'),
  fs = require('fs')

var base_url = 'http://www.basketball-reference.com/players/';

for(var alph = 97; alph < 123; alph++){
  if(alph == 120) { alph ++ }

  var alph_url = base_url + String.fromCharCode(alph);

  request(alph_url, function(error, response, html){
    console.log(alph_url)
    if(!error){
        console.log('loaded');
        var $ = cheerio.load(html);

        $('#players tbody').filter(function() {
          var data = $(this).children();
          var row = 1;
          var entry = data.eq(0).children;
          while(entry !== undefined) {

            var player, path;
            var json = { name: "", link: "" };

            json.player = entry.first().text();
            json.path = entry.first().children('a').attr('href')

            console.log(JSON.stringify(json));

            entry = data(row++).children();
          }


        })


    }
    })
}
