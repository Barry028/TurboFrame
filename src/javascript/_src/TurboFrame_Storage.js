/**
 * 主要為存儲方面的工具函數
 * 感謝主要來源作者： 火狼1-掘金（https://juejin.im/post/5de5be53f265da05c33fcbb4）
 */

/**
 * localStorage 存貯
 * 目前對象值如果是函數 、RegExp等特殊對象存貯會被忽略
 * @param { String } key  屬性
 * @param { string } value 值
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var localStorageSet = function localStorageSet(key, value) {
    if (typeof value === 'object') value = JSON.stringify(value);
    localStorage.setItem(key, value);
};

exports.localStorageSet = localStorageSet;
/**
 * localStorage 獲取
 * @param {String} key  屬性
 */
var localStorageGet = function localStorageGet(key) {
    return localStorage.getItem(key);
};

exports.localStorageGet = localStorageGet;
/**
 * localStorage 移除
 * @param {String} key  屬性
 */
var localStorageRemove = function localStorageRemove(key) {
    localStorage.removeItem(key);
};

exports.localStorageRemove = localStorageRemove;
/**
 * localStorage 存貯某一段時間失效
 * @param {String} key  屬性
 * @param {*} value 存貯值
 * @param { number } expire 過期時間,毫秒數
 */
var localStorageSetExpire = function localStorageSetExpire(key, value, expire) {
    if (typeof value === 'object') value = JSON.stringify(value);
    localStorage.setItem(key, value);
    setTimeout(function() {
        localStorage.removeItem(key);
    }, expire);
};

exports.localStorageSetExpire = localStorageSetExpire;
/**
 * sessionStorage 存貯
 * @param {String} key  屬性
 * @param {*} value 值
 */
var sessionStorageSet = function sessionStorageSet(key, value) {
    if (typeof value === 'object') value = JSON.stringify(value);
    sessionStorage.setItem(key, value);
};

exports.sessionStorageSet = sessionStorageSet;
/**
 * sessionStorage 獲取
 * @param {String} key  屬性
 */
var sessionStorageGet = function sessionStorageGet(key) {
    return sessionStorage.getItem(key);
};

exports.sessionStorageGet = sessionStorageGet;
/**
 * sessionStorage 刪除
 * @param {String} key  屬性
 */
var sessionStorageRemove = function sessionStorageRemove(key) {
    sessionStorage.removeItem(key);
};

exports.sessionStorageRemove = sessionStorageRemove;
/**
 * sessionStorage 存貯某一段時間失效
 * @param {String} key  屬性
 * @param {*} value 存貯值
 * @param {String} expire 過期時間,毫秒數
 */
var sessionStorageSetExpire = function sessionStorageSetExpire(key, value, expire) {
    if (typeof value === 'object') value = JSON.stringify(value);
    sessionStorage.setItem(key, value);
    setTimeout(function() {
        sessionStorage.removeItem(key);
    }, expire);
};

exports.sessionStorageSetExpire = sessionStorageSetExpire;
/**
 * cookie 存貯
 * @param {String} key  屬性
 * @param {*} value  值
 * @param { String } expire  過期時間,單位天
 */
var cookieSet = function cookieSet(key, value, expire) {
    var d = new Date();
    d.setDate(d.getDate() + expire);
    doc.cookie = key + '=' + value + ';expires=' + d.toUTCString();
};

exports.cookieSet = cookieSet;
/**
 * cookie 獲取
 * @param {String} key  屬性
 */
var cookieGet = function cookieGet(key) {
    var cookieStr = unescape(doc.cookie);
    var arr = cookieStr.split('; ');
    var cookieValue = '';
    for (var i = 0; i < arr.length; i++) {
        var temp = arr[i].split('=');
        if (temp[0] === key) {
            cookieValue = temp[1];
            break;
        }
    }
    return cookieValue;
};

exports.cookieGet = cookieGet;
/**
 * cookie 刪除
 * @param {String} key  屬性
 */
var cookieRemove = function cookieRemove(key) {
    doc.cookie = encodeURIComponent(key) + '=;expires=' + new Date();
};
exports.cookieRemove = cookieRemove;