<template>
  <div class="Category">
    <div class="left" :class="$route.params.id">
      <div v-if="activeCategory.length === 0">No Category for that!</div>
      <div class="active-article" v-for="article in activeCategory" :key="article.id">
        <div class="top">
          <img :src="article.src" alt="article.title" />
          <h2>{{ article.title }}</h2>
          <p class="updated">
            Last update
            {{ article.createdOn | moment("from", article.updatedOn) }}
          </p>
          <p class="total-article">{{ article.totalArticle }}</p>
        </div>
        <div class="bottom">
          <small>i</small>
          <p class="description">{{ article.description }}</p>
        </div>
      </div>
    </div>
    <div class="right">
      <ul class="list-of-articles">
        <li v-for="article in allArticles" :key="article.id">
          <div class="file-type">
            <i v-bind:class="[article.icon ? `fa fa-${article.icon}` : 'none']"></i>
          </div>
          <div class="details">
            <h3>{{ article.title }}</h3>
            <p class="updated">
              Last update
              {{ article.createdOn | moment("from", article.updatedOn) }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Category",
  components: {},
  methods: {
    ...mapActions(["getActiveCategory"]),
    ...mapActions(["getAllArticlesByCategory"]),
  },
  computed: {
    ...mapGetters(["activeCategory"]),
    ...mapGetters(["allArticles"]),
  },
  created() {
    this.getActiveCategory(this.$route.params.id);
    this.getAllArticlesByCategory(this.$route.params.id);
  },
  mounted() {
    this.$root.$emit("clearSearch");
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.id) {
        this.getActiveCategory(this.$route.params.id);
        this.getAllArticlesByCategory(this.$route.params.id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_category.scss";
</style>
