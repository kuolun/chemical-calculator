let data = {
  select1: {},
  select2: {},
  acid_concentration: 0,
  acid_volume: 0,
  acids: [
    {
      name: "HI(hydroiodic acid)",
      ka: Math.pow(10, 10),
      pka: -10,
      kb: Math.pow(10, -24)
    },
    {
      name: "HBr(hydrobromic acid)",
      ka: Math.pow(10, 9),
      pka: -9,
      kb: Math.pow(10, -23)
    },
    {
      name: "HCl(hydrochloric acid)",
      ka: Math.pow(10, 6),
      pka: -6,
      kb: Math.pow(10, -20)
    },
    {
      name: "H2SO4(sulfuric acid)",
      ka: Math.pow(10, 3),
      pka: -3,
      kb: Math.pow(10, -17)
    },
    {
      name: "HNO3(nitric acid)",
      ka: Math.pow(10, 2),
      pka: -2,
      kb: Math.pow(10, -15)
    },
    {
      name: "H3O+(hydronium acid)",
      ka: 1,
      pka: 0,
      kb: Math.pow(10, -14)
    },
    {
      name: "HSO4-(hydrogen sulfate ion)",
      ka: Math.pow(10, -2) * 1.3,
      pka: 1.89,
      kb: Math.pow(10, -13) * 7.7
    },
    {
      name: "HF(hydrofluoric acid)",
      ka: Math.pow(10, -4) * 7.1,
      pka: 3.15,
      kb: Math.pow(10, -11) * 1.4
    },
    {
      name: "HNO2(nitrous acid)",
      ka: Math.pow(10, -4) * 4.5,
      pka: 3.35,
      kb: Math.pow(10, -11) * 2.2
    },
    {
      name: "HCOOH(formic acid)",
      ka: Math.pow(10, -4) * 1.7,
      pka: 3.77,
      kb: Math.pow(10, -11) * 5.9
    },
    {
      name: "CH3COOH(acetic acid)",
      ka: Math.pow(10, -5) * 1.8,
      pka: 4.74,
      kb: Math.pow(10, -10) * 5.6
    },
    {
      name: "NH4+(ammonium ion)",
      ka: Math.pow(10, -10) * 5.6,
      pka: 9.25,
      kb: Math.pow(10, -5) * 1.8
    },
    {
      name: "HCN(hydrocyanic acid)",
      ka: Math.pow(10, -10) * 4.9,
      pka: 9.31,
      kb: Math.pow(10, -5) * 2
    },
    {
      name: "H2O(water)",
      ka: Math.pow(10, -14),
      pka: 14,
      kb: 1
    },
    {
      name: "NH3(ammonia)",
      ka: Math.pow(10, -34),
      pka: 34,
      kb: Math.pow(10, 20)
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
  h2: 0,
  situation: ""
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
      const acid_vol = parseFloat(this.acid_volume);
      const acid_con = parseFloat(this.acid_concentration);
      const alka_vol = parseFloat(this.alka_volume);
      const alka_con = parseFloat(this.alka_concentration);

      console.log('test');
      console.log(acid_vol, acid_con, alka_vol, alka_con);

      const acid_compute = acid_vol * acid_con;
      const alka_compute = alka_vol * alka_con;

      console.log(`acid_compute:${acid_compute},alka_compute:${alka_compute}`);

      let pH = this.pH;

      // case1
      if (acid_compute > alka_compute) {
        console.log("case1");
        this.situation = "case1";
        const e = acid_compute - alka_compute;
        console.log(`e:${e}`)
        console.log(`log:${Math.log10(e / alka_compute)}`)
        console.log(`pka:${this.select1.pka}`)
        pH = this.select1.pka + Math.log10(alka_compute / e);
      }

      // case2
      if (acid_compute === alka_compute) {
        console.log("case2");
        this.situation = "case2";
        const f = acid_compute;
        const g = f / (acid_vol + alka_vol);
        const kb = this.select1.kb || 0;

        console.log(`f:${f},g:${g},kb:${kb}`);


        this.h1 = (-kb + Math.sqrt(Math.pow(kb, 2) + 4 * kb * g)) / 2;
        this.h2 = (-kb - Math.sqrt(Math.pow(kb, 2) + 4 * kb * g)) / 2;
        console.log(`h1:${this.h1}`, `h2:${this.h2}`);

        const h = (this.h1 > 0) ? this.h1 : this.h2;

        console.log(`h:${h}`);

        pH = Math.log10(h) + 14;

        console.log(pH)
      }

      // case3
      if (acid_compute < alka_compute) {
        this.situation = "case3";
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
