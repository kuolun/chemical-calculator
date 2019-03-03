let data = {
  selectel1: {},
  selectel2: {},
  elements1: [
    {
      name: "Li",
      text: "鋰 Lithium (Li)",
      option: 1//保留正離子
    },
    {
      name: "Na",
      text: "鈉 Sodium (Na)",
      option: 1//保留正離子
    },
    {
      name: "K",
      text: "鉀 Potassium (K)",
      option: 1//保留正離子
    },
    {
      name: "Rb",
      text: "銣 Rubidium (Rb)",
      option: 1//保留正離子
    },
    {
      name: "Cs",
      text: "銫 Caesium (Cs)",
      option: 1//保留正離子
    },
    {
      name: "Cs",
      text: "銫 Caesium (Cs)",
      option: 1//保留正離子
    },
    {
      name: "Be",
      text: "鈹 Berylium (Be)",
      option: 1//保留正離子
    },
    {
      name: "Mg",
      text: "鎂 Magnesium (Mg)",
      option: 1//保留正離子
    },
    {
      name: "Ca",
      text: "鈣 Calcium (Ca)",
      option: 1//保留正離子
    },
    {
      name: "Sr",
      text: "鍶 Strontium (Sr)",
      option: 1//保留正離子
    },
    {
      name: "Ba",
      text: "鋇 Barium (Ba)",
      option: 1//保留正離子
    },
  ],
  elements2: [
    {
      name: "OH",
      text: ' 氫氧根 Hydroxide (OH)',
      option: 1
    }
  ],
  // OH沈澱組合
  oh_down: [
    {
      name: 'Li',
      down: false,
      result: 'LiOH'
    },
    {
      name: 'Na',
      down: false,
      result: 'NaOH'
    },
    {
      name: 'K',
      down: false,
      result: 'KOH'
    },
    {
      name: 'Rb',
      down: false,
      result: 'RbOH'
    },
    {
      name: 'Cs',
      down: false,
      result: 'CsOH'
    },
    {
      name: 'Be',
      down: true,
      result: 'Be(OH)2'
    },
    {
      name: 'Mg',
      down: true,
      result: 'Mg(OH)2'
    },
    {
      name: 'Ca',
      down: true,
      result: 'Ca(OH)2'
    },
    {
      name: 'Sr',
      down: true,
      result: 'Sr(OH)2'
    },
    {
      name: 'Ba',
      down: false,
      result: 'Ba(OH)2'
    },
    {
      name: 'Fe',
      down: true,
      result: 'Fe(OH)3'
    },
    {
      name: 'Cu',
      down: true,
      result: 'Cu(OH)2'
    },
    {
      name: 'Ag',
      down: true,
      result: 'AgOH'
    },
    {
      name: 'Hg',
      down: true,
      result: 'Hg(OH)2'
    },
    {
      name: 'Pb',
      down: true,
      result: 'Pb(OH)2'
    },
  ]
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
      const result = [];
      const down = this.oh_down;
      const len = this.oh_down.length;
      for (let i = 0; i < len; i++) {
        if (this.selectel1.name === down[i].name) {
          console.log('test')
          result.push(down[i]);
        }
      }
      return result;
    }
  }
});
