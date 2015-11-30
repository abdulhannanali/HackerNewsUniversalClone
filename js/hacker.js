var hacker = (function ($){
  var topStoriesBaseUrl = "https://hacker-news.firebaseio.com/v0/topstories.json";
  var itemBaseUrl = "https://hacker-news.firebaseio.com/v0/item/"

  function getTopStories (limit) {
    if (!limit) {
      var limit = 500;
    }
    return $.get(topStoriesBaseUrl).done(function (data) {
    });
  }


  function getStoryDetails(story) {
    return $.get(itemBaseUrl + story + ".json");
  }


  function populateTopStories(limit) {
    var populatedStories = [];
    if (!limit) {
      var limit = 10;
    }
    var dfd = $.Deferred();

    getTopStories()
      .done(function (data) {

        data.slice(0, limit).forEach(function (val, index, array) {
          getStoryDetails(val)
            .done(function(story) {
              populatedStories.push(story)

              if (story.id == array[limit - 1]) {
                dfd.resolve(populatedStories);
              }
            })
            .error(function () {
              dfd.reject();
            })
      })
    })
    .error(function () {
      dfd.reject();
    })

    return dfd.promise();
  }

  var hacker  = {
    getTopStories: getTopStories,
    getStoryDetails: getStoryDetails,
    populateTopStories: populateTopStories
  }

  return hacker;
}(jQuery));
