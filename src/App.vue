<template>
  <div id="app" style="height:100%;">
    <main-view></main-view>
  </div>
</template>

<script>
import Main from '@/components/Main'
export default {
  name: 'app',
  components: {
    mainView:Main
  },

}
</script>

<style>
html,body{
  height: 100%;
}
</style>
