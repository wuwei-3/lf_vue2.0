<!--
 * @Author: wuwei
 * @Date: 2022-03-03 15:06:25
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-03 23:05:40
 * @FilePath: \lf_vue2.0\src\views\index.vue
-->
<template>
  <div class="home">
    <div class="e-top">
      <div class="p-logo">
        <img src="../assets/logo.png" /><span>贝 贝 理 发</span>
      </div>
      <div class="p-user">
        <span>欢迎你：超级管理员</span
        ><a-icon type="logout" @click="loginOut" />
      </div>
    </div>
    <div class="e-bottom">
      <div class="m-left">
        <a-menu
          style="width: 256px"
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
          :mode="mode"
          :theme="theme"
        >
          <a-menu-item key="1">
            <a-icon type="home" />
            首页
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="dollar" />
            商品列表
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="user" />
            会员管理
          </a-menu-item>
          <a-menu-item key="4">
            <a-icon type="pay-circle" />
            消费记录
          </a-menu-item>
          <a-menu-item key="5">
            <a-icon type="tool" />
            设置
          </a-menu-item>
        </a-menu>
      </div>
      <div class="m-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    /* 退出 */
    loginOut() {
      let that = this;
      this.$confirm({
        title: "退出",
        content: "您确定要退出系统?",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          that.$router.push("/login");
        },
        onCancel() {},
      });
    },
  },
};
</script>

<style lang="stylus">
.home
  width 100%
  height 100%
  .e-top
    height 56px
    display flex
    align-items center
    padding 0 24px
    font-size 16px
    background #001529
    box-shadow 0 1px 4px rgb(0 21 41 / 8%)
    color white
    a
      color #40a9ffd9
    .p-logo
      img
        width 30px
      span
        font-size 16px
        font-weight bold
        margin 0 8px
  .p-user
    flex 1
    text-align right
    font-size 14px
    :first-child
      margin-right 14px
      font-weight bold
      font-size 17px
  .e-bottom
    height calc(100% - 56px)
    width 100%
    display flex
    .m-left
      width 250px
      box-shadow 2px 0 8px 0 rgb(29 35 41 / 5%)
      .ant-menu-item
        height 48px
        line-height 48px
        font-size 14px
        .anticon
          font-size 14px
      .ant-menu-item-selected
        border-right 3px solid #1890ff
        width 250px
    .m-right
      flex 1
      background #f0f2f5
      width 100%
      height 100%
</style>