import ProductCard from "./Product.js";

const { createApp } = Vue;

createApp({
  components: { ProductCard },

  data() {
    return {
      products: [],
      search: ""
    };
  },

  computed: {
  filteredProducts() {
    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.search.toLowerCase())
    );
  },

  groupedProducts() {
    const groups = {};

    this.filteredProducts.forEach(product => {
      if (!groups[product.category]) {
        groups[product.category] = [];
      }
      groups[product.category].push(product);
    });

    return groups;
  }
},

  mounted() {
    fetch("./producto.json")
      .then(response => response.json())
      .then(data => {
        this.products = data;
      })
      .catch(error => {
        console.error("Error cargando productos:", error);
      });
  },

  methods: {
    comprar(producto) {
      alert(`Compraste: ${producto.name}`);
    }
  },

  template: `
  <div>

    <!-- Banner -->
    <section class="banner">
      <div class="banner-overlay">
        <h1 class="titulo-banner">TATOO</h1>
      </div>
    </section>

    <div class="container">

      <input
        type="text"
        placeholder="Buscar producto..."
        v-model="search"
        class="search-input"
      />

      <div v-for="(items, category) in groupedProducts" :key="category">
        <h2 class="categoria-titulo">{{ category }}</h2>

        <div class="grid">
          <ProductCard
            v-for="item in items"
            :key="item.id"
            :product="item"
            @buy="comprar"
          />
        </div>
      </div>

    </div>
  </div>
`
}).mount("#app");