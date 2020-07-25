<template>
  <ul class="breadcrumbs">
    <li>{{$route.name}}</li>
  </ul>
</template>

<script>
export default {
  watch: {},
  mounted() {
    console.log(this.$route);
  },
};
</script>

<style>
</style>