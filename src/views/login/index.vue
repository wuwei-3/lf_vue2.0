<!--
 * @Author: wuwei
 * @Date: 2022-03-03 15:07:38
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-03 23:04:47
 * @FilePath: \lf_vue2.0\src\views\login\index.vue
-->
<template>
  <div class="login app-flex">
    <div class="n-form">
      <div class="m-h1">用户登录</div>
      <a-form :form="form" :label-col="{ span: 0 }" :wrapper-col="{ span: 24 }">
        <a-form-item label="">
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
          >
            <a-icon slot="prefix" class="mi" type="user"
          /></a-input>
        </a-form-item>
        <a-form-item label="">
          <a-input
            size="large"
            autocomplete="off"
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: '请输入用户密码' }],
              },
            ]"
            placeholder="请输入用户密码"
          >
            <a-icon slot="prefix" class="mi" type="key" />
          </a-input>
        </a-form-item>

        <div>
          <a-button
            type="primary"
            @click="handleSubmit"
            class="m-btn"
            size="large"
            >登录</a-button
          >
        </div>
        <div class="m-bottom">
          <div class="m-left"><a>立即注册</a></div>
          <div class="m-right">
            <a-checkbox @change="onChange"> 记住密码 </a-checkbox>
          </div>
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
  mounted() {
    this.form.setFieldsValue({ phone: 199557997645 });
  },

  methods: {
    /* 登录 */
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$router.push("/");
        }
      });
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
    padding-bottom 24px
    font-size 22px
    font-weight bold
    color #1890ff
  .m-bottom
    margin-top 24px
    display flex
    align-items center
    .m-left
      width 50%
    .m-right
      width 50%
      text-align right
      label
        font-size 14px !important
  .n-form
    background white
    width 420px
    padding 36px
    box-shadow 2px 2px 12px #cccccc75
    .mi
      font-size 16px
    .ant-input-affix-wrapper .ant-input:not(:first-child)
      padding-left 39px
    .ant-form-item-children
      margin-bottom 5px
      display inline-block
      width 100%
    .ant-input-lg
      font-size 14px
    .ant-input
      border-radius 0
    .ant-form label
      font-size 14px
    .m-btn
      width 100%
      font-size 17px
</style>