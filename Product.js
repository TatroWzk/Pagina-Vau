export default {
  name: "ProductCard",

  props: {
    product: Object
  },

  computed: {
    finalPrice() {
      if (!this.product.discount) return this.product.price;

      return this.product.price -
        (this.product.price * this.product.discountValue / 100);
    }
  },

  methods: {
    formatPrice(value) {
      return value.toLocaleString("es-CO");
    }
  },

  template: `
    <div class="card" :style="{ opacity: product.stock ? 1 : 0.5 }">

      <div class="image-container">
        <div v-if="product.discount" class="discount-badge">
          Oferta
        </div>

        <img :src="product.image" alt="producto" />
      </div>

      <h3>{{ product.name }}</h3>

      <div class="price-container">

  <div v-if="product.discount" class="old-price">
    $ {{ formatPrice(product.price) }} COP
  </div>

  <div class="new-price">
    $ {{ formatPrice(finalPrice) }} COP
  </div>

</div>

      <button
        @click="$emit('buy', product)"
        :disabled="!product.stock">
        Comprar
      </button>

    </div>
  `
};