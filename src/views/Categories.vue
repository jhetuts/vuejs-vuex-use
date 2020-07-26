<template>
  <div class="Categories" v-if="!search">
    <div class="category" v-for="category in allCategories" :key="category.id">
      <router-link :to="{ name: 'Category', params: { id: category.id } }">
        <div class="category-details">
          <img v-if="category.src" :src="category.src" :alt="category.icon" />
          <h2>{{ category.title }}</h2>
          <p class="articles">{{ category.totalArticle }} articles</p>
          <p class="updated">
            Last update
            {{ category.createdOn | moment("from", category.updatedOn) }}
          </p>
        </div>
      </router-link>
    </div>
  </div>
  <div class="Categories" v-else>
    <div class="error" v-if="filteredCategories.length === 0">
      No categories
    </div>
    <div
      class="category"
      v-for="category in filteredCategories"
      :key="category.id"
    >
      <router-link :to="{ name: 'Category', params: { id: category.id } }">
        <div class="category-details">
          <img v-if="category.src" :src="category.src" :alt="category.icon" />
          <h2>{{ category.title }}</h2>
          <p class="articles">{{ category.totalArticle }} articles</p>
          <p class="updated">
            Last update
            {{ category.createdOn | moment("from", category.updatedOn) }}
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Categories",
  data() {
    return {
      search: false,
    };
  },
  methods: {
    ...mapActions(["getAllCategories"]),
    ...mapActions(["filterCategories"]),
  },
  computed: {
    ...mapGetters(["allCategories"]),
    ...mapGetters(["filteredCategories"]),
  },
  created() {
    this.getAllCategories();
  },
  mounted() {
    this.$root.$on("searchVal", (data) => {
      this.search = true;
      this.filterCategories(data);
    });
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.id) {
        this.$root.$emit("searchVal", "");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_categories.scss";
</style>
