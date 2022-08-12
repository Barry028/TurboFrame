/**
 *  lin
 *  此文件下主要為常用的工具函數
 */

/**
 *  金錢格式化，三位加逗號
 *  @param { number } num
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};

exports.subText = subText;
exports.fileToBase64String = fileToBase64String;
exports.formatFileSize = formatFileSize;
exports.getTreeData = getTreeData;
exports.foreachTree = foreachTree;
exports.traceParentNode = traceParentNode;
exports.traceChildNode = traceChildNode;
exports.inArray = inArray;
exports.OutOsName = OutOsName;
exports.getOSType = getOSType;
exports.debounce = debounce;
exports.throttle = throttle;
exports.type = type;
exports.arrScrambling = arrScrambling;
exports.countOccurrences = countOccurrences;
exports.add = add;
exports.sub = sub;
exports.division = division;
exports.mcl = mcl;
exports.tco = tco;
exports.randomNumInteger = randomNumInteger;
exports.trim = trim;
exports.turnCase = turnCase;
exports.hexColor = hexColor;
exports.numberToChinese = numberToChinese;
exports.changeToChinese = changeToChinese;
var formatMoney = function formatMoney(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

exports.formatMoney = formatMoney;
/**
 *  截取字符串並加身略號
 */

function subText(str, length) {
    if (str.length === 0) {
        return '';
    }
    if (str.length > length) {
        return str.substr(0, length) + "...";
    } else {
        return str;
    }
}

/**
 * 獲取文件base64編碼
 * @param file
 * @param format  指定文件格式
 * @param size  指定文件大小(字節)
 * @param formatMsg 格式錯誤提示
 * @param sizeMsg   大小超出限制提示
 * @returns {Promise<any>}
 */

function fileToBase64String(file) {
    var format = arguments.length <= 1 || arguments[1] === undefined ? ['jpg', 'jpeg', 'png', 'gif'] : arguments[1];
    var size = arguments.length <= 2 || arguments[2] === undefined ? 20 * 1024 * 1024 : arguments[2];
    var formatMsg = arguments.length <= 3 || arguments[3] === undefined ? '文件格式不正確' : arguments[3];
    var sizeMsg = arguments.length <= 4 || arguments[4] === undefined ? '文件大小超出限制' : arguments[4];

    return new Promise(function(resolve, reject) {
        // 格式過濾
        var suffix = file.type.split('/')[1].toLowerCase();
        var inFormat = false;
        for (var i = 0; i < format.length; i++) {
            if (suffix === format[i]) {
                inFormat = true;
                break;
            }
        }
        if (!inFormat) {
            reject(formatMsg);
        }
        // 大小過濾
        if (file.size > size) {
            reject(sizeMsg);
        }
        // 轉base64字符串
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function() {
            var res = fileReader.result;
            resolve({
                base64String: res,
                suffix: suffix
            });
            reject('異常文件，請重新選擇');
        };
    });
}

/**
 * B轉換到KB,MB,GB並保留兩位小數
 * @param { number } fileSize
 */

function formatFileSize(fileSize) {
    var temp = undefined;
    if (fileSize < 1024) {
        return fileSize + 'B';
    } else if (fileSize < 1024 * 1024) {
        temp = fileSize / 1024;
        temp = temp.toFixed(2);
        return temp + 'KB';
    } else if (fileSize < 1024 * 1024 * 1024) {
        temp = fileSize / (1024 * 1024);
        temp = temp.toFixed(2);
        return temp + 'MB';
    } else {
        temp = fileSize / (1024 * 1024 * 1024);
        temp = temp.toFixed(2);
        return temp + 'GB';
    }
}

/**
 *  base64轉file
 *  @param { base64 } base64
 *  @param { string } filename 轉換後的文件名
 */
var base64ToFile = function base64ToFile(base64, filename) {
    var arr = base64.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var suffix = mime.split('/')[1]; // 圖片後綴
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename + "." + suffix, {
        type: mime
    });
};

exports.base64ToFile = base64ToFile;
/**
 *  base64轉blob
 *  @param { base64 } base64
 */
var base64ToBlob = function base64ToBlob(base64) {
    var arr = base64.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
};

