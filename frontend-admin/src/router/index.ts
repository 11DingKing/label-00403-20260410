import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layouts/DefaultLayout.vue'),
    redirect: '/insight',
    children: [
      {
        path: 'insight',
        name: 'Insight',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: 'Insight', icon: 'icon-dashboard' },
      },
      {
        path: 'charts',
        name: 'Report',
        component: () => import('@/views/Charts.vue'),
        meta: { title: 'Report', icon: 'icon-bar-chart' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
