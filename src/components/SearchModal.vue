<template>
  <div
    class="modal fade"
    id="SearchModal"
    aria-hidden="true"
    aria-labelledby="SearchModal"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <input
                @keyup="searchProducts()"
                class="search-full w-100"
                type="text"
                placeholder="Cerca..."
                v-model="search"
              />
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-md-12">
              <h1 class="shadows-font text-white">
                Prodotti trovati: {{ products.length }}
              </h1>
              <div v-if="!loaded && search.length !== 0" class="col-12">
                <h4 class="text-white shadows-font text-center">
                  Caricamento in corso...
                </h4>
              </div>
              <div class="result-list overflow-scroll">
                <div
                  v-for="(product, index) in products"
                  :key="index"
                  class="col-md-12"
                >
                  <li class="nav-item" data-bs-dismiss="modal">
                    <router-link
                      :to="{ name: 'Prodotto', params: { id: product.id } }"
                    >
                      <div class="card mx-3 my-3 px-3 py-3 shadow">
                        <div class="row align-items-center">
                          <div class="col-4">
                            <img
                              :src="product.images[0].src"
                              alt=""
                              class="img-fluid"
                            />
                          </div>
                          <div class="col-8 text-center">
                            <h2 class="text-start text-white shadows-font">
                              {{ product.name | formatProductName }}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </router-link>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SearchModal",
  data: function () {
    return {
      products: [],
      loaded: false,
      store_url:
        JSON.parse(localStorage.getItem("selected_store")) ||
        "https://mercatoitinerante.it/torino-porta-palazzo/",
      search: "",
    };
  },
  methods: {
    searchProducts: function () {
      var self = this;
      if (this.loaded) {
        this.loaded = false;
        this.products = [];
      }
      this.delay(function () {
        axios
          .get(
            self.store_url.mi_single_city_domain +
              "wp-json/dokan/v1/search?q=" +
              self.search
          )
          .then((response) => {
            self.products = response.data;
            self.loaded = true;
          });
      }, 1500);
    },
    delay: (function () {
      var timer = 0;
      return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
      };
    })(),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  border-radius: 10px;
}

.card img:nth-child(1) {
  height: 90px;
  border-radius: 10px;
}

.modal-content {
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left) !important;
  background: url(../assets/img/bg.png);
}
.modal-header {
  border: none;
}
.search-full {
  border: 5px solid transparent;
  border-image-source: url(../assets/img/border-frame.png);
  border-image-repeat: repeat;
  border-image-slice: 35;
  border-image-width: 30px;
  color: #fff;
  background: transparent;
  font-size: 35px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.7);
  padding: 10px;
  outline: none;
}
li.nav-item {
  list-style: none;
}
.result-list {
  height: 550px;
  padding-top: 10px;
  margin-top: 15px;
  padding-bottom: 10px;
}
</style>
