requirejs.config({
  paths: {
    ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.24.1/ramda.min',
    jquery: 'http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min'
  }
});

require([
  'ramda',
  'jquery'
], function(_, $) {
  var useCurry = function() {
    var trace = _.curry(function(tag, x) {
      console.log(tag, x);
      return x;
    });

    var Impure = {
      getJSON: _.curry(function(callback, url) {
        $.getJSON(url, callback);
      }),
      setHTML: _.curry(function(sel, html) {
        $(sel).html(html);
      })
    };

    var url = function(term) {
      return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json&jsoncallback=?';
    };
    var img = function(url) {
      return $('<img />', {src: url});
    };

    var mediaUrl = _.compose(_.prop('m'), _.prop('media'));
    var mediaToImg = _.compose(img, mediaUrl);
    var images = _.compose(_.map(mediaToImg), _.prop('items'));
    var renderImages = _.compose(Impure.setHTML('body'), images);
    var app = _.compose(Impure.getJSON(renderImages), url);
    app("马");
  };
  var noCurry = function() {
    var url = function(term) {
      return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json&jsoncallback=?';
    };
    var app = function(term) {
      $.getJSON(url(term), function(data) {
        data.items.map(function(d) {
          return $('<img />', {src: d.media.m});
        }).forEach(function(ele) {
          $("body").append(ele);
        });
      });
    };
    app('马');
  };
  var myTest = function() {

    var trace = _.curry(function(tag, x) {
      console.log(tag, x);
      return x;
    });

    var Impure = {
      getJSON: _.curry(function(callback, url) {
        return $.getJSON(url, callback)
      }),
      setHTML: _.curry(function(target, ele) {
        $(target).html(ele);
      })
    };

    var url = function(term) {
      return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json&jsoncallback=?';
    };

    var toImgEle = _.curry(function(src) {
      return $('<img>', {src: src});
    });

    var getMediaUrl = _.compose(_.prop('m'), _.prop('media'));
    var MediaToEle = _.compose(toImgEle, getMediaUrl);
    var MediaUrlsToEle = _.compose(_.map(MediaToEle), _.prop('items'));
    var renderEle = _.compose(Impure.setHTML('body'), MediaUrlsToEle);
    var app = _.compose(Impure.getJSON(renderEle), url);

    app('马');
  };

  // useCurry();
  // noCurry();
  myTest();

;(function() {
  var IO = function(f) {
    this.__value = f;
  };
  IO.of = function(x) {
    return new IO(function() {
      return x;
    });
  };
  IO.prototype.map = function(f) {
    return new IO(_.compose(f, this.__value));
  };

  var url = IO.of(window.location.href);

  var toPairs = _.compose(_.map(_.split('=')), _.split('&'));
  var params = _.compose(toPairs, _.last, _.split('?'));

  var findParam = function(key) {
    return _.map(_.compose(_.filter(_.compose(_.equals(key), _.head)), params), url);
  };

  console.log(findParam('id').__value())
})()
});     










