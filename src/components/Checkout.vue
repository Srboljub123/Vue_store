<template>
  <div class="contact">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="shadows-font text-green mt-3">Cassa</h1>

          <hr />
        </div>
      </div>
      <form @change="calculateShipping()">
        <!-- Dati personali -->
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
        <div v-if="customerDetails.role != 'studente'" class="form row mt-3">
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
          <div v-if="customerDetails.role != 'studente'" class="col">
            <input
              required
              type="text"
              class="form-control"
              v-model="customerDetails.sdi"
              placeholder="SDI"
            />
          </div>
          <div v-if="customerDetails.role != 'studente'" class="col">
            <input
              required
              type="text"
              class="form-control"
              v-model="customerDetails.pec"
              placeholder="PEC"
            />
          </div>
          <div class="col-12 mt-3">
            <input
              required
              type="text"
              class="form-control"
              v-model="customerDetails.vat"
              placeholder="P.IVA o Codice Fiscale"
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
        <div v-if="customerDetails.role == 'studente'" class="form row mt-3">
          <div class="col">
            <input
              required
              type="text"
              class="form-control"
              v-model="customerDetails.classe_scolastica"
              placeholder="Classe scolastica"
            />
          </div>
        </div>
        <div v-if="customerDetails.role != 'studente'" class="form row mt-3">
          <div class="col">
            <div class="pretty p-default p-curve p-thick p-smooth">
              <input
                id="consegna_piano"
                type="checkbox"
                v-model="customerDetails.consegna_piano"
                name="consegna_piano"
              />
              <div class="state p-danger-o">
                <label class="text-white text-capitalize"
                  >Consegna al Piano</label
                >
              </div>
            </div>
            <div class="pretty p-default p-curve p-thick p-smooth">
              <input
                id="ascensore"
                type="checkbox"
                v-model="customerDetails.ascensore"
                name="ascensore"
              />
              <div class="state p-danger-o">
                <label class="text-white text-capitalize">No Ascensore</label>
              </div>
            </div>
          </div>
        </div>

        <div v-if="customerDetails.role != 'studente'" class="form row mt-3">
          <div class="col">
            <h1 class="shadows-font text-green mt-3">
              Quando vuoi ricevere l'ordine?
            </h1>
            <hr />
            <label class="text-white mb-1" for="data-consegna"
              >Data consegna</label
            >
            <div>
              <select
                @change="assignOreConsegna"
                name="data_consegna"
                id="data-consegna"
                class="form-control"
                v-model="data_consegna"
              >
                <option value="">-- Seleziona --</option>
                <option
                  v-for="(item, key) in time_slot"
                  v-bind:value="key"
                  :key="key"
                >
                  {{ key }}
                </option>
              </select>
            </div>
            <div>
              <label class="text-white mb-1 mt-2" for="ora-consegna"
                >Fascia oraria consegna</label
              >

              <select
                name="ora_consegna"
                id="ora-consegna"
                v-model="ora_consegna"
                class="form-control"
              >
                <option value="">-- Seleziona --</option>
                <option
                  v-for="item in ore_consegna"
                  v-bind:value="item"
                  :key="item"
                >
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <!-- Metodi di pagamento -->
        <div class="row">
          <div class="col-md-12 mt-3">
            <h1 class="shadows-font text-green mt-3">Metodi di Pagamento</h1>
            <hr />

            <div class="form row mt-3">
              <div class="col">
                <div
                  class="
                    pretty
                    p-default p-curve p-thick p-smooth
                    d-block
                    mt-2
                    mb-2
                  "
                >
                  <input
                    id="payment_method"
                    type="radio"
                    value="cod"
                    v-model="payment_method"
                    name="payment_method"
                  />
                  <div class="state p-danger-o">
                    <label class="text-white text-capitalize"
                      >Pagamento alla consegna contanti o Satispay</label
                    >
                  </div>
                </div>
                <div
                  v-if="customerDetails.role != 'studente'"
                  class="
                    pretty
                    p-default p-curve p-thick p-smooth
                    d-block
                    mt-2
                    mb-2
                  "
                >
                  <input
                    id="payment_method"
                    type="radio"
                    value="stripe"
                    v-model="payment_method"
                    name="payment_method"
                  />
                  <div class="state p-danger-o">
                    <label class="text-white text-capitalize"
                      >Pagamento con Carta di Credito/Debito</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <div v-if="payment_method == 'stripe'">
              <StripeElementCard
                ref="elementRef"
                pk="pk_live_51HyEE6AOxs06VetVZZjkoV02TuvIZ0fp0UIpqtWLzdBx8RPVMVDsxjiNZ7uz2wm2MO3Xp3cRJo9GgjXIyagH1in2009OyRtU6E"
                @token="processOrder"
              />
            </div>
          </div>
        </div>
        <div class="pt-3 pb-3">
          <hr />
          <div class="col-12 text-white">
            <h3 class="shadows-font text-center mt-1">
              Totale: {{ totalPrice | priceFilter }}
              <span
                v-if="shipping_price == 0 && customerDetails.role == 'studente'"
                >(Spedizione gratuita per gli studenti)</span
              >
              <span v-else>
                (Incluso
                {{ shipping_price | priceFilter }} di spedizione)
              </span>
            </h3>
          </div>

          <div class="col-12 text-white text-center">
            <span class="text-center" v-if="customerDetails.role == 'studente'">
              <span
                class="text-green text-center fw-bold"
                v-if="time_now >= '09:00'"
              >
                Sono le ore {{ time_now }}, se sei uno studente non puoi
                pi&ugrave; effettuare l'ordine. Puoi effettuare l'ordine solo
                dalle 00:00 alle 08:59
              </span>
              <span v-else>
                <button
                  class="btn btn-primary w-100 mt-3"
                  type="button"
                  @click="placeOrder()"
                  :disabled="can_user_pay"
                >
                  Effettua l'ordine
                </button>
              </span>
            </span>

            <span v-else>
              <button
                class="btn btn-primary w-100 mt-3"
                type="button"
                @click="placeOrder()"
                :disabled="can_user_pay"
              >
                Effettua l'ordine
              </button>
            </span>
          </div>
        </div>
        <!-- Prodotti in Chekout -->
        <div class="row">
          <div class="col-md-12 mt-3">
            <h1 class="shadows-font text-green mt-3">Il tuo ordine</h1>
            <hr />
          </div>
          <div v-if="cart.length === 0" class="col-12">
            <p class="text-white">
              Attualmente non c'è nessun prodotto nel carrello.
            </p>
          </div>
          <div v-for="(item, index) in cart" :key="index" class="col-12">
            <div class="card mx-3 my-3 px-3 py-3 shadow">
              <div class="row align-items-center">
                <div class="col-4">
                  <img
                    class="img-fluid"
                    :src="item.images[0].src"
                    :alt="item.images[0].alt"
                  />
                </div>
                <div class="col-8 text-start">
                  <h5 class="text-start shadows-font text-white">
                    {{ item.name | formatProductName }}
                  </h5>
                  <p class="text-capitalize text-start text-white shadows-font">
                    {{ item.variation_name }}
                  </p>
                  <span
                    v-if="
                      customerDetails.role == 'administrator' ||
                      customerDetails.role == 'attivita-commerciale'
                    "
                    class="text-start text-white shadows-font"
                  >
                    Scontistica attivit&agrave; commerciale:
                    <strike>{{ item.price | priceFilter }}</strike>
                    <span v-if="item.prezzo_attivita">
                      {{ item.prezzo_attivita | priceFilter }} *
                      {{ item.qty }} =
                      {{ (item.prezzo_attivita * item.qty) | priceFilter }}
                    </span>
                    <span v-else>
                      {{ item.price | priceFilter }} * {{ item.qty }} =
                      {{ (item.price * item.qty) | priceFilter }}
                    </span>
                  </span>
                  <span v-else class="text-start text-white shadows-font">
                    {{ item.price | priceFilter }} * {{ item.qty }} =
                    {{ (item.price * item.qty) | priceFilter }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p
          class="text-danger mt-3"
          v-for="(error, index) in errors"
          :key="index"
          v-html="error"
        ></p>
      </form>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import { StripeElementCard } from "@vue-stripe/vue-stripe";
import axios from "axios";
import moment from "moment";

export default {
  name: "Checkout",
  components: { StripeElementCard },
  data: function () {
    return {
      stripe_key:
        "pk_live_51HyEE6AOxs06VetVZZjkoV02TuvIZ0fp0UIpqtWLzdBx8RPVMVDsxjiNZ7uz2wm2MO3Xp3cRJo9GgjXIyagH1in2009OyRtU6E",
      errors: [],
      store_url:
        JSON.parse(localStorage.getItem("selected_store")) ||
        "https://mercatoitinerante.it/torino-porta-palazzo/",
      payment_method: "cod",
      codice_promozionale: "",
      cart: this.$store.state.cart,
      token: null,
      shipping_range: "",
      shipping_price: 0.0,
      customerDetails: {
        billing: {
          first_name: "",
          last_name: "",
          address_1: "",
          city: "",
          state: "Italia",
          postcode: "",
          country: "IT",
          email: "",
          phone: "",
          company: "",
        },
        sdi: "",
        pec: "",
        vat: "",
        classe_scolastica: "",
        consegna_piano: false,
        ascensore: false,
        customer_id: this.$store.state.user.id,
        role: "",
      },
      subtotal: 0.0,
      date_consegna: [],
      time_slot: [],
      data_consegna: "",
      ora_consegna: "",
      ore_consegna: [],
      costi_spedizione: [],
    };
  },
  computed: {
    totalPrice() {
      return parseFloat(this.subtotal) + parseFloat(this.shipping_price);
    },
    can_user_pay() {
      return !Object.keys(this.shipping_range).length;
    },
    time_now() {
      return moment().format("HH:mm");
    },
  },
  watch: {
    cart: {
      handler() {
        this.calculateTotal();
        this.calculateShipping();
      },
      deep: true,
    },
  },
  created() {
    this.fetchImportantInfo();
  },
  methods: {
    fetchImportantInfo() {
      Swal.showLoading();

      /* GET DATE CONSEGNA */

      axios
        .get(
          this.store_url.mi_single_city_domain +
            "wp-json/dokan/v1/shipping/delivery_dates"
        )
        .then((res) => {
          this.date_consegna = res.data;
        });

      /* FETCH USER DATA */

      axios
        .get(
          this.store_url.mi_single_city_domain +
            "wp-json/wc/v3/customers/" +
            this.customerDetails.customer_id
        )
        .then((response) => {
          this.customerDetails.billing.first_name =
            response.data.billing.first_name;
          this.customerDetails.billing.last_name =
            response.data.billing.last_name;
          this.customerDetails.billing.address_1 =
            response.data.billing.address_1;
          this.customerDetails.billing.city = response.data.billing.city;
          this.customerDetails.billing.postcode =
            response.data.billing.postcode;
          this.customerDetails.billing.email = response.data.billing.email;
          this.customerDetails.billing.phone = response.data.billing.phone;
          this.customerDetails.billing.company = response.data.billing.company;
          this.customerDetails.role = response.data.role;
        })
        .then(() => {
          /* CALCULATE TOTAL */
          this.calculateTotal();
        })
        .then(() => {
          /* CALCULATE SHIPPING */
          axios
            .get(
              this.store_url.mi_single_city_domain +
                "wp-json/dokan/v1/shipping/postcode"
            )
            .then((res) => {
              this.costi_spedizione = res.data;
            })
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Prezzo spedizione aggiornato.",
                confirmButtonText: "OK",
              }).then(() => this.calculateShipping());
            });
        });
    },
    calculateTotal() {
      this.subtotal = 0;
      if (
        this.customerDetails.role == "administrator" ||
        this.customerDetails.role == "attivita-commerciale"
      ) {
        for (let item of this.cart) {
          if (item.prezzo_attivita) {
            this.subtotal += item.qty * parseFloat(item.prezzo_attivita);
          } else {
            this.subtotal += parseFloat(item.totalPrice);
          }
        }
      } else {
        for (let item of this.cart) {
          this.subtotal += parseFloat(item.totalPrice);
        }
      }
    },
    calculateShipping() {
      if (!this.costi_spedizione.length) {
        return;
      }

      this.shipping_range = {};
      this.shipping_price = 0.0;

      this.costi_spedizione.forEach((obj) => {
        if (obj.zipcode.includes(this.customerDetails.billing.postcode)) {
          this.shipping_range = obj.range;
        }
      });

      Object.values(this.shipping_range).forEach((shipping) => {
        if (this.subtotal >= shipping.min && this.subtotal <= shipping.max) {
          this.shipping_price += parseFloat(shipping.price);
        }
      });

      if (this.customerDetails.consegna_piano) {
        this.shipping_price += 1.0;
      }
      if (this.customerDetails.ascensore) {
        this.shipping_price += 0.5;
      }

      if (
        this.customerDetails.billing.postcode &&
        !Object.keys(this.shipping_range).length
      ) {
        Swal.fire({
          icon: "error",
          title: "CAP non trovato.",
          html: "Il tuo CAP non &egrave; ancora coperto dal nostro servizio.",
          confirmButtonText: "OK",
        });
      }

      //adjust date consegna
      this.date_consegna.forEach((obj) => {
        if (obj.zip.includes(this.customerDetails.billing.postcode)) {
          this.time_slot = obj.time_slot;
        }
      });

      if (this.customerDetails.role == "studente") {
        this.shipping_price = 0;
      }
    },
    assignOreConsegna() {
      Object.entries(this.time_slot).forEach((val) => {
        if (val[0] == this.data_consegna) {
          this.ore_consegna = val[1];
        }
      });
    },
    placeOrder() {
      this.errors = [];

      if (!this.customerDetails.billing.first_name) {
        this.errors.push("Nome mancante.");
      }
      if (!this.customerDetails.billing.last_name) {
        this.errors.push("Cognome mancante.");
      }
      if (!this.customerDetails.billing.address_1) {
        this.errors.push("Indirizzo mancante.");
      }
      if (!this.customerDetails.billing.city) {
        this.errors.push("Citt&agrave; mancante.");
      }
      if (!this.customerDetails.billing.state) {
        this.errors.push("Stato mancante.");
      }
      if (!this.customerDetails.billing.postcode) {
        this.errors.push("CAP mancante o non servito.");
      }
      if (!this.customerDetails.billing.country) {
        this.errors.push("Paese mancante.");
      }
      if (!this.customerDetails.billing.email) {
        this.errors.push("Indirizzo email mancante.");
      }
      if (!this.customerDetails.billing.phone) {
        this.errors.push("Telefono mancante.");
      }

      if (this.customerDetails.role == "studente" && !this.classe_scolastica) {
        this.errors.push("Inserisci la classe scolastica.");
      }

      if (!this.data_consegna && this.customerDetails.role != "studente") {
        this.errors.push("Seleziona una data di consegna.");
      }

      if (!this.ora_consegna && this.customerDetails.role != "studente") {
        this.errors.push("Seleziona una fascia oraria di consegna.");
      }

      if (!this.customerDetails.vat) {
        this.errors.push("P.IVA e/o Codice Fiscale mancante.");
      }

      if (this.errors.length > 0) {
        window.scrollTo(
          0,
          document.body.scrollHeight || document.documentElement.scrollHeight
        );
      }

      if (this.cart.length === 0) {
        this.errors.push(
          "Selezionare almeno un prodotto da inserire nel carrello."
        );
      }

      if (
        this.customerDetails.role == "studente" &&
        this.customerDetails.billing.first_name &&
        this.customerDetails.billing.last_name &&
        this.customerDetails.billing.address_1 &&
        this.customerDetails.billing.city &&
        this.customerDetails.billing.state &&
        this.customerDetails.billing.postcode &&
        this.customerDetails.billing.country &&
        this.customerDetails.billing.email &&
        this.customerDetails.billing.phone &&
        this.customerDetails.vat &&
        this.customerDetails.classe_scolastica
      ) {
        if (this.time_now >= "09:03") {
          Swal.fire({
            icon: "error",
            title: "Ordine non più inoltrabile",
            html:
              "Sono già le " +
              this.time_now +
              " se sei uno studente puoi inoltrare l'ordine massimo entro le 9:03.",
            confirmButtonText: "OK",
          }).then(() => this.$router.push("/"));
        } else {
          this.processOrder();
        }
      } else {
        if (
          this.customerDetails.billing.first_name &&
          this.customerDetails.billing.last_name &&
          this.customerDetails.billing.address_1 &&
          this.data_consegna &&
          this.customerDetails.billing.city &&
          this.customerDetails.billing.state &&
          this.customerDetails.billing.postcode &&
          this.customerDetails.billing.country &&
          this.customerDetails.billing.email &&
          this.customerDetails.billing.phone &&
          this.customerDetails.vat &&
          this.ora_consegna
        ) {
          if (this.payment_method == "stripe") {
            this.$refs.elementRef.submit();
          } else {
            this.processOrder();
          }
        }
      }
    },
    processOrder(token) {
      Swal.showLoading();

      const line = [];
      this.cart.forEach((item) => {
        if (item.type != "simple") {
          const x = {
            product_id: item.id,
            variation_id: item.variation_id,
            quantity: item.qty,
          };
          line.push(x);
        } else {
          const x = {
            product_id: item.id,
            quantity: item.qty,
          };
          line.push(x);
        }
      });

      var status = "processing";

      if (
        this.customerDetails.role == "studente" &&
        this.payment_method != "stripe"
      ) {
        status = "wc-ordine-studente";
      }

      if (
        this.payment_method != "stripe" &&
        this.customerDetails.role != "studente"
      ) {
        status = "processing";
      } else {
        status = "processing";
      }

      const data = {
        billing: this.customerDetails.billing,
        shipping: this.customerDetails.billing,
        customer_id: this.customerDetails.customer_id,
        meta_data: [
          {
            key: "billing_recipientcode",
            value: this.customerDetails.sdi,
          },
          {
            key: "billing_pecaddress",
            value: this.customerDetails.pec,
          },
          {
            key: "billing_company",
            value: this.customerDetails.billing.company,
          },
          {
            key: "billing_vatcode",
            value: this.customerDetails.vat,
          },
          {
            key: "_consegna_piano",
            value: this.customerDetails.consegna_piano,
          },
          {
            key: "_ascensore",
            value: this.customerDetails.ascensore,
          },
          {
            key: "_data_consegna",
            value: this.data_consegna + "-" + this.ora_consegna,
          },
          {
            key: "_classe_scolastica",
            value: this.classe_scolastica,
          },
          {
            key: "ordine_app",
            value: true,
          },
        ],
        line_items: line,
        payment_method: this.payment_method,
        shipping_lines: [
          {
            method_id: "flat_rate",
            method_title: "Calcolo Spedizione da Applicazione",
            total: this.shipping_price + "",
          },
        ],
        status: status,
      };

      //continua a processà l'ordine va
      if (this.payment_method == "stripe") {
        var self = this;
        self.token = token;
        this.createSource().then((source_id) => {
          axios
            .post(
              this.store_url.mi_single_city_domain + "wp-json/wc/v3/orders",
              data
            )
            .then((res) => {
              axios({
                method: "post",
                url:
                  this.store_url.mi_single_city_domain +
                  "wp-json/dokan/v1/payment/stripe",
                data: {
                  order_id: res.data.id,
                  payment_token: source_id,
                  payment_method: "stripe",
                },
              })
                .then((res) => {
                  console.log(res);
                  Swal.fire({
                    icon: "success",
                    title: "Ordine completato",
                    html: "Il tuo ordine &egrave; stato completato con successo.",
                    confirmButtonText: "Continua ad acquistare",
                  }).then((res) => {
                    if (res.isConfirmed) {
                      this.$store.commit("cleanCart");
                      this.$router.push("/");
                      location.reload();
                    }
                  });
                })
                .catch((err) => {
                  console.log(err);
                  Swal.fire({
                    icon: "error",
                    title: "Ordine fallito",
                    html: "Il tuo ordine non &egrave; stato processato. Questo potrebbe essere dovuto a una mancanza di fondi sulla carta o ad altri problemi tecnici. Ti invitiamo a riprovare pi&ugrave; tardi.",
                    confirmButtonText: "OK",
                  }).then(() => this.$router.push("/"));
                });
            })
            .catch((err) => {
              console.log(err);
              Swal.fire({
                icon: "error",
                title: "Ordine fallito",
                html: "Il tuo ordine non &egrave; stato processato. Questo potrebbe essere dovuto a qualche problema tecnico. Ti invitiamo a riprovare pi&ugrave; tardi.",
                confirmButtonText: "OK",
              }).then(() => this.$router.push("/"));
            });
        });
      } else {
        axios
          .post(
            this.store_url.mi_single_city_domain + "wp-json/wc/v3/orders",
            data
          )
          .then((res) => {
            console.log(res);
            Swal.fire({
              icon: "success",
              title: "Ordine completato",
              html: "Il tuo ordine &egrave; stato completato con successo.",
              confirmButtonText: "Continua ad acquistare",
            }).then((res) => {
              console.log(res);
              if (res.isConfirmed) {
                this.$store.commit("cleanCart");
                this.$router.push("/");
                location.reload();
              }
            });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Ordine fallito",
              html: "Il tuo ordine non &egrave; stato processato. Questo potrebbe essere dovuto a qualche problema tecnico. Ti invitiamo a riprovare pi&ugrave; tardi.",
              confirmButtonText: "OK",
            });
          });
      }
    },
    async createSource() {
      let id;
      try {
        var self = this;
        await axios
          .post(
            this.store_url.mi_single_city_domain +
              "wp-json/dokan/v1/payment/stripe/createsource",
            {
              token: self.token.id,
            }
          )
          .then((res) => {
            id = res.data.id;
          });
      } catch (error) {
        console.log(error);
      }

      return id;
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
</style>


