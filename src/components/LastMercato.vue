<template>
  <div>
    <div class="row">
      <div class="col-md-12 mt-4 mb-2">
        <h1 class="shadows-font text-white text-center text-capitalize">
          Il Mercato di {{ store_url.mi_city | removeDash }}
        </h1>
      </div>
      <div v-if="!loaded" class="col-12">
        <h4 class="text-white shadows-font text-center">
          Caricamento in corso...
        </h4>
      </div>
      <div class="d-flex overflow-scroll">
        <div
          v-for="(category, index) in mercato_categories"
          :key="index"
          class="colonna-categorie col-4 mb-3 me-3"
        >
          <router-link
            :to="{
              name: 'Categorie Mercati Produttori',
              params: { id: category.id, name: category.name },
            }"
          >
            <div class="card border-0 shadow rounded-3">
              <img
                :src="
                  category.immagine_categoria ? category.immagine_categoria : ''
                "
                class="img-fluid rounded-3"
              />
              <div class="card-img-overlay">
                <h5
                  class="card-title text-white shadows-font fw-bolder"
                  v-html="category.name"
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
  name: "LastMercato",
  data: function () {
    return {
      mercato_categories: [],
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
          "wp-json/dokan/v1/store-categories/"
      )
      .then((res) => {
        this.mercato_categories = res.data;
        this.loaded = true;
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-img-overlay h5 {
  bottom: 10px;
}
</style>
