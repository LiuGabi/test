import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

import Account from './account';
import Receptionist from './receptionist';
import CustomerEvent from './customer-event';
import Customer from './customer';

export default new Vuex.Store({
    strict: true,
    modules: {
    	Account,
    	Receptionist,
    	CustomerEvent,
    	Customer
    }
});