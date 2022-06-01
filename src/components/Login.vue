<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1 class="shadows-font text-green mt-3">Accedi</h1>
        <hr />
      </div>
    </div>
    <!-- Dati personali -->
    <div class="form row">
      <div class="col-12">
        <input
          type="email"
          class="form-control"
          v-model="username"
          placeholder="Indirizzo Email"
        />
      </div>
      <div class="col-12 mt-3">
        <input
          type="password"
          class="form-control"
          v-model="password"
          placeholder="Password"
        />
      </div>
      <div class="col-12 mt-2">
        <a class="text-white fw-bold" :href="resetlink" target="_blank">
          Hai dimenticato la password? Clicca qui.
        </a>
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
        @click="handleLogin()"
      >
        Login
      </button>
      <router-link class="btn btn-primary mb-3" to="/registrati">
        Registrati
      </router-link>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Login",
  data: function () {
    return {
      username: null,
      password: null,
      errors: [],
      prevroute: null,
      store_url:
        JSON.parse(localStorage.getItem("selected_store")) ||
        "https://mercatoitinerante.it/torino-porta-palazzo/",
      resetlink: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
  created: function () {
    this.resetlink =
      this.store_url.mi_single_city_domain + "account/password-smarrita/";
      
  },
  methods: {
    handleLogin: function () {
      this.errors = [];

      if (!this.username) {
        this.errors.push("Indirizzo email richiesto.");
      }
      if (!this.password) {
        this.errors.push("Password richiesta.");
      }
      if (this.username && this.password) {
        let username = this.username;
        let password = this.password;
        this.$store
          .dispatch("login", { username, password })
          .then(() => {
            axios
              .get(
                this.store_url.mi_single_city_domain +
                  "wp-json/wc/v3/customers/" +
                  this.$store.state.user.id
              )
              .then((response) => {
                // console.log(response)
                if (response.data.role == "studente") {

                  this.$router.push("/area-studenti");
                } else {
                  this.$router.push("/");
                }
              });
          })
          .catch((err) => console.log(err));
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