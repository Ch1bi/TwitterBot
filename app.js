(function () {
   'use strict';
  
}());

var twit = require("twit");
var config = require("./config.js");


var Twitter = new twit(config);

var reTweet = function()
{
    //create an object of parameters for the search tweet function
    var parameters = 
        {
            q: "#fashion", "#fashion", "#vogue", "#blog",
            result_type: "recent",
            lang:"en"
        }
    
    Twitter.get("search/tweets", parameters, function(error, data)
                {
        //if no errors
        if(!error)
        {
            //get the id of the tweet
            var reTweetId = data.statuses[0].id_str;
            
            //then tell Twitter to retweet 
            Twitter.post("statuses/retweet/:id",
                         {
                id: retweetId
            }, function(error response)
                         {
                if(response)
                {
                    console.log("Retweeted!");
                }
                
                //if there was an error while retweeting
                if(error)
                {
                    console.log("Something went wrong while RETWEETING")
                }
            });
            }
                         else
                         {
                          console.log("Something went wrong while searching");
                         }
        
        
    });
}