<template>
  <div class="Category">
    <div class="left" :class="$route.params.id">
      <div v-if="activeCategory.length === 0">No Category for that!</div>
      <div class="active-article" v-for="article in activeCategory" :key="article.id">
        <div class="top">
          <img :src="article.src" alt="article.title" />
          <h2>{{ article.title }}</h2>
          <p class="updated">
            Updated
            {{ article.createdOn | moment("from", article.updatedOn) }}
          </p>
          <p class="total-article">
            <i class="fa fa-file" aria-hidden="true"></i>
            <span>{{ article.totalArticle }}</span>
          </p>
        </div>
        <div class="bottom">
          <i class="fa fa-info-circle" aria-hidden="true"></i>
          <p class="description">{{ article.description }}</p>
        </div>
      </div>
    </div>
    <div class="right">
      <ul class="list-of-articles">
        <li v-for="article in allArticles" :key="article.id" v-on:click="showDetail">
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
          <div v-if="showDetails" class="more-details"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Category",
  data() {
    return {
      showDetails: false,
    };
  },
  components: {},
  methods: {
    ...mapActions(["getActiveCategory"]),
    ...mapActions(["getAllArticlesByCategory"]),
    showDetail() {
      this.showDetails = !this.showDetails;
    },
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
    activeCategory(newState, old) {
      this.$root.$emit("sendTitle", newState[0].title);
    },
    allArticles(newState, old) {
      console.log(newState);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_category.scss";
</style>
