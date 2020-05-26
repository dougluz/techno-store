const vm = new Vue({
  el: '#app',
  data: {
    produtos: []
  },
  methods: {
    fetchProdutos () {
      fetch('./api/produtos.json')
        .then(r => r.json())
        .then(r => {
          this.produtos = r
        })
    }
  },
  filters: {
    numeroPreco (valor) {
      return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})
    }
  },
  created () {
    this.fetchProdutos()
  }
})