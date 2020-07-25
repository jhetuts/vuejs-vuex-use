<template>
  <div class="Article-Slideshow">
    <div class="inner-wrapper">
      <h2>Other Categories</h2>
      <slider ref="slider" :options="options">
        <slideritem v-for="category in otherCategories" :key="category.id">
          <router-link :to="{ name: 'Category', params: { id: category.id } }">
            <div class="category-details">
              <img
                v-if="category.src"
                :src="category.src"
                :alt="category.icon"
              />
              <h2>{{ category.title }}</h2>
              <p class="articles">{{ category.totalArticle }} articles</p>
              <p class="updated">
                Last update
                {{ category.createdOn | moment("from", category.updatedOn) }}
              </p>
            </div>
          </router-link>
        </slideritem>
        <div slot="loading">loading...</div>
      </slider>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { slider, slideritem } from "vue-concise-slider";

export default {
  name: "Slideshow",
  data() {
    return {
      options: {
        currentPage: 0,
        slidesToScroll: 1,
        pagination: false,
      },
    };
  },
  components: {
    slider,
    slideritem,
  },
  methods: {
    ...mapActions(["getOtherCategories"]),
    scrollToActiveCategory() {
      const el = document.querySelector(`.${this.$route.params.id}`);
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    },
  },
  computed: {
    ...mapGetters(["otherCategories"]),
  },
  created() {
    this.getOtherCategories(this.$route.params.id);
  },
  watch: {
    $route(to, from) {
      this.getOtherCategories(this.$route.params.id);
      this.scrollToActiveCategory();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_slideshow.scss";
</style>
