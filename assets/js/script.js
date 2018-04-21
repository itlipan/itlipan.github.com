/*!--------------------------------*\
   3-Jekyll Theme
   @author Peiwen Lu (P233)
   https://github.com/P233/3-Jekyll
\*---------------------------------*/
if ($(window).width() <= 1280) {
  $("#sidebar").addClass("mobile")
}
tag1 = $(".pl__all"), tag2 = $(".java"), tag3 = $(".python"), tag4 = $(".android"),tag5 = $(".js"), tag6 = $(".network"), tag7 = $(".algorithm"), tag8 = $(".others");
var sidebar = $("#sidebar"),
  container = $("#post"),
  content = $("#pjax"),
  button = $("#icon-arrow");
var clickHandler = function (a) {
  return function () {
    $(this).addClass("active").siblings().removeClass("active");
    tag1.hide();
    window["tag" + a].delay(50).fadeIn(350)
  }
};
for (var i = 1; i <= 8; i++) {
  $("#js-label" + i).on("click", clickHandler(i))
}
tag1.on("click", function () {
  $(this).addClass("active").siblings().removeClass("active");
  if (sidebar.hasClass("mobile")) {
    $("#sidebar, #pjax, #icon-arrow").addClass("fullscreen")
  }
});
$("#js-fullscreen").on("click", function () {
  if (button.hasClass("fullscreen")) {
    sidebar.removeClass("fullscreen");
    button.removeClass("fullscreen");
    content.delay(300).queue(function () {
      $(this).removeClass("fullscreen").dequeue()
    })
  } else {
    sidebar.addClass("fullscreen");
    button.addClass("fullscreen");
    content.delay(200).queue(function () {
      $(this).addClass("fullscreen").dequeue()
    })
  }
});
$("#mobile-avatar").on("click", function () {
  $("#sidebar, #pjax, #icon-arrow").addClass("fullscreen")
});
$(document).pjax("#avatar, #mobile-avatar, .pl__all", "#pjax", {
  fragment: "#pjax",
  timeout: 10000
});
$(document).on({
  "pjax:click": function () {
    content.removeClass("fadeIn").addClass("fadeOut");
    NProgress.start()
  },
  "pjax:start": function () {
    content.css({
      opacity: 0
    })
  },
  "pjax:end": function () {
    NProgress.done();
    container.scrollTop(0);
    content.css({
      opacity: 1
    }).removeClass("fadeOut").addClass("fadeIn");
    afterPjax()
  }
});
var CodePenEmbed = {
  width: "100%",
  init: function () {
    this.showCodePenEmbeds(), this.listenToParentPostMessages()
  },
  showCodePenEmbeds: function () {
    var d = document.getElementsByClassName("codepen");
    for (var b = d.length - 1; b > -1; b--) {
      var f = this._getParamsFromAttributes(d[b]);
      f = this._convertOldDataAttributesToNewDataAttributes(f);
      var c = this._buildURL(f),
        a = this._buildIFrame(f, c);
      this._addIFrameToPage(d[b], a)
    }
  },
  _getParamsFromAttributes: function (d) {
    var b = {},
      f = d.attributes;
    for (var c = 0, a = f.length; c < a; c++) {
      name = f[c].name, name.indexOf("data-") === 0 && (b[name.replace("data-", "")] = f[c].value)
    }
    return b
  },
  _convertOldDataAttributesToNewDataAttributes: function (a) {
    return a.href && (a["slug-hash"] = a.href), a.type && (a["default-tab"] = a.type), a.safe && (a.safe == "true" ? a.animations = "run" : a.animations = "stop-after-5"), a
  },
  _buildURL: function (d) {
    var b = this._getHost(d),
      f = d.user ? d.user : "anon",
      c = "?" + this._getGetParams(d),
      a = [b, f, "embed", d["slug-hash"] + c].join("/");
    return a.replace(/\/\//g, "//")
  },
  _getHost: function (a) {
    return a.host ? a.host : document.location.protocol == "file:" ? "http://codepen.io" : "//codepen.io"
  },
  _getGetParams: function (c) {
    var a = "",
      d = 0;
    for (var b in c) {
      a !== "" && (a += "&"), a += b + "=" + encodeURIComponent(c[b])
    }
    return a
  },
  _buildIFrame: function (d, b) {
    var f = {
        id: "cp_embed_" + d["slug-hash"].replace("/", "_"),
        src: b,
        scrolling: "no",
        frameborder: "0",
        height: this._getHeight(d),
        allowTransparency: "true",
        "class": "cp_embed_iframe",
        style: "width: " + this.width + "; overflow: hidden;"
      },
      c = "<iframe ";
    for (var a in f) {
      c += a + '="' + f[a] + '" '
    }
    return c += "></iframe>", c
  },
  _getHeight: function (a) {
    return a.height ? a.height == "auto" ? 300 : a.height : 300
  },
  _addIFrameToPage: function (b, a) {
    if (b.parentNode) {
      var c = document.createElement("div");
      c.innerHTML = a, b.parentNode.replaceChild(c, b)
    } else {
      b.innerHTML = a
    }
  },
  listenToParentPostMessages: function () {
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent",
      eventListener = window[eventMethod],
      messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    eventListener(messageEvent, function (e) {
      try {
        var dataObj = eval("(" + e.data + ")"),
          iframe = document.getElementById("cp_embed_" + dataObj.hash);
        iframe && (iframe.height = dataObj.height)
      } catch (err) {}
    }, !1)
  }
};

function afterPjax() {
  $("#post__content a").attr("target", "_blank");
  CodePenEmbed.init();
  var d = $("#post__toc-ul");
  d.empty().append('<li class="post__toc-li post__toc-h1"><a href="#post__title" class="js-anchor-link">' + $("#post__title").text() + "</a></li>");
  $("#post__content").children("h2,h3").each(function () {
    $(this).attr("id", function () {
      var e = "",
        g = "abcdefghijklmnopqrstuvwxyz";
      for (var f = 0; f < 5; f++) {
        e += g.charAt(Math.floor(Math.random() * g.length))
      }
      return e
    });
    if ($(this).prop("tagName") == "H2") {
      d.append('<li class="post__toc-li post__toc-h2"><a href="#' + $(this).attr("id") + '" class="js-anchor-link">' + $(this).text() + "</a></li>")
    } else {
      d.append('<li class="post__toc-li post__toc-h3"><a href="#' + $(this).attr("id") + '" class="js-anchor-link">' + $(this).text() + "</a></li>")
    }
  });
  $(".js-anchor-link").on("click", function () {
    var e = $(this.hash);
    container.animate({
      scrollTop: e.offset().top + container.scrollTop() - 70
    }, 500, function () {
      e.addClass("flash").delay(700).queue(function () {
        $(this).removeClass("flash").dequeue()
      })
    })
  });
  var b = false,
    c = $("#disqus_thread").offset().top;
  identifier = $("#post__title").data("identifier");
  window.disqus_shortname = "javaclee";
  window.disqus_identifier = identifier;

  function a() {
    if (!b && container.scrollTop() + container.height() > c) {
      $.ajax({
        type: "GET",
        url: "http://" + disqus_shortname + ".disqus.com/embed.js",
        dataType: "script",
        cache: true
      });
      b = true
    }
  }
  a();
  container.scroll(a)
}
afterPjax();