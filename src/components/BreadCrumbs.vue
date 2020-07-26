<template>
  <ul class="breadcrumbs">
    <li v-for="path in paths" :key="path.path">
      <p class="active" v-if="path.path === $route.path" :alt="path.path">{{path.name}}</p>
      <p v-else>
        <router-link :to="path.path">{{path.name}}</router-link>
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      paths: [
        {
          path: "/",
          name: "All Categories",
        },
      ],
    };
  },
  mounted() {
    this.paths.push({
      path: this.$route.path,
      name: this.$route.name,
    });

    this.$root.$on("sendTitle", (data) => {
      this.paths.pop();
      this.paths.push({
        path: this.$route.path,
        name: data,
      });
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/breadcrumbs.scss";
</style>