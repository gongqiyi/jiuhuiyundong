<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>用户增长统计</h4>
        <breadcrumb
                v-bind:items="[{text: '统计管理'},{text:'用户增长统计',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar holder-increase-form">
          <div class="form-group">
            <label>年</label>
            <select class="form-control" id="year" name="year">
              <option value="">--请选择--</option>
              <option v-for="y in yearList">
                {{y}}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>月</label>
            <select class="form-control" id="month" name="month">
              <option value="">--请选择--</option>
              <option v-for="m in monthList">
                {{m}}
              </option>
            </select>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-default" v-on:click.prevent="search()">搜索</button>
          </div>
        </form>
        <table id="js-datatable_example" class="table table-bordered table-middle table-hover mt-1-5">
          <thead>
          <tr>
            <th>年</th>
            <th>月</th>
            <th>当月增长总数</th>
            <th>实名用户数</th>
            <th>真实投资用户数</th>
            <th>来自PC数</th>
            <th>来自微信数</th>
            <th>来自APP数</th>
            <th>来自线下数</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in pageList.list">
            <td>{{item.year}}</td>
            <td>{{item.month}}</td>
            <td>{{item.totalCount}}</td>
            <td>{{item.realNameCount}}</td>
            <td>{{item.investCount}}</td>
            <td>{{item.pcCount}}</td>
            <td>{{item.wechatCount}}</td>
            <td>{{item.appCount}}</td>
            <td>{{item.offlineCount}}</td>
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

        yearList: _.range(2017, 2021),
        monthList: _.range(1, 13),
      }
    },
    components: {
      breadcrumb: breadcrumb,
      pagination: pagination,
    },
    created: function () {
      this.getHolderIncrease();
    },
    mounted: function () {
    },
    methods: {
      getHolderIncrease: function (data) {
        let self = this;
        self.ajax({
          url: api.statistic.holderIncrease.url,
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
        let formData = commonApp.tools.getFromData($('.holder-increase-form'));
        _.assign(data, formData);
        this.getHolderIncrease(data);
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
