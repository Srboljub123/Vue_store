<template>
  <div class="footer shadow">
    <div class="container">
      <div class="row">
        <button
          v-if="$route.path != '/'"
          class="back-button btn btn-primary"
          @click="$router.go(-1)"
        >
          <img src="../assets/img/left.png" width="25" />
        </button>
        <div class="col-12">
          <img
            class="d-block mx-auto pb-3"
            src="../assets/img/logo.png"
            alt="Logo Mercato Itinerante"
            width="150"
          />
          <p class="text-center text-white credit">
            Copyright© {{ data }} Mercato Itinerante Srl. <br />Via Onorato
            Vigliani 25/16, 10127, Torino, Italia | P.IVA 12289520012
            <br />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Footer",
  data: function () {
    return {
      data: moment().format("YYYY"),
    };
  },
};
</script>
<style scoped>
.footer {
  background: #84c23f;
  padding-top: 15px;
}
.credit {
  font-size: 14px;
}
.back-button {
  position: fixed;
  bottom: 25px;
  left: 15px;
  width: auto;
  height: 50px;
}
</style>