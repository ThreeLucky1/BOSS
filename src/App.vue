<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}
html,
body {
  height: 100%;
}
.lizi {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: -1;
  background: #f0f2f5;
}
.options {
  position: relative;
  width: 100%;
  height: 40px;
  background: #fff;
}
.container {
  padding: 10px;
  width: 68%;
}
.container1 {
  padding: 10px;
  width: 100%;
  height: 100%;
  position: absolute;
  background: #fff;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
</style>
