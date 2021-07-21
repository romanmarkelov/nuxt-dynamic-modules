import TYPES, { container } from "~/helpers/ioc/container";

/**
 * Регистрирует динамический модуль в глобальное хранилище Vuex
 *
 * @param {Object} types
 * @param {Object} container
 * @param {string} storeName
 * @param {VuexStore} store
 */
const registerDynamicStoreModule = async ({
  types,
  container,
  storeName,
  store
}) => {
  try {
    const storeModule = await container.get(types[storeName]);
    store.registerModule(storeName, storeModule, {
      preserveState: !!store.state[storeName]
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Плагин для динамической регистрации модуля в глобальное хранилище Vuex
 *
 * @param {Object} app
 * @param {VuexStore} store
 * @param {VueRoute} route
 */
export default async function registerDynamicStorePlugin({ app, store, route }) {
  if (process.server) {
    app.router.onReady(async () => {
      const loadRouteComponents = app.router.getMatchedComponents();
      const { storeName } = loadRouteComponents[0].options.meta;

      if (!store.hasModule(storeName)) {
        await registerDynamicStoreModule({
          types: TYPES,
          container,
          store,
          storeName
        });
      }
    });
  }

  if (!process.server) {
    const { storeName } = route.meta.find(el => el.hasOwnProperty("storeName"));
    await registerDynamicStoreModule({
      types: TYPES,
      container,
      store,
      storeName
    });
  }
};
