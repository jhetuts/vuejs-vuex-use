<template>
  <div class="search-bar">
    <input v-model="category" placeholder="Search for answers" />
    <button>
      <i class="fa fa-search" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: ""
    };
  },
  mounted() {
    this.$root.$on("clearSearch", () => {
      this.category = "";
    });
  },
  watch: {
    category: function(e) {
      if (this.$route.name !== "Search") {
        if (e.length !== 0) {
          this.$router.push({
            name: "Search",
            params: { query: e }
          });
        }
      }
      this.$root.$emit("searchVal", e);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_searchbar.scss";
</style>
