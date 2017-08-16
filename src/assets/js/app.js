/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Routing = {
    // All pages
    'common': {
      init: function() {

      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired

      }
    },
    // Home page
    'index_page' : {
      init: function() {

      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS

      }
    },

    'designer_step1_page' : {
      init: function() {

      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS

      }
    },
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Routing;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  function createCookie(name, value, days) {
    var expires;

    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
  }

  function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  }

  // Load Events
  $(document).ready(UTIL.loadEvents);
  $(document).ready(function() {
    function createGuid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }
    if (readCookie('hashID')) {
      return;
    }
    var guid = createGuid();
    createCookie('hashID', guid, 540);
  });

})(jQuery); // Fully reference jQuery after this point.

/* ========================================================================
 * Examples
/* ======================================================================== */

// TIME OUT AND ADD REMOVE CLASS
// 
// $( document ).ready(function() {
//   setTimeout(function(){
//     $("#loadScreen").addClass("done");
//     $("#samplesScreen").addClass("visible");
//
//   }, 3000);
// });

// EXAMPLE OF USING LOCAL STORAGE
//
// $('#submit').on('click', function(e) {
//   var roomWidth = $('#inputWidth').val();
//   var roomLength = $('#inputLength').val();
//
//   localStorage.setItem("roomWidth", roomWidth);
//   localStorage.setItem("roomLength", roomLength);
//  });
//
// $('.displayWidth').text(localStorage.getItem("roomWidth"));
// $('.displayLength').text(localStorage.getItem("roomLength"));
//
// console.log(localStorage.roomWidth);
// console.log(localStorage.roomLength);
