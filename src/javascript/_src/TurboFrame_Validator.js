// Colors
// 顏色相關函數
;
(function(TutboFrame) {

	
	var Util = {


		isHexColor(code) {
			return /^#[0-9A-F]{6}$/i.test(code);
		},
		colorLighten: function(color, amount) {
			const addLight = function(color, amount) {
				let cc = parseInt(color, 16) + amount;
				let c = (cc > 255) ? 255 : (cc);
				c = (c.toString(16).length > 1) ? c.toString(16) : `0${c.toString(16)}`;
				return c;
			}

			color = (color.indexOf("#") >= 0) ? color.substring(1, color.length) : color;
			amount = parseInt((255 * amount) / 100);

			return color = `#${addLight(color.substring(0,2), amount)}${addLight(color.substring(2,4), amount)}${addLight(color.substring(4,6), amount)}`;
		},

		colorDarken: function(color, amount) {
			const subtractLight = function(color, amount) {
				let cc = parseInt(color, 16) - amount;
				let c = (cc < 0) ? 0 : (cc);
				c = (c.toString(16).length > 1) ? c.toString(16) : `0${c.toString(16)}`;

				return c;
			}

			color = (color.indexOf("#") >= 0) ? color.substring(1, color.length) : color;
			amount = parseInt((255 * amount) / 100);

			return color = `#${subtractLight(color.substring(0,2), amount)}${subtractLight(color.substring(2,4), amount)}${subtractLight(color.substring(4,6), amount)}`;
		},
		// extendHex: 將3位色碼擴展為6位色碼
		// 使用Array.map()、split()和Array.join()來加入映射數組, 將3位的 RGB notated 十六進制 color-code 轉換為6位數字形式。Array.slice()用於從字符串啟動中刪除#, 因為它添加了一次
		// extendHex: shortHex => "#" + shortHex.slice(shortHex.startWith("#") ? 1 : 0).split("").map(x => x+x).join(""),
		extendHex: shortHex => {
			_extendHex = _shortHex => (_shortHex.length <= 4) ?
				"#" + _shortHex.slice(_shortHex.startsWith("#") ? 1 : 0).split("").map(x => x + x).join("") : shortHex;
			let _shortHex = shortHex;
			return _extendHex(_shortHex);
		},

		// hexToRGB: 將 colorcode 轉換為rgb()字符串
		// 使用按位右運算符和掩碼位與&(and) 運算符將十六進制顏色代碼 (前綴為#) 轉換為具有 RGB 值的字符串。如果它是一個3位數的 colorcode, 那麼用 extendHex () 函數 (ref.extendHex代碼段) 擴展的6位 colorcode 進行相同的處理
		hexToRGB: hex => {
			const extendHex = shortHex => "#" + shortHex.slice(shortHex.startsWith("#") ? 1 : 0).split("").map(x => x + x).join("");
			const extendedHex = hex.slice(hex.startsWith("#") ? 1 : 0).length === 3 ? extendHex(hex) : hex;
			return `rgb(${parseInt(extendedHex.slice(1), 16) >> 16}, ${(parseInt(extendedHex.slice(1), 16) & 0x00ff00) >> 8}, ${parseInt(extendedHex.slice(1), 16) & 0x0000ff})`;
		},

		// RGBToHex: 將 RGB 組件的值轉換為 colorcode。
		// 使用按位左移位運算符 (<<) 和toString(16)將給定的 RGB 參數轉換為十六進制字符串, 然後padStart(6,'0')以獲取6位十六進制值
		RGBToHex: (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0"),

	}

})(TutboFrame);