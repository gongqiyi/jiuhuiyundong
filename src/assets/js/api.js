(function() {
  var api = {
    // 内容管理
    content: {
      // 地区
      area: {
        list: {
          type: 'GET',
          url: '/api/venues/list',
          desc: '地区列表'
        },
        get: {
          type: 'GET',
          url: function(id) {
            return '/api/area/get/' + id;
          },
          desc: '地区详情',
        },
        create: {
          type: 'POST',
          url: '/api/venues/create',
          desc: '创建地区',
        },
        update: {
          type: 'POST',
          url: '/api/area/update',
          desc: '编辑地区',
        },
        delete: {
          type: 'POST',
          url: function(id) {
            return '/api/area/delete/' + id;
          },
          desc: '删除地区',
        }
      },
      // 分类
      category: {
        list: {
          type: 'GET',
          url: '/api/content/category/list',
          desc: '分类列表',
        },
        create: {
          type: 'POST',
          url: '/api/content/category/create',
          desc: '分类列表',
        },
        delete: {
          type: 'POST',
          url: function(id) {
            return '/api/content/category/delete/' + id;
          },
          desc: '删除分类',
        },
      },
      // 内容
      content: {
        list: {
          type: 'GET',
          url: '/api/content/content/list',
          desc: '内容列表',
        },
        get: {
          type: 'GET',
          url: function(id) {
            return '/api/content/content/get/' + id;
          },
          desc: '内容详情',
        },
        create: {
          type: 'POST',
          url: '/api/content/content/create',
          desc: '创建内容',
        },
        update: {
          type: 'POST',
          url: '/api/content/content/update',
          desc: '编辑内容',
        },
        delete: {
          type: 'POST',
          url: function(id) {
            return '/api/content/content/delete/' + id;
          },
          desc: '删除内容',
        },
        rankUp: {
          type: 'POST',
          url: function(id) {
            return '/api/content/content/rankUp/' + id;
          },
          desc: '升序',
        },
        rankDown: {
          type: 'POST',
          url: function(id) {
            return '/api/content/content/rankDown/' + id;
          },
          desc: '降序',
        },

      },
      // 广告
      link: {
        list: {
          type: 'GET',
          url: '/api/content/link/list',
          desc: '列表',
        },
        get: {
          type: 'GET',
          url: function(id) {
            return '/api/content/link/get/' + id;
          },
          desc: '详情',
        },
        create: {
          type: 'POST',
          url: '/api/content/link/create',
          desc: '列表',
        },
        update: {
          type: 'POST',
          url: '/api/content/link/update',
          desc: '编辑',
        },
        delete: {
          type: 'POST',
          url: function(id) {
            return '/api/content/link/delete/' + id;
          },
          desc: '删除',
        },
        rankUp: {
          type: 'POST',
          url: function(id) {
            return '/api/content/link/rankUp/' + id;
          },
          desc: '升序',
        },
        rankDown: {
          type: 'POST',
          url: function(id) {
            return '/api/content/link/rankDown/' + id;
          },
          desc: '降序',
        },
        listPosition: {
          type: 'GET',
          url: '/api/content/link/listPosition',
          desc: '位置',
        },
      },
      // 访客
      visitor: {
        list: {
          type: 'GET',
          url: '/api/common/visitor/list',
          desc: '访客列表',
        },
        delete: {
          type: 'GET',
          url: function(id) {
            return '/api/common/visitor/delete/' + id;
          },
          desc: '删除访客记录',
        }
      },
      // 反馈
      feedback: {
        list: {
          type: 'GET',
          url: '/api/feedback/list',
          desc: '反馈列表',
        },
        get: {
          type: 'GET',
          url: function(id) {
            return '/api/feedback/get/' + id;
          },
          desc: '反馈详情',
        }
      },
      // 站内信
      message: {
        list: {
          type: 'GET',
          url: '/api/message/list',
          desc: '站内信列表',
        },
        create: {
          type: 'POST',
          url: '/api/message/create',
          desc: '发送站内信'
        }
      },
      // 短信发送记录
      sms: {
        list: {
          type: 'GET',
          url: '/api/sms/list',
          desc: '短信列表',
        },
      },
    },

    // 用户管理
    holder: {
      list: {
        type: 'GET',
        url: '/api/holder/list',
        desc: '客户列表',
      },
      get: {
        type: 'GET',
        url: function(id) {
          return '/api/holder/get/' + id;
        },
        desc: '客户详情',
      },
      create: {
        type: 'POST',
        url: '/api/holder/create',
        desc: '添加客户',
      },
      update: {
        type: 'POST',
        url: '/api/holder/update',
        desc: '编辑客户',
      },
      lock: {
        type: 'POST',
        url: function(id) {
          return '/api/holder/lock/' + id;
        },
        desc: '锁定账户',
      },
      unLock: {
        type: 'POST',
        url: function(id) {
          return '/api/holder/unLock/' + id;
        },
        desc: '解锁账户',
      },
      // 客户经理
      sales: {
        list: {
          type: 'GET',
          url: '/api/holder/sales/list',
          desc: '客户经理列表',
        },
        create: {
          type: 'POST',
          url: '/api/holder/sales/create',
          desc: '添加客户经理',
        },
      },
      // 银行卡
      bank: {
        list: {
          type: 'GET',
          url: function(holderId) {
            return '/api/holder/bank/list/' + holderId;
          },
          desc: '银行卡列表'
        },
        type: {
          type: 'GET',
          url: '/api/holder/bank/type/list',
          desc: '银行卡类型'
        },
      },
      // 车辆信息
      vehicle: {
        save: {
          type: 'POST',
          url: function(holderId) {
            return '/api/holder/vehicle/save/' + holderId;
          },
          desc: '保存车辆信息',
        }
      }
    },

    // 投保管理
    invest: {
      // 产品管理
      product: {
        full: {
          list: {
            type: 'GET',
            url: '/api/invest/product/full/list',
            desc: '全额产品列表',
          },
          get: {
            type: 'GET',
            url: function(id) {
              return '/api/invest/product/full/get/' + id;
            },
            desc: '全额产品详情',
          },
          create: {
            type: 'POST',
            url: '/api/invest/product/full/create',
            desc: '创建产品',
          },
          update: {
            type: 'POST',
            url: '/api/invest/product/full/update',
            desc: '编辑产品',
          },
          open: {
            type: 'POST',
            url: function(id) {
              return '/api/invest/product/full/open/' + id;
            },
            desc: '开启产品',
          },
          close: {
            type: 'POST',
            url: function(id) {
              return '/api/invest/product/full/close/' + id;
            },
            desc: '关闭产品',
          },
        },
        installment: {
          list: {
            type: 'GET',
            url: '/api/invest/product/installment/list',
            desc: '全额产品列表',
          },
          get: {
            type: 'GET',
            url: function(id) {
              return '/api/invest/product/installment/get/' + id;
            },
            desc: '全额产品详情',
          },
          create: {
            type: 'POST',
            url: '/api/invest/product/installment/create',
            desc: '创建产品',
          },
          update: {
            type: 'POST',
            url: '/api/invest/product/installment/update',
            desc: '编辑产品',
          },
          open: {
            type: 'POST',
            url: function(id) {
              return '/api/invest/product/installment/open/' + id;
            },
            desc: '开启产品',
          },
          close: {
            type: 'POST',
            url: function(id) {
              return '/api/invest/product/installment/close/' + id;
            },
            desc: '关闭产品',
          },
        }
      },
      order: {
        // 全额投保
        full: {
          list: {
            type: 'GET',
            url: '/api/invest/order/full/list',
            desc: '全额订单列表',
          },
          listException: {
            type: 'GET',
            url: '/api/invest/order/full/listException',
            desc: '全额订单匹配异常列表',
          },
          listUnMatched: {
            type: 'GET',
            url: '/api/invest/order/full/listUnMatched',
            desc: '未匹配全额订单列表',
          },
          get: {
            type: 'GET',
            url: function(id) {
              return '/api/invest/order/full/get/' + id;
            },
            desc: '全额订单详情',
          },
          handCreate: {
            type: 'POST',
            url: '/api/invest/order/full/handCreate',
            desc: '手工录入全额订单',
          },
          match: {
            type: 'POST',
            url: '/api/invest/order/full/match',
            desc: '手工匹配全额订单',
          },
          matchExcel: {
            type: 'POST',
            url: '/api/invest/order/full/matchExcel',
            desc: '匹配Excel全额订单',
          },
          saveReceiptsImage: {
            type: 'POST',
            url: '/api/invest/order/full/saveReceiptsImage',
            desc: '保存保单照片',
          }
        },
        // 分期投保管理
        installment: {
          list: {
            type: 'GET',
            url: '/api/invest/order/installment/list',
            desc: '分期订单列表',
          },
          get: {
            type: 'GET',
            url: function(id) {
              return '/api/invest/order/installment/get/' + id;
            },
            desc: '分期订单详情',
          },
          create: {
            type: 'POST',
            url: '/api/invest/order/installment/create',
            desc: '录入分期订单',
          },
          open: {
            type: 'POST',
            url: function(id) {
              return '/api/invest/order/installment/open/' + id;
            },
            desc: '开启订单详情',
          },
          close: {
            type: 'POST',
            url: function(id) {
              return '/api/invest/order/installment/close/' + id;
            },
            desc: '关闭订单',
          },
          saveReceiptsImage: {
            type: 'POST',
            url: '/api/invest/order/installment/saveReceiptsImage',
            desc: '保存保单照片',
          },
          listBill: {
            type: 'GET',
            url: function(id) {
              return '/api/invest/order/installment/listBill/' + id;
            },
            desc: '分期账单列表',
          },
          handUpdateBill: {
            type: 'POST',
            url: '/api/invest/order/installment/handUpdateBill',
            desc: '手工修改账单',
          },
          sendMessage: {
            type: 'POST',
            url: '/api/invest/order/installment/sendMessage',
            desc: '发送银行卡余额不足提醒',
          },
        },
      },
      // 门店管理
      store: {
        list: {
          type: 'GET',
          url: '/api/invest/store/list',
          desc: '门店列表',
        },
        get: {
          type: 'GET',
          url: function(id) {
            return '/api/invest/store/get/' + id;
          },
          desc: '门店详情',
        },
        create: {
          type: 'POST',
          url: '/api/invest/store/create',
          desc: '添加门店',
        },
        update: {
          type: 'POST',
          url: '/api/invest/store/update',
          desc: '编辑门店',
        },
        delete: {
          type: 'POST',
          url: function(id) {
            return '/api/invest/store/delete/' + id;
          },
          desc: '删除门店',
        },
      },

    },
    // 消费管理
    consumption: {
      // 商户管理
      merchant: {
        list: {
          type: 'GET',
          url: '/api/consumption/merchant/list',
          desc: '商户列表',
        },
        get: {
          type: 'GET',
          url: function(id) {
            return '/api/consumption/merchant/get/' + id;
          },
          desc: '商户详情',
        },
        register: {
          type: 'POST',
          url: '/api/consumption/merchant/register',
          desc: '添加商户',
        },
        update: {
          type: 'POST',
          url: '/api/consumption/merchant/update',
          desc: '编辑商户',
        },
        delete: {
          type: 'POST',
          url: function(id) {
            return '/api/consumption/merchant/delete/' + id;
          },
          desc: '删除商户',
        },
        recommend: {
          type: 'POST',
          url: function(id) {
            return '/api/consumption/merchant/recommend/' + id;
          },
          desc: '推荐商户',
        },
        unRecommend: {
          type: 'POST',
          url: function(id) {
            return '/api/consumption/merchant/unRecommend/' + id;
          },
          desc: '取消推荐商户',
        },
        award: {
          type: 'GET',
          url: '/api/consumption/merchant/award',
          desc: '商户奖励'
        },
        saveAward: {
          type: 'POST',
          url: '/api/consumption/merchant/saveAward',
          desc: '保存商户奖励'
        },
      },
      // 消费券管管理
      product: {
        list: {
          type: 'GET',
          url: '/api/consumption/product/list',
          desc: '消费券列表',
        },
        get: {
          type: 'GET',
          url: function(id) {
            return '/api/consumption/product/get/' + id;
          },
          desc: '消费券详情',
        },
        create: {
          type: 'POST',
          url: '/api/consumption/product/create',
          desc: '添加消费券',
        },
        update: {
          type: 'POST',
          url: '/api/consumption/product/update',
          desc: '编辑消费券',
        },
        open: {
          type: 'POST',
          url: function(id) {
            return '/api/consumption/product/open/' + id;
          },
          desc: '消费券上架',
        },
        close: {
          type: 'POST',
          url: function(id) {
            return '/api/consumption/product/close/' + id;
          },
          desc: '消费券下架',
        },

      },
      // 兑换记录
      order: {
        list: {
          type: 'GET',
          url: '/api/consumption/order/list',
          desc: '兑换记录列表',
        },
      },
    },

    // 推广管理
    market: {
      // 投保积分规则
      investPointRule: {
        list: {
          method: 'GET',
          url: '/api/market/investPointRule/list',
          desc: '投保积分规则列表',
        },
        get: {
          method: 'GET',
          url: function(id) {
            return '/api/market/investPointRule/get/' + id;
          },
          desc: '投保积分规则详情',
        },
        saveFull: {
          method: 'POST',
          url: '/api/market/investPointRule/saveFull',
          desc: '保存全额投保规则',
        },
        saveInstallment: {
          method: 'POST',
          url: '/api/market/investPointRule/saveInstallment',
          desc: '保存分期投保规则',
        },
      },
      // 邀请返积分规则
      invitePointRule: {
        list: {
          method: 'GET',
          url: '/api/market/invitePointRule/list',
          desc: '邀请积分规则列表',
        },
        get: {
          method: 'GET',
          url: function(id) {
            return '/api/market/invitePointRule/get/' + id;
          },
          desc: '邀请积分规则详情',
        },
        save: {
          method: 'POST',
          url: '/api/market/invitePointRule/save',
          desc: '保存规则',
        },
      },
      // 客户经理邀请奖励规则
      salesAwardRule: {
        list: {
          method: 'GET',
          url: '/api/market/salesAwardRule/list',
          desc: '邀请奖励规则列表',
        },
        get: {
          method: 'GET',
          url: function(id) {
            return '/api/market/salesAwardRule/get/' + id;
          },
          desc: '邀请奖励规则详情',
        },
        save: {
          method: 'POST',
          url: '/api/market/salesAwardRule/save',
          desc: '保存规则',
        },
      },
      // 邀请记录
      inviteRecord: {
        list: {
          method: 'GET',
          url: '/api/market/inviteRecord/list',
          desc: '邀请记录列表',
        },
      },
      // 活动管理
      activity: {
        list: {
          type: 'GET',
          url: '/api/market/activity/list',
          desc: '活动列表'
        },
        get: {
          type: 'GET',
          url: function(id) {
            return '/api/market/activity/get/' + id;
          },
          desc: '活动详情',
        },
        create: {
          type: 'POST',
          url: '/api/market/activity/create',
          desc: '创建活动',
        },
        update: {
          type: 'POST',
          url: '/api/market/activity/update',
          desc: '编辑活动',
        },
        open: {
          type: 'POST',
          url: function(id) {
            return '/api/market/activity/open/' + id;
          },
          desc: '开启活动',
        },
        close: {
          type: 'POST',
          url: function(id) {
            return '/api/market/activity/close/' + id;
          },
          desc: '关闭活动',
        },
      }
    },

    // 财务管理
    finance: {
      // 提现记录
      withdrawal: {
        list: {
          method: 'GET',
          url: '/api/finance/withdrawal/list',
          desc: '邀请记录列表',
        },
        auditPass: {
          method: 'POST',
          url: function(id) {
            return '/api/finance/withdrawal/auditPass/' + id;
          },
          desc: '审核通过',
        },
        auditFail: {
          method: 'POST',
          url: function(id) {
            return '/api/finance/withdrawal/auditFail/' + id;
          },
          desc: '审核不通过',
        },
        loanPass: {
          method: 'POST',
          url: function(id) {
            return '/api/finance/withdrawal/loanPass/' + id;
          },
          desc: '放款通过',
        },
        setting: {
          method: 'GET',
          url: '/api/finance/withdrawal/setting',
          desc: '提现相关配置',
        },
        saveSetting: {
          method: 'POST',
          url: '/api/finance/withdrawal/saveSetting',
          desc: '保存配置',
        },
      },
      // 积分记录
      point: {
        list: {
          method: 'GET',
          url: '/api/finance/point/list',
          desc: '积分记录列表'
        },
        // 积分操作类型
        operation: {
          method: 'GET',
          url: '/api/finance/point/operation/list',
          desc: '积分操作类型',
        },
      }
    },

    //统计管理
    statistic: {
      holderIncrease: {
        method: 'GET',
        url: '/api/statistic/holderIncrease',
        desc: '用户增长统计',
      },
      investFull: {
        method: 'GET',
        url: '/api/statistic/investFull',
        desc: '全额投保统计',
      },
      investInstallment: {
        method: 'GET',
        url: '/api/statistic/investInstallment',
        desc: '分期投保统计',
      },
      invite: {
        method: 'GET',
        url: '/api/statistic/invite',
        desc: '用户邀请统计',
      },
      salesInvite: {
        method: 'GET',
        url: '/api/statistic/salesInvite',
        desc: '客户经理邀请统计',
      },
      storeInvest: {
        method: 'GET',
        url: '/api/statistic/storeInvest',
        desc: '线下门店业绩统计',
      },
    },

  };
  window.api = api;
})
();
