let data = {
  inputValue: 1,
  acids: [
    {
      title: 'sulfuric acid',
      ka1: '[HSO4-]/ [H2SO4]',
      ka2: '[SO42-]/ [HSO4-]'
    },
    {
      title: 'Sulfurous acid',
      ka1: '[HSO3-]/ [H2SO3]',
      ka2: '[SO32-]/ [HSO3-]'
    },
    {
      title: 'Phosphoric acid',
      ka1: '[H2PO4-] / [H3PO4]',
      ka2: '[HPO42-]/ [H2PO4-]',
      ka3: '[PO43-]/ [HPO42-]'
    },
    {
      title: 'Carbonic acid',
      ka1: '[H2CO3]/ [H2CO3]',
      ka2: '[H2CO3]/ [H2CO3]'
    }
    ,
    {
      title: 'Hydrogen sulfide',
      ka1: '[HS-]/ [H2S]',
      ka2: '[S2-]/ [HS-]'
    }
    ,
    {
      title: 'Oxalic acid',
      ka1: '[HC2O4-]/[H2C2O4]',
      ka2: '[HC2O42-]/[HC2O4-]'
    }
    ,
    {
      title: 'Malonic acid',
      ka1: '[HC3H2O4-]/ [H2C3H2O4]',
      ka2: '[C3H2O42-]/ [HC3H2O4-]'
    }
  ],
  selectedAcid: '',
  productSq: 0,
  BlessthanC5: false
}

var app = new Vue({
  el: '#app',
  data: data,
  computed: {
    answer1() {
      console.log('answer1');
      // return -Math.log10(this.input.value).toFixed(2)
      this.productSq = Math.sqrt(this.inputValue * this.selectedKa);
      return this.productSq;
    },
    answer2() {
      if (this.productSq > this.inputValue * 0.05) {
        this.BlessthanC5 = false;
        let x1 = (-this.selectedKa + Math.sqrt(Math.pow(this.selectedKa, 2) + 4 * this.selectedKa * this.inputValue)) / 2;
        let x2 = (-this.selectedKa - Math.sqrt(Math.pow(this.selectedKa, 2) + 4 * this.selectedKa * this.inputValue)) / 2;
        console.log(x1, x2);
        let finxalX;
        if (x1 > 0) {
          finalX = x1
        } else {
          finalX = x2
        }
        let pH1 = -Math.log10(finalX).toFixed(2);
        if (pH1 > 7) {
          pH1 = 7;
        }
        // pH值若小於1，則設定pH值為1
        if (pH1 < 1) {
          pH1 = 1;
        }
        return pH1;

      } else {
        this.BlessthanC5 = true;
        console.log('in pH2');
        let pH2 = -Math.log10(this.productSq);
        if (pH2 > 7) {
          pH2 = 7
        }
        // pH值若小於1，則設定pH值為1
        if (pH2 < 1) {
          pH2 = 1;
        }

        return pH2;
      }
    }
  }
})
