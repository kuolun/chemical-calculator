let data = {
  inputValue: 1,
  acids: [
    {
      title: '氫碘酸(hydroiodic acid)',
      ka: Math.pow(10, 10)
    },
    {
      title: '氫溴酸(hydrobromic acid)',
      ka: Math.pow(10, 9)
    },
    {
      title: '鹽酸(hydrochloric acid)',
      ka: Math.pow(10, 6)
    },
    {
      title: '硫酸(sulfuric acid)',
      ka: Math.pow(10, 3)
    },
    {
      title: '硝酸(nitric acid)',
      ka: Math.pow(10, 2)
    },
    {
      title: '水合氫(hydronium ion)',
      ka: 1
    },
    {
      title: '硫酸氫根(hydrogen sulfate ion)',
      ka: 1.3 * Math.pow(10, -2)
    },
    {
      title: '氫氟酸(hydrofluoric acid)',
      ka: 7.1 * Math.pow(10, -4)
    },
    {
      title: '亞硝酸(nitrous acid)',
      ka: 4.5 * Math.pow(10, -4)
    },
    {
      title: '甲酸(formic acid)',
      ka: 1.7 * Math.pow(10, -4)
    },
    {
      title: '醋酸(acetic acid)',
      ka: 1.8 * Math.pow(10, -5)
    }
  ],
  selectedKa: 0
}

var app = new Vue({
  el: '#app',
  data: data,
  computed: {
    answer() {
      // return -Math.log10(this.input.value).toFixed(2)
      return 0
    }
  }
})
