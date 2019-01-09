try {
  document.domain = 'qq.com';
} catch (e) { }

function getURLParam (name) {
  var value = location.search.match(new RegExp("[?&]" + name + "=([^&]*)(&?)", "i"));
  return value ? decodeURIComponent(value[1]) : value;
}

function appcookie (f, j, m) {
  if (typeof j == "undefined") {
    if (0 < document.cookie.length) {
      var k = document.cookie.match(new RegExp("(^| )" + f + "=([^;]*)(;|$)"));
      return (null === k) ? "" : k[2]
    }
    return ""
  } else {
    if (arguments.callee(f) == j) {
      return
    } else {
      m = $.extend({
        expires: 1,
        path: "/",
        domain: window.document.location.hostname
      },
        m || {});
      if (j === null) {
        j = "";
        m.expires = -1
      }
      var g = "";
      if (m.expires && (typeof m.expires == "number" || m.expires.toUTCString)) {
        var h;
        if (typeof m.expires == "number") {
          h = new Date();
          h.setTime(h.getTime() + (m.expires * 1 * 60 * 60 * 1000))
        } else {
          h = m.expires
        }
        g = h.toUTCString()
      }
      var l = m.path ? "; path=" + (m.path) : "";
      var i = m.domain ? "; domain=" + (m.domain) : jQuery.getHost();
      var e = m.secure ? "; secure" : "";
      document.cookie = f + "=" + j + "; path=" + l + "; domain=" + i + "; expires=" + g
    }
  }
}

function sent_tcss () {
  var gj_port = document.location.protocol == 'https:' ? 'https:' : 'http:';
  var tcss_url = 'http://pingjs.qq.com/tcss.ping.js';
  if (gj_port == 'https:') {
    tcss_url = 'https://pingjs.qq.com/tcss.ping.https.js';
  }
  $.ajax({
    type: 'GET',
    url: tcss_url,
    success: function () { if (typeof (pgvMain) == 'function') { pgvMain() } },
    dataType: 'script',
    cache: true
  });
  $.ajax({
    type: 'GET',
    url: '//pc1.gtimg.com/guanjia/js/tj.js',
    success: function () {
      mtj.run();
    },
    dataType: 'script',
    cache: true
  });

  $(document).click(function (evt) {
    var tagPrefix = 'sygw';
    var tagAttr = 'data-stats';
    var tagPattern = /^(?!\.)[\w-]+(?:\.[\w-]+)*?$/;
    // check feature
    if ('function' !== typeof (pgvSendClick)) {
      return;
    }
    // get current target
    var curTar = evt.target;
    if (!curTar || 1 !== curTar.nodeType) {
      return;
    }
    // get closest clickable element
    var clickableElm = $(curTar).closest('[' + tagAttr + ']');
    if (0 === clickableElm.length) {
      return;
    }
    // get hot tag
    var hotTag = clickableElm.attr(tagAttr);
    if (!tagPattern.test(hotTag)) {
      return;
    }
    // send log
    var objArg = {
      'hottag': tagPrefix + '.' + hotTag
    };
    //virtualDomain && (objArg['virtualDomain'] = virtualDomain);
    pgvSendClick(objArg);
  });
}

function init () {
  sent_tcss()
  $('.guide').click(function () {
    "use strict";
    $('body').animate({ scrollTop: 2000 });
  })
  $('body').append('<div class="footer" id="footer"><p><a href="http://www.tencent.com/en-us/index.shtml" target="_blank" rel="nofollow">Tencent</a>|<a href="http://www.tencent.com/en-us/statement.html" target="_blank" rel="nofollow">Copyright</a>|<a href="#">About Tencent Gaming Buddy</a></p><p class="copyright">Copyright © 1998 - 2018 Tencent. All Rights Reserved.</p></div>')

  $('.version-select').on('click', '.version-select-title', function () {
    $(this).siblings('.version-select-list').toggle()
  }).on('click', '.version-select-item', function () {
    var $this = $(this)
    var value = $this.data('value')
    var text = $this.text()
    var target = $this.parent().hide().siblings('.version-select-title').data('value', value).children('span').text(text).data('target')
    $('#' + target).attr('href', value)
  })
  $('#aov-download').on('click', function () {
    var href = $(this).attr('href')
    if (!href) {
      $('.version-select-list').show()
      return false
    }
  })
  $('.choose-version input[type="radio"]').on('change', function () {
    var $this = $(this)
    if ($this.is(':checked')) {
      $('#' + $this.data('target')).attr('href', $this.data('value'))
    }
  })
  var country = appcookie('syzs_country')
  if ($('#pubg-download').length && !country) {
    $.ajax({
      url: '//sy.guanjia.qq.com/bin/syzs/qrygeoip.php?op=query',
      dataType: 'jsonp',
      success: function (d) {
        appcookie('syzs_country', d && d.country)
        if (d.code === 0 && d.country === 'KR') {
          $('#pubg-download').addClass('disabled').removeAttr('href').next('.choose-version').find('input').prop('disabled', true)
        }
      }
    })
  } else if (country === 'KR') {
    $('#pubg-download').addClass('disabled').removeAttr('href').next('.choose-version').find('input').prop('disabled', true)
  }
}

$(init);

function isIE6_8 () {
  return !-[1,];
}

