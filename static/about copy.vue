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
const aboutModule = () => import('../app/about.js');
export default {
  async asyncData({store}){
    if (!store.hasModule(name)) {
        const module = await aboutModule();
        store.registerModule(name, module.default, { preserveState: false });

    }
  },

  async beforeCreate() {

    this.isRouterLeaving = false

    if (!this.$store.hasModule(name)) {
      const module = await aboutModule();
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
      return this.$store.state.about?.title;
    },
    commonState() {
      return this.$store.state.common;
    }
  }
}
</script>
