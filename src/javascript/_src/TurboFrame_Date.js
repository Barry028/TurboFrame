// "use strict";

// Object.defineProperty(exports, "__esModule", {
//     value: true
// });
// exports.toNextTimes = toNextTimes;
// exports.showWeekFirstDay = showWeekFirstDay;
// exports.showWeekLastDay = showWeekLastDay;
// exports.showMonthFirstDay = showMonthFirstDay;
// exports.showMonthLastDay = showMonthLastDay;
// exports.timeToTimestamp = timeToTimestamp;
// exports.getdataTimeSec = getdataTimeSec;
// exports.check = check;
// exports.getTimeInterval = getTimeInterval;
// exports.getFormatDate = getFormatDate;
// exports.leapYear = leapYear;
// exports.leapYears = leapYears;
// exports.isTime = isTime;
// exports.strDateTime = strDateTime;
// exports.strDateTime = strDateTime;
// exports.compareDate = compareDate;
// exports.isToday = isToday;
// exports.isYesterday = isYesterday;
// exports.convertDate = convertDate;
// /**
//  *  此js文件主要包含日期方面的工具函數
//  */

// /**
//  * 獲取當前時間的n天后的時間戳
//  * @param {number} n 天數
//  * @returns {Number} 返回值為時間毫秒值
//  */
// function toNextTimes(n) {
//     var timestamp = +new Date() + n * 86400000;
//     return timestamp;
// }

// /***
//  * 本週第一天
//  *  @return {*} WeekFirstDay 返回本週第一天的時間
//  */
// function showWeekFirstDay() {
//     var Nowdate = new Date();
//     var WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
//     return WeekFirstDay;
// }

// /***
//  * 本週最後一天
//  *  @return {*} WeekLastDay 返回本週最後一天的時間
//  */
// function showWeekLastDay() {
//     var Nowdate = new Date();
//     var WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
//     var WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
//     return WeekLastDay;
// }

// /***
//  * 本月第一天
//  *  @return {*} MonthFirstDay 返回本月第一天的時間
//  */
// function showMonthFirstDay() {
//     var Nowdate = new Date();
//     var MonthFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth());
//     return MonthFirstDay;
// }

// /***
//  * 本月最後一天
//  *  @return {*} MonthLastDay 返回本月最後一天的時間
//  */
// function showMonthLastDay() {
//     var Nowdate = new Date();
//     var MonthNextFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth() + 1);
//     var MonthLastDay = new Date(MonthNextFirstDay - 86400000);
//     return MonthLastDay;
// }

// /**
//  * 日期轉時間戳
//  * @param {String} time - 日期字符串，如'2018-8-8','2018,8,8','2018/8/8'
//  * @returns {Number} 返回值為時間毫秒值
//  */
// function timeToTimestamp(time) {
//     var date = new Date(time);
//     var timestamp = date.getTime();
//     return timestamp;
// }

// /***
//  * 格式化當前時間
//  *  @return {string} timeText 返回系統時間字符串
//  */
// function getdataTimeSec() {
//     var time = new Date();
//     var weekDay = void 0;
//     var year = time.getFullYear();
//     var month = time.getMonth() + 1;
//     var day = time.getDate();
//     //獲取時分秒
//     var h = time.getHours();
//     var m = time.getMinutes();
//     var s = time.getSeconds();
//     //檢查是否小於10
//     h = check(h);
//     m = check(m);
//     s = check(s);
//     var now_day = time.getDay();
//     switch (now_day) {
//         case 0:
//             {
//                 weekDay = "星期日";
//             }
//             break;
//         case 1:
//             {
//                 weekDay = "星期一";
//             }
//             break;
//         case 2:
//             {
//                 weekDay = "星期二";
//             }
//             break;
//         case 3:
//             {
//                 weekDay = "星期三";
//             }
//             break;
//         case 4:
//             {
//                 weekDay = "星期四";
//             }
//             break;
//         case 5:
//             {
//                 weekDay = "星期五";
//             }
//             break;
//         case 6:
//             {
//                 weekDay = "星期六";
//             }
//             break;
//         case 7:
//             {
//                 weekDay = "星期日";
//             }
//             break;
//     }
//     var timeText = year + "年" + month + "月" + day + "日  " + " " + weekDay + " " + h + ":" + m + ":" + s;

