<template>
  <div class="shadow" id="header">
    <div id="nav">
      <div class="d-flex actions">
        <a
          class="ms-1 me-3"
          data-bs-toggle="offcanvas"
          href="#offcanvasCategories"
          role="button"
          aria-controls="offcanvasCategories"
        >
          <img width="30" src="../assets/img/menu-icon-mi.png" alt=""
        /></a>
      </div>
      <router-link to="/"
        ><img src="../assets/img/logo.png" width="150"
      /></router-link>
      <div class="d-flex actions">
        <router-link
          v-if="role != 'studente'"
          class="ms-3 me-1"
          to=""
          data-bs-toggle="modal"
          data-bs-target="#SearchModal"
        >
          <img
            class="icon-mi-header search"
            width="25"
            src="../assets/img/search-icon-mi.svg"
            alt=""
          />
        </router-link>
        <router-link class="ms-3 me-3" to="/profilo" v-if="isLoggedIn">
          <img
            class="icon-mi-header"
            width="25"
            src="../assets/img/user-icon-mi-logged.svg"
            alt=""
          />
        </router-link>
        <router-link class="ms-3" to="/login" v-else>
          <img
            class="icon-mi-header me-3"
            width="25"
            src="../assets/img/user-icon-mi.svg"
            alt=""
          />
        </router-link>
        <router-link
          data-bs-toggle="offcanvas"
          aria-controls="cartModal"
          to=""
          data-bs-target="#offcanvasExample"
        >
          <img
            class="icon-mi-header me-3"
            width="25"
            src="../assets/img/basket-icon-mi.svg"
            alt=""
          />
          <span class="cart-items">{{ $store.state.cartCount }}</span>
        </router-link>
      </div>
      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasCategories"
        aria-labelledby="offcanvasCategoriesLabel"
      >
        <div class="offcanvas-header">
          <h5
            class="offcanvas-title shadows-font text-white"
            id="offcanvasCategoriesLabel"
          ></h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav flex-direction-column me-auto mb-2 mb-lg-0">
            <h1 class="text-white shadows-font mb-0">Menu</h1>
            <hr />
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <router-link
                class="nav-link shadows-font"
                aria-current="page"
                to="/"
                >Home</router-link
              >
            </li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <router-link
                class="nav-link shadows-font"
                aria-current="page"
                to="/area-studenti"
                >Area Studenti</router-link
              >
            </li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <router-link
                class="nav-link shadows-font"
                aria-current="page"
                to="/seleziona-mercato"
                >Seleziona un altro Mercato</router-link
              >
            </li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <router-link
                class="nav-link shadows-font"
                aria-current="page"
                to="/produttori"
                >Venditori</router-link
              >
            </li>

            <li class="nav-item" data-bs-dismiss="offcanvas">
              <router-link
                class="nav-link shadows-font"
                aria-current="page"
                to="/chi-siamo"
                >Chi Siamo</router-link
              >
            </li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <router-link
                class="nav-link shadows-font"
                aria-current="page"
                to="/blog"
                >Blog</router-link
              >
            </li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <router-link
                class="nav-link shadows-font"
                aria-current="page"
                to="/contatti"
                >Contatti</router-link
              >
            </li>
            <hr />
            <p
              v-if="!isLoggedIn"
              class="text-white d-flex align-items-center"
              data-bs-dismiss="offcanvas"
            >
              <router-link to="/login" class="nav-link shadows-font me-3"
                >Accedi</router-link
              >
              - o -
              <router-link to="/registrati" class="nav-link shadows-font ms-3"
                >Registrati</router-link
              >
            </p>

            <li v-if="isLoggedIn" class="nav-item" data-bs-dismiss="offcanvas">
              <a href="#" class="nav-link shadows-font" @click="logout()"
                >Esci dal tuo profilo</a
              >
            </li>
            <div class="studente" v-if="role != 'studente'">
              <h1 class="text-white shadows-font mt-3 mb-0">Categorie</h1>
              <hr />
              <div v-if="!loaded" class="col-12">
                <h4 class="text-white shadows-font text-start">
                  Caricamento in corso...
                </h4>
              </div>
              <div
                v-for="(categoria, index) in categorie"
                :key="index"
                class="dropdown"
              >
                <button
                  class="btn btn-transparent dropdown-toggle shadows-font"
                  type="button"
                  id="child-categories"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  v-html="categoria.name"
                ></button>
                <ul class="dropdown-menu" aria-labelledby="child-categories">
                  <router-link
                    class="nav-link shadows-font"
                    aria-current="page"
                    :to="'/categorie-prodotti-venditori/' + categoria.term_id"
                    v-html="categoria.name"
                  ></router-link>
                  <li
                    v-for="(nome, index) in categoria.child"
                    :key="index"
                    class="nav-item text-light"
                    data-bs-dismiss="offcanvas"
                  >
                    <router-link
                      class="nav-link shadows-font"
                      aria-current="page"
                      :to="'/categorie-prodotti-venditori/' + nome.term_id"
                      v-html="nome.name"
                    ></router-link>
                  </li>
                </ul>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <SearchModal />
      <CartModal />
    </div>
  </div>
</template>

<script>
import SearchModal from "@/components/SearchModal.vue";
import CartModal from "@/components/CartModal.vue";

import axios from "axios";
export default {
  name: "NavBar",
  components: { SearchModal, CartModal },
  data: function () {
    return {
      categorie: [],
      loaded: false,
      store_url: JSON.parse(localStorage.getItem("selected_store")),
      role: "",
    };
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
  created: function () {
    if (this.store_url) {
      axios
        .get(
          this.store_url.mi_single_city_domain +
            "wp-json/dokan/v1/products/categories/"
        )
        .then((response) => {
          this.categorie = response.data;
          this.loaded = true;
        });
    }
  },
  watch: {
    isLoggedIn() {
      axios
        .get(
          this.store_url.mi_single_city_domain +
            "wp-json/wc/v3/customers/" +
            this.$store.state.user.id
        )
        .then((response) => {
          this.role = response.data.role;
          this.loaded = true;
        });
    },
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#nav {
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
  background: url("../assets/img/bg.png");
  width: 100%;
}
.nav-link {
  display: block;
  text-decoration: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
  text-align: left;
  color: white !important;
  font-size: 20px;
}

.offcanvas {
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left) !important;
  text-align: left;
  background: url(/img/bg.6fb19d93.png);
}
.offcanvas-title {
  font-size: 30px;
}
.cart-items {
  right: 25px;
  position: absolute;
  border-radius: 50%;
  font-size: 10px;
  width: 15px;
  line-height: 15px;
  background: #84c23f;
  text-align: center;
  color: #fff;
  font-weight: bold;
}
.btn-transparent {
  color: #fff;
  background-color: transparent;
  border-color: transparent;
  outline: none;
  box-shadow: none !important;
  font-size: 18px;
}
.btn:hover {
  color: #fff;
}
.dropdown-menu {
  inset: 0px auto auto 0px;
  margin: 0px;
  transform: none !important;
  position: inherit !important;
  padding: 0.5rem 25px !important;

  background-color: transparent;
  border: none;
}
.search {
  transform: rotate(20deg);
}
.dropdown-menu li a {
  font-size: 17px;
}
</style>
