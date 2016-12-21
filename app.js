(function () {
   'use strict';
  
}());

var twit = require("twit");
var config = require("./config.js");


var Twitter = new twit(config);

var retweet = function()
{
    //create an object of parameters for the search tweet function
    var parameters = 
        {
            q: "#fashion, #lifestyle, #fashionblogger, #vogue, #blog, #blogger, #makeup",
            result_type: "recent",
            lang:"en"
        }
    
    Twitter.get("search/tweets", parameters, function(error, data)
                {
        //if no errors
        if(!error)
        {
            //get the id of the tweet
            var retweetId = data.statuses[0].id_str;
            
            //then tell Twitter to retweet 
            Twitter.post("statuses/retweet/:id",
            {
                id: retweetId
            }, function(error, response)
                         {
                if(response)
                {
                    console.log("Retweeted!");
                }
                
                //if there was an error while retweeting
                if(error)
                {
                    console.log("Something went wrong while RETWEETING");
                }
            });
            }
                         else
                         {
                          console.log("Something went wrong while searching");
                         }   
    });
}
////////////////////////////////////////////////////////////////////////
//find a random tweet to favorite
var favoriteTweet = function()
{
    var parameters = 
        {
            q: "#fashion, #lifestyle, #fashionblogger, #vogue, #blog, #blogger #makeup",
            result_type: "recent",
            lang:"en"
        }
    
    //find the tweet
    Twitter.get("search/tweets", parameters, function(error, data)
                {
        //find the tweets
        var tweet = data.statuses;
        var randomTweet = randTweet(tweet);
        
        //if random tweet exists
        if(typeof randomTweet != "undefined")
        {
            Twitter.post("favorites/create", {id: randomTweet.id_str}, function(error, response)
                         {
                //if error while response
                if(error)
                {
                    console.log("can't be favorited")
                }
                
                else
                {
                    console.log("favorited");
                }
            });
        }
    });
}

//grab favorite tweet when program starts
randTweet();

//set a favorite every 10 mins;
setInterval(favoriteTweet, 600000);

//function to grab random tweet
function randTweet(arr)
{
    var index = Math.floor(Math.random()*arr.length);
    return arr[index];
}

//retweet as soon as program starts
retweet();
setInterval(retweet, 300000);

//set up Steaming API for user
var steam = Twitter.stream("user");

//when someone follows
stream.on("follow", followed)
{
    //trigger callback
    function follow()
    {
        console.log("follow event is running");
        
        //get the user name
        var name = event.source.name,
            screenName = event.source.screen_name;
        
        //function that replies to who followed
        tweetNow("@" + screenName + " Thank you  for the follow"); 
    }
    
    function tweetNow(tweetText)
    {
        var tweet
        {
            status:tweetText
        }
        
        Twitter.post("statuses/update", tweet, function(error, data, response)
                     {
            if(error)
            {
                console.log("error in replying")
            }
            
            else
            {
                console.log("shown sucessfully");
            }
        });
    }
}