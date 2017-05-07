<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>提现管理</h4>
        <breadcrumb
                v-bind:items="[{text: '财务管理'},{text:'提现管理'},{text:'提现记录列表',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar withdrawal-form">
          <div class="form-group">
            <label for="holderRealName">客户姓名</label>
            <input type="text" class="form-control" id="holderRealName" name="holderRealName">
          </div>
          <div class="form-group">
            <label for="holderMobile">客户手机号</label>
            <input type="text" class="form-control" id="holderMobile" name="holderMobile">
          </div>
          <div class="form-group">
            <label for="holderIdNumber">客户身份证号</label>
            <input type="text" class="form-control" id="holderIdNumber" name="holderIdNumber">
          </div>
          <div class="form-group">
            <label for="status">状态</label>
            <select id="status" name="status" class="form-control">
              <option value="">--请选择--</option>
              <option value="1">待审核</option>
              <option value="2">待放款</option>
              <option value="3">提现成功</option>
              <option value="-1">审核失败</option>
            </select>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-default" v-on:click.prevent="search()">搜索</button>
          </div>
        </form>
        <table id="js-datatable_example" class="table table-bordered table-middle table-hover mt-1-5">
          <thead>
          <tr>
            <th class="text-center" width="30">
              序号
            </th>
            <th>客户姓名</th>
            <th>客户手机号</th>
            <th>客户身份证号</th>
            <th>提现积分</th>
            <th>银行卡号</th>
            <th>所属银行</th>
            <th>开户城市</th>
            <th>开户行</th>
            <th>状态</th>
            <th>申请时间</th>
            <th>审核时间</th>
            <th>放款时间</th>
            <th class="text-center" width="230">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in pageList.list">
            <td align="center">
              {{item.id}}
            </td>
            <td>{{item.holderRealName}}</td>
            <td>{{item.holderMobile }}</td>
            <td>{{item.holderIdNumber }}</td>
            <td>{{item.point }}</td>
            <td>{{item.bankNumber }}</td>
            <td>{{item.bankType | enumToDescription(bankTypeList)}}</td>
            <td>{{item.bankCity}}</td>
            <td>{{item.bankAddress}}</td>
            <td>{{item.status | enumToDescription(statusList)}}</td>
            <td>{{item.createTime | formatDate}}</td>
            <td>{{item.auditTime | formatDate}}</td>
            <td>{{item.payTime | formatDate}}</td>
            <td align="center">
              <template v-if="item.status == 1">
                <a v-on:click.prevent="auditPass(item.id)" class="btn btn-sm btn-info" href="#">通过</a>
                <a v-on:click.prevent="auditFail(item.id)" class="btn btn-sm btn-warning" href="#">不通过</a>
              </template>
              <template v-if="item.status == 2">
                <a v-on:click.prevent="loanPass(item.id)" class="btn btn-sm btn-info" href="#">放款</a>
              </template>
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

</template>

<script>
  import pagination from "@/components/bootstrap/pagination"
  import breadcrumb from "@/components/bootstrap/breadcrumb"

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
        statusList:{
          "1": "待审核",
          "2": "待放款",
          "3": "提现成功",
          "-1": "审核失败",
        },
        bankTypeList: [],
      }
    },
    components: {
      breadcrumb: breadcrumb,
      pagination: pagination,
    },
    created: function () {
      this.getWithdrawalList();
      this.getBankTypeList();
    },
    mounted: function () {

    },
    methods: {
      // 提现列表
      getWithdrawalList: function (data) {
        let self = this;
        self.ajax({
          url: api.finance.withdrawal.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.withdrawalPageList;
            self.currentIndex = res.withdrawalPageList.pageIndex;
          }
        });
      },
      // 获取银行卡类型列表
      getBankTypeList: function () {
        let self = this;
        self.ajax({
          url: api.holder.bank.type.url,
          success: function (res) {
            self.bankTypeList = res.bankTypeList;
          }
        });
      },
      // 搜索
      search: function (data) {
        if (data == null) {
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.withdrawal-form'));
        _.assign(data, formData);
        this.getWithdrawalList(data);
      },
      // 审核通过
      auditPass: function (id) {
        let self = this;
        layer.confirm("确定审核通过吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.finance.withdrawal.auditPass.url(id),
            success: function (res) {
              layer.msg(res.message, {time: 1000}, function () {
                if (res.code === 200) {
                  self.search();
                }
              });
            }
          });
        });
      },
      auditFail: function (id) {
        let self = this;
        layer.confirm("确定审核不通过吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.finance.withdrawal.auditFail.url(id),
            success: function (res) {
              layer.msg(res.message, {time: 1000}, function () {
                if (res.code === 200) {
                  self.search();
                }
              });
            }
          });
        });
      },
      loanPass: function (id) {
        let self = this;
        layer.confirm("确定放款吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.finance.withdrawal.loanPass.url(id),
            success: function (res) {
              layer.msg(res.message, {time: 1000}, function () {
                if (res.code === 200) {
                  self.search();
                }
              });
            }
          });
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
