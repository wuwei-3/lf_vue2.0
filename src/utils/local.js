/*
 * @Description:
 * @Version: 2.0
 * @Autor: wuwei3
 * @Date: 2020-01-16 08:50:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-19 14:41:02
 */
// 实现本地存储
// refer https://blog.csdn.net/weixin_43254766/article/details/83618630
// @author ljgeng
export default class Storage {
  constructor(props) {
    this.props = props || {};
    // 默认使用 localStorage存储
    this.source = this.props.source || window.localStorage;
    this.init();
  }

  /**
   * 每次初始化时将存储中过期的数据清除
   */
  init() {
    const reg = new RegExp('__expires__');

    let data = this.source;

    let list = Object.keys(data);

    if (list.length > 0) {
      list.map((key) => {
        if (!reg.test(key)) {
          let now = Date.now();

          let expires = data[`${key}__expires__`] || Date.now + 1;

          if (now >= expires) {
            this.remove(key);
          }
        }
        return key;
      });
    }
  }

  /**
   * set 存储方法
   * @ param {String}     key 键
   * @ param {String}     value 值，存储的值可能是数组/对象，不能直接存储，需要转换 JSON.stringify
   * @ param {String}     expired 过期时间，以分钟为单位
   */
  set(key, value, expired) {
    let source = this.source;

    source[key] = JSON.stringify(value);
    if (expired) {
      source[`${key}__expires__`] = Date.now() + 1000 * 60 * expired;
    }
    return value;
  }

  /**
   * get 获取方法
   * @ param {String}     key 键
   * @ param {String}     expired 存储时为非必须字段，所以有可能取不到，默认为 Date.now+1
   */
  get(key) {
    const source = this.source,
      expired = source[`${key}__expires__`] || Date.now + 1;
    const now = Date.now();

    if (now >= expired) {
      this.remove(key);
      return;
    }
    const value = source[key] ? JSON.parse(source[key]) : source[key];

    return value;
  }

  /**
   * 删除存储值
   * @param {String} key
   */
  remove(key) {
    const data = this.source,
      value = data[key];

    delete data[key];
    delete data[`${key}__expires__`];
    return value;
  }
}
