<template>
  <div>
    <div class="row">
      <div v-if="!loaded" class="col-12 mt-3">
        <h4 class="text-white shadows-font text-center">
          Caricamento in corso...
        </h4>
      </div>
      <div
        v-for="(store, index) in stores"
        :key="index"
        class="col-12 text-center mt-3"
      >
        <router-link to="" @click.native="setShop(store)">
          <img
            class="store-img"
            width="400"
            height="200"
            :src="store.mi_image_primary"
          />
          <h5 class="shadows-font fw-bold text-green text-center">
            Scopri il Mercato di
            <span class="text-capitalize">{{
              store.mi_city | removeDash
            }}</span>
          </h5>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "SelectStores",
  data: function () {
    return {
      stores: [],
      loaded: false,
      selected_store: JSON.parse(localStorage.getItem("selected_store")) || [],
    };
  },
  created: function () {
    axios
      .get("https://mercatoitinerante.it/wp-json/wp/v2/mi-locations")
      .then((response) => {
        this.stores = response.data;
        this.loaded = true;
      });
  },
  methods: {
    setShop: function (store) {
      if (this.selected_store) {
        localStorage.removeItem("selected_store");
      }

      localStorage.setItem("selected_store", JSON.stringify(store));
      Swal.fire({
        icon: "success",
        title: "Mercato impostato con successo!",
        html: "Clicca su 'Vai al Mercato scelto' per visionare gi&agrave; da subito i prodotti disponibili",
        confirmButtonText: "Vai al Mercato scelto!",
      }).then((res) => {
        if (res.isConfirmed) {
          this.$router.push({ path: "/" });
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.store-img {
  object-fit: cover;
  box-shadow: unset;
  border: 15px solid;
  border-image-source: url(../assets/img/square-frame.png);
  border-image-repeat: revert;
  border-image-slice: 40;
  border-image-width: 20px;
  width: 250px;
}
</style>
