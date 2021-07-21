export default function News(httpClient) {
  return {
    namespaced: true,
    state: {
      news: [],
      title: 'News',
    },
    mutations: {
      addNews(state, news) {
        state.news = news;
      }
    },
    actions: {
      async fetchNews(context, url) {
        const { data: news } = await httpClient.get(url);
        context.commit('addNews', news);
      }
    }
  }
}
