var snack = function snack(value) {
  return /(?:[\*\w\-\\.#]+)+(?:\[(?:[\w\-_][^=]+)=(?:[\'\[\]\w\-_]+)\])*|\*|>/gi
};



var exprClassName = function exprClassName(value) {
  return /^(?:[\w\-_]+)?\.([\w\-_]+)/
};


var exprId = function exprId(value) {
  return /^(?:[\w\-_]+)?#([\w\-_]+)/
};


var exprNodeName = function exprNodeName(value) {
  return /^([\w\*\-_]+)/
};



// // 身分證
// function IdentityVerifyId(nums) {
//     nums = nums.trim();
//     verification = nums.match("^[A-Z][12]\\d{8}$")
//     if (!verification) {
//         return false
//     }

//     let conver = "ABCDEFGHJKLMNPQRSTUVXYWZIO"
//     let weights = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1]

//     nums = String(conver.indexOf(nums[0]) + 10) + nums.slice(1);

//     checkSum = 0
//     for (let i = 0; i < nums.length; i++) {
//         c = parseInt(nums[i])
//         w = weights[i]
//         checkSum += c * w
//     }

//     return checkSum % 10 == 0
// }

// console.log(IdentityVerifyId("A123456789"));
// // 居留證驗證號
// function ResidencyVerifyId(nums) {
//     nums = nums.trim();

//     verification = nums.match("^[A-Z][ABCD]\\d{8}$")
//     if (!verification) {
//         return false
//     }

//     let conver = "ABCDEFGHJKLMNPQRSTUVXYWZIO"
//     let weights = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1]

//     nums = String(conver.indexOf(nums[0]) + 10) + String((conver.indexOf(nums[1]) + 10) % 10) + nums.slice(2);

//     checkSum = 0
//     for (let i = 0; i < nums.length; i++) {
//         c = parseInt(nums[i])
//         w = weights[i]
//         checkSum += c * w
//     }

//     return checkSum % 10 == 0
// }

// console.log(ResidencyVerifyId("FA12345689"));

// function CreditVerifyId(nums) {
//     nums = nums.replace(/-/g, "").trim();
//     let len = nums.length;

//     if (len < 12 || len > 19) {
//         return false;
//     }

//     let revId = nums.split("").reverse();
//     let checkSum = revId.reduce(function(prev, curr, idx) {
//         curr = parseInt(curr);
//         let w = (idx + 1) % 2 == 0 ? 2 : 1;
//         let res = curr * w
//         if (res >= 10) {
//             res = parseInt(res / 10) + res % 10;
//         }
//         return prev + res;
//     }, 0);
//     return checkSum % 10 == 0
// }

// console.log(CreditVerifyId("4311-4656-0640-6131"));

// // 台灣手機驗證
// let regex = new RegExp(/^09[0-9]{8}$/)
//     // 自然人憑證編號驗證
// let regex = new RegExp( ^ [A - Z] {
//             2
//         }[0 - 9] {
//             14
//         }
//         $)
//     // 電子發票手機條碼驗證
// let regex = new RegExp("^/[\dA-Z0-9+-\.]{7}$")



// // // 匹配正整數
// //  isPositiveNum: function(val) {
// //    return /^[1-9]d*$/.test(val);
// //  },

// //  // 匹配負整數
// //  isNegativeNum: function(val) {
// //    return /^-[1-9]d*$/.test(val);
// //  },

// //  // 匹配整數
// //  isInteger(val) {
// //    return /^(-|\+)?\d+$/.test(val);
// //  },

// //  // 匹配非負浮點數
// //  isNotNegativeFloatNum: function(val) {
// //    return /^\d+(\.\d+)?$/.test(val);
// //  },



// //  // 匹配特定字符串：
// //  //匹配由 26 個英文字母組成的字符串
// //  isAZaz: function(val) {
// //    return /^[A-Za-z]+$/.test(val);
// //  },

// //  //匹配由 26 個英文字母的大寫組成的字符串
// //  isAZ: function(val) {
// //    return /^[A-Z]+$/.test(val);
// //  },

// //  isaz: function(val) {
// //    return /^[a-z]+$/.test(val);
// //  },
// //  // 後代選擇 Css
// //  iscss: function(val) {
// //    return /^(?:([\w-#\.]+)([\s]?)([\w-#\.\s>]*))$/.test(val);
// //  },

// //  // 匹配電子郵件地址
// //  isEmailAddress(val) {
// //    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(val) || /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(val);
// //  },

// /**
//  * 驗證必須帶端口號的網址(或ip)
//  * @param { string } value
//  */
// var isHttpAndPort = function isHttpAndPort(value) {
//     return (/^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/g.test(value));
// };



// exports.isGrade = isGrade;
// /**
//  *  驗證html注釋
//  *  @param { string } value
//  */
// var isHtmlComments = function isHtmlComments(value) {
//     return (/^<!--[\s\S]*?-->$/g.test(value));
// };



// exports.isVideoUrl = isVideoUrl;
// /**
//  *  驗證圖片鏈接地址（圖片格式可按需增刪）
//  *  @param { string } value
//  */
// var isImageUrl = function isImageUrl(value) {
//     return (/^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i.test(value));
// };

// exports.isImageUrl = isImageUrl;
// /**
//  *  驗證24小時制時間（HH:mm:ss）
//  *  @param { string } value
//  */
// var is24Hour = function is24Hour(value) {
//     return (/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/g.test(value));
// };

// exports.is24Hour = is24Hour;
// /**
//  *  驗證12小時制時間（hh:mm:ss）
//  *  @param { string } value
//  */
// var is12Hour = function is12Hour(value) {
//     return (/^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/g.test(value));
// };

// exports.is12Hour = is12Hour;
// /**
//  * 驗證base64格式
//  * @param { string } value
//  */
// var isBase64 = function isBase64(value) {
//     return (/^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i.test(value));
// };

// exports.isBase64 = isBase64;
// /**
//  *  驗證數字/貨幣金額（支持負數、千分位分隔符）
//  * @param { string } value
//  */
// var isMoneyAll = function isMoneyAll(value) {
//     return (/^-?\d+(,\d{3})*(\.\d{1,2})?$/g.test(value));
// };

// exports.isMoneyAll = isMoneyAll;
// /**
//  *  驗證數字/貨幣金額 (只支持正數、不支持校驗千分位分隔符)
//  * @param { string } value
//  */
// var isMoney = function isMoney(value) {
//     return (/(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0){1}$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/g.test(value));
// };

// exports.isMoney = isMoney;
// /**
//  *  驗證銀行卡號（10到30位, 覆蓋對公/私賬戶, 參考微信支付）
//  * @param { string } value
//  */
// var isAccountNumber = function isAccountNumber(value) {

// };

// exports.isAccountNumber = isAccountNumber;
// /**
//  *  驗證中文姓名
//  * @param { string } value
//  */
// var isChineseName = function isChineseName(value) {
//     return (/^(?:[\u4e00-\u9fa5·]{2,16})$/g.test(value));
// };

// exports.isChineseName = isChineseName;
// /**
//  *  驗證英文姓名
//  * @param { string } value
//  */
// var isEnglishName = function isEnglishName(value) {
//     return (/(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/g.test(value));
// };


// /**
//  * 驗證日期
//  * @param { string } value
//  */
// var isDate = function isDate(value) {
//     return (/^\d{4}(-)(1[0-2]|0?\d)\1([0-2]\d|\d|30|31)$/g.test(value));
// };

// exports.isDate = isDate;
// *
//  *  驗證email(郵箱)
//  * @param { string } value

// var isEmail = function isEmail(value) {
//     return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(value));
// };

// exports.isEmail = isEmail;
// /**
//  *  驗證座機電話(國內),如: 0341-86091234
//  * @param { string } value
//  */
// var isLandlineTelephone = function isLandlineTelephone(value) {
//     return (/^\d{2}-\d{8}$|^\d{3}-\d{7}$/g.test(value));
// };

// /**
//  *  驗證護照（包含香港、澳門）
//  * @param { string } value
//  */
// var isPassport = function isPassport(value) {

// };

// exports.isPassport = isPassport;
// /**
//  *  驗證帳號是否合法(字母開頭，允許5-16字節，允許字母數字下劃線組合
//  * @param { string } value
//  */
// var isWebAccount = function isWebAccount(value) {
//     return (/^[a-zA-Z]\w{4,15}$/g.test(value));
// };

// exports.isWebAccount = isWebAccount;
// /**
//  *  驗證中文/漢字
//  * @param { string } value
//  */
// var isChineseCharacter = function isChineseCharacter(value) {
//     return (/^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/g.test(value));
// };

// exports.isChineseCharacter = isChineseCharacter;
// /**
//  * 驗證小數
//  * @param { string } value
//  */
// var isDecimal = function isDecimal(value) {
//     return (/^\d+\.\d+$/g.test(value));
// };

// exports.isDecimal = isDecimal;
// /**
//  * 驗證數字
//  * @param { string } value
//  */
// var isNumber = function isNumber(value) {
//     return (/^\d{1,}$/g.test(value));
// };

// exports.isNumber = isNumber;
// /**
//  *  驗證html標籤(寬鬆匹配)
//  * @param { string } value
//  */
// var isHTMLtags = function isHTMLtags(value) {
//     return (/<(\w+)[^>]*>(.*?<\/\1>)?/g.test(value));
// };



// exports.isQQNum = isQQNum;
// /**
//  *  驗證數字和字母組成
//  * @param { string } value
//  */
// var isNumAndStr = function isNumAndStr(value) {
//     return (/^[A-Za-z0-9]+$/g.test(value));
// };

// exports.isNumAndStr = isNumAndStr;
// /**
//  *  驗證英文字母
//  * @param { string } value
//  */
// var isEnglish = function isEnglish(value) {
//     return (/^[a-zA-Z]+$/g.test(value));
// };

// exports.isEnglish = isEnglish;
// /**
//  *  驗證大寫英文字母
//  * @param { string } value
//  */
// var isCapital = function isCapital(value) {
//     return (/^[A-Z]+$/g.test(value));
// };

// exports.isCapital = isCapital;
// /**
//  * 驗證小寫英文字母組成
//  * @param { string } value
//  */
// var isLowercase = function isLowercase(value) {
//     return (/^[a-z]+$/g.test(value));
// };

// exports.isLowercase = isLowercase;
// /**
//  * 驗證密碼強度，最少6位，包括至少1個大寫字母，1個小寫字母，1個數字，1個特殊字符
//  * @param { string } value
//  */
// var isCorrectFormatPassword = function isCorrectFormatPassword(value) {
//     return (/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/g.test(value));
// };

// exports.isCorrectFormatPassword = isCorrectFormatPassword;
// /**
//  * 驗證用戶名，4到16位（字母，數字，下劃線，減號）
//  * @param { string } value
//  */
// var isCorrectFormatUsername = function isCorrectFormatUsername(value) {
//     return (/^[a-zA-Z0-9_-]{4,16}$/g.test(value));
// };

// exports.isCorrectFormatUsername = isCorrectFormatUsername;
// /**
//  * 驗證ip-v4
//  * @param { string } value
//  */
// var isIPv4 = function isIPv4(value) {
//     return (/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g.test(value));
// };

// exports.isIPv4 = isIPv4;
// /**
//  * 驗證ip-v6
//  * @param { string } value
//  */
// var isIPv6 = function isIPv6(value) {
//     return (/^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(value));
// };

// exports.isIPv6 = isIPv6;
// /**
//  * 驗證16進制顏色
//  * @param { string } value
//  */
// var isColor16 = function isColor16(value) {
//     return (/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(value));
// };

// exports.isColor16 = isColor16;

// /**
//  * 驗證中文和數字
//  * @param { string } value
//  */
// var isCHNAndEN = function isCHNAndEN(value) {
//     return (/^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/g.test(value));
// };

// exports.isCHNAndEN = isCHNAndEN;
// /**
//  * 驗證不能包含字母
//  * @param { string } value
//  */
// var isNoWord = function isNoWord(value) {
//     return (/^[^A-Za-z]*$/g.test(value));
// };

// exports.isNoWord = isNoWord;
// /**
//  * 名稱正則校驗，規則：名稱支持中文、英文、數字以及符號：_（）—.- 且不能以 . 開頭
//  * @param { string } value
//  */
// var nameReg = function nameReg(value) {
//     return value.match(/^(?![.])[\u4e00-\u9fa5_a-zA-Z0-9-—\(\)\（\）.]+$/g);
// };
// exports.nameReg = nameReg;