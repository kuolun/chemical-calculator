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
  pH: 0,
  h1: 0,
  h2: 0
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
      const acid_vol = parseInt(this.acid_volume);
      const acid_con = parseInt(this.acid_concentration);
      const alka_vol = parseInt(this.alka_volume);
      const alka_con = parseInt(this.alka_concentration);

      const acid_compute = acid_vol * acid_con;
      const alka_compute = alka_vol * alka_con;

      console.log(`acid_compute:${acid_compute},alka_compute:${alka_compute}`);

      let pH = this.pH;

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
        const g = f / (acid_vol + alka_vol);
        const kb = this.select2.kb || 0;

        console.log(`f:${f},g:${g},kb:${kb}`);

        this.h1 = (-kb + Math.sqrt(Math.pow(kb, 2) + 4 * kb * g)) / 2;
        this.h2 = (-kb - Math.sqrt(Math.pow(kb, 2) + 4 * kb * g)) / 2;
        console.log(`h1:${this.h1}`, `h2:${this.h2}`);
        if (this.h1 > 0) {
          pH = Math.log10(this.h1);
        }
        // h2也>0??? 待確認
      }

      // case3
      if (acid_compute < alka_compute) {
        const i = alka_compute - acid_compute;
        const j = i / (acid_vol + alka_vol);
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
