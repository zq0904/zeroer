const data = {
  '/checklogin.json': {
    flag: 0,
    msg: '登录已过期，请尝试刷新页面重新登录',
  },
  '/job/savepicture.json': {
    flag: 1,
    data: {
      id: 'https://avatars2.githubusercontent.com/u/32778384?s=40&v=4'
    }
  },
  '/job/savejobinfo.json': {
    flag: 1,
    data: {}
  },
  '/job/getjobsaveresult.json': {
    flag: 1,
    data: {
      recommendList: [
        {
          resIdEncode: 'asdasd7asd668', // 加密的简历id
          cPhoto: 'https://avatars2.githubusercontent.com/u/32778384?s=40&v=4', // 经理人头像
          resTitle: '目前职位名称', // 目前职位名称
          sexName: '男', // 性别
          resBirthYearAge: 25, // 年龄
          resDqCode: '1234', // 地区code
          resDqName: '地区名称', // 地区名称
          resEduLevelCode: '4556', // 学历code
          resEduLevelName: '学历名称', // 学历名称
          resWorkYearAge: 5, // 工作年限
          resCompany: '目前所在公司名称', // 目前所在公司名称
        }
      ]
    }
  }
}

export default data