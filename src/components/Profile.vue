<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div
              class="list-group mt-3 overflow-scroll"
              id="list-tab"
              role="tablist"
            >
              <a
                class="list-group-item list-group-item-action active"
                id="list-bacheca-list"
                data-bs-toggle="list"
                href="#list-bacheca"
                role="tab"
                aria-controls="list-bacheca"
                >Bacheca</a
              >
              <a
                class="list-group-item list-group-item-action"
                id="list-ordini-list"
                data-bs-toggle="list"
                href="#list-ordini"
                role="tab"
                aria-controls="list-ordini"
                >I miei ordini</a
              >
              <a
                class="list-group-item list-group-item-action"
                id="list-indirizzi-list"
                data-bs-toggle="list"
                href="#list-indirizzi"
                role="tab"
                aria-controls="list-indirizzi"
                >Indirizzi</a
              >
              <a
                class="list-group-item list-group-item-action"
                id="list-account-list"
                data-bs-toggle="list"
                href="#list-account"
                role="tab"
                aria-controls="list-account"
                >Account</a
              >
              <a
                @click="logout()"
                class="list-group-item list-group-item-action"
                id="list-settings-list"
                data-bs-toggle="list"
                href="#list-settings"
                role="tab"
                aria-controls="list-settings"
                >Logout</a
              >
            </div>
          </div>
          <div class="col-12">
            <div class="tab-content" id="nav-tabContent">
              <div
                class="tab-pane fade show active"
                id="list-bacheca"
                role="tabpanel"
                aria-labelledby="list-bacheca-list"
              >
                <div class="card card-body mt-3 mb-3">
                  <p class="text-white">
                    Dalla bacheca del tuo account puoi visualizzare i tuoi
                    ordini recenti, gestire i tuoi indirizzi di spedizione e
                    fatturazione e modificare la password e i dettagli
                    dell'account.
                    <span class="d-block mt-3" v-if="!customer_id.role">
                      Sei un produttore?
                      <button
                        type="button"
                        class="btn btn-primary"
                        @click="produttoreDashboard"
                      >
                        Vai alla tua Dashboard
                      </button>
                    </span>
                  </p>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="list-ordini"
                role="tabpanel"
                aria-labelledby="list-ordini-list"
              >
                <div class="row">
                  <div
                    v-for="(ordine, index) in ordini"
                    :key="index"
                    class="col-md-12 w-100"
                  >
                    <div class="card card-ordini py-3 px-3 mb-3 mt-3">
                      <h5
                        class="text-left text-green shadows-font mb-0"
                        :key="index"
                      >
                        Ordine #{{ ordine.id }} del
                        {{ ordine.date_created | formatDate }}
                      </h5>
                      <hr class="mx-0 my-0 mb-2 mt-2" />
                      <p class="text-white">
                        Pagato
                        <span
                          class="text-white"
                          v-if="ordine.payment_method == 'cod'"
                          >con con Contanti/Satispay</span
                        >
                        <span class="text-capitalize" v-else>{{
                          ordine.payment_method
                        }}</span>
                      </p>
                      <p
                        v-if="ordine.status == 'completed'"
                        class="text-left text-green"
                      >
                        Stato: Completato
                      </p>
                      <p
                        v-else-if="ordine.status == 'processing'"
                        class="text-left text-green"
                      >
                        Stato: In lavorazione
                      </p>
                      <p
                        v-else-if="ordine.status == 'pending'"
                        class="text-left text-warning"
                      >
                        Stato: In attesa di pagamento
                      </p>
                      <p
                        v-else-if="ordine.status == 'cancelled'"
                        class="text-left text-danger"
                      >
                        Stato: Cancellato
                      </p>
                      <p
                        v-else-if="ordine.status == 'refunded'"
                        class="text-left text-green"
                      >
                        Stato: Rimborsato
                      </p>
                      <p
                        v-else-if="ordine.status == 'failed'"
                        class="text-left text-danger"
                      >
                        Stato: Fallito
                      </p>
                      <p
                        v-else-if="ordine.status == 'on-hold'"
                        class="text-left text-warning"
                      >
                        Stato: In sospeso
                      </p>
                      <p v-else class="text-left text-warning">
                        Stato: In sospeso
                      </p>
                      <p class="text-left text-white">
                        <i class="fas fa-money-check"></i>
                        Totale ordine: {{ ordine.total | priceFilter }}
                      </p>
                      <button
                        class="btn btn-primary dropdown-toggle"
                        data-bs-toggle="collapse"
                        :data-bs-target="'#ordini' + index"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        Visualizza dettagli ordine
                      </button>
                      <div class="collapse" :id="'ordini' + index">
                        <div class="card card-body">
                          <p class="text-white">
                            {{ ordine.billing.first_name }}
                            {{ ordine.billing.last_name }}
                          </p>
                          <p class="text-white">
                            {{ ordine.billing.email }} -
                            {{ ordine.billing.phone }}
                          </p>

                          <p class="text-white">
                            {{ ordine.billing.address_1 }},
                            {{ ordine.billing.city }},
                            {{ ordine.billing.state }},
                            {{ ordine.billing.postcode }},
                            {{ ordine.billing.country }}
                          </p>

                          <p class="text-white">Prodotti acquistati:</p>
                          <ul>
                            <li
                              v-for="(prodotto, index) in ordine.line_items"
                              :key="index"
                              class="nav-item text-light"
                              data-bs-dismiss="offcanvas"
                            >
                              {{ prodotto.name }} x
                              {{ prodotto.quantity }}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="list-indirizzi"
                role="tabpanel"
                aria-labelledby="list-indirizzi-list"
              >
                <h3 class="text-green shadows-font mt-3">
                  Dati personali (utilizzati per la consegna dei tuoi ordini)
                </h3>
                <hr />
                <div class="card card-body mt-3 mb-3">
                  <div class="form row">
                    <div class="col">
                      <input
                        required
                        type="text"
                        class="form-control"
                        v-model="customerDetails.billing.first_name"
                        placeholder="Nome"
                      />
                    </div>
                    <div class="col">
                      <input
                        required
                        type="text"
                        class="form-control"
                        v-model="customerDetails.billing.last_name"
                        placeholder="Cognome"
                      />
                    </div>
                  </div>
                  <div class="form row mt-3">
                    <div class="col">
                      <input
                        required
                        type="text"
                        class="form-control"
                        v-model="customerDetails.billing.company"
                        placeholder="Denominazione Azienda"
                      />
                    </div>
                  </div>

                  <div class="form row mt-3">
                    <div class="col">
                      <input
                        required
                        type="text"
                        class="form-control"
                        v-model="customerDetails.billing.address_1"
                        placeholder="Indirizzo di Fatturazione"
                      />
                    </div>
                  </div>
                  <div class="form row mt-3">
                    <div class="col">
                      <input
                        required
                        type="number"
                        class="form-control"
                        v-model="customerDetails.billing.postcode"
                        placeholder="CAP"
                      />
                    </div>
                  </div>
                  <div class="form row mt-3">
                    <div class="col">
                      <input
                        required
                        type="text"
                        class="form-control"
                        v-model="customerDetails.billing.city"
                        placeholder="Citta'"
                      />
                    </div>
                  </div>
                  <div class="form row mt-3">
                    <div class="col">
                      <input
                        required
                        type="tel"
                        class="form-control"
                        v-model="customerDetails.billing.phone"
                        placeholder="Telefono"
                      />
                    </div>
                  </div>
                  <div class="form row mt-3">
                    <div class="col">
                      <input
                        required
                        type="email"
                        class="form-control"
                        v-model="customerDetails.billing.email"
                        placeholder="Indirizzo Email"
                      />
                    </div>
                  </div>
                  <div class="form row mt-3">
                    <div class="col-12">
                      <button @click="saveData()" class="btn btn-primary">
                        Salva i dati
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="list-account"
                role="tabpanel"
                aria-labelledby="list-account-list"
              >
                <h3 class="text-green shadows-font mt-3">
                  Dati account (utilizzati per l'accesso al tuo profilo)
                </h3>
                <hr />
                <div class="card card-body mt-3 mb-3">
                  <div class="form row">
                    <div class="col">
                      <input
                        required
                        type="text"
                        class="form-control"
                        v-model="account.first_name"
                        placeholder="Nome"
                      />
                    </div>
                    <div class="col">
                      <input
                        required
                        type="text"
                        class="form-control"
                        v-model="account.last_name"
                        placeholder="Cognome"
                      />
                    </div>
                  </div>

                  <div class="form row mt-3">
                    <div class="col">
                      <input
                        required
                        type="email"
                        class="form-control"
                        v-model="account.user_email"
                        placeholder="Indirizzo Email"
                      />
                    </div>
                  </div>
                  <div class="form row mt-3">
                    <div class="col">
                      <input
                        required
                        type="password"
                        class="form-control"
                        v-model="account.new_password"
                        placeholder="Password"
                      />
                    </div>
                    <span class="text-danger mt-2">
                      *Lascia il campo Password vuoto se non vuoi modificarla.
                    </span>
                  </div>

                  <div class="form row mt-3">
                    <div class="col-12">
                      <button @click="saveAccount()" class="btn btn-primary">
                        Salva i dati
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "Profile",
  data: function () {
    return {
      ordini: [],
      customer_id: this.$store.state.user,
      account: {
        first_name: "",
        last_name: "",
        user_email: "",
        new_password: "",
      },
      customerDetails: {
        billing: {
          first_name: "",
          last_name: "",
          address_1: "",
          company: "",
          city: "",
          state: "Italia",
          postcode: "",
          country: "IT",
          email: "",
          phone: "",
        },
      },
      store_url:
        JSON.parse(localStorage.getItem("selected_store")) ||
        "https://mercatoitinerante.it/torino-porta-palazzo/",
    };
  },
  created: function () {
    axios
      .get(
        this.store_url.mi_single_city_domain +
          "wp-json/wc/v3/orders?customer=" +
          this.customer_id.id +
          "&per_page=100"
      )
      .then((response) => {
        this.ordini = response.data;
      });

    axios
      .get(
        this.store_url.mi_single_city_domain +
          "wp-json/wc/v3/customers/" +
          this.customer_id.id
      )
      .then((response) => {
        this.customerDetails.billing.first_name =
          response.data.billing.first_name;
        this.customerDetails.billing.last_name =
          response.data.billing.last_name;
        this.customerDetails.billing.address_1 =
          response.data.billing.address_1;
        this.customerDetails.billing.city = response.data.billing.city;
        this.customerDetails.billing.state = response.data.billing.state;
        this.customerDetails.billing.postcode = response.data.billing.postcode;
        this.customerDetails.billing.country = response.data.billing.country;
        this.customerDetails.billing.email = response.data.billing.email;
        this.customerDetails.billing.phone = response.data.billing.phone;
        this.customerDetails.billing.company = response.data.billing.company;
        this.account.first_name = this.customer_id.firstName;
        this.account.last_name = this.customer_id.lastName;
        this.account.user_email = this.customer_id.email;
        this.account.new_password = "";
      });
  },
  methods: {
    produttoreDashboard: function () {
      window.open(
        this.store_url.mi_single_city_domain +
          "wp-json/wp/v2/auto-login?redirect_url=" +
          this.store_url.mi_single_city_domain +
          "dashboard&token=" +
          this.customer_id.token,
        "_blank"
      );
    },
    saveData: function () {
      axios
        .put(
          this.store_url.mi_single_city_domain +
            "wp-json/wc/v3/customers/" +
            this.customer_id.id,
          this.customerDetails
        )
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Dati aggiornati con successo",
            html: "I tuoi dati sono stati aggiornati con successo.",
            confirmButtonText: "OK",
          }).then((res) => {
            if (res.isConfirmed) {
              location.reload();
            }
          });
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Errore durante il salvataggio",
            html: "I tuoi dati non sono stati aggiornati.",
            confirmButtonText: "OK",
          });
        });
    },
    saveAccount() {
      axios
        .post(
          this.store_url.mi_single_city_domain +
            "wp-json/wp/v2/users/change-data",
          this.account
        )
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Dati aggiornati con successo",
            html: "I tuoi dati sono stati aggiornati con successo.",
            confirmButtonText: "OK",
          }).then((res) => {
            if (res.isConfirmed) {
              this.logout();
            }
          });
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Errore durante il salvataggio",
            html: "I tuoi dati non sono stati aggiornati.",
            confirmButtonText: "OK",
          });
        });
    },
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
.form-control option {
  color: initial !important;
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

.list-group {
  display: flex;
  flex-direction: row;
  padding-left: 0;
  margin-bottom: 0;
  border-radius: 0.25rem;
}
.list-group-item.active {
  z-index: 2;
  color: #fff;
  background-color: #84c13f;
  border-color: #84c13f;
}

.list-group-item {
  border: 0;
  border-radius: 10px;
  margin-right: 10px;
  text-align: center;
  position: relative;
  display: flex;
  padding: 3px;
  color: #212529;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  line-height: 13px;
  font-size: 14px;
  padding: 10px;
  align-items: center;
  justify-content: center;
}
.list-group-item + .list-group-item.active {
  margin-top: 0px;
  border-top-width: 1px;
}
</style>
