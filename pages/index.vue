<template>
  <div class="container">
      <h1 class="title">
        Home
      </h1>
      <p>
        Common state: {{ commonState }}
      </p>

  </div>
</template>

<script>
export default {

  computed: {
    commonState() {
      return this.$store.state.common;
    }
  }
}
</script>
