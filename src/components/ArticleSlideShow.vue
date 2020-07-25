<template>
  <div class="Article-Slideshow">
    <div class="inner-wrapper">
      <h2>Other Categories</h2>
      <ul class="slideshow">
        <li v-for="category in otherCategories" :key="category.id">
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
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Slideshow",
  methods: {
    ...mapActions(["getOtherCategories"]),
  },
  computed: {
    ...mapGetters(["otherCategories"]),
  },
  created() {
    this.getOtherCategories();
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_slideshow.scss";
</style>