//     return timeText;
// }

// /**
//  *  日期數字小於10，補“0”
//  */
// function check(i) {
//     var num = void 0;
//     i < 10 ? num = "0" + i : num = i;
//     return num;
// }

// /**
//  * 返回指定時間戳之間的時間間隔
//  *  @param {*} startTime 開始時間的時間戳
//  *  @param {*} endTime 結束時間的時間戳
//  *  @return {string} str 返回時間字符串
//  */
// function getTimeInterval(startTime, endTime) {
//     var runTime = parseInt((endTime - startTime) / 1000);
//     var year = Math.floor(runTime / 86400 / 365);
//     runTime = runTime % (86400 * 365);
//     var month = Math.floor(runTime / 86400 / 30);
//     runTime = runTime % (86400 * 30);
//     var day = Math.floor(runTime / 86400);
//     runTime = runTime % 86400;
//     var hour = Math.floor(runTime / 3600);
//     runTime = runTime % 3600;
//     var minute = Math.floor(runTime / 60);
//     runTime = runTime % 60;
//     var second = runTime;
//     var str = '';
//     if (year > 0) {
//         str = year + '年';
//     }
//     if (year <= 0 && month > 0) {
//         str = month + '月';
//     }
//     if (year <= 0 && month <= 0 && day > 0) {
//         str = day + '天';
//     }
//     if (year <= 0 && month <= 0 && day <= 0 && hour > 0) {
//         str = hour + '小時';
//     }
//     if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute > 0) {
//         str = minute + '分鐘';
//     }
//     if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute <= 0 && second > 0) {
//         str += second + '秒';
//     }
//     str += '前';
//     return str;
// }

// /**
//  * 按類型格式化日期
//  * @param {*} date 具體日期變量
//  * @param {string} dateType 需要返回類型
//  * @return {string} dateText 返回為指定格式的日期字符串
//  */
// function getFormatDate(date, dateType) {
//     var dateObj = new Date(date);
//     var month = dateObj.getMonth() + 1;
//     var strDate = dateObj.getDate();
//     var hours = dateObj.getHours();
//     var minutes = dateObj.getMinutes();
//     var seconds = dateObj.getSeconds();
//     if (month >= 1 && month <= 9) {
//         month = "0" + month;
//     }
//     if (strDate >= 0 && strDate <= 9) {
//         strDate = "0" + strDate;
//     }
//     if (hours >= 0 && hours <= 9) {
//         hours = "0" + hours;
//     }
//     if (minutes >= 0 && minutes <= 9) {
//         minutes = "0" + minutes;
//     }
//     if (seconds >= 0 && seconds <= 9) {
//         seconds = "0" + seconds;
//     }

//     var dateText = dateObj.getFullYear() + '年' + (dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日';
//     if (dateType == "yyyy-mm-dd") {
//         dateText = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate();
//     }
//     if (dateType == "yyyy.mm.dd") {
//         dateText = dateObj.getFullYear() + '.' + (dateObj.getMonth() + 1) + '.' + dateObj.getDate();
//     }
//     if (dateType == "yyyy-mm-dd MM:mm:ss") {
//         dateText = dateObj.getFullYear() + '-' + month + '-' + strDate + ' ' + hours + ":" + minutes + ":" + seconds;
//     }
//     if (dateType == "mm-dd MM:mm:ss") {
//         dateText = month + '-' + strDate + ' ' + hours + ":" + minutes + ":" + seconds;
//     }
//     if (dateType == "yyyy年mm月dd日 MM:mm:ss") {
//         dateText = dateObj.getFullYear() + '年' + month + '月' + strDate + '日' + ' ' + hours + ":" + minutes + ":" + seconds;
//     }
//     return dateText;
// }

