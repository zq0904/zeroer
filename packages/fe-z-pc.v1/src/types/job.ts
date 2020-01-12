// 创建职位提交的form
export interface JobCreateForm {
  jobName: string; // 职位姓名
  employedAge: number; // 从业年龄
  language: string[]; // 要求语言
  commissionedId: string; // 委托证明材料
}

// 职位列表listitem
export interface JobListItem {
  resIdEncode: string; // 加密的简历id
  cPhoto: string; // 经理人头像
  resTitle: string; // 目前职位名称
  sexName: string; // 性别
  resBirthYearAge: number; // 年龄
  resDqCode: string; // 地区code
  resDqName: string; // 地区名称
  resEduLevelCode: string; // 学历code
  resEduLevelName: string; // 学历名称
  resWorkYearAge: number; // 工作年限
  resCompany: string; // 目前所在公司名称
}
