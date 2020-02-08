export type Response<T = any> = {
  data: T;
  flag: 1;
}

export type ResponseControl<T = any, U = any> = Response<T> | { data?: U; flag: 0; msg: string }

// 按模块划分 多个页面同属一个模块（例如职位创建职位 职位列表 职位详情）
export * from './job'