// /**
//  * 判斷是否為閏年
//  * @param  {number} year 要判斷的年份
//  * @return {boolean} 返回布爾值
//  */
// function leapYear(year) {
//     return !(year % (year % 100 ? 4 : 400));
// }

// /** 
//  * 返回兩個年份之間的閏年
//  * @param  {number} start 開始年份
//  * @param  {number} end 結束年份
//  * @return {array}  arr 返回符合閏年的數組
//  */
// function leapYears(start, end) {
//     var arr = [];
//     for (var i = start; i < end; i++) {
//         if (leapYear(i)) {
//             arr.push(i);
//         }
//     }
//     return arr;
// }

// /**
//  * 判斷時間格式是否有效
//  * 短時間，如 (10:24:06)
//  * @param  {string} str 需要驗證的短時間
//  * @return {boolean} 返回布爾值
//  */
// function isTime(str) {
//     var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
//     if (a == null) {
//         return false;
//     }
//     if (a[1] >= 24 || a[3] >= 60 || a[4] >= 60) {
//         return false;
//     }
//     return true;
// }

// /**
//  * 短日期，形如 (2019-10-24)
//  * @param  {string} str 需要驗證的短時間
//  * @return {boolean} 返回布爾值
//  */
// function strDateTime(str) {
//     var result = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
//     if (result == null) return false;
//     var d = new Date(result[1], result[3] - 1, result[4]);
//     return d.getFullYear() == result[1] && d.getMonth() + 1 == result[3] && d.getDate() == result[4];
// }

// /**
//  * 長日期時間，形如 (2019-10-24 10:24:06)
//  * @param  {string} str 需要驗證的短時間
//  * @return {boolean} 返回布爾值
//  */
// function strDateTime(str) {
//     var result = str.match(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
//     if (result == null) return false;
//     var d = new Date(result[1], result[3] - 1, result[4], result[5], result[6], result[7]);
//     return d.getFullYear() == result[1] && d.getMonth() + 1 == result[3] && d.getDate() == result[4] && d.getHours() == result[5] && d.getMinutes() == result[6] && d.getSeconds() == result[7];
// }

// /**
//  * 驗證日期大小
//  * 例："2019-10-24" 和 "2019-10-25"
//  * @param  {string} d1需要驗證的日期1
//  * @param  {string} d2需要驗證的日期2
//  * @return {boolean} 返回布爾值
//  */
// function compareDate(d1, d2) {
//     return new Date(d1.replace(/-/g, "\/")) < new Date(d2.replace(/-/g, "\/"));
// }

// /** 
//  * 驗證一個日期是不是今天
//  * @param  {string} val 需要驗證的日期
//  * @return {boolean} 返回布爾值
//  */
// function isToday(val) {
//     return new Date().toLocaleDateString() == new Date(val).toLocaleDateString();
// }

// /**
//  * 驗證傳入的日期是否是昨天
//  * @param  {string} val 需要驗證的日期
//  * @return {boolean} 返回布爾值
//  */
// function isYesterday(val) {
//     var today = new Date();
//     var yesterday = new Date(now - 1000 * 60 * 60 * 24);
//     var test = new Date(val);
//     if (yesterday.getYear() === test.getYear() && yesterday.getMonth() === test.getMonth() && yesterday.getDate() === test.getDate()) {
//         return true;
//     } else {
//         return false;
//     }
// }

// /**
//  * 設置幾天後的日期
//  * @param  {string} date 起始日期
//  * @param  {number} day 向後的天數
//  * @return {string} 返回想要得到的日期
//  */
// function convertDate(date, day) {
//     var tempDate = new Date(date);
//     tempDate.setDate(tempDate.getDate() + day);
//     var Y = tempDate.getFullYear();
//     var M = tempDate.getMonth() + 1 < 10 ? '0' + (tempDate.getMonth() + 1) : tempDate.getMonth() + 1;
//     var D = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
//     var result = Y + "-" + M + "-" + D;
//     return result;
// }