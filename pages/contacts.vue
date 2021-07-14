<template>
  <div class="container">
      <h1 class="title">
        {{ title }}
      </h1>
      <p>
        Common state: {{ commonState }}
      </p>
      <p>
        State: {{ title }}
      </p>
  </div>
</template>

<script>
export default {
  meta: {
    modules: {
      contacts: () => import('~/app/contacts.js')
    },
  },

  computed: {
    title() {
      return this.$store.state.contacts.title;
    },
    commonState() {
      return this.$store.state.common;
    }
  }
}
</script>
