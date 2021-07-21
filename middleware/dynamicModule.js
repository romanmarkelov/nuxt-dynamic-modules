import TYPES, { container } from '~/helpers/ioc/container'

export default async function({ app, route, router, store }) {

  const { modules } = route.meta.reduce((acc, item) => {
      return { ...acc, ...item };
  }, {});


  if (!modules) {
    return;
  }


  for (const key in modules) {
    if (!store.hasModule(key)) {

      try {
        const module = await container.get(TYPES[key]);
        store.registerModule(key, module)
      } catch (error) {
        console.log(error)
      }
    }
  }

}
