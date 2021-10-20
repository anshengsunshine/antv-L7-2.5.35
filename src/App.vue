<template>
  <div id="nav">
    <router-link to="/">世界地图 + 鼠标交互（悬浮 + 点击）</router-link> |
    <router-link to="/about">第三方mapBox地图</router-link> |
    <router-link to="/map_world_point">世界地图 + 涟漪散点</router-link>
  </div>
  <router-view />
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: #ccc;
  z-index: 99;
  position: absolute;
  top: 0;
  width: 100%;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
