const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    produto: false,
    carrinho: []
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
    },
    abrirModal (id) {
      this.fetchProduto(id)
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },
    fecharModal ({ target, currentTarget }) {
      if (target === currentTarget) this.produto = false
    },
    adicionarItem () {
      this.produto.estoque--
      const { id, nome, preco } = this.produto
      this.carrinho.push({ id, nome, preco })
    },
    removerItem (index) {
      this.carrinho.splice(index)
    },
    checarLocalStorage () {
      if (window.localStorage.carrinho) {
        this.carrinho = JSON.parse(window.localStorage.carrinho)
      }
    }
  },
  computed: {
    carrinhoTotal () {
      let total = 0
      if(this.carrinho.length) {
        this.carrinho.forEach(item => {
          total += item.preco
        })
      }

      return total
    }
  },
  watch: {
    carrinho () {
      window.localStorage.carrinho = JSON.stringify(this.carrinho)
    }
  },
  filters: {
    numeroPreco (valor) {
      return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})
    }
  },
  created () {
    this.fetchProdutos()
    this.checarLocalStorage()
  }
})