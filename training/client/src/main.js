import Vue from 'vue'
import App from './layout/App.vue'
import router from './router'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import 'bootstrap/dist/css/bootstrap.min.css';

// Provider
const apolloProvider = new VueApollo({
  defaultClient : new ApolloClient({
    uri: 'http://localhost:8081/v1/graphql',
    headers: {
      'x-hasura-admin-secret': 'adminsecret'
    }

  })
})


Vue.use(VueApollo, gql);
Vue.config.productionTip = false
new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
