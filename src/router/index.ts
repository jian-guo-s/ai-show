import { createRouter, createWebHistory } from "vue-router";
let router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import('@/views/home/index.vue'),
    },
    {
      path: "/detail",
      name: "homeDetail",
      component: () => import('@/views/home/detail.vue'),
    },
    {
      path: "/modelCreate",
      name: "modelCreate",
      component: () => import('@/views/model/create.vue'),
    },
    {
      path: "/modelDetail",
      name: "modelDetail",
      component: () => import('@/views/model/detail.vue'),
    },
    {
      path: "/nftCreate",
      name: "nftCreate",
      component: () => import('@/views/nft/create.vue'),
    },
    {
      path: "/nftDetail",
      name: "nftDetail",
      component: () => import('@/views/nft/detail.vue'),
    },
    {
      path: "/postCreate",
      name: "postCreate",
      component: () => import('@/views/post/create.vue'),
    },
    {
      path: "/postDetail",
      name: "postDetail",
      component: () => import('@/views/post/detail.vue'),
    },
  ],
});

export default router;
