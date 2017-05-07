<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>邀请返积分管理</h4>
        <breadcrumb
                v-bind:items="[{text: '推广管理'},{text:'邀请返积分管理',active:true}]"/>
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
            <router-link to="/market/invitePointRule/create" class="btn btn-default btn-info">添加</router-link>
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
              <th>规则</th>
              <th class="text-center" width="230">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in pageList.list">
              <td align="center">
                {{item.id}}
              </td>
              <td>{{item.areaName}}</td>
              <td>{{combineDescription(item.ruleType,item.rule)}}</td>
              <td align="center">
                <router-link class="btn btn-sm btn-primary" v-bind:to="'/market/invitePointRule/update/' + item.id">编辑
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
          1: '按有效邀请人数结算',
          2: '按被邀请人投保次数结算',
          3: '按被邀请人投保金额结算'
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
          url: api.market.invitePointRule.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.invitePointRulePageList;
            self.currentIndex = res.invitePointRulePageList.pageIndex;
          }
        });
      },
      // 组合描述
      combineDescription: function (ruleType, ruleModel) {
        ruleModel = JSON.parse(ruleModel);
        let self = this;
        let desc = '';
        if (ruleType == 1) {
          desc = '每邀请一人获得' +
                  (ruleModel.perPerson || 0) + '分';
        }
        else if (ruleType == 2) {
          desc = '被邀请人每比线上全额投保获得' +
                  (ruleModel.perFullOnline || 0) +
                  '分，每比线下全额投保获得' +
                  (ruleModel.perFullOffline || 0) +
                  '分，每比分期投保获得' +
                  (ruleModel.perInstallmentOffline || 0) + '分';
        }
        else if (ruleType == 3) {
          desc = '被邀请人线上全额保险金额比率为' +
                  (ruleModel.fullOnlineRate || 0) +
                  '%，线下全额保险金额比率' +
                  (ruleModel.fullOfflineRate || 0) +
                  '%，分期保险金额比率' +
                  (ruleModel.installmentOfflineRate || 0) + '%';
        }
        return _.get(self.ruleTypeList, ruleType) + '：' + desc;
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
