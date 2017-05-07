<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>用户邀请统计</h4>
        <breadcrumb
                v-bind:items="[{text: '统计管理'},{text:'用户邀请统计',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar invite-form">
          <div class="form-group">
            <label for="invitorRealName">邀请人姓名</label>
            <input type="text" class="form-control" id="invitorRealName" name="invitorRealName">
          </div>
          <div class="form-group">
            <label for="invitorMobile">邀请人手机号</label>
            <input type="text" class="form-control" id="invitorMobile" name="invitorMobile">
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-default" v-on:click.prevent="search()">搜索</button>
          </div>
        </form>
        <table id="js-datatable_example" class="table table-bordered table-middle table-hover mt-1-5">
          <thead>
          <tr>
            <th>邀请人姓名</th>
            <th>邀请人身份证号</th>
            <th>邀请人手机号码</th>
            <th>邀请人注册时间</th>
            <th>邀请人邀请码</th>
            <th>总邀请人数</th>
            <th>邀请获得总积分</th>
            <th>全部被邀请人投资总额</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in pageList.list">
            <td>{{item.invitorRealName}}</td>
            <td>{{item.invitorIdNumber}}</td>
            <td>{{item.invitorMobile}}</td>
            <td>{{item.invitorCreateTime | formatDate}}</td>
            <td>{{item.inviteCode}}</td>
            <td>{{item.totalInviteCount}}</td>
            <td>{{item.totalPoint}}</td>
            <td>{{item.invitedTotalInvestAmount}}</td>
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
      this.getInvite();
    },
    mounted: function () {
    },
    methods: {
      getInvite: function (data) {
        let self = this;
        self.ajax({
          url: api.statistic.invite.url,
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
        let formData = commonApp.tools.getFromData($('.invite-form'));
        _.assign(data, formData);
        this.getInvite(data);
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
