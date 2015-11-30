(function(){
  $(document).ready(function () {
    $("#progressBar").show();
    var hackerCardTemplate = $.templates("#hackerCardTemplate");
    var storiesGrid = $("#topStoriesGrid");

    hacker.populateTopStories(100).done(function (data) {
      $("#progressBar").hide();

      hackerTemplateRenderify(data, storiesGrid, hackerCardTemplate);
      // storiesGrid.append($(hackerCardTemplate.render(hackerTemplateDatify(data))));
    })
  })

  //
  function hackerTemplateRenderify(data, storiesGrid, template) {
    // var hackerTemplateData = [];
    var hackerImageDir = "icons/chipicons/";
    var hnClients = [
      {
        "baseURL":"https://news.ycombinator.com/item?id=",
        "img":"ycombinator.png"
      },
      {
        "baseURL": "http://insin.github.io/react-hn/#/story/",
        "img":"react.png"
      },
      {
        "baseURL":"https://hswolff.github.io/hn-ng2/index.html?itemId=",
        "img": "angular.png"
      },
      {
        "baseURL": "http://chancancode.github.io/hn-reader/item?id=",
        "img":"ember.png"
      }
    ]
    // console.log(data);

    data.forEach(function (value, index, array) {
      var hackerData = {};
      hackerData.url = value.url;
      hackerData.title = value.title;
      hackerData.story = value.story;
      hackerData.discussImages = [];
      hackerData.score = value.score;
      hackerData.by = value.by;
      hackerData.id = value.id;
      hackerData.time = ux_time(value.time)
      hnClients.forEach(function (val, index, array) {
        hackerData.discussImages.push({imgUrl: array[index].baseURL + value.id, imgSrc: hackerImageDir + array[index].img})
      })

      // hackerTemplateData.push(hackerData);
      storiesGrid.append(template.render(hackerData));
    })

    // return hackerTemplateData;
  }

  function ux_time (uxms) {
    var time = new Date(uxms * 1000);
    return time;
  }
}())
