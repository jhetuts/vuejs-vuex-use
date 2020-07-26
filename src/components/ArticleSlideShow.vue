<template>
  <div class="Article-Slideshow">
    <div class="inner-wrapper">
      <h2>Other Categories</h2>
      <div class="slider-wrap-custom">
        <slider ref="slider" :options="options">
          <slideritem v-for="category in otherCategories" :key="category.id">
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
          </slideritem>
          <div slot="loading">loading...</div>
        </slider>
        <button v-on:click="slideNext()" class="slide-btn btn-next">
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </button>
        <button v-on:click="slidePrev()" class="slide-btn btn-previous">
          <i class="fa fa-angle-left" aria-hidden="true"></i>
        </button>
      </div>
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
    slideNext() {
      this.$refs.slider.$emit("slideNext");
    },
    slidePrev() {
      this.$refs.slider.$emit("slidePre");
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
