import Vuex from 'kolibri.lib.vuex';
import * as coreStore from 'kolibri.coreVue.vuex.store';
import * as constants from '../constants';
import otherMutations from './mutations';

/**
 pageState schemas

 Users page:
 {
   users: [] // list of objects generated by actions._userState
 }

 Data export page:
 {}

 Content import/export page:
 {
   taskList: [] // list of objects
   channelList: [] // list of objects
   wizardState: {} // object
 }

 **/

const initialState = {
  pageName: constants.PageNames.CLASS_MGMT_PAGE,
  pageState: {
    channelList: [],
    wizardState: {},
    classes: [],
    users: [],
    taskList: [],
    modalShown: false,
  },
};

const mutations = {
  SET_PAGE_NAME(state, name) {
    state.pageName = name;
  },
  SET_PAGE_STATE(state, pageState) {
    state.pageState = pageState;
  },
  SET_CONTENT_PAGE_STATE(state, pageState) {
    state.pageName = 'CONTENT_MGMT_PAGE';
    state.pageState = pageState;
  },
  // modal mutations
  SET_MODAL(state, modalName) {
    state.pageState.modalShown = modalName;
  },

  // class mutations
  ADD_CLASS(state, classModel) {
    state.pageState.classes.push(classModel);
  },

  UPDATE_CLASS(state, id, updatedClass) {
    state.pageState.classes.forEach((classModel, index, arr) => {
      if (classModel.id === id) {
        arr[index] = updatedClass;
      }
    });
  },

  DELETE_CLASS(state, id) {
    state.pageState.classes = state.pageState.classes.filter(classModel => classModel.id !== id);
  },

  DELETE_CLASS_USER(state, id) {
    state.pageState.classUsers = state.pageState.classUsers.filter(user => user.id !== id);
  },

  // user mutations
  ADD_USER(state, user) {
    state.pageState.facilityUsers.push(user);
  },

  SET_USER_JUST_CREATED(state, user) {
    state.pageState.userJustCreated = user;
  },

  UPDATE_USERS(state, users) {
    users.forEach(user => {
      state.pageState.facilityUsers.forEach(existingUser => {
        if (existingUser.id === user.id.toString()) {
          existingUser.username = user.username;
          existingUser.full_name = user.full_name;
          existingUser.kind = user.kind;
        }
      });
    });
  },

  DELETE_USER(state, id) {
    state.pageState.facilityUsers = state.pageState.facilityUsers.filter(user => user.id !== id);
  },
};

// assigns core state and mutations
Object.assign(initialState, coreStore.initialState);
Object.assign(mutations, otherMutations, coreStore.mutations);

const store = new Vuex.Store({
  state: initialState,
  mutations,
});

export { store as default };
