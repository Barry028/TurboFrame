

<img style="display: inline-block; vertical-align: top"  src="https://github.com/Barry028/TurboFrame/blob/main/shares/images/Turbotech/logo_v2.svg" width="50%" >



#  Turboframe.js <img src="https://github.com/Barry028/TurboFrame/blob/main/shares/images/%E5%B0%88%E6%A1%88%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0/bot-2.svg" width="66px">

檔案壓縮完成後大約 35KB (會再持續新增，目前還是以 ES5 寫法為主，瀏覽器支援落在 IE9 這個等級)，
支援 JQuery 大部分用法 (有缺或 Bug再跟我說)

<!-- ![Turbotech Bot](https://github.com/Barry028/TurboFrame/blob/main/shares/images/%E5%B0%88%E6%A1%88%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0/bot-2.svg "Turbotech") -->

```html

<script src="./dist/js/TurboFrame.bunble.js"></script>

```

## 👉 [TurboFrame.js](https://github.com/Barry028/TurboFrame/blob/main/src/javascript/TurboFrame.js)

主要檔案，模擬 JQuery 選擇器，將 getElements、querseletor ... 統一新增到新的陣列，以 get 選法為主

- - -

```js

$("selector") || TurboFrame("selector")

```

🟢  支持  `Tag` , `#Id` , `.ClassName` , `Tag > .ClassName` , `Tag > Tag` , `#Id > Tag.ClassName` , `.ClassName Tag` ,
         `Tag , Tag , #Id` , `Tag#Id.ClassName`  , `span > * > b` , `input[name=radio]` 
          傳入，不支持 [::偽元素] ，返回 TurboFrame 對象 [Array]。

```js

$("selector").eq(index)

```

🟢  傳入索引值，返回對應的節點的 TurboFrame 對象。

```js

$("selector").find("selector")

```
🟢  返回相應後代節點的 TurboFrame 對象。
   
  
- - -

2. TurboFrame_Core.js           ===>   主要檔案

3. TurboFrame_Prototype.js      ===>   主要檔案

4. TurboFrame_Fragments.js      ===>   主要檔案

5. TurboFrame_Ready.js          ===>   主要檔案

--

6. TurboFrame_Resize.js

7. TurboFrame_Browser.js

8. TurboFrame_Util.js

9. TurboFrame_Elements.js

10. TurboFrame_Events.js

11. TurboFrame_String.js

12. TurboFrame_Functions.js

13. TurboFrame_Ajax.js


---

## 初始化專案環境 

* 確定 Node 已安裝 Webpack

```bash

$ npm - i

$ npm run build

$ npm gulp default

```


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

# [dist/images/]

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
