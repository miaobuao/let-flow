import type { LocalePack } from './type';

const zh: LocalePack = {
  result: {
    403: {
      title: '403 禁止访问',
      description: '总有些门是对你关闭的',
      handle: '放轻松',
    },
    404: {
      title: '404 资源不存在',
      description: '生活总归带点荒谬',
      handle: '找点乐子吧',
    },
    418: {
      title: '418 我是个杯具',
      description: '一切尽在不言中',
      handle: '接受真相就是这么简单',
    },
    500: {
      title: '500 服务器出错',
      description: '服务器出错可能说明该雇更多程序员了',
      handle: '散财消灾',
    },
    success: {
      title: '成功',
      description: '失败的孩子',
      handle: '我喜欢',
    },
    info: {
      title: '信息',
      description: '在这个年代，信息就是金钱，金钱就是信息。',
      handle: '我需要信息',
    },
    warning: {
      title: '警告',
      description: '在它变成错误以前一般不会有人管它',
      handle: '听起来有那么点悲伤，哈哈哈',
    },
  },
  common: {
    login: '登录',
    logout: '登出',
    register: '注册',
    password: '密码',
    username: '用户名',
    email: '邮箱',
  },
  login: {
    form: {
      retype_password: '重复密码',
      retype_password_error: '重复密码错误',
    },
    error: {},
  },
};
export default zh;
