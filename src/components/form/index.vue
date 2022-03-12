<!--
 * @Description: 公共form组件
 * @Version: 2.0
 * @Autor: wuwei3
 * @Date: 2021-06-24 15:18:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-29 14:34:10
-->
<template>
  <div class="form-list-wrapper">
    <a-form :layout="formLayout" :form="form" :class="[formItemRow(formItem)]">
      <template v-for="(item, index) in renderDataSource">
        <field-render
          :filed="{ ...item, index: index }"
          :key="index"
          :index="index"
          v-if="!item.slot"
        />
        <template v-else>
          <!-- 这里注意，插槽方式无法在外层适用个，会引起浏览器卡死，原因a-form-item 找不到上级a-form -->
          <a-form-item :label="item.label" :class="[item.class]" :key="index">
            <slot :name="item.slot" :row="item"></slot>
          </a-form-item>
        </template>
      </template>
    </a-form>
  </div>
</template>

<script>
import FieldRender from './components/FieldRender.vue';
import list from './index.json';
export default {
  name: 'FormList',
  components: {
    FieldRender,
  },
  props: {
    // 布局 'horizontal'|'vertical'|'inline'
    formLayout: {
      type: String,
      default: 'vertical',
    },
    // 一行显示几个
    formItem: {
      type: Number,
      default: 1,
    },
    label: {
      type: String,
      default: 'left',
    },
    // item 的label和warapper
    responsive: {
      type: Object,
      default: function() {
        return {
          labelCol: { span: 3 },
          wrapperCol: { span: 19 },
        };
      },
    },
    // form数据
    dataSource: {
      type: Array,
      default: function() {
        return list || [];
      },
    },
  },
  data() {
    return {
      itemTypeClass: [
        {
          label: 'r-row1',
          value: 1,
        },
        {
          label: 'r-row2',
          value: 2,
        },
        {
          label: 'r-row3',
          value: 3,
        },
      ],
    };
  },
  created() {
    this.form = this.$form.createForm(this); // 初始化
  },
  computed: {
    /**
     * @description: 加载配置
     * @param {*}
     * @return {*}
     */

    GlobalOptions() {
      return {
        size: this.size,
        ...this.formItemLayout,
      };
    },
    /**
     * @description: 数据重组
     * @param {*}
     * @return {*}
     */

    renderDataSource() {
      return this.dataSource.map((item) => ({
        ...this.GlobalOptions,
        ...item,
      }));
    },
    /**
     * @description: 全局布局方式
     * @param {*}
     * @return {*}
     */

    formItemLayout() {
      const { formLayout } = this;
      if (formLayout === 'horizontal') {
        return this.responsive;
      } else {
        return {};
      }
    },
  },
  methods: {
    /**
     * @description: 还原指定字段或多个字段
     * @param {*} list 字段数组
     * @return {*}
     */
    resetField(list) {
      this.form.resetFields([list]);
    },
    /**
     * @description: 获取指定字段值
     * @param {*} list 字段数组
     * @return {*}
     */
    getFieldValue(list) {
      return this.form.getFieldValue(list);
    },
    /**
     * @description: 回填内容
     * @param {*} file
     * @return {*}
     */

    setFieldsValue(file) {
      this.form.setFieldsValue(file);
    },
    /**
     * @description: 一行显示个数
     * @param {*} val
     * @return {*}
     */

    formItemRow(val) {
      return this.itemTypeClass.map((item) => {
        if (item.value === val) {
          return [item.label, this.label];
        }
      });
    },
    /**
     * @description: 提交事件
     * @param {*} e
     * @return {*}
     *
     */
    handleSubmit(msg) {
      return new Promise((res, rej) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            res(values);
          } else {
            rej();
            if (msg) {
              this.$msg.error('表单有必填内容未填写，请检查');
            }
          }
        });
      });
    },
    /**
     * @description: 重置事件
     * @param {*}
     * @return {*}
     */

    resetSearchForm() {
      // 重置整个查询表单
      this.form.resetFields();
    },
  },
};
</script>

<style lang="less">
.form-list-wrapper {
  .left .ant-form-item-label {
    text-align: left;
  }
  .right .ant-form-item-label {
    text-align: right;
  }
  .r-row1 {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    > div {
      width: 100%;
      padding: 0 8px;
    }
  }
  .r-row2 {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    > div {
      width: 50%;
      padding: 0 8px;
    }
  }
  .r-row3 {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    > div {
      padding: 0 8px;
      width: 33%;
    }
  }
  .m-textarea {
    width: 100% !important;
  }
  .ant-form-item-label {
    text-overflow: ellipsis;
  }
  .ant-form-inline {
    .ant-form-item {
      display: flex;
      margin-bottom: 12px;
      margin-right: 0;

      .ant-form-item-control-wrapper {
        flex: 1;
        display: inline-block;
        vertical-align: middle;
      }

      > .ant-form-item-label {
        line-height: 32px;
        padding-right: 8px;
        width: auto;
      }
      .ant-form-item-control {
        height: 32px;
        line-height: 32px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .ant-form-item-children {
          min-width: 160px;
        }
      }
    }
  }

  .table-page-search-submitButtons {
    display: block;
    margin-bottom: 24px;
    white-space: nowrap;
  }
}
</style>
