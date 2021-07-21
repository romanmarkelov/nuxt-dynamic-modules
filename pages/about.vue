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
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  meta: {
    storeName: 'About'
  },

  computed: {
    ...mapState(['common']),
    ...mapState('About', ['title']),
  }
}
</script>
