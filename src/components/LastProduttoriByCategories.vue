<template>
  <div
    :class="$route.path != '/' ? 'container container-prod' : 'container-prod'"
  >
    <div class="row">
      <div class="col-md-12 mt-4 mb-2">
        <h1 class="shadows-font text-white text-start">
          I Produttori di {{ this.$route.params.name }}
        </h1>
      </div>
      <div v-if="!loaded" class="col-12">
        <h4 class="text-white shadows-font text-center">
          Caricamento in corso...
        </h4>
      </div>
      <div v-if="$route.path == '/'" class="overflow-scroll d-flex">
        <div
          v-for="(produttore, index) in produttori"
          :key="index"
          class="col-6 mb-3"
        >
          <router-link
            :to="{
              name: 'Prodotti Venditori',
              params: { id: produttore.id, name: produttore.store_name },
            }"
          >
            <div class="card border-0 shadow rounded-3 me-3">
              <img :src="produttore.banner" class="img-fluid rounded-3" />
              <div class="card-img-overlay">
                <h5
                  class="card-title text-white shadows-font fw-bolder"
                  v-html="produttore.store_name"
                ></h5>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else>
        <div
          v-for="(produttore, index) in produttori"
          :key="index"
          class="col-12 mb-3"
        >
          <router-link
            :to="{
              name: 'Prodotti Venditori',
              params: { id: produttore.id, name: produttore.name },
            }"
          >
            <div class="card border-0 shadow rounded-3">
              <img :src="produttore.banner" class="img-fluid rounded-3" />
              <div class="card-img-overlay">
                <h5
                  class="card-title text-white shadows-font fw-bolder"
                  v-html="produttore.name"
                ></h5>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LastProduttoriByCategories",
  data: function () {
    return {
      produttori: [],
      loaded: false,
      store_url:
        JSON.parse(localStorage.getItem("selected_store")) ||
        "https://mercatoitinerante.it/torino-porta-palazzo/",
    };
  },
  created: function () {
    axios
      .get(
        this.store_url.mi_single_city_domain +
          "wp-json/dokan/v1/vendor/store-categories/" +
          this.$route.params.id
      )
      .then((res) => {
        this.produttori = res.data;
        this.loaded = true;
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-img-overlay h5 {
  position: absolute;
  bottom: 0;
  left: 10px;
}
</style>
