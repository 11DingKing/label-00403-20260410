<template>
  <a-config-provider>
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body, #app { height: 100%; }
body { font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Segoe UI', Roboto, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-thumb { background: #c9cdd4; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #86909c; }
::-webkit-scrollbar-track { background: transparent; }
</style>
