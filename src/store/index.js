import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import app from './modules/app.js';
import errorLog from './modules/errorLog.js';
import permission from './modules/permission.js';
import settings from './modules/settings.js';
import tagsView from './modules/tagsView.js';
import user from './modules/user.js';

Vue.use(Vuex);

// const modulesFiles = require.context('./modules', true, /\.js$/);
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
//   const value = modulesFiles(modulePath);
//   modules[moduleName] = value.default;
//   return modules;
// }, {});

const store = new Vuex.Store({
  // modules,
  modules: {
    app,
    errorLog,
    permission,
    settings,
    tagsView,
    user,
  },
  getters,
});

export default store;
