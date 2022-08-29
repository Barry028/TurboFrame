import "./lightboxs.scss";
// import '../../javascript/turboframes_likeJQuery/_all';
var fragment = document.createDocumentFragment();
var gridView = document.querySelector(".grid-view");
var addButton = document.querySelector("button");

function animate(from, to, duration, update, easing, done) {
  /**
   * TinyAnimate.easings
   *  Adapted from jQuery Easing
   */
  var easings = {};
  var easing;

  easings.linear = function(t, b, c, d) {
    return (c * t) / d + b;
  };

  easing = easings.linear;

  // Early bail out if called incorrectly
  if (
    typeof from !== "number" ||
    typeof to !== "number" ||
    typeof duration !== "number" ||
    typeof update !== "function"
  ) {
    return;
  }

  // Create mock done() function if necessary
  if (typeof done !== "function") {
    done = function() {};
  }

  // Pick implementation (requestAnimationFrame | setTimeout)
  var rAF =
    window.requestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 50);
    };

  // Animation loop
  var canceled = false;
  var change = to - from;

  function loop(timestamp) {
    var time = (timestamp || +new Date()) - start;

    if (time >= 0) {
      update(easing(time, from, change, duration));
    }
    if (time >= 0 && time >= duration) {
      update(to);
      done();
    } else {
      rAF(loop);
    }
  }

  update(from);

  // Start animation loop
  var start =
    window.performance && window.performance.now ?
    window.performance.now() :
    +new Date();

  rAF(loop);
}

function buildItem(i) {
  var i = 0;
  var randomColor = (
    "000000" + Math.floor(Math.random() * 16777215).toString(16)
  ).slice(-6);
  var randomNum = Math.floor(Math.random() * 100) + 1;
  var item =
    '<img src="https://avatars.dicebear.com/api/pixel-art/s' +
    randomNum +
    i +
    ".svg?background=%23" +
    randomColor +
    '&mood[]=sad&mood[]=happy" alt="">';
  var li = document.createElement("li");
  li.innerHTML = item;
  // gallery.appendChild(li);
  fragment.appendChild(li);
  gridView.append(fragment);
  observeriConLi("li");
}

function getOffset(el) {
  var rect, win;

  if (!el) {
    return;
  }
  if (!el.getClientRects().length) {
    return {
      top: 0,
      left: 0
    };
  }

  // Get document-relative position by adding viewport scroll to viewport-relative gBCR
  rect = el.getBoundingClientRect();
  win = el.ownerDocument.defaultView;

  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset,
    right: window.innerWidth - (el.offsetLeft + el.offsetWidth)
  };
}

function scrollTo(target, offset, duration) {
  var duration = duration ? duration : 500;
  var targetPos = target ? getOffset(target).top : 0;
  // console.log(target);
  // console.log(targetPos);
  var scrollPos =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;
  var from, to;

  if (offset) {
    targetPos = targetPos - offset;
  }

  from = scrollPos;
  to = targetPos;

  animate(from, to, duration, function(value) {
    document.documentElement.scrollTop = value;
    document.body.parentNode.scrollTop = value;
    document.body.scrollTop = value;
  }); //, easing, done
}
// 觀察元素是否進入視窗範圍
function observeriConLi(items) {
  if (
    !("IntersectionObserver" in window) &&
    !("IntersectionObserverEntry" in window) &&
    !("intersectionRatio" in window.IntersectionObserverEntry.prototype)
  ) {
    return;
  }

  var elementsToLoadIn = document.querySelectorAll(items);
  elementsToLoadIn.forEach(function(el) {
    el.classList.add("an-loadin");
  });
  var observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0
  };

  function observerCallback(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("an-loaded");
        observer.unobserve(entry.target); // 停止觀察
      }
    });
  }

  var observer = new IntersectionObserver(observerCallback, observerOptions);
  elementsToLoadIn.forEach(function(el) {
    return observer.observe(el);
  });
}

// DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
  for (var i = 0; i < 24 + 1; i++) {
    window.requestAnimationFrame(buildItem);
  }
});


