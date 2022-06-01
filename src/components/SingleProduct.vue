<template>
  <div class="container-fluid">
    <div class="row">
      <div v-if="!loaded" class="col-12">
        <h4 class="text-white shadows-font text-center">
          Caricamento in corso...
        </h4>
      </div>

      <div class="col-md-12 mt-4 mb-2">
        <div
          id="CarouselIndicators"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div
              v-for="(image, index) in product.images"
              :key="index"
              class="carousel-item"
              :class="{ active: index === 0 }"
            >
              <img :src="image.src" class="img-fluid w-100" :alt="image.alt" />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#CarouselIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Precedente</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#CarouselIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Successiva</span>
          </button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 mb-3">
        <h1 class="shadows-font text-green text-left">
          {{ product.name | formatProductName }}
        </h1>
        <p
          class="ms-1 text-white"
          v-if="product.short_description"
          v-html="product.short_description"
        ></p>
        <hr />
        <p
          class="ms-1 text-white"
          v-if="product.description"
          v-html="product.description"
        ></p>

        <div v-if="product.type == 'simple'" class="row mt-2 pt-2">
          <div class="col-12">
            <h1 class="ms-1 text-white shadows-font">
              {{ product.price | priceFilter }} / {{ product.peso_mi }}
            </h1>
            <hr />
          </div>
          <div
            class="
              add-to-cart
              d-flex
              justify-content-between
              align-items-center
            "
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
        </div>

        <div v-else class="row mt-2 pt-2">
          <div class="col-12">
            <h1 class="text-green shadows-font">Opzioni Prodotto</h1>
            <hr />
          </div>

          <div class="row align-items-center">
            <div class="col-6">
              <div
                v-for="(variation, index) in product_variations"
                :key="index"
              >
                <div class="pretty p-default p-curve p-thick p-smooth">
                  <input
                    id="productVariationID"
                    @change="
                      variableSet(
                        variation.price,
                        variation.id,
                        variation.weight,
                        variation.attributes
                      )
                    "
                    type="radio"
                    name="productVariationID"
                  />
                  <div class="state p-danger-o">
                    <label
                      class="text-white text-capitalize"
                      v-for="(variationsingole, index) in variation.attributes"
                      :key="index"
                      >{{ variationsingole.option }}</label
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <h1 class="text-white text-center shadows-font fw-bold">
                {{ product.price | priceFilter }} / {{ product.peso_mi }}
              </h1>
            </div>
          </div>
          <div class="col-12">
            <hr />
          </div>
          <div
            class="
              add-to-cart
              d-flex
              justify-content-between
              align-items-center
            "
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
        </div>
        <h1 class="text-green shadows-font mt-3 mb-3">
          Informazioni Venditore
        </h1>
        <hr />
        <p class="text-white text-start">
          Venduto da
          <span class="text-green fw-bold shadows-font">
            <router-link
              class="text-green"
              :to="{
                name: 'Prodotti Venditori',
                params: {
                  name: product.store.name,
                  id: product.store.id,
                },
              }"
            >
              {{ product.store.name }}</router-link
            ></span
          >
        </p>
        <h1 class="text-green shadows-font mt-3 mb-3">Stagionalit&agrave;</h1>
        <hr />
        <p v-if="!product.stagione" class="text-white text-start">
          <span class="text-white fw-bold"
            >Il prodotto &egrave; disponibile tutto l'anno</span
          >
        </p>
        <p class="text-white" v-else>
          Il prodotto non &egrave; disponibile in
          <span
            class="fw-bold text-green text-green shadows-font"
            v-for="(stagione, index) in product.stagione"
            :key="index"
            >{{ stagione.name }}</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "SingleProduct",
  data: function () {
    return {
      product: [],
      product_variations: [],
      loaded: false,
      store_url:
        JSON.parse(localStorage.getItem("selected_store")) ||
        "https://mercatoitinerante.it/torino-porta-palazzo/",
    };
  },
  created: function () {
    this.fetchData();
  },
  methods: {
    fetchData: function () {
      axios
        .get(
          this.store_url.mi_single_city_domain +
            "wp-json/dokan/v1/products/" +
            this.$route.params.id
        )
        .then((res) => {
          if (res.data.type == "variable") {
            axios
              .get(
                this.store_url.mi_single_city_domain +
                  "wp-json/dokan/v1/products/" +
                  this.$route.params.id +
                  "/variations/"
              )
              .then((res) => {
                this.product_variations = res.data;
              });
          }
          this.product = res.data;
          this.loaded = true;
        });
    },
    variableSet: function (price, variation_id, peso_mi, variation_name) {
      this.product.price = price;
      this.product.variation_id = variation_id;
      this.product.weight = peso_mi;
      this.product.variation_name = variation_name[0].option;
    },
    handlePlus: function (product) {
      product.qty++;
    },
    handleMinus: function (product) {
      product.qty--;
    },
    addtoCart: function (item) {
      if (item.type != "simple" && !item.variation_id) {
        Swal.fire({
          icon: "error",
          title: "Seleziona almeno una variazione",
          html: "Seleziona almeno una variazione del prodotto per continuare.",
          confirmButtonText: "OK",
        });
      } else {
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
      }
    },
  },
  watch: {
    $route: "fetchData",
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "~pretty-checkbox/dist/pretty-checkbox.min.css";
.pretty.p-default:not(.p-fill) input:checked ~ .state.p-danger-o label:after {
  background-color: #84c13f !important;
}
.pretty input:checked ~ .state.p-danger-o label:before,
.pretty.p-toggle .state.p-danger-o label:before {
  border-color: #84c13f;
}
.carousel {
  position: relative;
  position: relative;
  border: 15px solid;
  border-image-source: url("../assets/img/square-frame.png");
  border-image-repeat: revert;
  border-image-slice: 40;
  border-image-width: 20px;
  display: block;
  max-height: 450px;
  width: 100%;
  overflow: hidden;
}
</style>
