<template>
  <div class="blog-posts mt-3">
    <div v-if="!loaded" class="col-12 mt-3">
      <h4 class="text-white shadows-font text-center">
        Caricamento in corso...
      </h4>
    </div>
    <div class="row">
      <div class="col-md-3" v-for="(post, index) in posts" :key="index">
        <div class="card py-3 px-3">
          <div class="card-title">
            <h1
              class="shadows-font text-green"
              v-html="post.title.rendered"
            ></h1>
          </div>
          <div class="card-body">
            <p class="text-white" v-html="post.excerpt.rendered"></p>
            <router-link class="btn btn-primary" :to="'/articolo/' + post.id"
              >Scopri di pi&ugrave;</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "BlogList",
  data: function () {
    return {
      posts: [],
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
          "wp-json/wp/v2/posts/?_embed&per_page=100&status=publish"
      )
      .then((response) => {
        this.posts = response.data;
        this.loaded = true;
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  background: transparent !important;
  border: 15px solid;
  border-image-source: url(../assets/img/square-frame.png);
  border-image-repeat: revert;
  border-image-slice: 40;
  border-image-width: 20px;
}
</style>
