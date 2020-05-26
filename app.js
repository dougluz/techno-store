const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    produto: false
  },
  methods: {
    fetchProdutos () {
      fetch('./api/produtos.json')
        .then(r => r.json())
        .then(r => {
          this.produtos = r
        })
    },
    fetchProduto (id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then(r => r.json())
        .then(r => (this.produto = r))
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