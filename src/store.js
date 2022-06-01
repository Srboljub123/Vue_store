import Vue from "vue";
import Vuex from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2';

Vue.use(Vuex)



let cart = localStorage.getItem('cart');
let cartCount = localStorage.getItem('cartCount');


export default new Vuex.Store({
  state: {
    cart: cart ? JSON.parse(cart) : [],
    cartCount: cartCount ? parseInt(cartCount) : 0,
    status: '',
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user-mi')) || [],
  },
  mutations: {
    
    addToCart(state, item) {
      alert(item);
      let found = state.cart.find(product => product.id == item.id);
      if (found) {
        console.log('found');
          found.qty++;
          found.totalPrice = found.qty * found.price;
      } else {
          state.cart.push(item);
          Vue.set(item, 'qty', item.qty);
          Vue.set(item, 'totalPrice', item.qty * item.price);
      }
      state.cartCount++;
      this.commit('saveCart');
    },
    quantityPlus(state, item){
      let found = state.cart.find(product => product.id == item.id);
      if (found) {
          found.qty++;
          found.totalPrice = found.qty * found.price;
      } 
      this.commit('saveQTY');
    },
    quantityMinus(state, item){
      let found = state.cart.find(product => product.id == item.id);
      if (found) {
          found.qty--;
          found.totalPrice = found.qty * found.price;
      } 
      this.commit('saveQTY');
    },
    removeFromCart(state, item) {
      let index = state.cart.indexOf(item);
        if (index > -1) {
          state.cartCount--;
          state.cart.splice(index, 1);
        }
        this.commit('saveCart');
    },
    cleanCart(state){
      state.cartCount = 0;
      state.cart = [];
      this.commit('saveCart');
      location.reload();
    },
     saveCart(state) {
      localStorage.setItem('cart', JSON.stringify(state.cart));
      localStorage.setItem('cartCount', state.cartCount);
    },
    saveQTY(state) {
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, {token, user}){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
      Swal.fire(
        "Accesso non riuscito",
        "L'indirizzo email o la password che hai inserito non sono corretti.",
        "error"
      ).then(() =>{
        localStorage.removeItem('token')
        localStorage.removeItem('user-mi')
        
      });

    },
    logout(state){
      state.user = []
      state.status = ''
      state.token = ''
    },
    expired(state){
      state.user = []
      state.status = ''
      state.token = ''
    },
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  },
  actions: {
    login({commit}, user){

      Swal.showLoading();

      let store =  JSON.parse(localStorage.getItem("selected_store")) || "https://mercatoitinerante.it/torino-porta-palazzo/";
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.post(store.mi_single_city_domain + "wp-json/jwt-auth/v1/token", user)
        .then((resp) => {
          const token = resp.data.data.token
          const user = resp.data.data
          localStorage.setItem('token', token)
          localStorage.setItem('user-mi', JSON.stringify(user))
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
          commit('auth_success', {token, user})
          resolve(resp)
          
          Swal.fire({
            icon: "success",
            title: "Accesso effettuato con successo!",
            confirmButtonText: "OK",
          })


        })
        .catch(err => {
          commit('auth_error')
          reject(err)
          
         })
        })
     },
     logout({commit}){
        Swal.showLoading()
        return new Promise((resolve) => {
          commit('logout')
          localStorage.removeItem('token')
          localStorage.removeItem('user-mi')
          delete axios.defaults.headers.common['Authorization']
          resolve()
          Swal.fire({
            icon: "success",
            title: "Logout effettuato con successo!",
            confirmButtonText: "OK",
          })
        })
      },
      expired({commit}){
        Swal.showLoading()
        return new Promise((resolve) => {
          commit('expired')
          localStorage.removeItem('token')
          localStorage.removeItem('user-mi')
          localStorage.removeItem('selected_store')
          delete axios.defaults.headers.common['Authorization']
          resolve()
          Swal.fire({
            icon: "question",
            title: "Sessione scaduta!",
            html: "Per favore accedi nuovamente al tuo profilo.",
            confirmButtonText: "OK",
          }).then(() => {
            location.reload();
          })
        })
      }
  }
})



