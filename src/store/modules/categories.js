import axios from "axios";

// States
const state = {
  categories: [],
  articles: [],
  activeCategory: [],
  otherCategories: [],
};

// Getters
const getters = {
  allCategories: (state) => state.categories,
  allArticles: (state) => state.articles,
  activeCategory: (state) => state.activeCategory,
  otherCategories: (state) => state.otherCategories,
};

// Actions
const actions = {
  async getAllCategories({ commit }) {
    const response = await axios.get("http://localhost:9000/api/categories");
    const filteredData = response.data.filter((category) => category.enabled);
    const withImageSrc = filteredData.map((data) => {
      try {
        data.src = require(`../../assets/images/${data.icon}.png`);
      } catch (err) {
        console.log(err);
        data.src = "";
      }
      return data;
    });

    commit("setAllCategories", withImageSrc);
  },

  async getAllArticlesByCategory({ commit }, category) {
    const response = await axios.get(
      `http://localhost:9000/api/category/${category}`
    );
    const publishedArticles = response.data.filter(
      (article) => article.status === "published"
    );
    commit("setArticles", publishedArticles);
  },

  async getActiveCategory({ commit }, id) {
    const response = await axios.get("http://localhost:9000/api/categories");
    const filteredData = response.data.filter((category) => category.enabled);
    const activeCategory = filteredData.filter(
      (category) => category.id === id
    );

    const withImageSrc = activeCategory.map((data) => {
      try {
        data.src = require(`../../assets/images/${data.icon}.png`);
      } catch (err) {
        console.log(err);
        data.src = "";
      }
      return data;
    });
    commit("setActiveCategory", withImageSrc);
  },

  async getOtherCategories({ commit }, id) {
    const response = await axios.get("http://localhost:9000/api/categories");
    const filteredData = response.data.filter((category) => category.enabled);
    const activeCategory = filteredData.filter(
      (category) => category.id !== id
    );

    const withImageSrc = activeCategory.map((data) => {
      try {
        data.src = require(`../../assets/images/${data.icon}.png`);
      } catch (err) {
        console.log(err);
        data.src = "";
      }
      return data;
    });
    commit("setOtherCategories", withImageSrc);
  },
};

// Mutations
const mutations = {
  setAllCategories: (state, categories) => (state.categories = categories),
  setArticles: (state, articles) => (state.articles = articles),
  setActiveCategory: (state, activeCategory) =>
    (state.activeCategory = activeCategory),
  setOtherCategories: (state, otherCategories) =>
    (state.otherCategories = otherCategories),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
