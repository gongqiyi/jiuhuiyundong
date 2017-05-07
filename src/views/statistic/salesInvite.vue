<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>客户经理邀请统计</h4>
        <breadcrumb
                v-bind:items="[{text: '统计管理'},{text:'客户经理邀请统计',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar sales-invite-form">
          <div class="form-group">
            <label for="salesRealName">客户经理姓名</label>
            <input type="text" class="form-control" id="salesRealName" name="salesRealName">
          </div>
          <div class="form-group">
            <label for="salesMobile">客户经理手机号</label>
            <input type="text" class="form-control" id="salesMobile" name="salesMobile">
          </div>
          <div class="form-group">
            <label for="salesNo">客户经理工号</label>
            <input type="text" class="form-control" id="salesNo" name="salesNo">
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-default" v-on:click.prevent="search()">搜索</button>
          </div>
        </form>
        <table id="js-datatable_example" class="table table-bordered table-middle table-hover mt-1-5">
          <thead>
          <tr>
            <th>客户经理姓名</th>
            <th>客户经理工号</th>
            <th>客户经理手机号</th>
            <th>客户经理注册时间</th>
            <th>客户经理邀请码</th>
            <th>总邀请人数</th>
            <th>邀请获得总奖金</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in pageList.list">
            <td>{{item.salesRealName}}</td>
            <td>{{item.salesNo}}</td>
            <td>{{item.salesMobile}}</td>
            <td>{{item.salesCreateTime | formatDate}}</td>
            <td>{{item.inviteCode}}</td>
            <td>{{item.totalInviteCount}}</td>
            <td>{{item.totalRewardAmount}}</td>
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

      }
    },
    components: {
      breadcrumb: breadcrumb,
      pagination: pagination,
    },
    created: function () {
      this.getSalesInvite();
    },
    mounted: function () {
    },
    methods: {
      getSalesInvite: function (data) {
        let self = this;
        self.ajax({
          url: api.statistic.salesInvite.url,
          data: data,
          success: function (res) {
            self.pageList = res.statisticPageList;
            self.currentIndex = res.statisticPageList.pageIndex;
          }
        });
      },
      // 搜索
      search: function (data) {
        if (data == null) {
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.sales-invite-form'));
        _.assign(data, formData);
        this.getSalesInvite(data);
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
