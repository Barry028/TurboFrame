#  Turboframe.js 
#  壓縮完 35kb 支援 JQuery 大部分用法 (有缺或 Bug再跟我說) )

## 初始化專案環境 

* 確定 Node 已安裝

$ npm - i

$ npm run build


## webpack
[scss] scss   --> scss 處理、Css 相容（變數轉支援低階瀏覽器 var(--xxx)）

[babel] Js    --> es5 轉 es6 放心用 Class Export ..

[Html] Html   -->  

## Gulp

`gulp default` run all

`gulp sass`

`gulp iconfonts` // 圖片放進去路徑直接打包成 iconfont 並且產生模板範例

`gulp babelEs5` 同 webpack (這邊快一點打包好)

`gulp img` 壓縮 .jpg .png .gif .svg 以及產生 .webp

< ... 未完 >


## 圖庫 (已壓縮過圖片，以今年流行 3D 為主)

[dist/images/]

## Icon Font 迷你包 （之前包的偏大包）

[dist/icons/slim-icon/]

< ... 未完 >

## Html 樣式模板 (簡易版型樣式較小好修改)

[dist/xx.html]

< ... 未完 >

#  TurboFrame  Javascript Library -- TURBOTECH 

原生 Javascript 類 JQurery 小型封裝包

* TurboFrame .js --> 

  主要框架，` TurboFrame ('selector')` || `$('selector')`

  原生 Javascript.getElement 為主，

  支援 後代、群組、通用、[data] ... 等等。

  Selector 綁在  window. TurboFrame .fn .

  **  TurboFrame .fn.extend({ ... }); **


* TurboFrame_Core.js --> 

  主要框架，` TurboFrame .function(){ ... }` || `$.function(){ ... }`

  處理  TurboFrame .js 相關，相關函數

  可單獨拿出來調用 --> $.trim() , $.makeArray() ,  $.merge() ...

  **  TurboFrame .extend({ ... }); **



## API 文檔

### 基礎選擇器

* $(selector) 或  TurboFrame (selector)
* 支持 (tag), (#id), (.className) ,(tag > .className) ,(tag > tag) ,(#id > tag.className) , (.className tag) ,(tag, tag, #id) ,(tag#id.className) ,(span > * > b) ,(input[name=radio])的傳入，不支持偽類，返回 TurboFrame 對象。

* .eq(index)

傳入索引值，返回對應的節點的 TurboFrame 對象。

支持傳入負值，如：`$("a").eq(-1)`取最末尾節點。

* .find(selector)

返回相應後代節點的 TurboFrame 對象。

* .children([selector])

只在子節點遍歷，返回全部或相應子節點的 TurboFrame 對象。

* .parent()

返回父節點的 TurboFrame 對象，已排重。

* .parents([selector])

返回上級節點對應選擇器的 TurboFrame 對象，已排重。

* .next()

返回 TurboFrame 對象第一個元素之後第一個兄弟節點。

* .nextAll()

返回 TurboFrame 對象第一個元素之後所有兄弟節點。

* .prev()

返回 TurboFrame 對象第一個元素之前第一個兄弟節點。

* .prevAll()

返回 TurboFrame 對象第一個元素之前所有兄弟節點。

* .siblings()

返回 TurboFrame 對象第一個元素除自身以外所有兄弟節點。

* .append()

在元素裡面內容的末尾插入內容。

* .prepend()

在元素裡面內容的前面插入內容。

* .before()

在元素之前插入內容。

* .after()

在元素之後插入內容。

< ... 之後再打，功能都寫好了 >