exports.base64ToBlob = base64ToBlob;
/**
 *  blob轉file
 *  @param { blob } blob
 *  @param { string } fileName
 */
var blobToFile = function blobToFile(blob, fileName) {
    blob.lastModifiedDate = new Date();
    blob.name = fileName;
    return blob;
};

exports.blobToFile = blobToFile;
/**
 * file轉base64
 * @param { * } file 圖片文件
 */
var fileToBase64 = function fileToBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
        return e.target.result;
    };
};

exports.fileToBase64 = fileToBase64;
/**
 * 遞歸生成樹形結構
 */

function getTreeData(data, pid, pidName, idName, childrenName, key) {
    if (pidName === undefined) pidName = 'parentId';
    if (idName === undefined) idName = 'id';
    if (childrenName === undefined) childrenName = 'children';

    var arr = [];

    for (var i = 0; i < data.length; i++) {
        if (data[i][pidName] == pid) {
            data[i].key = data[i][idName];
            data[i][childrenName] = getTreeData(data, data[i][idName], pidName, idName, childrenName);
            arr.push(data[i]);
        }
    }

    return arr;
}

/**
 * 遍歷樹節點
 */

function foreachTree(data, childrenName, callback) {
    if (childrenName === undefined) childrenName = 'children';

    for (var i = 0; i < data.length; i++) {
        callback(data[i]);
        if (data[i][childrenName] && data[i][childrenName].length > 0) {
            foreachTree(data[i][childrenName], childrenName, callback);
        }
    }
}

/**
 * 追溯父節點
 */

function traceParentNode(pid, data, rootPid) {
    var pidName = arguments.length <= 3 || arguments[3] === undefined ? 'parentId' : arguments[3];
    var idName = arguments.length <= 4 || arguments[4] === undefined ? 'id' : arguments[4];
    var childrenName = arguments.length <= 5 || arguments[5] === undefined ? 'children' : arguments[5];

    var arr = [];
    foreachTree(data, childrenName, function(node) {
        if (node[idName] == pid) {
            arr.push(node);
            if (node[pidName] != rootPid) {
                arr = arr.concat(traceParentNode(node[pidName], data, rootPid, pidName, idName));
            }
        }
    });
    return arr;
}

/**
 * 尋找所有子節點
 */

function traceChildNode(id, data) {
    var pidName = arguments.length <= 2 || arguments[2] === undefined ? 'parentId' : arguments[2];
    var idName = arguments.length <= 3 || arguments[3] === undefined ? 'id' : arguments[3];
    var childrenName = arguments.length <= 4 || arguments[4] === undefined ? 'children' : arguments[4];

    var arr = [];
    foreachTree(data, childrenName, function(node) {
        if (node[pidName] == id) {
            arr.push(node);
            arr = arr.concat(traceChildNode(node[idName], data, pidName, idName, childrenName));
        }
    });
    return arr;
}

/**
 * 根據pid生成樹形結構
 *  @param { object } items 後台獲取的數據
 *  @param { * } id 數據中的id
 *  @param { * } link 生成樹形結構的依據
 */
var createTree = function createTree(items) {
    var id = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var link = arguments.length <= 2 || arguments[2] === undefined ? 'pid' : arguments[2];

    items.filter(function(item) {
        return item[link] === id;
    }).map(function(item) {
        return _extends({}, item, {
            children: createTree(items, item.id)
        });
    });
};

exports.createTree = createTree;
/**
 * 查詢數組中是否存在某個元素並返回元素第一次出現的下標 
 * @param {*} item 
 * @param { array } data
 */

function inArray(item, data) {
    for (var i = 0; i < data.length; i++) {
        if (item === data[i]) {
            return i;
        }
    }
    return -1;
}

/**
 *  Windows根據詳細版本號判斷當前系統名稱
 * @param { string } osVersion 
 */

function OutOsName(osVersion) {
    if (!osVersion) {
        return;
    }
    var str = osVersion.substr(0, 3);
    if (str === "5.0") {
        return "Win 2000";
    } else if (str === "5.1") {
        return "Win XP";
    } else if (str === "5.2") {
        return "Win XP64";
    } else if (str === "6.0") {
        return "Win Vista";
    } else if (str === "6.1") {
        return "Win 7";
    } else if (str === "6.2") {
        return "Win 8";
    } else if (str === "6.3") {
        return "Win 8.1";
    } else if (str === "10.") {
        return "Win 10";
    } else {
        return "Win";
    }
}

