
export default (name) => {

  const storeModule = require(`../app/${name}.js`);
  return {


    // async asyncData({ store }){
    //   console.log("🚀 ~ file: DynamicModule.js ~ line 11 ~ asyncData ~ store", store)
    //   if (!store.hasModule(name)) {
    //       const module = await storeModule();
    //       store.registerModule(name, module.default, { preserveState: false });

    //   }
    // },

  async asyncData({ store }){
    if (!store.hasModule(name)) {

        store.registerModule(name, storeModule, { preserveState: false });

    }
  },
  // async mounted() {
  //   if (!this.$store.hasModule(name)) {
  //       const module = await storeModule();
  //       this.$store.registerModule(name, module.default, { preserveState: false });

  //   }

  // },

  async beforeCreate() {

    // this.isRouterLeaving = false

    // if (!this.$store.hasModule(this.storeName)) {
    //   const module = await this.$options.storeModule();
    //   this.$store.registerModule(this.storeName, module.default);
    // }
  },

  beforeRouteLeave(to, from, next) {
    // this.isRouterLeaving = true;
    // next();
  },

  beforeDestroy() {
    // if (this.isRouterLeaving) {
    //   this.$store.unregisterModule(this.storeName);
    // }
  },

  }


}

