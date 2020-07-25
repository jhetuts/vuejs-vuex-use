import Vue from "vue";
import VueRouter from "vue-router";
import Categories from "../views/Categories.vue";
import Category from "../views/Category.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "All Categories",
    redirect: "/categories",
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
  },
  {
    path: "/categories/:id",
    name: "Category",
    component: Category,
  },
  {
    path: "*",
    name: "Not Found",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
