<!--
 * @Author: wuwei
 * @Date: 2022-03-03 21:46:06
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-03 22:32:03
 * @FilePath: \lf_vue2.0\src\views\home\index.vue
-->
<template>
  <div class="egg-home">
    <div class="e-top1">
      <div v-for="i in 4" :key="i" class="p-card">
        <div class="d-icon"><a-icon type="user-add" /></div>
        <div class="d-name">新增会员</div>
      </div>
    </div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus">
.egg-home
  width 100%
  height 100%
  padding 24px
  box-sizing border-box
  .e-top1
    display flex
  .p-card
    border 1px solid #f0f0f0
    background white
    width 150px
    display flex
    flex-direction column
    align-items center
    margin-right 24px
    padding 14px
    cursor pointer
    .d-icon
      background #40a9ff
      border-radius 50%
      width 59px
      height 59px
      display flex
      align-items center
      justify-content center
    .d-name
      font-size 14px
      height 50px
      line-height 57px
    i
      font-size 35px
      color white
</style>