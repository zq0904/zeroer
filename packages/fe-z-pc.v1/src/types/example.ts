export interface ListItem {
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