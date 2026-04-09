<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <div class="header-left">
        <div class="logo">
          <div class="logo-icon"><icon-apps /></div>
          <span class="logo-text">数据管理平台</span>
        </div>
        <div class="nav-tabs">
          <router-link to="/insight" class="nav-tab" active-class="active">数据洞察</router-link>
          <router-link to="/charts" class="nav-tab" active-class="active">图表报表</router-link>
        </div>
      </div>
      <div class="header-right">
        <a-input-search 
          v-model="searchKeyword" 
          placeholder="搜索数据..." 
          class="search-input"
          allow-clear
          @search="handleSearch"
          @clear="handleClear"
        />
      </div>
    </a-layout-header>
    <a-layout-content class="content">
      <router-view :search-keyword="searchKeyword" />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconApps } from '@arco-design/web-vue/es/icon'

const searchKeyword = ref('')

const handleSearch = (value: string) => {
  searchKeyword.value = value
}

const handleClear = () => {
  searchKeyword.value = ''
}
</script>

<style scoped>
.layout {
  height: 100vh;
  background: #f7f8fc;
}
.header {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e5e6eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  flex-shrink: 0;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 32px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}
.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #165dff 0%, #0fc6c2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
}
.logo-text {
  font-size: 16px;
  font-weight: 600;
  color: #1d2129;
}
.nav-tabs {
  display: flex;
  gap: 4px;
}
.nav-tab {
  padding: 8px 16px;
  font-size: 14px;
  color: #86909c;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s;
}
.nav-tab:hover {
  color: #4e5969;
  background: #f7f8fc;
}
.nav-tab.active {
  color: #165dff;
  background: #e8f3ff;
  font-weight: 500;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.search-input {
  width: 200px;
}
:deep(.search-input .arco-input-wrapper) {
  border-radius: 8px;
  background: #f7f8fc;
  border: none;
}
:deep(.search-input .arco-input-wrapper:hover) {
  background: #f2f3f5;
}
.content {
  flex: 1;
  padding: 24px;
  overflow: auto;
}

@media (min-width: 1600px) {
  .header { padding: 0 48px; }
  .content { padding: 32px 48px; }
}

@media (max-width: 768px) {
  .header { padding: 0 16px; gap: 12px; }
  .logo-text { display: none; }
  .nav-tabs { gap: 2px; }
  .nav-tab { padding: 6px 10px; font-size: 13px; }
  .search-input { display: none; }
  .content { padding: 16px; }
}
</style>