/**
 * 判斷手機是Andoird還是IOS
 *  0: ios
 *  1: android
 *  2: 其它
 */

function getOSType() {
    var u = navigator.userAgent,
        app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isIOS) {
        return 0;
    }
    if (isAndroid) {
        return 1;
    }
    return 2;
}

/**
 * @desc 函數防抖
 * @param { function } func
 * @param { number } wait 延遲執行毫秒數
 * @param { boolean } immediate  true 表立即執行，false 表非立即執行
 */

function debounce(func, wait, immediate) {
    var timeout = undefined;
    return function() {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(function() {
                timeout = null;
            }, wait);
            if (callNow) func.apply(context, args);
        } else {
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        }
    };
}

/**
 * @desc 函數節流
 * @param { function } func 函數
 * @param { number } wait 延遲執行毫秒數
 * @param { number } type 1 表時間戳版，2 表定時器版
 */

function throttle(func, wait, type) {
    var previous = undefined,
        timeout = undefined;
    if (type === 1) {
        previous = 0;
    } else if (type === 2) {
        timeout = null;
    }
    return function() {
        var context = this;
        var args = arguments;
        if (type === 1) {
            var now = Date.now();

            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        } else if (type === 2) {
            if (!timeout) {
                timeout = setTimeout(function() {
                    timeout = null;
                    func.apply(context, args);
                }, wait);
            }
        }
    };
}

/**
 * 判斷類型
 * @param {*} target 
 */

function type(target) {
    var ret = typeof target;
    var template = {
        "[object Array]": "array",
        "[object Object]": "object",
        "[object Number]": "number - object",
        "[object Boolean]": "boolean - object",
        "[object String]": 'string-object'
    };

    if (target === null) {
        return 'null';
    } else if (ret == "object") {
        var _str = Object.prototype.toString.call(target);
        return template[_str];
    } else {
        return ret;
    }
}

/**
 * 生成指定範圍隨機數
 * @param { number } min 
 * @param { number } max 
 */
var RandomNum = function RandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.RandomNum = RandomNum;
/**
 * 數組亂序
 * @param {array} arr
 */

function arrScrambling(arr) {
    var array = arr;
    var index = array.length;
    while (index) {
        index -= 1;
        var randomIndex = Math.floor(Math.random() * index);
        var middleware = array[index];
        array[index] = array[randomIndex];
        array[randomIndex] = middleware;
    }
    return array;
}

/**
 * 數組交集
 * @param { array} arr1
 * @param { array } arr2
 */
var similarity = function similarity(arr1, arr2) {
    return arr1.filter(function(v) {
        return arr2.includes(v);
    });
};

exports.similarity = similarity;
/**
 * 數組中某元素出現的次數
 * @param { array } arr
 * @param {*} value
 */

function countOccurrences(arr, value) {
    return arr.reduce(function(a, v) {
        return v === value ? a + 1 : a + 0;
    }, 0);
}

/**
 * 加法函數（精度丟失問題）
 * @param { number } arg1
 * @param { number } arg2
 */

function add(arg1, arg2) {
    var r1 = undefined,
        r2 = undefined,
        m = undefined;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}

/**
 * 減法函數（精度丟失問題）
 * @param { number } arg1
 * @param { number } arg2
 */

function sub(arg1, arg2) {
    var r1 = undefined,
        r2 = undefined,
        m = undefined,
        n = undefined;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = r1 >= r2 ? r1 : r2;
    return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
}

/**
 * 除法函數（精度丟失問題）
 * @param { number } num1
 * @param { number } num2
 */

function division(num1, num2) {
    var t1 = undefined,
        t2 = undefined,
        r1 = undefined,
        r2 = undefined;
    try {
        t1 = num1.toString().split('.')[1].length;
    } catch (e) {
        t1 = 0;
    }
    try {
        t2 = num2.toString().split(".")[1].length;
    } catch (e) {
        t2 = 0;
    }
    r1 = Number(num1.toString().replace(".", ""));
    r2 = Number(num2.toString().replace(".", ""));
    return r1 / r2 * Math.pow(10, t2 - t1);
}

