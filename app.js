var app = new Vue({
    el: '#app',
    data: {
        input: 1
    },
    computed: {
        answer() {
            return -Math.log10(this.input);
        }
    }
});