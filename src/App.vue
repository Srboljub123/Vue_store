<template>
  <div id="app">
    <NavBar v-if="$route.path != '/seleziona-mercato'" />
    <router-view />
    <Footer />
    <div
      v-if="update"
      class="check-update d-flex justify-content-between align-items-center"
    >
      <img
        class="me-3"
        src="./assets/img/update.png"
        alt="update-app"
        width="50"
        height="50"
      />
      <p class="text-white shadows-font">
        &Egrave; disponibile una nuova versione dell'App, aggiornala adesso per
        evitare eventuali malfunzionamenti.
        <a
          href="https://apps.apple.com/it/app/mercato-itinerante/id1568304416"
          v-if="is_iOS"
          target="_blank"
          class="btn btn-primary mt-2"
        >
          Vai sull'AppStore
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.mercatoitinerante.android"
          v-else
          target="_blank"
          class="btn btn-primary mt-2"
        >
          Vai sul Play Store
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import store from "./store.js";
import { Device } from "@capacitor/device";
import { App } from "@capacitor/app";
export default {
  name: "App",
  components: {
    NavBar,
    Footer,
  },
  data: function () {
    return {
      ios: 0,
      android: 0,
      is_iOS: false,
      actual_version: 0,
      update: false,
      app: null,
      device: null,
    };
  },
  computed: {
    device_info: function () {
      return this.device.platform;
    },
  },
  created: function () {
    var self = this;
    axios
      .get("https://mercatoitinerante.it/wp-json/wp/v2/mi-version")
      .then((res) => {
        this.ios = res.data[0].ios;
        this.android = res.data[0].android;
        this.getInfos().then(() => this.checkAppVersion());
      });
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.response.status === 401) {
          store.dispatch("expired");
        }

        if (err.response.status === 403 && self.$route.path != "/login") {
          store.dispatch("expired");
        }

        if (err.response.status === 403 && self.$route.path == "/login") {
          store.commit("auth_error");
        }

        return Promise.reject(err);
      });
    });
  },
  methods: {
    getInfos: async function () {
      this.app = await App.getInfo();
      this.device = await Device.getInfo();
    },
    checkAppVersion: function () {
      if (this.device.platform == "android") {
        if (this.app.build < this.android) {
          this.update = true;
          this.is_iOS = false;
        }
      } else if (this.device.platform == "ios") {
        if (this.app.version < this.ios) {
          this.update = true;
          this.is_iOS = true;
        }
      }
    },
  },
};
</script>
<style scoped>
.check-update {
  background: url("./assets/img/bg.png");
  border-top: 5px solid #84c23f;
  padding-left: 15px;
  padding-top: 20px;
  padding-bottom: 20px;
  position: fixed;
  bottom: 0;
}
</style>

