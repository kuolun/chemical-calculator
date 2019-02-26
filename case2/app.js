let data = {
  inputValue: 1,
  acids: [
    {
      title: "sulfuric acid",
      ka1: 1000,
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
      ka1: "[H2CO3]/ [H2CO3]",
      ka2: "[H2CO3]/ [H2CO3]"
    },
    {
      title: "Hydrogen sulfide",
      ka1: "[HS-]/ [H2S]",
      ka2: "[S2-]/ [HS-]"
    },
    {
      title: "Oxalic acid",
      ka1: "[HC2O4-]/[H2C2O4]",
      ka2: "[HC2O42-]/[HC2O4-]"
    },
    {
      title: "Malonic acid",
      ka1: "[HC3H2O4-]/ [H2C3H2O4]",
      ka2: "[C3H2O42-]/ [HC3H2O4-]"
    }
  ],
  selectedAcid: "",
  ph_value: 1,
  productSq: 0,
  abs: 0,
  ka_text: "",
  // test
  result1: 0,
  result2: 0,
  result3: 0
};

var app = new Vue({
  el: "#app",
  data: data,
  computed: {
    cal1() {
      let selected = this.selectedAcid;
      let ka1 = selected.ka1;
      let ka2 = selected.ka2;
      let ka3 = selected.ka3;
      let ph_value = this.ph_value;
      console.log("cal1");

      // 選定酸之後做絕對值的比較
      if (selected) {
        let result1 = Math.abs(ka1 - ph_value);
        let result2 = Math.abs(ka2 - ph_value);
        let result3 = Math.abs(ka3 - ph_value);
        // for test
        this.result1 = result1;
        this.result2 = result2;
        this.result3 = result3;

        console.log(result1, result2, result3);

        if (ka3) {
          // 如果有3個ka
          let min;
          if (result1 > result2) {
            min = result2;
            this.ka_text = selected.ka2_text;
          } else {
            min = result1;
            this.ka_text = selected.ka1_text;
          }

          if (ka3 < min) {
            min = ka3;
            this.ka_text = selected.ka3_text;
          }
          this.abs = min;
          return this.ka_text;
        } else {
          // 只有ka1及ka2
          if (result1 > result2) {
            this.abs = result2;
            this.ka_text = selected.ka2_text;
            return this.ka_text;
          } else {
            this.abs = result1;
            this.ka_text = selected.ka1_text;
            return this.ka_text;
          }
        }
      }
    },
    cal2() {
      if (this.abs) {
        return Math.pow(10, this.abs).toFixed(2);
      }
    }
  }
});
