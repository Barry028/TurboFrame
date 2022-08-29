// 生成快捷導航欄 (Just ID) --> 針對所選對象統一集結且監聽 --> 小封裝 
// Elements 監聽並且更動的變動對象(正常來說就 Target) || 
// prevElement 在此函式裡面代表所監聽對象之同級上一個 ( IntersectionObserver 監聽是看觀察對象有沒有碰撞 ，算不出 scroll 所以改監聽上一個對象碰撞事件) ||
// Options [root: null , 
//          rootMargin: "20px 0 0 0" , 
//          threshold: [0, 1]]

var buildSideNav = function(elements, container) {

  var that = this;
  var body = document.getElementsByTagName("BODY")[0];

  // console.log(this)
  // elements 不在存退出
  if (typeof elements === "undefined" || elements === null) {
    return;
  }
  // 不支援 IntersectionObserver 時，退出
  if (!("IntersectionObserver" in window) &&
    !("IntersectionObserverEntry" in window) &&
    !("intersectionRatio" in window.IntersectionObserverEntry.prototype)
  ) {
    return;
  }
  // buildSideNav.isActive = buildSideNav.prototype.isActive
  var defaultContainer = {
    nav: null,
    navClass: 'observer-nav',
    navTag: 'div',
    // navHideClass: 'n-v-hidden-card',
    navItemTag: 'li',
    navItemClass: 'observer-nav-li',
    // navItemHideClass: 'n-v-hidden',
  };

  var listContainer = Object.assign({}, defaultContainer, container || {});
  // listContainer = Object.assign({}, defaultContainer, defaultContainer || {});
  listenElements = document.querySelectorAll(elements);
  var lastScrollTop = document.scrollingElement.scrollTop;



  // 導航元素創建，如果沒有
  if (!listContainer.nav) {
    var _NewNavTag = container.navTag || defaultContainer.navTag;
    var _NewNavClass = container.navClass || defaultContainer.navClass;
    listContainer.nav = document.createElement(_NewNavTag);
    listContainer.nav.id = 'elObserverNav';
    listContainer.nav.className = _NewNavClass;
    body.appendChild(listContainer.nav);
  }

  // var navList = listContainer.nav;
  var observer = new IntersectionObserver(function(entries) {
    if (listContainer.isAvoid) {
      return;
    }
    entries.reverse().forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.active();
      } else if (entry.target.isActived) {
        entry.target.unactive();
      }
    });
    lastScrollTop = document.scrollingElement.scrollTop;
  });

  var _NewNavItemTag = container.navItemTag || defaultContainer.navItemTag;
  var _NewNavItemClass = container.navItemClass || defaultContainer.navItemClass;
  var nav = document.getElementById(listContainer.nav);
  listenElements.forEach(function(item, index) {
    var id = item.id || 'elObserver-00' + (index + 1);
    item.id = id;
    var eleNav = document.createElement('a'); ///
    eleNav.href = '#' + id;
    eleNav.className = _NewNavItemClass;
    eleNav.innerHTML = item.textContent;
    console.log(listContainer.nav);

    nav.appendChild(eleNav);

    item.active = function() {
      // 對應的導航元素高亮
      eleNav.parentElement.querySelectorAll('.active').forEach(function(eleActive) {
        item.isActived = false;
        eleActive.classList.remove('active');
      });
      eleNav.classList.add('active');
      item.isActived = true;
    };
    item.unactive = function() {
      // 對應的導航元素高亮
      if (document.scrollingElement.scrollTop > lastScrollTop) {
        listenElements[index + 1] && listenElements[index + 1].active();
      } else {
        listenElements[index - 1] && listenElements[index - 1].active();
      }
      eleNav.classList.remove('active');
      item.isActived = false;
    };

    // 觀察元素
    observer.observe(item);
  });

  nav.addEventListener('click', function(event) {
    var eleLink = event.target.closest('a');
    // 導航對應的標題元素
    var eleTarget = eleLink && document.querySelector(eleLink.getAttribute('href'));
    if (eleTarget) {
      event.preventDefault();
      // Safari 不支持平滑滾動
      eleTarget.scrollIntoView({
        behavior: "smooth",
        block: 'center'
      });

      if (CSS.supports('scroll-behavior: smooth')) {
        listContainer.isAvoid = true;
        setTimeout(function() {
          eleTarget.active();
          listContainer.isAvoid = false;
        }, Math.abs(eleTarget.getBoundingClientRect().top - window.innerHeight / 2) / 2);
      } else {
        eleTarget.active();
      }
    }
  });
};