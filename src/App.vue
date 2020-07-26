<template>
  <div class="App">
    <tawk-header></tawk-header>
    <SearchBar />
    <div class="Layout">
      <div class="inner-wrapper">
        <div class="bread-crumbs-wrap" v-if="$route.params.id">
          <BreadCrumbs />
        </div>
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
import BreadCrumbs from "./components/BreadCrumbs.vue";

export default {
  datat() {
    return {
      valueSearch: "",
    };
  },
  components: {
    "tawk-header": Header,
    BreadCrumbs,
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
