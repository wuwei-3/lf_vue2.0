<!--
 * @Author: wuwei
 * @Date: 2022-03-03 15:07:38
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-03 15:51:34
 * @FilePath: \lf_vue2.0\src\views\login\index.vue
-->
<template>
  <div class="login app-flex">
    <div class="n-form">
      <h2 class="m-h1">用户登录</h2>
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 17 }"
        @submit="handleSubmit"
      >
        <a-form-item label="用户名">
          <a-input
            size="large"
            autocomplete="off"
            v-decorator="[
              'phone',
              {
                rules: [{ required: true, message: '请输入用户名' }],
              },
            ]"
            placeholder="请输入用户名"
          />
        </a-form-item>
        <a-form-item label="密码">
          <a-input
            size="large"
            autocomplete="off"
            v-decorator="[
              'phone',
              {
                rules: [{ required: true, message: '请输入用户密码' }],
              },
            ]"
            placeholder="请输入用户密码"
          />
        </a-form-item>
        <div class="pt16">
          <a-checkbox @change="onChange"> 记住密码 </a-checkbox>
        </div>
        <div class="pt24">
          <a-button type="primary" class="m-btn" size="large" html-type="submit"
            >登录</a-button
          >
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this),
    };
  },
  mounted() {},

  methods: {
    /* 登录 */
    handleSubmit() {
      this.form.validateFields(() => {});
    },
    /* 记住密码 */
    onChange() {},
  },
};
</script>

<style lang="stylus">
.login
  width 100%
  height 100%
  background #f0f2f5
  background-image url('../../assets/bg.jpg')
  background-repeat no-repeat
  background-position center
  background-size 100%
  .m-h1
    text-align center
    padding-bottom 32px
  .n-form
    width 500px
    background white
    border-radius 20px
    padding 36px
    .ant-form-item-children
      margin-bottom 5px
      display inline-block
      width 100%
    .ant-input
      border-radius 0
    .ant-form label
      font-size 16px
    .m-btn
      width 100%
      font-size 17px
</style>