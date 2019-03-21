let data = {
  acids: [
    {
      title: "acetic acid",
      ka1: 1.8 * Math.pow(10, -5),
      ka1_text: "",
      ka2_text: ""
    },
    {
      title: "formic acid",
      ka1: 1.7 * Math.pow(10, -4),
      ka1_text: "",
      ka2_text: ""
    },
    {
      title: "nitrous acid",
      ka1: 4.5 * Math.pow(10, -4),
      ka1_text: "",
      ka2_text: ""
    },
    {
      title: "hydrofluoric acid",
      ka1: 7.1 * Math.pow(10, -4),
      ka1_text: "",
      ka2_text: ""
    },
    {
      title: "hydrogen sulfate ion",
      ka1: 1.3 * Math.pow(10, -2),
      ka1_text: "",
      ka2_text: ""
    },
    {
      title: "hydronium ion",
      ka1: 1,
      ka1_text: "",
      ka2_text: ""
    },
    {
      title: "nitric acid",
      ka1: Math.pow(10, 2),
      ka1_text: "",
      ka2_text: ""
    },
    {
      title: "hydrochloric acid",
      ka1: Math.pow(10, 6),
      ka1_text: "",
      ka2_text: ""
    },
    {
      title: "hydrobromic acid",
      ka1: Math.pow(10, 9),
      ka1_text: "",
      ka2_text: ""
    },
    {
      title: "hydroiodic acid",
      ka1: Math.pow(10, 10),
      ka1_text: "",
      ka2_text: ""
    },
    {
      title: "sulfuric acid",
      ka1: Math.pow(10, 3),
      ka2: 0.011,
      ka1_text: "[HSO4-]/ [H2SO4]",
      ka2_text: "[SO42-]/ [HSO4-]"
    },
    {
      title: "Sulfurous acid",
      ka1: 0.013,
      ka2: 0.000000062,
      ka1_text: "[HSO3-]/ [H2SO3]",
      ka2_text: "[SO32-]/ [HSO3-]"
    },
    {
      title: "Phosphoric acid",
      ka1: 0.0071,
      ka2: 0.000000063,
      ka3: 0.00000000000042,
      ka1_text: "[H2PO4-] / [H3PO4]",
      ka2_text: "[HPO42-]/ [H2PO4-]",
      ka3_text: "[PO43-]/ [HPO42-]"
    },
    {
      title: "Carbonic acid",
      ka1: 0.00000044,
      ka2: 0.000000000047,
      ka1_text: "[H2CO3]/ [H2CO3]",
      ka2_text: "[H2CO3]/ [H2CO3]"
    },
    {
      title: "Hydrogen sulfide",
      ka1: 0.0000001,
      ka2: 0.0000000000000000001,
      ka1_text: "[HS-]/ [H2S]",
      ka2_text: "[S2-]/ [HS-]"
    },
    {
      title: "Oxalic acid",
      ka1: 0.054,
      ka2: 0.000053,
      ka1_text: "[HC2O4-]/[H2C2O4]",
      ka2_text: "[HC2O42-]/[HC2O4-]"
    },
    {
      title: "Malonic acid",
      ka1: 0.0015,
      ka2: 0.000002,
      ka1_text: "[HC3H2O4-]/ [H2C3H2O4]",
      ka2_text: "[C3H2O42-]/ [HC3H2O4-]"
    }
  ],
  selectedAcid: {},
  ph_value: 7, //user輸入進來的值會是string
  abs: 0, //絕對值計算
  ka_text: "", //緩衝鹽文字
  result1: 0,
  result2: 0,
  result3: 0
};

var app = new Vue({
  el: "#app",
  data,
  methods: {
    changeSub(text) {
      // 將數字改為下標
      let reg = /^[\d]+$/;
      let sub = text
        .split("")
        .map(item => {
          if (reg.test(item)) {
            return "<sub>" + item + "</sub>";
          } else {
            return item;
          }
        })
        .join("");
      return sub;
    }
  },
  computed: {
    cal1() {
      let selected = this.selectedAcid;
      console.log(_.isEmpty(selected));
      console.log(`選擇：${selected}`);

      console.log("cal1");

      // 選定酸之後做絕對值的比較
      // 非空物件才進行
      if (!_.isEmpty(selected)) {
        console.log("in selected");
        let { ka1, ka2, ka3, ka1_text, ka2_text, ka3_text = "" } = selected;

        //輸入欄位的數字是string要轉整數
        let ph_value = parseInt(this.ph_value);
        let logka1 = Math.log10(ka1);
        let logka2 = Math.log10(ka2);
        let logka3 = Math.log10(ka3);

        let logkas = [logka1, logka2, logka3];
        // 調整過大或過小的數字(>14或<1)
        for (let i = 0; i < logkas.length; i++) {
          if (logkas < 1) {
            logkas = 1;
          }
          if (logkas > 14) {
            lokas = 14;
          }
        }

        let result1 = Math.abs(logka1 + ph_value);
        let result2 = Math.abs(logka2 + ph_value);
        let result3 = Math.abs(logka3 + ph_value);
        // for test
        this.result1 = result1;
        this.result2 = result2;
        this.result3 = result3;

        console.log(result1, result2, result3);

        if (ka3) {
          // 如果有3個ka
          console.log("比較3個");
          let min;
          if (result1 > result2) {
            min = result2;
            this.ka_text = ka2_text;
          } else {
            console.log(`預期:${result1}`);
            min = result1;
            this.ka_text = ka1_text;
          }

          if (result3 < min) {
            min = result3;
            this.ka_text = ka3_text;
          }

          console.log(`cal1 min abs:${min}`);
          console.log(`緩衝鹽:${this.ka_text}`);

          this.abs = min;
          return this.changeSub(this.ka_text);
        } else {
          // 只有ka1及ka2
          console.log("比較2個");
          if (result1 > result2) {
            this.abs = result2;
            return this.changeSub(ka2_text);
          } else {
            this.abs = result1;
            return this.changeSub(ka1_text);
          }
        }
      }
    },
    cal2() {
      console.log(`cal2:this.abs-${this.abs}`);
      console.log(`min abs:${this.abs}`);
      // Math.pow(base,exponent)
      return Math.pow(10, this.abs).toFixed(2);
    }
  }
});
