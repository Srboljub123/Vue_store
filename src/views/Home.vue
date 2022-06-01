<template>
  <div class="container-fluid content-view home-screen">
    <div class="row">
      <div class="col-md-12">
        <div class="slide mb-3">
          <section
            class="hero-header"
            :style="
              'background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(' +
              home_page.foto_mercato +
              ')'
            "
          >
            <h1 class="text-green shadows-font">Mercato Itinerante</h1>
            <p class="px-2 py-2 text-capitalize">
              {{ home_page.descrizione_mercato }}
            </p>
          </section>
        </div>
      </div>
    </div>
    <LastMercato />
    <!-- Sostenibilità -->
    <div class="row">
      <div class="col-md-12 mt-3">
        <h1 class="shadows-font text-white text-center">
          Come siamo sostenibili?
        </h1>
      </div>
      <div
        v-for="(lista_sostenibilita, index) in home_page.sostenibilita"
        :key="index"
        class="col-md-12 mt-3 mb-3"
      >
        <img
          class="text-center d-block mx-auto"
          :src="lista_sostenibilita.immagine"
          width="100"
        />
        <h3 class="shadows-font text-green text-center mt-3">
          {{ lista_sostenibilita.titolo }}
        </h3>
        <p class="text-white text-center">
          {{ lista_sostenibilita.descrizione }}
        </p>
      </div>
    </div>
    <!-- Fine Sostenibilità -->
    <hr />
    <!-- Riciclo -->
    <div class="row">
      <div
        v-for="(lista_contatori, index) in home_page.contatori"
        :key="index"
        class="col-md-12 mt-3 mb-3"
      >
        <img
          class="text-center d-block mx-auto"
          :src="lista_contatori.immagine"
          width="60"
        />
        <h3 class="shadows-font text-center mt-3 counter">
          {{ lista_contatori.numero }}
        </h3>
        <p class="text-white text-center">{{ lista_contatori.titolo }}</p>
      </div>
    </div>
    <!-- Fine Riciclo -->
    <hr />

    <!-- Lista Produttori Home -->
    <LastProduttori />
    <!-- Fine Produttori Home -->

    <!-- Lista Categorie Home -->
    <LastCategories />
    <!-- Fine Categorie Home -->
    <div class="row">
      <div class="col-md-12 mt-4 mb-2"></div>
      <div class="d-flex flex-row flex-nowrap overflow-scroll"></div>
    </div>

    <LastProducts />
    <hr />
    <div class="row">
      <div class="col-md-12 mt-3">
        <h1 class="shadows-font text-white text-center">Dicono di noi</h1>
      </div>
      <div class="d-flex align-items-center">
        <div class="col-4 mt-3">
          <a
            href="https://torino.corriere.it/food/21_gennaio_24/con-startup-porta-palazzo-spesa-mercato-si-fa-casa-ec784afa-5e2d-11eb-9d4d-6cce1a220c09.shtml"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              class="d-block mx-auto img-fluid me-3"
              src="../assets/img/corriere.png"
              width="150"
              alt="Corriere della Sera"
            />
          </a>
        </div>
        <div class="col-4 mt-3">
          <a
            href="https://www.gamberorosso.it/notizie/mercato-itinerante-la-startup-di-torino-che-permette-di-fare-la-spesa-a-porta-palazzo-da-casa/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              class="d-block mx-auto img-fluid me-4 pe-3"
              src="../assets/img/gambero.png"
              width="135"
              alt="Gambero Rosso"
            />
          </a>
        </div>
        <div class="col-4 mt-3">
          <a
            href="https://www.lastampa.it/torinosette/rubriche/vicini-da-gustare/2021/02/05/news/con-il-mercato-itinerante-da-porta-palazzo-la-spesa-arriva-a-casa-tua-pedalando-1.39863587"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              class="d-block mx-auto img-fluid me-4"
              src="../assets/img/lastampa.png"
              width="150"
              alt="La Stampa"
            />
          </a>
        </div>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-md-12 mt-3">
        <h1 class="shadows-font text-white text-center">Collaboriamo con</h1>
      </div>
      <div class="d-flex align-items-center">
        <div class="col-4 mt-3">
          <img
            class="d-block mx-auto img-fluid me-3"
            src="../assets/img/mip.png"
            width="150"
            alt="Corriere della Sera"
          />
        </div>
        <div class="col-4 mt-3">
          <img
            class="d-block mx-auto img-fluid me-4"
            src="../assets/img/reseau.png"
            width="135"
            alt="Reseau"
          />
        </div>
        <div class="col-4 mt-3">
          <img
            class="d-block mx-auto img-fluid me-3"
            src="../assets/img/torino.png"
            width="150"
            alt="Torino Social Impact"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LastProducts from "@/components/LastProducts.vue";
import LastCategories from "@/components/LastCategories.vue";
import LastProduttori from "@/components/LastProduttori.vue";
import LastMercato from "@/components/LastMercato.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    LastProducts,
    LastCategories,
    LastProduttori,
    LastMercato,
  },
  data: function () {
    return {
      store_url:
        JSON.parse(localStorage.getItem("selected_store")) ||
        "https://mercatoitinerante.it/torino-porta-palazzo/",
      home_page: [],
    };
  },
  created: function () {
    axios
      .get(this.store_url.mi_single_city_domain + "wp-json/wp/v2/homepage")
      .then((res) => {
        this.home_page = res.data;
      });
  },
};
</script>

<style scoped>
.hero-header {
  height: 400px;
  width: 100%;
  text-align: center;
  padding-top: 150px;
  color: white;
  overflow: hidden;
  background: #000000;
  background-size: cover !important;
  background-repeat: no-repeat !important;
}
.slide {
  border: 15px solid;
  border-image-source: url(../assets/img/square-frame.png);
  border-image-repeat: revert;
  border-image-slice: 40;
  border-image-width: 20px;
}
.counter {
  display: block;
  font-size: 70px;
  font-weight: 400;
  color: #a6951a !important;
  line-height: 30px;
  font-family: "Shadows into light";
}
</style>