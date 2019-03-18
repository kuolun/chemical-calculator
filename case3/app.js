let data = {
  select1: {},
  select2: {},
  acid_concentration: 0,
  acid_volume: 0,
  acids: [
    {
      name: "HI(hydroiodic acid)",
      ka: Math.pow(10, 10),
      pka: -10
    },
    {
      name: "HBr(hydrobromic acid)",
      ka: Math.pow(10, 9),
      pka: -9
    }
  ],
  // 鹼
  alka: [
    {
      name: "OH氫氧根 Hyd  roxide (OH)",
      kb: 1,
      pkb: 0
    }
  ],
  alka_volume: 0,
  alka_concentration: 0,
  pH: 0
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
    result() {
      const acid_compute = this.acid_volume * this.acid_concentration;
      const alka_compute = this.alka_volume * this.alka_concentration;

      let pH = this.pH;
      console.log(pH);

      // case1
      if (acid_compute > alka_compute) {
        console.log("case1");
        const e = acid_compute - alka_compute;
        pH = this.select1.pka + Math.log10(e / alka_compute);
      }

      // case2
      if (acid_compute === alka_compute) {
        console.log("case2");
        const f = acid_compute;
        const g = f / (this.acid_volume + this.alka_volume);
        const kb = this.select2.kb;

        console.log(`f:${f},g:${g},kb:${kb}`);

        const h1 = (-kb + Math.sqrt(Math.pow(kb, 2) + 4 * kb * g)) / 2;
        const h2 = (-kb - Math.sqrt(Math.pow(kb, 2) + 4 * kb * g)) / 2;
        console.log(`h1:${h1}`, `h2:${h2}`);
        if (h1 > 0) {
          pH = Math.log10(h1);
        }
        // h2也>0??? 待確認
      }

      // case3
      if (acid_compute < alka_compute) {
        const i = alka_compute - acid_compute;
        const j = i / (acid_volume + alka_volume);
        pH = 14 + Math.log10(j);
      }

      // 檢查pH範圍是否在1~14之間
      if (pH < 1) {
        pH = 1;
      }
      if (pH > 14) {
        pH = 14;
      }
      return pH;
    }
  }
});
