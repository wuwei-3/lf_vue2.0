<!--
 * @Description: form组件
 * @Version: 2.0
 * @Autor: wuwei3
 * @Date: 2021-06-24 15:49:09
 * @LastEditors: OBKoro1
 * @LastEditTime: 2021-11-29 11:42:42
-->
<template>
  <div ref="formc" :class="[filed.type === 'textarea' ? 'm-fild-parent' : '']">
    <!-- class 可手动更改form-item 样式 -->
    <a-form-item
      :label="filed.label"
      :title="filed.label"
      :label-col="filed.labelCol"
      :wrapper-col="filed.wrapperCol"
      :class="[filed.class]"
    >
      <!-- input组件 -->
      <x-input
        v-if="filed.type === 'input'"
        :maxLength="filed.max ? filed.max : 60"
        :disabled="filed.disabled"
        :allowClear="!filed.allowClear"
        @click="
          (val) => {
            filed.method ? filed.method(val, filed) : null;
          }
        "
        @change="
          (val) => {
            filed.method ? filed.method(val, filed) : null;
          }
        "
        :style="{ width: filed.width ? filed.width : '100%' }"
        v-decorator="[
          filed.key,
          {
            initialValue: filed.value,
            rules: [
              {
                required: !filed.checked,
                message: filed.placeholder
                  ? filed.placeholder
                  : filed.label + '不能位空',
              },
              {
                validator: filed.validator
                  ? filed.validator
                  : (rule, value, callback) => {
                      callback();
                    },
              },
            ],
          },
        ]"
        :placeholder="
          filed.placeholder ? filed.placeholder : '请输入' + filed.label
        "
      />
      <!-- 数字输入框,包含精度 -->
      <a-input-number
        :step="1"
        v-else-if="filed.type === 'inputNumber'"
        :disabled="filed.disabled"
        allowClear
        :style="{ width: filed.width ? filed.width : '100%' }"
        :precision="filed.precision !== null ? filed.precision : null"
        :max="filed.max ? filed.max : 100000000"
        :min="0"
        v-decorator="[
          filed.key,
          {
            initialValue: filed.value,
            rules: [
              {
                required: !filed.checked,
                message: filed.validator ? '' : filed.placeholder,
              },
              {
                validator: filed.validator
                  ? filed.validator
                  : (rule, value, callback) => {
                      return callback();
                    },
              },
            ],
          },
        ]"
        :placeholder="
          filed.placeholder ? filed.placeholder : '请输入' + filed.label
        "
      />
      <!-- 数字输入框 - 费率 -->
      <a-input-number
        :step="1"
        v-else-if="filed.type === 'inputNumberParser'"
        :min="0"
        :disabled="filed.disabled"
        :precision="filed.precision !== null ? filed.precision : null"
        :max="filed.max ? filed.max : 100000000"
        :formatter="(value) => `${value}%`"
        :parser="(value) => value.replace('%', '')"
        allowClear
        :style="{ width: filed.width ? filed.width : '100%' }"
        v-decorator="[
          filed.key,
          {
            initialValue: filed.value,
            rules: [
              {
                required: !filed.checked,
                message: filed.validator ? '' : filed.placeholder,
              },
              {
                validator: filed.validator
                  ? filed.validator
                  : (rule, value, callback) => {
                      return callback();
                    },
              },
            ],
          },
        ]"
        :placeholder="'请输入' + filed.label"
      />
      <!-- 文本框 -->
      <a-textarea
        :placeholder="
          filed.placeholder ? filed.placeholder : '请输入' + filed.label
        "
        :autoSize="{ minRows: 4, maxRows: 10 }"
        :disabled="filed.disabled"
        :maxLength="256"
        allowClear
        v-decorator="[
          filed.key,
          {
            initialValue: filed.value,
            rules: [
              {
                required: !filed.checked,
                message:
                  filed.placeholder + '（选填）'
                    ? filed.placeholder
                    : '请输入' + filed.label + '（选填）',
              },
              {
                validator: filed.validator
                  ? filed.validator
                  : (rule, value, callback) => {
                      callback();
                    },
              },
            ],
          },
        ]"
        :style="{ width: filed.width ? filed.width : '100%' }"
        v-else-if="filed.type === 'textarea'"
      />
      <!-- 单选框 -->
      <template v-else-if="filed.type === 'radio'">
        <a-radio-group
          :disabled="filed.disabled"
          v-decorator="[
            filed.key,
            {
              initialValue: filed.value,
              rules: [
                {
                  required: !filed.checked,
                  message: filed.placeholder
                    ? filed.placeholder
                    : filed.label + '不能位空',
                },
              ],
            },
          ]"
        >
          <a-radio :value="item" v-for="(item, i) in filed.options" :key="i">
            {{ item }}
          </a-radio>
        </a-radio-group>
      </template>
      <!-- 复选框 -->
      <template v-else-if="filed.type === 'checkbox'">
        <a-checkbox-group
          :disabled="filed.disabled"
          :options="filed.options"
          v-decorator="[
            filed.key,
            {
              initialValue: filed.value,
              rules: [
                {
                  required: !filed.checked,
                  message: filed.placeholder
                    ? filed.placeholder
                    : filed.label + '不能位空',
                },
              ],
            },
          ]"
        />
      </template>
      <!-- 普通下拉框组件 -->
      <a-select
        v-else-if="filed.type === 'select'"
        :style="{ width: filed.width ? filed.width : '100%' }"
        :disabled="filed.disabled"
        :mode="!filed.mode ? 'default' : 'multiple'"
        :showSearch="filed.showSearch"
        :maxTagCount="3"
        :getPopupContainer="() => $refs.formc"
        @change="
          (val) => {
            filed.method ? filed.method(val, filed) : null;
          }
        "
        :filterOption="selectFilterOption"
        allowClear
        v-decorator="[
          filed.key,
          {
            initialValue: filed.value,
            rules: [
              {
                required: !filed.checked,
                message: filed.placeholder
                  ? filed.placeholder
                  : filed.label + '不能位空',
              },
              {
                validator: filed.validator
                  ? filed.validator
                  : (rule, value, callback) => {
                      callback();
                    },
              },
            ],
          },
        ]"
        :placeholder="'请选择' + filed.label"
      >
        <template v-for="(item, d) in filed.options">
          <a-select-option :value="item.value" :key="d">
            {{ item.label }}
          </a-select-option>
        </template>
      </a-select>

      <!-- 日期组件 -普通日期 -->
      <a-date-picker
        v-else-if="filed.type === 'datetime'"
        :disabled="filed.disabled"
        :placeholder="
          filed.placeholder ? filed.placeholder : '请输入' + filed.label
        "
        :valueFormat="filed.time ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'"
        :show-time="filed.time ? true : false"
        :style="{ width: filed.width ? filed.width : '100%' }"
        v-decorator="[
          filed.key,
          {
            initialValue: filed.value,
            rules: [
              {
                required: !filed.checked,
                message: filed.placeholder
                  ? filed.placeholder
                  : filed.label + '不能位空',
              },
              {
                validator: filed.validator
                  ? filed.validator
                  : (rule, value, callback) => {
                      callback();
                    },
              },
            ],
          },
        ]"
      />
      <!-- 日期组件 -普通日期 用于单据时间格式化-->

      <a-month-picker
        v-else-if="filed.type === 'month'"
        :placeholder="
          filed.placeholder ? filed.placeholder : '请输入' + filed.label
        "
        :valueFormat="filed.valueFormat"
        :style="{ width: filed.width ? filed.width : '100%' }"
        v-decorator="[
          filed.key,
          {
            initialValue: filed.value,
            rules: [
              {
                required: !filed.checked,
                message: filed.placeholder
                  ? filed.placeholder
                  : filed.label + '不能位空',
              },
              {
                validator: filed.validator
                  ? filed.validator
                  : (rule, value, callback) => {
                      callback();
                    },
              },
            ],
          },
        ]"
      />
      <!-- 开始时间 - 结束时间 -->
      <a-range-picker
        v-else-if="filed.type === 'datetimeRange'"
        :disabled="filed.disabled"
        allowClear
        :style="{ width: filed.width ? filed.width : '100%' }"
        :valueFormat="filed.time ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'"
        :placeholder="['开始日期', '选择日期']"
        :show-time="filed.time"
        v-decorator="[
          filed.key,
          {
            initialValue: filed.value,
            rules: [
              {
                required: !filed.checked,
                message: filed.placeholder ? filed.placeholder : '请选择时间',
              },
              {
                validator: filed.validator
                  ? filed.validator
                  : (rule, value, callback) => {
                      callback();
                    },
              },
            ],
          },
        ]"
      />
      <!-- 级联下拉框 -->
      <a-cascader
        v-else-if="filed.type === 'cascader'"
        :disabled="filed.disabled"
        :options="filed.options"
        allowClear
        :style="{ width: filed.width ? filed.width : '100%' }"
        :showSearch="{ cascaderFilter }"
        v-decorator="[
          filed.key,
          {
            initialValue: filed.value,
            rules: [
              {
                required: !filed.checked,
                message: filed.placeholder
                  ? filed.placeholder
                  : filed.label + '不能位空',
              },
              {
                validator: filed.validator
                  ? filed.validator
                  : (rule, value, callback) => {
                      callback();
                    },
              },
            ],
          },
        ]"
        :placeholder="'请选择' + filed.label"
      />
      <!-- 时间选择器 -->
      <a-time-picker
        v-else
        :disabled="filed.disabled"
        :placeholder="'请选择' + filed.label"
        valueFormat="HH-MM-SS"
        :style="{ width: filed.width ? filed.width : '100%' }"
        v-decorator="[
          filed.key,
          {
            initialValue: filed.value,
            rules: [
              {
                required: !filed.checked,
                message: filed.placeholder
                  ? filed.placeholder
                  : filed.label + '不能位空',
              },
              {
                validator: filed.validator
                  ? filed.validator
                  : (rule, value, callback) => {
                      callback();
                    },
              },
            ],
          },
        ]"
      />
    </a-form-item>
  </div>
</template>

<script>
export default {
  name: "FieldRender",
  props: {
    filed: {
      type: Object,
      default: () => {
        return {};
      },
    },
    index: {
      type: Number,
      return: 1,
    },
  },
  methods: {
    /**
     * @description:空格校验
     * @param {*}
     * @return {*}
     */

    keydown(e) {
      if (e.keyCode == 32) {
        e.returnValue = false;
      }
    },
    /**
     * @description: 下拉框组件值
     * @param {*} val 选中值
     * @param {*} filed 当前对象
     * @return {*}
     */

    onChangeSelect(val, filed) {
      this.$emit("select", { ...filed, value: val });
    },
    /**
     * @description: select 模糊搜索
     * @param {*} input 值
     * @param {*} option 对象
     * @return {*}
     */
    selectFilterOption(input, option) {
      // 下拉框过滤函数
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    /**
     * @description: 级联模糊搜索
     * @param {*} inputValue 值
     * @param {*} path 对象
     * @return {*}
     */
    cascaderFilter(inputValue, path) {
      // 级联过滤函数
      return path.some(
        (option) =>
          option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      );
    },
  },
};
</script>
<style>
.m-fild-parent {
  width: 100% !important;
}
</style>