var app = new Vue({
  el: '#app',
  data: {
    input: {
      option: '請選擇',
      value: 1
    }
  },
  computed: {
    answer() {
      return -Math.log10(this.input.value).toFixed(2)
    }
  }
})
