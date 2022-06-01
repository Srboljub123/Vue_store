<template>
  <div>
    <div class="row">
      <div class="col-md-12 mt-4 mb-2">
        <h1 class="shadows-font text-white text-start">Categorie</h1>
        <hr />
      </div>
      <div v-if="!loaded" class="col-12">
        <h4 class="text-white shadows-font text-center">
          Caricamento in corso...
        </h4>
      </div>

      <div
        v-for="(category, index) in categories.slice(0, 5)"
        :key="index"
        class="colonna-categorie col-12 mb-3"
      >
        <router-link :to="'/categorie-prodotti-venditori/' + category.term_id">
          <div class="card border-0 shadow rounded-3">
            <img :src="category.image_url" class="img-fluid rounded-3" />
            <div class="card-img-overlay">
              <h5
                class="card-title text-white shadows-font fw-bolder"
                v-html="category.name"
              ></h5>
              <p class="card-text text-white text-white shadows-font">
                Clicca e scopri di pi&ugrave;
              </p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-12">
        <router-link
          to="/categorie"
          class="btn btn-success w-100 mt-3 shadows-font fw-bold"
          >Scopri di più...</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LastCategories",
  data: function () {
    return {
      categories: [],
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
          "wp-json/dokan/v1/products/categories/"
      )
      .then((res) => {
        this.categories = res.data;
        this.loaded = true;
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.colonna-categorie {
  width: 50% !important;
}
.colonna-categorie:nth-child(3n + 1) {
  width: 100% !important;
}
</style>
