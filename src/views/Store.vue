<template>
  <div class="container-fluid content-view home-screen">
    <div class="row">
      <div class="col-md-12 text-center">
        <router-link to="/">
          <img
            class="img-fluid mb-3"
            src="../assets/img/logo.png"
            alt="logo-mercato-itinerante"
            width="250"
          />
        </router-link>
        <h4 class="text-green shadows-font mt-3">
          Benvenuto su Mercato Itinerante.
        </h4>
        <p class="text-white text-center mt-1">
          Seleziona in quale Mercato vuoi acquistare i tuoi prodotti.
        </p>
      </div>
    </div>
    <SelectStores />
  </div>
</template>
<script>
import SelectStores from "@/components/SelectStores.vue";
export default {
  name: "Home",
  components: {
    SelectStores,
  },
};
</script>

<style scoped>
</style>