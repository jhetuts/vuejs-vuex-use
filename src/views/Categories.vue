<template>
  <div class="Categories">
    <div class="category" v-for="category in allCategories" :key="category.id">
      <router-link :to="{name: 'Category', params: {id: category.id}}">
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
  methods: {
    ...mapActions(["getAllCategories"]),
  },
  computed: {
    ...mapGetters(["allCategories"]),
  },
  created() {
    this.getAllCategories();
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_categories.scss";
</style>
