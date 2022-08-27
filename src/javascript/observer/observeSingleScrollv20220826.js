// 對象監聽器 (Just ID) --> 針對單一物件監聽 --> 小封裝 
// Element 監聽並且更動的變動對象(正常來說就 Target) || 
// PrevElement 在此函式裡面代表所監聽對象之同級上一個 ( IntersectionObserver 監聽是看觀察對象有沒有碰撞 ，算不出 scroll 所以改監聽上一個對象碰撞事件) ||
// ClassName || options [root: null || 
// Options [root: null , 
//          rootMargin: "20px 0 0 0" , 
//          threshold: [0, 1]]

var scrollObserver = function(element, prevElement, className, options) {
  var that = this;
  // element 不在存退出
  if (typeof element === "undefined" || element === null) {
    return;
  }
  element = document.getElementById(element);
  prevElement = document.getElementById(prevElement) || element;

  // 不支援 IntersectionObserver 時，改用 getBoundingClientRect 監聽 
  if (!("IntersectionObserver" in window) &&
    !("IntersectionObserverEntry" in window) &&
    !("intersectionRatio" in window.IntersectionObserverEntry.prototype)
  ) {
    var initialCords = element.getBoundingClientRect();
    document.addEventListener('scroll', function() {
      if (window.scrollY >= initialCords.top) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    });
  }
  //////////////////////////////
  // **   scrollObserver   ** //
  //////////////////////////////
  var defaultOptions = {
    root: null,
    rootMargin: '',
    threshold: ''
  };

  that.options = options || defaultOptions ;

  // console.log(options)
  var observer = new IntersectionObserver(function(entries) {
    // console.log(this)
    entries.forEach(function(entry) {

      // var userList = document.getElementById("userList")
      // var aT = entry.intersectionRect.top;
      // var bT = document.getElementById("userList").getBoundingClientRect().top
      // var bH = document.getElementById("userList").getBoundingClientRect().height
      // console.log((bT - bH) ,  aT)
      console.log(entry.isIntersecting)
      // console.log(JsUtils.isInViewport(userList))
      // console.log(entry.intersectionRect.top)
      // console.log(entry.intersectionRatio)
      console.log(entry.boundingClientRect.top)
      // // var initialCords = element.getBoundingClientRect();
      // console.log(entry.intersectionRatio)
      if (entry.isIntersecting ) {
        element.classList.remove(className);
        // if ((bT - bH) > aT ) {
        //  element.classList.remove('form-group-float-btns-absolute');
        // }
      } else if (entry.boundingClientRect.top <= 0) {
        element.classList.add(className);
        // if ((bT - bH) > aT) {
        //   element.classList.add('form-group-float-btns-absolute');
        // }
      }
      //  else if (entry.intersectionRatio == 0 && entry.intersectionRect.top ==0 ){
      //           element.classList.remove(className);
      // }
      // else if (!entry.isIntersecting && JsUtils.isInViewport(userList) == false){
      //     element.classList.add('form-group-float-btns-absolute');
      //   }
    });
  });
  return observer.observe(prevElement);
};
















// //指定エリア内に要素を追従させる関数（追従要素,追従エリア）
// const areaFixedFunk = (fixedElm,fixedArea) => {
//   //エリアチェック
//   const areas = document.querySelectorAll(fixedArea);
//   if(areas.length === 0) {
//     return;
//   }

//   //追従チェック関数
//   const checkFixed = (target,area) => {
//     //要素の位置と高さを取得
//     const startPosi = area.getBoundingClientRect().top;
//     const targetHeight = target.clientHeight;
//     const areaHeight = area.clientHeight;
//     const endPosi = startPosi + areaHeight;

//     //エリア内の処理
//     if(0 > startPosi && targetHeight < endPosi) {
//       target.classList.add('is-fixed');
//       target.style.top = '';

//     //エリアより上の処理
//     } else if(0 <= startPosi) {
//       target.classList.remove('is-fixed');
//       target.style.top = '';

//     //エリアより下の処理
//     } else {
//       target.classList.remove('is-fixed');
//       //停止位置を設定
//       target.style.top = (areaHeight - targetHeight) + 'px';
//     }
//   }

//   //エリア毎に処理
//   areas.forEach((area) => {
//     //エリア内に追従要素が存在する場合のみ処理する
//     const target = area.querySelector(fixedElm);
//     if(target) {
//       checkFixed(target,area);
//       window.addEventListener('resize', ()=> {
//         checkFixed(target,area);
//       });
//       window.addEventListener('scroll', ()=> {
//         checkFixed(target,area);
//       }, {passive: true});
//     }
//   });
// }

// //関数呼び出し（追従要素,追従エリア）
// areaFixedFunk('.js-fixed-elm','.js-fixed-area');