 // /**
  //  * 獲取窗口可視範圍的高度
  //  */

  // function getClientHeight() {
  //     var clientHeight = 0;
  //     if (doc.body.clientHeight && doc.documentElement.clientHeight) {
  //         clientHeight = doc.body.clientHeight < doc.documentElement.clientHeight ? doc.body.clientHeight : doc.documentElement.clientHeight;
  //     } else {
  //         clientHeight = doc.body.clientHeight > doc.documentElement.clientHeight ? doc.body.clientHeight : doc.documentElement.clientHeight;
  //     }
  //     return clientHeight;
  // }

  // /**
  //  * 獲取窗口可視範圍寬度
  //  */

  // function getPageViewWidth() {
  //     var d = doc,
  //         a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
  //     return a.clientWidth;
  // }

  // /**
  //  * 獲取窗口寬度
  //  */

  // function getPageWidth() {
  //     var g = doc,
  //         a = g.body,
  //         f = g.documentElement,
  //         d = g.compatMode == "BackCompat" ? a : g.documentElement;
  //     return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
  // }

  // /**
  //  * 獲取窗口尺寸
  //  */

  // function getViewportOffset() {
  //     if (window.innerWidth) {
  //         return {
  //             w: window.innerWidth,
  //             h: window.innerHeight
  //         };
  //     } else {
  //         // ie8及其以下
  //         if (doc.compatMode === "BackCompat") {
  //             // 怪異模式
  //             return {
  //                 w: doc.body.clientWidth,
  //                 h: doc.body.clientHeight
  //             };
  //         } else {
  //             // 標準模式
  //             return {
  //                 w: doc.documentElement.clientWidth,
  //                 h: doc.documentElement.clientHeight
  //             };
  //         }
  //     }
  // }

  // /**
  //  *  獲取滾動條距頂部高度
  //  */

  // function getPageScrollTop() {
  //     var a = doc;
  //     return a.documentElement.scrollTop || a.body.scrollTop;
  // }

  // /**
  //  *  獲取滾動條距左邊的高度
  //  */
  // function getPageScrollLeft() {
  //     var a = doc;
  //     return a.documentElement.scrollLeft || a.body.scrollLeft;
  // }

  // /**
  //  * 開啟全屏
  //  * @ Param {*} element
  //  */

  // function launchFullscreen(element) {
  //     if (element.requestFullscreen) {
  //         element.requestFullscreen();
  //     } else if (element.mozRequestFullScreen) {
  //         element.mozRequestFullScreen();
  //     } else if (element.msRequestFullscreen) {
  //         element.msRequestFullscreen();
  //     } else if (element.webkitRequestFullscreen) {
  //         element.webkitRequestFullScreen();
  //     }
  // }

  // /**
  //  *  關閉全屏
  //  */

  // function exitFullscreen() {
  //     if (doc.exitFullscreen) {
  //         doc.exitFullscreen();
  //     } else if (doc.msExitFullscreen) {
  //         doc.msExitFullscreen();
  //     } else if (doc.mozCancelFullScreen) {
  //         doc.mozCancelFullScreen();
  //     } else if (doc.webkitExitFullscreen) {
  //         doc.webkitExitFullscreen();
  //     }
  // }

  // *
  //  * 返回當前滾動條位置

  // var getScrollPosition = function getScrollPosition() {
  //     var el = arguments.length <= 0 || arguments[0] === undefined ? window : arguments[0];
  //     return {
  //         x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  //         y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
  //     };
  // };


  // /**
  //  * 滾動到指定元素區域
  //  */
  // var smoothScroll = function smoothScroll(element) {
  //     doc.querySelector(element).scrollIntoView({
  //         behavior: 'smooth'
  //     });
  // };


  // /**
  //  * 平滑滾動到頁面頂部
  //  */
  // var scrollToTop = function scrollToTop() {
  //     var c = doc.documentElement.scrollTop || doc.body.scrollTop;
  //     if (c > 0) {
  //         window.requestAnimationFrame(scrollToTop);
  //         window.scrollTo(0, c - c / 8);
  //     }
  // };


  // /**
  //  * http跳轉https
  //  */
  // var httpsRedirect = function httpsRedirect() {
  //     if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
  // };


  // /**
  //  * 檢查頁面底部是否可見
  //  */
  // var bottomVisible = function bottomVisible() {
  //     return doc.documentElement.clientHeight + window.scrollY >= (doc.documentElement.scrollHeight || doc.documentElement.clientHeight);
  // };



  // /**
  //  * 打開一個窗口
  //  * @ Param { string } url
  //  * @ Param { string } windowName
  //  * @ Param { number } width
  //  * @ Param { number } height
  //  */

  // function openWindow(url, windowName, width, height) {
  //     var x = parseInt(screen.width / 2.0) - width / 2.0;
  //     var y = parseInt(screen.height / 2.0) - height / 2.0;
  //     var isMSIE = navigator.appName == "Microsoft Internet Explorer";
  //     if (isMSIE) {
  //         var p = "resizable=1,location=no,scrollbars=no,width=";
  //         p = p + width;
  //         p = p + ",height=";
  //         p = p + height;
  //         p = p + ",left=";
  //         p = p + x;
  //         p = p + ",top=";
  //         p = p + y;
  //         window.open(url, windowName, p);
  //     } else {
  //         var win = window.open(url, "ZyiisPopup", "top=" + y + ",left=" + x + ",scrollbars=" + scrollbars + ",dialog=yes,modal=yes,width=" + width + ",height=" + height + ",resizable=no");
  //         eval("try { win.resizeTo(width, height); } catch(e) { }");
  //         win.focus();
  //     }
  // }

  // /**
  //  * 自適應頁面（rem）
  //  * @ Param { number } width
  //  */

  // function AutoResponse() {
  //     var width = arguments.length <= 0 || arguments[0] === undefined ? 750 : arguments[0];

  //     var target = doc.documentElement;
  //     target.clientWidth >= 750 ? target.style.fontSize = "100px" : target.style.fontSize = target.clientWidth / width * 100 + "px";
  // }



  // /**
  //  * 禁止鼠標右鍵、選擇、複製
  //  */
  // var contextmenuBan = function contextmenuBan() {
  //     ['contextmenu', 'selectstart', 'copy'].forEach(function(ev) {
  //         doc.addEventListener(ev, function(event) {
  //             return event.returnValue = false;
  //         });
  //     });
  // };