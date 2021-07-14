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
  async beforeCreate() {

    this.isRouterLeaving = false

    if (!this.$store.hasModule('contacts')) {
      const module = await import('../app/contacts.js');
      this.$store.registerModule('contacts', module.default);
    }
  },

  beforeRouteLeave(to, from, next) {
    this.isRouterLeaving = true;
    next();
  },

  beforeDestroy() {
    if (this.isRouterLeaving) {
      this.$store.unregisterModule('contacts');
    }
  },

  computed: {
    title() {
      return this.$store.state.contacts?.title;
    },
    commonState() {
      return this.$store.state.common;
    }
  }
}
</script>
