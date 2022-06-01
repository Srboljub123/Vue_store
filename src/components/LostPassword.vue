<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1 class="shadows-font text-green mt-3">Password dimenticata</h1>
        <hr />
      </div>
    </div>
    <!-- Dati personali -->
    <div class="form row">
      <div class="col-12">
        <input
          type="email"
          class="form-control"
          v-model="email"
          placeholder="Indirizzo Email"
        />
      </div>
    </div>
    <div class="col-12 mt-3">
      <p class="text-danger" v-for="(error, index) in errors" :key="index">
        {{ error }}
      </p>
    </div>
    <div class="col-12 mt-3">
      <button
        class="btn btn-primary mb-3 me-3"
        type="button"
        @click="recoverPassword()"
      >
        Login
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data: function () {
    return {
      email: "",
      errors: [],
    };
  },
  methods: {
    recoverPassword: function () {
      this.errors = [];

      if (!this.email) {
        this.errors.push("Indirizzo email richiesto.");
      }
    },
  },
};
</script>
<style scoped>
@import "~pretty-checkbox/dist/pretty-checkbox.min.css";
.pretty.p-default:not(.p-fill) input:checked ~ .state.p-danger-o label:after {
  background-color: #84c13f !important;
}
.pretty input:checked ~ .state.p-danger-o label:before,
.pretty.p-toggle .state.p-danger-o label:before {
  border-color: #84c13f;
}
.card {
  border-radius: 10px;
}

.card img:nth-child(1) {
  height: 90px;
  border-radius: 10px;
}
.form-control {
  background-color: transparent;
  box-shadow: unset;
  border: 10px solid;
  border-image-source: url("../assets/img/border-frame.png");
  border-image-repeat: revert;
  border-image-slice: 40;
  border-image-width: 20px;
  color: #fff !important;
}
::-webkit-input-placeholder {
  color: #fff;
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: #fff;
}
:-ms-input-placeholder {
  color: #fff;
}
:-moz-placeholder {
  /* Firefox 18- */
  color: #fff;
}
</style>