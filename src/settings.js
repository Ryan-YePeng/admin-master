module.exports = {
  /**
   * @description 网站设置
   * */
  // 网站标题
  title: 'WTeam-ADMIN',
  // 菜单标题
  menuTitle: 'WTeam - 后台管理',
  // 底部文字
  footerTxt: '© 2020 Wang YePeng Wteam.All rights reserved',
  // 备案号
  caseNumber: '粤ICP备23001351号',

  /**
   * @description 系统设置
   * */
  // store key的前缀
  prefix: 'ADMIN',
  // 记住密码状态下的token在Cookies中存储的天数
  tokenCookieExpires: 7,
  // 请求超时时间(s)
  timeout: 20 * 1000,
  // 是否启用history
  isHistory: true,
  // 分页条数设置
  pagingSize: 10,

  /**
   * @description 样式设置
   * */
  // 是否固定头部
  isFixHeader: true,
  // 是否显示logo
  isShowLogo: true,
  // 是否显示标签
  isShowTag: true,
  // 是否显示面包屑
  isShowBreadcrumb: true,
  // 是否显示设置的底部信息
  isShowFooter: true,
  // 菜单是否夜晚模式
  isNight: true,
  // 菜单是否垂直
  isVertical: true,
  // 是否只保持一个子菜单的展开
  isUniqueOpened: true,
  // 组件大小设置
  layoutSize: 'small'
};
