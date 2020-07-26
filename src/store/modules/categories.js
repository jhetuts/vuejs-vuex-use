import axios from "axios";
import { API } from "../../config/dev.envi";

console.log(API);
// States
const state = {
  categories: [],
  articles: [],
  activeCategory: [],
  otherCategories: [],
  filteredCategories: [],
  author: [],
};

// Getters
const getters = {
  allCategories: (state) => state.categories,
  allArticles: (state) => state.articles,
  activeCategory: (state) => state.activeCategory,
  otherCategories: (state) => state.otherCategories,
  filteredCategories: (state) => state.filteredCategories,
  author: (state) => state.author,
};

// Actions
const actions = {
  async getAllCategories({ commit }) {
    const response = await axios.get(`${API}/categories`);
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
    const sortedByOrder = withImageSrc.sort((x, y) => x.order - y.order);

    commit("setAllCategories", withImageSrc);
  },

  async getAllArticlesByCategory({ commit }, category) {
    const response = await axios.get(`${API}/category/${category}`);
    const publishedArticles = response.data.filter(
      (article) => article.status === "published"
    );
    commit("setArticles", publishedArticles);
  },

  async getActiveCategory({ commit }, id) {
    const response = await axios.get(`${API}/categories`);
    const filteredData = response.data.filter((category) => category.enabled);
    const activeCategory = filteredData.filter(
      (category) => category.id === id
    );

    const withImageSrc = activeCategory.map((data) => {
      try {
        data.src = require(`../../assets/images/${data.icon}.png`);
      } catch (err) {
        data.src = "";
      }
      return data;
    });

    commit("setActiveCategory", withImageSrc);
  },

  async getOtherCategories({ commit }, id) {
    const response = await axios.get(`${API}/categories`);
    const filteredData = response.data.filter((category) => category.enabled);
    const activeCategory = filteredData.filter(
      (category) => category.id !== id
    );
    const withImageSrc = activeCategory.map((data) => {
      try {
        data.src = require(`../../assets/images/${data.icon}.png`);
      } catch (err) {
        data.src = "";
      }
      return data;
    });
    const sortedByOrder = withImageSrc.sort((x, y) => x.order - y.order);
    commit("setOtherCategories", sortedByOrder);
  },

  async filterCategories({ commit }, title) {
    const currentCount = this.state.categories.categories;

    const results = currentCount.filter((current) =>
      current.title.toLowerCase().includes(title.toLowerCase())
    );

    commit("setFilteredCategories", results);
  },

  async getAuthor({ commit }, author) {
    const response = await axios.get(`${API}/author/${author}`);
    commit("setAuthor", response.data.name);
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
  setFilteredCategories: (state, filteredCategories) =>
    (state.filteredCategories = filteredCategories),
  setAuthor: (state, author) => (state.author = author),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
