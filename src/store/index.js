import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

Vue.use(Vuex);

// const modulesFiles = require.context('./modules', true, /\.js$/)
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   modules[moduleName] = value.default
//   return modules
// }, {})

const moduleFiles = import.meta.glob('./modules/*.js');
const modules = Object.fromEntries(
  await Promise.all(
    Object.entries(moduleFiles).map(async ([modulePath, moduleLoader]) => {
      const moduleName = modulePath.replace(/^\.\/(.*)\.js$/, '$1');
      const { default: moduleExports } = await moduleLoader();
      return [moduleName, moduleExports];
    }),
  ),
);

const store = new Vuex.Store({
  modules,
  getters,
});

export default store;
