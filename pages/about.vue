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
const name = 'about';
const vuexModule = () => import(`../app/${name}.js`);
export default {
  async asyncData({store}){
    if (!store.hasModule(name)) {
        const module = await vuexModule();
        store.registerModule(name, module.default, { preserveState: false });

    }
  },

  async beforeCreate() {
    this.isRouterLeaving = false

    if (!this.$store.hasModule(name)) {
      const module = await vuexModule();
      this.$store.registerModule(name, module.default);
    }
  },

  beforeRouteLeave(to, from, next) {
    this.isRouterLeaving = true;
    next();
  },

  beforeDestroy() {
    if (this.isRouterLeaving) {
      this.$store.unregisterModule(name);
    }
  },

  computed: {
    title() {
      return this.$store.state[name]?.title;
    },
    commonState() {
      return this.$store.state.common;
    }
  }
}
</script>
