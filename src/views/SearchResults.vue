<template>
  <div class="Search-Results">
    <ul v-if="searchResults.length !== 0" class="search-l">
      <li v-for="result in searchResults" :key="result.id">{{result.title}}</li>
    </ul>
    <p v-else>No match found.</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["searchArticles"])
  },
  computed: {
    ...mapGetters(["searchResults"])
  },
  created() {
    this.searchArticles();

    console.log(this.searchResults);
  },
  mounted() {
    this.$root.$on("searchVal", data => {
      this.searchArticles(data);
    });
  },
  watch: {
    searchResults(newState, old) {
      console.log(newState, old);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_searchresult.scss";
</style>