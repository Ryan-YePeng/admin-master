/**
 * @author 王业鹏
 * @description 根据树状结构菜单自动引入.vue文件
 * @date 2020/03/16 21:44
 * @class TraverseTree
 * @constructor menu
 * @constructor layout
 * @return layout
 * */

export class TraverseTree {
  constructor(menu, layout) {
    this.menu = menu; // 菜单
    this.layout = layout; // 路由集合
    this.run() // 启动
  }

  static isEmpty(value) { // 判断数组是否可以继续遍历
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    )
  }

  release() { // 释放内存
    this.menu = null;
  }

  addRouter(item) { // 添加路由
    if (item.iframe) return;
    let obj = {};
    obj.name = item.name;
    obj.path = item.path;
    obj.meta = {};
    obj.meta.title = item.title;
    obj.component = () => import(`@/views${item.path}`);
    this.layout.children.push(obj)
  }

  run() {
    // 遍及一级
    this.menu.forEach(fistItem => {
      fistItem.path = `/${fistItem.name}`;
      if (!TraverseTree.isEmpty(fistItem.children)) {
        // 遍历二级
        fistItem.children.forEach(secondItem => {
          secondItem.path = `/${fistItem.name}/${secondItem.name}`;
          if (!TraverseTree.isEmpty(secondItem.children)) {
            // 遍历三级
            secondItem.children.forEach(thirdItem => {
              thirdItem.path = `/${fistItem.name}/${secondItem.name}/${thirdItem.name}`;
              this.addRouter(thirdItem) // 添加三级
            })
          } else {
            this.addRouter(secondItem) // 添加二级
          }
        })
      } else {
        this.addRouter(fistItem) // 添加一级
      }
    })
    this.release();
  }

  get() {
    return this.layout;
  }
}
