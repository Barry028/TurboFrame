
// Storage & Cookie
// 緩存框架
;
(function(TutboFrame) {

  /**
   * 實現了緩存框架的臨時存儲功能（內存存儲）
   * @type {{data: Array, get: (function(*): *), add: TutboFrame.cache.add, delete: (function(*): boolean), update: (function(*, *): boolean), isExist: (function(*): boolean)}}
   */
  TutboFrame.cache = {
    data: [], // 用於存儲本地的數據信息
    /**
     * 用於獲取本地存儲的json數據信息
     * @param key
     * @return {*}
     */
    get: function(key) {
      var value = null;
      this.data.each(function() {
        if (key.trim() === this.key.trim()) {
          value = this.value;
        }
      });
      return value;
    },
    /**
     * 向本地存儲添加數據信息
     * @param key
     * @param value
     */
    add: function(key, value) {
      this.data.push({
        key: key.trim(),
        value: value.trim()
      });
    },
    /**
     * 刪除指定的key的數據信息
     * @param key
     * @return {boolean}
     */
    delete: function(key) {
      // 刪除指定的key對應的數據信息
      var status = false, // 定義一個狀態碼，用於標記刪除是否成功的狀態信息
        self = this;
      this.data.forEach(function(element, index) {
        // 遍歷本地的數據存儲信息，進行比對數據信息
        if (key.trim() === element.key.trim()) {
          // 指定開始的位置，開始刪除數組中的數據信息
          self.data.splice(index, 1);
          status = true;
        }
      });
      return status;
    },
    /**
     * 修改指定的元素的數據信息
     * @param key
     * @param value
     */
    update: function(key, value) {
      var status = false;
      this.data.forEach(function(element) {
        if (key.trim() === element.key) {
          // key不變，只修改數值信息, 注意element是一個json對象，這個對象裡面包含了兩個屬性element.key和element.value這兩個
          element.value = value.trim();
          status = true;
        }
      });
      return status;
    },
    /**
     * 檢測一個指定的數據是否存在
     * @param key
     * @return {boolean}
     */
    isExist: function(key) {
      // 用於檢測某一個數據信息是否存在
      this.data.forEach(function() {
        if (key.trim() === this.key) {
          return true;
        }
      });
      return false;
    }
  }


  /**
   * 實現了一個Cookie框架的封裝（注意在把HTML轉換為實體存儲的時候這裡默認是去掉了最末尾的分號）
   * @type {{getCookie: TutboFrame.cookie.getCookie, setCookie: TutboFrame.cookie.setCookie, deleteCookie: TutboFrame.cookie.deleteCookie, clearAllCookies: TutboFrame.cookie.clearAllCookies}}
   */
  TutboFrame.cookie = {
    /**
     * 根據cookie的名字獲取Cookie的詳細信息
     * @param name
     * @return {*}
     */
    getCookie: function(name) {
      // 去除轉義字符
      var name = name.escapeHTML(),
        // 讀取文檔中的所有cookie屬性
        allCookies = doc.cookie;

      // 下面是一些Cookie的數據格式信息（默認返回的是一個字符串）
      // H_PS_645EC=af88R0s3e76Ig1PlwkvrhnGGtg4qt5pcZNPKBUntPI2vGearAlyZyjXjmKYn%2BkggUXbNjhg;
      // 1. 查找名稱為name的cookie信息script3&amp5;
      //name = name.substring(0, name.length-1);            //  當前步驟是為了去除掉末尾的分號(轉換為標準形式);
      name += '=';
      // 等號右邊的就是獲取的數值，左邊就是cookie的名稱信息
      // 2. 獲取'name='這個字符串在整個Cookie信息字符串中出現的位置下標
      var pos = allCookies.indexOf(name);
      // 3. 判斷是否存在這個cookie的信息
      if (pos !== -1) {
        // 如果存在的話，就繼續處理
        // 3. 計算'cookie='等號後面的位置
        var start = pos + name.length;
        // 3. 從'cookie='的位置開始向後搜索， 一直到;的位置結束, 從start的位置向後搜索信息
        var end = allCookies.indexOf(';', start);
        if (end === -1) {
          // 如果為-1的話， 說明cookie信息列表裡面只有一個Cookie信息
          end = allCookies.length;
        }
        // 4. 提取Cookie的數值信息
        var value = allCookies.substring(start, end);
        // 5.處理之後反轉義後返回(反轉義的目的是將內容進行加密處理，防止攻擊)【測試狀態OK，由於之前的內部存儲，必須先刪除所有的，在執行就ok了】
        return value.unescapeHTML();
      } else {
        // 沒有找到， 說明不存在這個cookie信息
        return '';
      }

      // 默認情況下返回一個空的字符串
      return '';
    },
    /**
     * 根據傳入的參數信息設置瀏覽器的cookie
     * @param name
     * @param value
     * @param days
     * @param path
     */
    setCookie: function(name, value, days, path) {
      var name = name.escapeHTML(),
        value = value.escapeHTML(),
        expires = new Date(),
        _expires,
        res;

      //name = name.substring(0, name.length-1);            //  當前步驟是為了去除掉末尾的分號(轉換為標準形式);

      // 設置cookie的過期時間(單位是毫秒)
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      if (path === '') {
        path = '';
      } else {
        path = (';path=' + path);
      }

      if (typeof expires === 'string') {
        _expires = '';
      } else {
        // 使用UTC標準時間
        _expires = (';expires=' + expires.toUTCString());
      }

      // 設置cookie信息，【注意要點：】(設置COokie的時候，只要遇到分號就會立即結束，只會保存分號之前的內容)
      res = name + '=' + value + _expires + path;
      // doc.cookie="userId=828; userName=hulk";
      doc.cookie = res;
    },
    /**
     * 根據名稱信息和路徑信息刪除cookie
     * @param name
     * @param path
     */
    deleteCookie: function(name, path) {
      var name = name.escapeHTML(),
        expires = new Date();
      if (path === '') {
        path = '';
      } else {
        path = (';path=' + path);
      }

      // 刪除之後重新設置cookie
      doc.cookie = name + '=' + ';expires=' + expires.toUTCString() + path;
    },
    /**
     * 清空所有的cookie信息
     */
    clearAllCookies: function() {
      // 1. 獲取瀏覽器中存儲的所有cookie信息
      // "name&amp=xiuxiu&amp; name=xiuxiu; script=<script>alert(2); script2=<script>alert(2); script3=<script>alert(2); script3&amp=&ltscript&gtalert(2); script4&amp=&ltscript&gtalert(2); a&amp=&lta&gtalert(2)&lt/a&gt&amp"
      var cookies = doc.cookie.split(';');
      if (cookies.length) {
        cookies.forEach(function(element) {
          // 拿到字符串：name&amp=xiuxiu&amp
          var index = element.indexOf('='),
            name = element.substring(0, index);

          // 實現思路：要想刪除某一個COOkie信息，只需要將cookie的name對應的值設置為空即可
          doc.cookie = name + '=' + ';expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        });
      }

    }
  }


  // 本地存儲框架localstorage的本地存儲
  TutboFrame.store = (function(TutboFrame) {
    // 定義一個API，用於定義實現的本地存儲的API接口
    var api = {},
      localStorageName = 'localStorage',
      globalStorageName = 'globalStorage',
      win = window,
      doc = window.doc,
      storage;


    // 首先先定義要實現的功能接口
    api.set = function(key, value) {

    }
    api.get = function(key) {

    }
    api.remove = function(key) {

    }
    api.clear = function() {

    }


    /*
    *   a) sessionStorage和localStorage都是window的屬性，也是Storage對象的實例，即：window.sessionStorage instanceof Storage返回True，window.localStorage instanceof Storage 返回True,也因此兩者享有Storage的屬性和方法。
        b) sessoinStorage存儲的數據在頁面會話結束時會被清空，頁面會話在瀏覽器窗口關閉前持續存在，包含頁面刷新和恢復。若新開標籤或窗口將新建一個會話，再次獲取sessionStorage將只限於當前會話，與先前會話的無關。localStorage存儲的數據不會
        c) window.globalStorage自Gecko 13 (Firefox 13)起不再支持。
    *
    * */
    if (localStorageName in win && win[localStorageName]) {
      // 拿到本地存儲的這個數據項
      storage = win[localStorageName];

      // 實現我自己定義的接口
      /**
       * 設置本地存儲的內容
       * @param key
       * @param value
       */
      api.set = function(key, value) {
        storage.setItem(key, value);
      }
      /**
       * 獲取本地存儲的內容
       * @param key
       * @return {*}
       */
      api.get = function(key) {
        return storage.getItem(key);
      }
      /**
       * 移出其中的某一項
       * @param key
       */
      api.remove = function(key) {
        storage.removeItem(key);
      }
      /**
       * 清空本地存儲的所有內容
       */
      api.clear = function() {
        storage.clear();
      }
    } else if (globalStorageName in win && win[globalStorageName]) {
      // HTML5中的localStorage替換了原來的globalStorgae
      // 1. 拿到本地存儲的對象(這是一個Json對象)[Firefox瀏覽器]
      storage = win[globalStorageName][win.location.hostname];
      api.set = function(key, value) {
        storage[key] = value;
      }
      api.get = function(key) {
        return storage[key] && storage[key].value;
      }
      api.remove = function(key) {
        // delete用來刪除一個對象的屬性。
        delete storage[key];
      }
      api.clear = function() {
        for (var key in storage) {
          delete storage[key];
        }
      }
    } else if (doc.documentElement.addBehavior) {
      // 如果可以給一個對象添加行為的話
      //  單獨定義一個獲取本地存儲的對象 storage
      function getStorage() {
        // 如果已經獲取到了 Storage對象的話
        if (storage) {
          return storage;
        }
        storage = doc.body.appendChild(doc.createElement('div'));
        storage.style.display = 'none';
        // userData 64KB IE專用
        storage.addBehavior('#default#userData');
        // 這個是微軟自定義的一個本地存儲，相比之下有更大的容量
        storage.load(localStorageName);
        return storage;
      }

      api.set = function(key, value) {
        var storage = getStorage();
        // 設置屬性
        storage.setAttribute(key, value);
        // 保存屬性信息
        storage.save(localStorageName);
      }
      api.get = function(key) {
        var storage = getStorage();
        return storage.getAttribute(key);
      }
      api.remove = function(key) {
        var storage = getStorage();
        storage.removeAttribute(key);
        // 移出數據之後記得保存一下數據
        storage.save(localStorageName);
      }
      api.clear = function() {
        // 1. 獲取Storage對象
        var storage = getStorage();
        // 2.獲取storage對象存儲的所有屬性信息
        var attributes = storage.Xmldoc.documentElement.attributes;
        storage.load(localStorageName);
        // 3. 遍歷所有的屬性信息，並從本地移出數據
        [].slice.call(attributes).forEach(function(element) {
          storage.removeAttribute(element.name);
        })
        // 4. 移出完畢之後，開始保存信息到本地存儲
        storage.save(localStorageName);
      }

      return api;
    }

    // 把立即函數裡面的私有成員暴露出去(如果在立即函數內部不暴露出去需要使用的成員，在外部是無法訪問到內部的私有成員變量的)
    TutboFrame.storage = api;

  })(TutboFrame);
})(TutboFrame);