/**
 * 乘法函數（精度丟失問題）
 * @param { number } num1
 * @param { number } num2
 */

function mcl(num1, num2) {
    var m = 0,
        s1 = num1.toString(),
        s2 = num2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {}
    try {
        m += s2.split(".")[1].length;
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

/**
 * 遞歸優化（尾遞歸）
 * @param { function } f
 */

function tco(f) {
    var value = undefined;
    var active = false;
    var accumulated = [];

    return function accumulator() {
        accumulated.push(arguments);
        if (!active) {
            active = true;
            while (accumulated.length) {
                value = f.apply(this, accumulated.shift());
            }
            active = false;
            return value;
        }
    };
}

/**
 *  生成隨機整數
 *
 */

function randomNumInteger(min, max) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * min + 1, 10);
        case 2:
            return parseInt(Math.random() * (max - min + 1) + min, 10);
        default:
            return 0;
    }
}

/**
 * 去除空格
 * @param { string } str 待處理字符串
 * @param  { number } type 去除空格類型 1-所有空格  2-前後空格  3-前空格 4-後空格 默認為1
 */

function trim(str) {
    var type = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

    if (type && type !== 1 && type !== 2 && type !== 3 && type !== 4) return;
    switch (type) {
        case 1:
            return str.replace(/\s/g, "");
        case 2:
            return str.replace(/(^\s)|(\s*$)/g, "");
        case 3:
            return str.replace(/(^\s)/g, "");
        case 4:
            return str.replace(/(\s$)/g, "");
        default:
            return str;
    }
}

/**
 * 大小寫轉換
 * @param { string } str 待轉換的字符串
 * @param { number } type 1-全大寫 2-全小寫 3-首字母大寫 其他-不轉換
 */

function turnCase(str, type) {
    switch (type) {
        case 1:
            return str.toUpperCase();
        case 2:
            return str.toLowerCase();
        case 3:
            return str[0].toUpperCase() + str.substr(1).toLowerCase();
        default:
            return str;
    }
}

/**
 * 隨機16進制顏色 hexColor
 * 方法一
 */

function hexColor() {

    var str = '#';
    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    for (var i = 0; i < 6; i++) {
        var index = Number.parseInt((Math.random() * 16).toString());
        str += arr[index];
    }
    return str;
}

/**
 * 隨機16進制顏色 randomHexColorCode
 * 方法二
 */
var randomHexColorCode = function randomHexColorCode() {
    var n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
};

exports.randomHexColorCode = randomHexColorCode;
/**
 * 轉義html(防XSS攻擊)
 */
var escapeHTML = function escapeHTML(str) {
    str.replace(/[&<>'"]/g, function(tag) {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        })[tag] || tag;
    });
};

exports.escapeHTML = escapeHTML;
/**
 * 檢測移動/PC設備
 */
var detectDeviceType = function detectDeviceType() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop');
};

exports.detectDeviceType = detectDeviceType;
/**
 * 隱藏所有指定標籤
 * 例: hide(doc.querySelectorAll('img'))
 */
var hideTag = function hideTag() {
    for (var _len = arguments.length, el = Array(_len), _key = 0; _key < _len; _key++) {
        el[_key] = arguments[_key];
    }

    return [].concat(el).forEach(function(e) {
        return e.style.display = 'none';
    });
};

exports.hideTag = hideTag;
/**
 * 返回指定元素的生效樣式
 * @param { element} el  元素節點
 * @param { string } ruleName  指定元素的名稱
 */
var getStyle = function getStyle(el, ruleName) {
    return getComputedStyle(el)[ruleName];
};

exports.getStyle = getStyle;
/**
 * 檢查是否包含子元素
 * @param { element } parent
 * @param { element } child
 * 例：elementContains(doc.querySelector('head'), doc.querySelector('title')); // true
 */
var elementContains = function elementContains(parent, child) {
    return parent !== child && parent.contains(child);
};

exports.elementContains = elementContains;
/**
 * 數字超過規定大小加上加號“+”，如數字超過99顯示99+
 * @param { number } val 輸入的數字
 * @param { number } maxNum 數字規定界限
 */
