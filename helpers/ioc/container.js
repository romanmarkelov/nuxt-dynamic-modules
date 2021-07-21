const inversify = require("inversify");
require("reflect-metadata");

// types
const TYPES = {
  About: "About",
  HttpClient: "HttpClient",
  Contacts: "Contacts",
  News: "News",
};

// Declare bindings
const container = new inversify.Container();

container.bind('HttpClient').toProvider(async() => {
  // здесь можно будет задать дефолтные данные
  const module = await import('~/services/HttpClient');
  return module.default;
})

container.bind(TYPES.About).toProvider(async context => {
  const module = await import('~/app/About');
  return module.default();
});

container.bind(TYPES.Contacts).toProvider(async context => {
  const module = await import('~/app/Contacts');
  return module.default()
});

container.bind(TYPES.News).toProvider(async context => {
  const httpClient = await context.container.get('HttpClient')
  const module = await import('~/app/News');
  // значения можно взять из контекста (константы, ...)
  return module.default(new httpClient(0));
})

export default TYPES;

export { container };
