<template>
  <div class="App">
    <tawk-header></tawk-header>
    <SearchBar />
    <div class="Layout">
      <div class="inner-wrapper">
        <router-view></router-view>
      </div>
    </div>
    <div v-if="$route.params.id">
      <ArticleSlideShow />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import SearchBar from "./components/SearchBar.vue";
import ArticleSlideShow from "./components/ArticleSlideShow.vue";

export default {
  components: {
    "tawk-header": Header,
    SearchBar,
    ArticleSlideShow,
  },
  created() {
    console.log(this.$route.params.id);
  },
};
</script>

<style lang="scss">
@import "scss/main.scss";
</style>