var outOfNum = function outOfNum(val, maxNum) {
    val = val ? val - 0 : 0;
    if (val > maxNum) {
        return maxNum + "+";
    } else {
        return val;
    }
};

exports.outOfNum = outOfNum;
/**
 * 計算多個數字或者數組中數字的總和
 * @param { number / array } arr 輸入的數字
 *
 */

var sumNum = function sumNum() {
    for (var _len2 = arguments.length, arr = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        arr[_key2] = arguments[_key2];
    }

    return [].concat(arr).reduce(function(acc, val) {
        return acc + val;
    }, 0);
};

exports.sumNum = sumNum;
/**
 * 將阿拉伯數字翻譯成中文的大寫數字
 * @param { number } num 
 */

function numberToChinese(num) {
    var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
    var BB = new Array("", "十", "百", "仟", "萬", "億", "點", "");
    var a = ("" + num).replace(/(^0*)/g, "").split("."),
        k = 0,
        re = "";
    for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$").test(a[0])) re = BB[4] + re;
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
        if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    }

    if (a.length > 1) // 加上小數部分(如果有小數部分)
    {
        re += BB[6];
        for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
    }
    if (re == '一十') re = "十";
    if (re.match(/^一/) && re.length == 3) re = re.replace("一", "");
    return re;
}

/**
 * 將數字轉換為大寫金額
 * @param { number } Num 
 */

function changeToChinese(Num) {
    //判斷如果傳遞進來的不是字符的話轉換為字符
    if (typeof Num == "number") {
        Num = new String(Num);
    };
    Num = Num.replace(/,/g, ""); //替換tomoney()中的“,”
    Num = Num.replace(/ /g, ""); //替換tomoney()中的空格
    Num = Num.replace(/￥/g, ""); //替換掉可能出現的￥字符
    if (isNaN(Num)) {
        //驗證輸入的字符是否為數字
        //alert("請檢查小寫金額是否正確");
        return "";
    };
    //字符處理完畢後開始轉換，採用前後兩部分分別轉換
    var part = String(Num).split(".");
    var newchar = "";
    //小數點前進行轉化
    for (var i = part[0].length - 1; i >= 0; i--) {
        if (part[0].length > 10) {
            return "";
            //若數量超過拾億單位，提示
        }
        var tmpnewchar = "";
        var perchar = part[0].charAt(i);
        switch (perchar) {
            case "0":
                tmpnewchar = "零" + tmpnewchar;
                break;
            case "1":
                tmpnewchar = "壹" + tmpnewchar;
                break;
            case "2":
                tmpnewchar = "貳" + tmpnewchar;
                break;
            case "3":
                tmpnewchar = "叄" + tmpnewchar;
                break;
            case "4":
                tmpnewchar = "肆" + tmpnewchar;
                break;
            case "5":
                tmpnewchar = "伍" + tmpnewchar;
                break;
            case "6":
                tmpnewchar = "陸" + tmpnewchar;
                break;
            case "7":
                tmpnewchar = "柒" + tmpnewchar;
                break;
            case "8":
                tmpnewchar = "捌" + tmpnewchar;
                break;
            case "9":
                tmpnewchar = "玖" + tmpnewchar;
                break;
        }
        switch (part[0].length - i - 1) {
            case 0:
                tmpnewchar = tmpnewchar + "元";
                break;
            case 1:
                if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
                break;
            case 2:
                if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
                break;
            case 3:
                if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
                break;
            case 4:
                tmpnewchar = tmpnewchar + "萬";
                break;
            case 5:
                if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
                break;
            case 6:
                if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
                break;
            case 7:
                if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
                break;
            case 8:
                tmpnewchar = tmpnewchar + "億";
                break;
            case 9:
                tmpnewchar = tmpnewchar + "拾";
                break;
        }
        var newchar = tmpnewchar + newchar;
    }
    //小數點之後進行轉化
    if (Num.indexOf(".") != -1) {
        if (part[1].length > 2) {
            // alert("小數點之後只能保留兩位,系統將自動截斷");
            part[1] = part[1].substr(0, 2);
        }
        for (i = 0; i < part[1].length; i++) {
            tmpnewchar = "";
            perchar = part[1].charAt(i);
            switch (perchar) {
                case "0":
                    tmpnewchar = "零" + tmpnewchar;
                    break;
                case "1":
                    tmpnewchar = "壹" + tmpnewchar;
                    break;
                case "2":
                    tmpnewchar = "貳" + tmpnewchar;
                    break;
                case "3":
                    tmpnewchar = "叄" + tmpnewchar;
                    break;
                case "4":
                    tmpnewchar = "肆" + tmpnewchar;
                    break;
                case "5":
                    tmpnewchar = "伍" + tmpnewchar;
                    break;
                case "6":
                    tmpnewchar = "陸" + tmpnewchar;
                    break;
                case "7":
                    tmpnewchar = "柒" + tmpnewchar;
                    break;
                case "8":
                    tmpnewchar = "捌" + tmpnewchar;
                    break;
                case "9":
                    tmpnewchar = "玖" + tmpnewchar;
                    break;
            }
            if (i == 0) tmpnewchar = tmpnewchar + "角";
            if (i == 1) tmpnewchar = tmpnewchar + "分";
            newchar = newchar + tmpnewchar;
        }
    }
    //替換所有無用漢字
    while (newchar.search("零零") != -1) newchar = newchar.replace("零零", "零");
    newchar = newchar.replace("零億", "億");
    newchar = newchar.replace("億萬", "億");
    newchar = newchar.replace("零萬", "萬");
    newchar = newchar.replace("零元", "元");
    newchar = newchar.replace("零角", "");
    newchar = newchar.replace("零分", "");
    if (newchar.charAt(newchar.length - 1) == "元") {
        newchar = newchar + "整";
    }
    return newchar;
}

