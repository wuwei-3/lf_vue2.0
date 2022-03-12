# 自定义 Form 组件

具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素

### 使用场景

需要对输入的数据类型进行校验时

自定义生成动态表单

### 目录分析

```
public
src
--assets // 资源
--components // 组件
  --form // -------重点，封装的form组件
--router // 路由
--utils // 工具类
--views
  --drawer
	--index.vue // 高级表单操作，
  --form
	--index.json // 表单数据
	--index.vue // 基础自定义表单，动态生成表单
App.vue
main.js // 基础配置
```

### 功能列表

所有数据均通过 props，computed 定义，支持三种布局方式，三种排列方式，插槽自定义 formList

### props 配置

1，整体布局方式：formLayout

​ 可选值：'horizontal'|'vertical'|'inline'

​ 默认：‘vertical’ 上下布局

2，列布局：formItem

​ 可选值：1 ， 2， 3

​ 默认：一行一列

3，行标签布局：responsive

​ 可选值：同 `<Col>` 组件

​ 默认：labelCol: { span: 3 },wrapperCol: { span: 19 },

4，原值数据：dataSource （下面会单独介绍）

​ 默认：[]

### dataSource 配置

```
目前form支持类型，根据type字段判断，如需其他类型，后面可继续丰富组件
select：普通下拉框
input：普通输入框
inputNumber: 数字输入框
inputNumberParser：数据输入框（自动格式化如：%）
textarea：文本输入框
radio：单选框
checkbox：复选框
datetime：普通时间日期（一天）
datetimeRange：联动开始-结束日期（两天）
cascader：下拉框（级联）
默认值：时间选择器

-----这里是字段声明-----

{
    label: '费用类型', // a-form-item 展示label字段
    type: 'select', //  上面有解释
    width:'120px', // 为空则默认100%，仅针对ant-form-item-control-wrapper 生效
    method: this.onSelect, // 仅针对当前type类型组件方法，需要在当前methods中声明
    slot:'sumType', // 如果开启这个配置需要声明指定插槽，具体看下面 “插槽” 用法
    disabled:true, // true 不校验，false 校验，默认false
    key:'type', // 自定义key 用于和后端交互字段 -  注意这个是必填的，且不能重复，注意下
    class:'m-select-sum', // 当默认样式无法满足，可以自定义样式
    options: [ // options 配置仅针对select（一级） 和 cascader（多级），必须和以下格式相同，如有不同，可自行转换
        {
            label: '机票费',
            value: 0,
        },
        {
            label: '火车费',
            value: 1,
        },
    ],
}
methods:{
    /**
     * @description: 事件-select
     * @param {*} val
     * @return {*}
     */
    onSelect(val) {
      this.submit(false);
      this.dataSource2 = list[val];
    },
}
```

​ 高级用法：插槽

```
<form-list ref="form" :dataSource="dataSource" @form="getFormList">
  <template v-slot:sumType="row"> // 这里的row.row是当前filed，自定义完后任然可以通过form去管理这个组件
    <div class="m-flex">
      <div class="m-switch">
        <div>补贴方式</div>
        <div class="h-top">
          <a-switch @change="onSwitch" />
        </div>
      </div>
      <div class="m-butie">
        <!-- 自定义插槽，并支持原属性的校验 -->
        <a-form-item :label="'补贴上限'">
          <x-input
            placeholder="请输入补贴上限"
            :disabled="row.row.disabled" // 你可以这样取值
            v-decorator="[
              'largeBill',
              {
                initialValue: row.row.value, // 你可以这样取值
                rules: [
                  {
                    required: !row.row.disabled,
                    message: '请输入补贴上限',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
      </div>
    </div>
  </template>
</form-list>
```

自定义校验规则

```
data(){
	return{
        {
            label: '手机号',
            type: 'inputNumber',
            validator: this.phoneValidator, // 这里是自定义校验规则，一旦开启，当前其他规则默认关闭
        },
	}
}
methods:{
	/**
     * @description:手机号校验
     * @param {*} rule 基础规则
     * @param {*} value 当前值
     * @param {*} callback  回调
     * @return {*}
     */
    phoneValidator(rule, value, callback) {
      let reg = /^1[3|4|5|7|8|9][0-9]{9}$/;
      if (!value) {
        return callback('请输入手机号');
      }
      if (!_.isNumber(value)) {
        return callback('输入格式有误');
      }
      if (!reg.test(value)) {
        return callback('手机号格式输入有误');
      }
      callback();
    },
}
```

需要注意的事

1，每个字段声明必须是 label，value 方式

2，formLayout="vertical" 时，responsive 字段不生效

3，对于一些难以控制的样式，比如：**textarea 类型**，我们建议如下书写方式（大家统一默认这样书写），可自行定义备注等样式

```
{
    "label": "备注",
    "type": "textarea",
    "checked": true,
    "class": "m-textarea"
 },
```

4，以上所有字段，**label 和 type**是必须要的，其他都是不必要的

### 我们提供哪些方法

1，@form 方法，用于获取校验成功值

```
<form-list
    ref="form"
    :dataSource="dataSource2"
    :formItem="1"
    formLayout="horizontal"
    :responsive="{
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
    }"
    label="left"
    @form="getFormList" // 这里用于获取校验通过的值
></form-list>

注意的事，得到值可能是这样的，
    startTime: "2021-06-14"
    endTime: "2021-06-14"
    area: "我的备注"
    name: "北京航空航天"
    money: 590.1
根据指定key获取对应值
```

2，校验，取消校验方法，handleSubmit，resetSearchForm，有几个 form 组合定义几个 ref

```
	/**
     * @description: 提交/取消
     * @param {*}
     * @return {*}
     */
    submit(val) {
      if (val) {
        this.$refs.form.handleSubmit();
        this.$refs.form2.handleSubmit();
      } else {
        this.$refs.form.resetSearchForm();
        this.$refs.form2.resetSearchForm();
      }
    },
```

### 如何默认/修改 form 字段

```
这里是默认写法
{
    "label": "出发日期",
    "type": "datetime",
    value:'2021-06-29' // 注意对应格式，组件会默认显示出来
},
这里是修改指定form,推荐使用splice 修改，避免DOM不及时更新
this.dataSource.splice(2, 1, par);
```

最后，建议大家先阅读源码，如有疑问可随时联系，weiwu@yitong.com.cn

ps：Demo 代码提供两个路由用于大家参考，'/form' 和‘/drawer’

### 优化 Form 校验规则

传统方式

```json
handleSubmit(e) {
     e.preventDefault();
	 this.form.validateFields((err, values) => {
        if (!err) {
           //console.log(values)
        }
    })
}
```

优化后

```json
/**
 * @description: 提交事件
 * @param {*} e
 * @return {*}
 *
 */
handleSubmit() {
  return new Promise((res, rej) => {
    this.form.validateFields((err, values) => {
      if (!err) {
        res(values);
      } else {
        rej();
      }
    });
  });
},
```

如何使用（主要解决多个 form 同时使用后无法正确知道回调）

```
单个Form 使用

this.$refs.formBasic.handleSubmit().then((values) => {
	// 校验成功,请求接口 values为表单内容
}).catch((err)=>{
	// 校验失败，失败操作 err可以自定义内容
})

多个Form组合使用

this.$refs.formBasic.handleSubmit().then((values) => {
	// 校验成功,请求接口 values为表单内容
	return this.$refs.formOther.handleSubmit() // 这里必须有return
}).then((values)=>{
	// 第二个form校验成功回调，以此类推
}).catch((err)=>{
	// 校验失败，失败操作 err可以自定义内容（最新一个失败回调）
})

```
