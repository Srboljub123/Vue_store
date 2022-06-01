<template>
  <div>
    <div class="row">
      <div class="col-md-12 mt-4 mb-2">
        <h1 class="shadows-font text-white">Prodotti in vetrina</h1>
        <hr />
      </div>
      <div v-if="!loaded" class="col-12">
        <h4 class="text-white shadows-font text-center">
          Caricamento in corso...
        </h4>
      </div>

      <div class="d-flex flex-row flex-nowrap overflow-scroll">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="col-8 mb-3"
        >
          <div class="card border-0 shadow rounded-3 mx-2 h-100">
            <img class="img-fluid" :src="product.images[0].src" />
            <div class="card-body">
              <h5 class="card-title shadows-font text-white text-start">
                {{ product.name | formatProductName }}
              </h5>

              <span class="d-block text-white price-wrap shadows-font">{{
                product.price | priceFilter
              }}</span>
              <span class="span-peso-prodotto">{{ product.peso_mi }}</span>
              <span class="text-white text-start"
                ><router-link
                  class="text-green"
                  :to="{
                    name: 'Prodotti Venditori',
                    params: {
                      id: product.store.id,
                      name: product.store.name,
                    },
                  }"
                >
                  {{ product.store.name }}</router-link
                ></span
              >
              <div class="product-actions mt-2 pt-2">
                <div
                  class="
                    add-to-cart
                    d-flex
                    justify-content-between
                    align-items-center
                  "
                  v-if="product.type == 'simple'"
                >
                  <div class="quantity d-flex">
                    <span @click="handleMinus(product)" class="minus">-</span>
                    <input
                      class="quantity-input border-0 text-center"
                      type="number"
                      v-model.number="product.qty"
                    />
                    <span @click="handlePlus(product)" class="plus">+</span>
                  </div>
                  <router-link to="" @click.native="addtoCart(product)">
                    <img class="ms-1" src="../assets/img/cart.png" />
                  </router-link>
                </div>

                <div v-else>
                  <router-link
                    class="btn btn-variable cart-button mt-2 w-100 shadows-font"
                    :to="{ name: 'Prodotto', params: { id: product.id } }"
                  >
                    Scopri Di Pi&ugrave;
                  </router-link>
                </div>
              </div>
              <router-link
                v-if="product.type == 'simple'"
                class="btn btn-variable cart-button mt-2 w-100 shadows-font"
                :to="'/prodotto/' + product.id"
                >Scopri di pi&ugrave;</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "LastProducts",
  data: function () {
    return {
      products: [],
      loaded: false,
      cart: JSON.parse(localStorage.getItem("cart")) || [],
      store_url:
        JSON.parse(localStorage.getItem("selected_store")) ||
        "https://mercatoitinerante.it/torino-porta-palazzo/",
    };
  },
  created: function () {
    axios
      .get(
        this.store_url.mi_single_city_domain +
          "wp-json/dokan/v1/products/?per_page=100&status=publish&in_stock=1"
      )
      .then((res) => {
        this.products = res.data;
        this.loaded = true;
      });
  },
  methods: {
    handlePlus: function (product) {
      product.qty++;
    },
    handleMinus: function (product) {
      product.qty--;
    },
    addtoCart: function (item) {
      if (item.qty === 0) {
        Swal.fire({
          icon: "error",
          title: "Seleziona la quantit&agrave;",
          html: "Inserisci una quantit&agrave; maggiore o uguale a 1.",
          confirmButtonText: "OK",
        });
      } else {
        this.$store.commit("addToCart", item);
        Swal.fire({
          icon: "success",
          title: "Prodotto aggiunto al carrello!",
          text: "",
          confirmButtonText: "OK",
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
