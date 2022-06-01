<template>
  <div class="container h-100">
    <div class="row">
      <div v-if="!loaded" class="col-12">
        <h4 class="text-white shadows-font text-center">
          Caricamento in corso...
        </h4>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-12 mb-3">
        <h1
          class="shadows-font text-green text-left"
          v-html="post.title.rendered"
        ></h1>
        <p class="ms-1 text-white" v-html="post.content.rendered"></p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SingleProduct",
  data: function () {
    return {
      post: [],
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
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData: function () {
      axios
        .get(
          this.store_url.mi_single_city_domain +
            "wp-json/wp/v2/posts/" +
            this.$route.params.id +
            "?_embed"
        )
        .then((res) => {
          this.post = res.data;
          this.loaded = true;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
