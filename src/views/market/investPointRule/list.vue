<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>投保返积分管理</h4>
        <breadcrumb
                v-bind:items="[{text: '推广管理'},{text:'投保返积分管理',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar rule-form">
          <div class="form-group">
            <label>所属区域</label>
            <select class="form-control" id="areaId" name="areaId">
            </select>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-default" v-on:click.prevent="search()">搜索</button>
          </div>
          <div class="form-group">
            <router-link to="/market/investPointRule/create" class="btn btn-default btn-info">添加</router-link>
          </div>
        </form>
        <div class="table-overflow">
          <table id="js-datatable_example" class="table table-bordered table-middle table-hover mt-1-5">
            <thead>
            <tr>
              <th class="text-center" width="30">
                序号
              </th>
              <th>区域</th>
              <th>线上全额投保规则</th>
              <th>线下全额投保规则</th>
              <th>分期投保规则</th>
              <th class="text-center" width="230">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in pageList.list">
              <td align="center">
                {{item.id}}
              </td>
              <td>{{item.areaName}}</td>
              <td>{{combineDescription(item.onlineFullType,item.onlineFullRule)}}</td>
              <td>{{combineDescription(item.offlineFullType,item.offlineFullRule)}}</td>
              <td>{{combineDescription(item.offlineInstallmentType,item.offlineInstallmentRule)}}</td>
              <td align="center">
                <router-link class="btn btn-sm btn-primary" v-bind:to="'/market/investPointRule/update/' + item.id">编辑
                </router-link>
              </td>
            </tr>
            </tbody>
          </table>
          <pagination size="md"
                      :total-rows="pageList.totalRecord"
                      :per-page="pageList.pageSize"
                      v-model="currentIndex"
          >
          </pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import pagination from "@/components/bootstrap/pagination"
  import breadcrumb from "@/components/bootstrap/breadcrumb"
  import '../../../../static/js/plugins/select2/js/select2.min'
  import '../../../../static/js/plugins/select2/js/i18n/zh-CN'
  import '../../../../static/js/plugins/select2/css/select2.min.css'

  export default{
    data: function () {
      return {
        pageList: {
          pageSize: 1,
          pageIndex: 1,
          totalRecord: 0,
          totalPage: 1,
          list: [],
        },
        currentIndex: 1,
        currentProduct: {},
        ruleTypeList: {
          1: '按有效投保次数结算',
          2: '按投保金额比例结算'
        }
      }
    },
    components: {
      breadcrumb: breadcrumb,
      pagination: pagination,
    },
    created: function () {
      this.getRuleList();
    },
    mounted: function () {
      this.initAreaSelect2();
    },
    methods: {
      // 规则列表
      getRuleList: function (data) {
        let self = this;
        self.ajax({
          url: api.market.investPointRule.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.investPointRulePageList;
            self.currentIndex = res.investPointRulePageList.pageIndex;
          }
        });
      },
      // 组合描述
      combineDescription: function (ruleType, ruleModel) {
        ruleModel = JSON.parse(ruleModel);
        let self = this;
        if (ruleType == 1) {
          let desc = '每次有效投保奖励' +
                  (ruleModel.perInvestPoint || 0) +
                  '分, 其中可提现积分占' +
                  (ruleModel.canWithdrawalRate || 0) + '%';
          return _.get(self.ruleTypeList, ruleType) + ':' + desc;
        }
        else if (ruleType == 2) {
          let desc = '交强险险比例为' +
                  (ruleModel.saliPointRate || 0) +
                  '%，商业险比例为' +
                  (ruleModel.commercialPointRate || 0 ) +
                  '%，其中可提现积分占' +
                  (ruleModel.canWithdrawalRate || 0) + '%';
          return _.get(self.ruleTypeList, ruleType) + '：' + desc;
        }
      },
      // 搜索
      search: function (data) {
        if (data == null) {
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.rule-form'));
        _.assign(data, formData);
        this.getRuleList(data);
      },
      // 初始化地区选择
      initAreaSelect2: function () {
        $('#areaId').select2({
          language: 'zh-CN',
          width: '100px',
          placeholder: {
            id: '',
            text: '--请选择--'
          },
          allowClear: true,
          ajax: {
            data: function (params) {
              return {
                city: params.term,
                pageIndex: params.page,
              };
            },
            url: api.content.area.list.url,
            dataType: 'json',
            delay: 250,
            processResults: function (data, params) {
              let areaList = data.areaList;
              let results = _.map(areaList.list, function (area) {
                return {id: area.id, text: area.city};
              });
              return {
                results: results,
                pagination: {
                  more: data.areaList.hasNextPage,
                }
              };
            },
            cache: true
          },
        });
      },

    },
    watch: {
      currentIndex: function (newIndex) {
        let self = this;
        let query = {
          pageIndex: newIndex
        };
        self.search(query);
      }
    }
  }
</script>
