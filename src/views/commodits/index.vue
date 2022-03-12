<!--
 * @Author: wuwei
 * @Date: 2022-03-12 14:22:15
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-12 15:36:55
 * @FilePath: \lf_vue2.0\src\views\commodits\index.vue
-->
<template>
  <div class="commodits">
    <div class="s-search">
      <div class="h-btn">
        <span class="btn">商品名称/编号：</span>
        <a-input-search
          placeholder="请输入商品名称/编号"
          enter-button
          @search="onSearch"
        />
      </div>
      <div><a-button type="primary">添加商品</a-button></div>
      <div class="btn2"><a-button type="danger">批量删除</a-button></div>
    </div>
    <div class="s-table">
      <a-table
        border
        :scroll="{ x: 1150 }"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
        :columns="columns"
        :data-source="dataList"
      />
    </div>
  </div>
</template>

<script>
import list from "./index.json";
export default {
  data() {
    return {
      selectedRowKeys: [],
      columns: [
        {
          title: "序号",
          dataIndex: "index",
          customRender: (text, record, index) => {
            return index + 1;
          },
          width: 80,
        },
        { title: "商品编码编码", dataIndex: "code", width: 150 },
        { title: "商品名称", dataIndex: "code1" },
        { title: "商品价格", dataIndex: "code2" },
        { title: "所属分类", dataIndex: "code3" },
        { title: "折扣", dataIndex: "code4" },
        { title: "参考进价", dataIndex: "code5" },
        { title: "状态", dataIndex: "code6" },
        { title: "库存", dataIndex: "code7" },
        { title: "操作", dataIndex: "action" },
      ],
      dataList: list,
    };
  },
  mounted() {},
  methods: {
    /* 点击btn请求 */
    onSearch() {},
    /* 复选框 */
    onSelectChange() {},
  },
};
</script>

<style lang="less">
.commodits {
  width: calc(100% - 32px);
  height: calc(100% - 32px);
  margin: 16px;
  background: white;
  padding: 16px;
  .s-table {
    height: calc(100% - 50px);
    border: 1px solid #e8e8e8;
  }
  .s-search {
    display: flex;
    align-items: center;
    padding-bottom: 16px;
  }
  .h-btn {
    width: 500px;
    display: flex;
    align-items: center;
    margin-right: 24px;
    .btn {
      width: 132px;
    }
  }
  .btn2 {
    margin-left: 12px;
  }
}
</style>