/**
 * 根據數組中的某一屬性的值（數字）進行升序或降序排序
 * @param { string } property  排序所依賴的屬性
 * @param { string } flag  "asc"：升序  "desc": 降序
 * 調用方式：arr.sort(sortCompare('age','asc')); 
 * 這裡的 arr 為準備排序的數組
 */
function sortCompare(property, flag) {
    return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        if (flag === "asc") {
            return value1 - value2;
        } else if (flag === "desc") {
            return value2 - value1;
        }
    };
}

/**
 * 查找兩個數組中的相同元素
 * @param { array } arr1
 * @param { array } arr2
 */
var filterSame = function filterSame(arr1, arr2) {
    if (arr1 && arr1.length > 0) {
        return arr1.filter(function(item) {
            return arr2.indexOf(item) !== -1;
        });
    } else {
        return [];
    }
};

exports.filterSame = filterSame;
/**
 * 查找兩個數組中的不同元素
 * @param { array } arr1
 * @param { array } arr2
 */
var filterDiff = function filterDiff(arr1, arr2) {
    if (arr1 && arr1.length > 0) {
        return arr1.filter(function(item) {
            return arr2.indexOf(item) === -1;
        });
    } else {
        return [];
    }
};

exports.filterDiff = filterDiff;
/**
 * 判斷數組中是否有重複元素
 * @param { Array } arr
 */
var isRepeat = function isRepeat(arr) {
    var hash = undefined;
    for (var i = 0; i < arr.length; i++) {
        if (hash[arr[i]]) {
            return true;
        }
        hash[arr[i]] = true;
    }
    return false;
};

exports.isRepeat = isRepeat;
/**
 * 獲取對象中值不為空的元素
 * @param { obj } value
 */
var getNotNullItem = function getNotNullItem(value) {
    var obj = undefined;
    for (var i in value) {
        if (value[i]) {
            obj[i] = value[i];
        }
    }
    return obj;
};

exports.getNotNullItem = getNotNullItem;
/**
 * 取出字符串中括號"{{}}"內的內容
 * 他類型的括號同理修改正則/\{\{(.*?)\}\}/g，如需取 "()"中的值，則可以這樣：/\((.*?)\)/g
 * @param {string} text
 * @returns {Array}
 */
var getBracketStr = function getBracketStr(text) {
    var result = [];
    if (text === '') {
        return result;
    }
    var options = str.match(/\{\{(.*?)\}\}/g);
    if (options) {
        options.forEach(function(item) {
            var res = item.replace(/\{/gi, '').replace(/\}/gi, '');
            if (res) {
                result.push(res);
            }
        });
    }
    return result;
};
exports.getBracketStr = getBracketStr;