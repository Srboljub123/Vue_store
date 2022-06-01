<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExample"
  >
    <div class="offcanvas-header">
      <h1 class="offcanvas-title text-green shadows-font" id="offcanvasLabel">
        Carrello
      </h1>
      <button
        type="button"
        class="btn-close btn-close-white"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body text-white">
      <div style="margin-bottom: 80px !important" class="row">
        <div v-for="(item, index) in cart" :key="index" class="col-12">
          <div class="card mx-3 my-3 px-3 py-3 shadow">
            <div class="row align-items-center">
              <div class="col-4">
                <img
                  class="img-fluid"
                  :src="item.images[0].src"
                  :alt="item.images[0].alt"
                />
              </div>
              <div class="col-8 text-center">
                <h5 class="text-start shadows-font">
                  {{ item.name | formatProductName }}
                </h5>
                <p class="text-capitalize text-start shadows-font">
                  {{ item.variation_name }}
                </p>

                <div class="quantity d-flex">
                  <span @click="quantityMinus(item)" class="minus">-</span>
                  <input
                    class="quantity-input border-0 text-center"
                    type="number"
                    v-model.number="item.qty"
                  />
                  <span @click="quantityPlus(item)" class="plus">+</span>
                </div>
                <span class="text-start text-white shadows-font"
                  >{{ item.price | priceFilter }} * {{ item.qty }} =
                  {{ item.totalPrice | priceFilter }}</span
                >
              </div>
              <div class="col-12">
                <button
                  @click="removeFromCart(item)"
                  class="d-block w-100 btn btn-danger mt-3"
                >
                  Rimuovi
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="total-fixed shadow pt-3 pb-3 row align-items-center">
          <hr />

          <div class="col-6 text-start">
            <h3 class="shadows-font text-start mt-1">
              Totale: {{ totalPrice | priceFilter }}
            </h3>
          </div>
          <div class="col-6 text-end" data-bs-dismiss="offcanvas">
            <router-link to="/checkout" class="btn btn-primary text-white w-100"
              >Vai alla Cassa</router-link
            >
          </div>
          <div class="col-12 text-start mt-3">
            <span class="shadows-font text-start">
              NB: Eventuali scontistiche per le attivit&agrave; commerciali
              verranno applicate alla cassa.
            </span>
          </div>
          <div class="col-12 mt-3" data-bs-dismiss="offcanvas">
            <button class="btn btn-danger text-white w-100" @click="emptyCart">
              Svuota carrello
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "CartModal",
  data: function () {
    return {
      cart: this.$store.state.cart,
      role: "",
      store_url:
        JSON.parse(localStorage.getItem("selected_store")) ||
        "https://mercatoitinerante.it/torino-porta-palazzo/",
    };
  },
  created: function () {
    axios
      .get(
        this.store_url.mi_single_city_domain +
          "wp-json/wc/v3/customers/" +
          this.$store.state.user.id
      )
      .then((response) => {
        this.role = response.data.role;
      });
  },
  computed: {
    totalPrice() {
      let total = 0;
      for (let item of this.cart) {
        total += parseFloat(item.totalPrice);
      }
      return total.toFixed(2);
    },
  },
  watch: {
    cart: {
      handler: function () {
        this.checkCart();
      },
      deep: true,
    },
  },

  methods: {
    emptyCart: function () {
      this.$store.commit("cleanCart");
    },
    quantityPlus: function (item) {
      this.$store.commit("quantityPlus", item);
    },
    quantityMinus: function (item) {
      this.$store.commit("quantityMinus", item);
    },
    removeFromCart: function (product) {
      this.$store.commit("removeFromCart", product);
      Swal.fire({
        icon: "success",
        title: "Prodotto rimosso.",
        html: "Il prodotto selezionato &egrave; stato rimosso con successo dal carrello.",
        confirmButtonText: "OK",
      });
    },
    checkCart: function () {
      if (this.role == "studente") {
        this.cart.map((obj) => {
          if (
            obj.meta_data.some(
              (item) => item.key === "prodotto_studente" && item.value === "yes"
            )
          ) {
            return obj;
          } else {
            this.$store.commit("removeFromCart", obj);
          }
        });
      }
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.offcanvas {
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left) !important;
  text-align: left;
  background: url("../assets/img/bg.png");
}
.card {
  border-radius: 10px;
}
.total-fixed {
  position: absolute;
  bottom: 0;
  right: 0;
  background: url("../assets/img/bg.png");
}
.card img:nth-child(1) {
  height: 90px;
  border-radius: 10px;
}
</style>
