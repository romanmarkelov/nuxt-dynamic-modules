<template>
  <div class="container">
      <h1 class="title">
        {{ title }}
      </h1>
      <p>
        Common state: {{ common }}
      </p>
      <p>
        State: {{ title }}
      </p>
      <p>Authors:</p>
      <ul>
        <li v-for="item in news" :key="item.id">{{ item.name }}</li>
      </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  storeName: 'OfferSearch',
  meta: {
    storeName: 'News',
  },

  computed: {
    ...mapState(['common']),
    ...mapState('News', ['news', 'title']),
  },
  methods: {
    ...mapActions('News', ['fetchNews']),
  },
  mounted() {

     this.fetchNews('https://jsonplaceholder.typicode.com/users')
  },
  beforeDestroy() {
    this.$store.unregisterModule('News');
  }
}
</script>
