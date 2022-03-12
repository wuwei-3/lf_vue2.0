<!--
 * @Author: wuwei
 * @Date: 2022-03-03 15:06:25
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-12 15:09:21
 * @FilePath: \lf_vue2.0\src\views\index.vue
-->
<template>
  <div class="home">
    <div class="e-top">
      <div class="p-logo">
        <img src="../assets/ic_launcher.png" />
        <span>理发1.0</span>
      </div>
      <div class="p-user">
        <span>欢迎你：超级管理员</span><span @click="loginOut">退出</span>
      </div>
    </div>
    <div class="e-bottom">
      <div class="m-left">
        <a-menu :default-selected-keys="selectActive" @select="onSelect">
          <a-menu-item key="eggHome">
            <a-icon type="home" />
            首页
          </a-menu-item>
          <a-menu-item key="commodits">
            <a-icon type="dollar" />
            商品列表
          </a-menu-item>
          <a-menu-item key="members">
            <a-icon type="user" />
            会员管理
          </a-menu-item>
          <a-menu-item key="records">
            <a-icon type="pay-circle" />
            消费记录
          </a-menu-item>
          <a-menu-item key="setting">
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
    return {
      mode: "vertical",
      theme: "light",
      selectActive: [],
    };
  },
  watch: {
    $route: {
      handler(val) {
        this.selectActive = [val.name];
      },
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    /* 选中时回调 */
    onSelect(val) {
      this.selectActive = [val.key];
      this.$router.push({ name: val.key });
    },
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
<style lang="less">
.home {
  width: 100%;
  height: 100%;
  .e-top {
    height: 56px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    font-size: 16px;
    background: #1b7ef5;
    box-shadow: 0 1px 4px #1b7ef5;
    color: white;
    a {
      color: #40a9ffd9;
    }
    .p-logo {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        border-radius: 5px;
      }
      span {
        font-size: 16px;
        font-weight: bold;
        margin: 0 8px;
      }
    }
  }
  .p-user {
    flex: 1;
    text-align: right;
    font-size: 14px;
    cursor pointer span {
      margin-right: 14px;
      font-size: 14px;
    }
    i {
      font-weight: bold;
      font-size: 16px !important;
    }
  }
  .e-bottom {
    height: calc(100% - 56px);
    width: 100%;
    display: flex;
    .m-left {
      width: 210px;
      .ant-menu {
        border-right: 0;
      }
      .ant-menu-item-selected {
        border-right: 3px solid #1890ff;
      }
      .ant-menu-item {
        height: 48px;
        line-height: 48px;
        font-size: 14px;
        .anticon {
          font-size: 16px;
        }
      }
    }
    .m-right {
      flex: 1;
      background: #f0f2f5;
      width: 100%;
      height: 100%;
    }
  }
}
</style>