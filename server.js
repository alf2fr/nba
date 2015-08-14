var express = require('express'),
  cheerio = require('cheerio'),
  request = require('request'),
  fs = require('fs'),
  //app = express()

teams = ['ATL', 'BOS', 'BRK', 'CHI', 'CLE', 'CHO', 'DAL', 'DEN', 'DET', 'GSW', 'HOU', 'IND', 'LAC', 'LAL', 'MEM',
  'MIA', 'MIL', 'MIN', 'NOP', 'NYK', 'OKC', 'ORL', 'PHI', 'PHO', 'POR', 'SAC', 'SAS', 'TOR', 'UTA', 'WAS'],

url = 'http://www.basketball-reference.com/play-index/plus/event_finder.cgi?request=1&event_code=fg&year_id=2015&team_id=CLE'

request(url, function(error, response, html){

      if(!error){
          console.log('loaded');
          var $ = cheerio.load(html);
          // Finally, we'll define the variables we're going to capture

          $('#events tbody').filter(function() {
            var data = $(this).children();
            for(var i = 0; i < 250; i++) {
              var entry = data.eq(i).children();

              var date, team, opponent, quarter, clock, before, descript, after;
              var json = { date : "", team : "", opponent : "", quarter : "", clock: "", before : "", descript : "", after : ""};

              json.date = entry.eq(1).text();
              json.team = entry.eq(2).text();
              json.opponent = entry.eq(4).text();
              json.quarter = entry.eq(5).text();
              json.clock = entry.eq(6).text();
              json.before = entry.eq(7).text();
              json.descript = entry.eq(8).text();
              json.after = entry.eq(9).text();

              console.log(entry.eq(8).children('a').attr('href'));

              //console.log(JSON.stringify(json));
            }

          })
      }
  })



// app.get('/scrape', function(req, res) {
//
// })
//
// app.listen(2536)
//
// console.log('listening on 2536')

// exports = module.exports = app
