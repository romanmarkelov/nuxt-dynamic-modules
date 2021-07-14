export default async function({ app, route, store }) {

  const meta = route.meta.reduce((acc, item) => {
      return { ...acc, ...item };
  }, {});

  // инициализация на сервере
  if (meta.modules) {
    // добавляем модуль в стор
    for (const key in meta.modules) {
      const module = await meta.modules[key]();
      if (!store.state.hasOwnProperty(key)) {
        store.registerModule(key, module.default);
      }
    }
  }

  // инициализация на клиенте
  app.router.beforeEach((to, from, next) => {
    // удаляем модуль из стора
    if (from.meta.modules) {
      for (const key in from.meta.modules) {
        if (to.meta.modules && to.meta.modules.hasOwnProperty(key)) {
          continue;
        }
        if (store.state.hasOwnProperty(key)) {
          store.unregisterModule(key);
        }
      }
    }
    // добавляем модуль в стор
    if (to.meta.modules) {
      for (const key in to.meta.modules) {
        const module = to.meta.modules[key]();
        if (!store.state.hasOwnProperty(key)) {
          store.registerModule(key, module.default);
        }
      }
    }

    next();
  });
}
