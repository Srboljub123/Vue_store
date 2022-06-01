<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1 class="shadows-font text-green mt-3">Registrati</h1>
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
      <div class="col-12 mt-3">
        <input
          type="password"
          class="form-control"
          v-model="password"
          placeholder="Password"
        />
      </div>
      <div class="col-12 mt-3">
        <input
          type="password"
          class="form-control"
          v-model="confirm_password"
          placeholder="Conferma Password"
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
        class="btn btn-primary mb-3"
        type="button"
        @click="handleRegister()"
      >
        Registrati
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "Login",
  data: function () {
    return {
      store:
        JSON.parse(localStorage.getItem("selected_store")) ||
        "https://mercatoitinerante.it/torino-porta-palazzo/",

      email: "",
      password: "",
      confirm_password: "",
      errors: [],
    };
  },
  methods: {
    handleRegister: function () {
      this.errors = [];

      if (!this.email) {
        this.errors.push("Indirizzo email richiesto.");
      }
      if (!this.password) {
        this.errors.push("Password richiesta.");
      }
      if (!this.confirm_password) {
        this.errors.push("Conferma Password richiesta.");
      }

      if (this.confirm_password != this.password) {
        this.errors.push("Le due password non coincidono.");
      }
      if (this.email && this.password && this.confirm_password) {
        axios
          .post(
            this.store.mi_single_city_domain + "wp-json/wp/v2/users/register",
            {
              username: this.email,
              email: this.email,
              password: this.password,
            }
          )
          .then(() => {
            Swal.fire(
              "Registrazione effettuata con successo",
              "Da adesso potrai accedere al tuo profilo appena.",
              "success"
            ).then(() => {
              this.$router.push("/login");
            });
          })
          .catch(() => {
            Swal.fire(
              "Registrazione non riuscita",
              "Assicurati di non essere già registrato in piattaforma.",
              "error"
            );
          });
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
.container {
  margin: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left) !important;
}
</style>