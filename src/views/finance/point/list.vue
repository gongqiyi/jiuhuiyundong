<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>积分记录</h4>
        <breadcrumb
                v-bind:items="[{text: '财务管理'},{text:'积分记录',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar point-form">
          <div class="form-group">
            <label>客户</label>
            <select class="form-control" id="holderId" name="holderId">
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
            <th>获取提现积分</th>
            <th>获取兑换积分</th>
            <th>获取总积分</th>
            <th>时间</th>
            <th>获取原因</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in pageList.list">
            <td align="center">
              {{item.id}}
            </td>
            <td>{{item.holder.realName}}</td>
            <td>{{item.holder.mobile }}</td>
            <td>{{item.holder.idNumber }}</td>
            <td>{{item.withdrawalPoint }}</td>
            <td>{{item.exchangePoint }}</td>
            <td>{{item.totalPoint }}</td>
            <td>{{item.createTime | formatDate}}</td>
            <td>{{item.operationType | enumToDescription(operationList)}}</td>
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

        operationList: [],
      }
    },
    components: {
      breadcrumb: breadcrumb,
      pagination: pagination,
    },
    created: function () {
      this.getPointList();
      this.getOperationList();
    },
    mounted: function () {
      this.initHolderSelect2();
    },
    methods: {
      // 积分记录列表
      getPointList: function (data) {
        let self = this;
        self.ajax({
          url: api.finance.point.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.pointRecordPageList;
            self.currentIndex = res.pointRecordPageList.pageIndex;
          }
        });
      },
      // 获取操作类型列表
      getOperationList: function () {
        let self = this;
        self.ajax({
          url: api.finance.point.operation.url,
          success: function (res) {
            self.operationList = res.operationList;
          }
        });
      },
      // 搜索
      search: function (data) {
        if (data == null) {
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.point-form'));
        _.assign(data, formData);
        this.getPointList(data);
      },
      // 初始化用户选择
      initHolderSelect2: function () {
        let self = this;
        $('#holderId').select2({
          width: '200px',
          language: 'zh-CN',
          ajax: {
            data: function (params) {
              return {
                mobile: params.term,
                pageIndex: params.page,
              };
            },
            url: api.holder.list.url,
            dataType: 'json',
            delay: 250,
            processResults: function (data, params) {
              let holderList = data.holderPageList;
              return {
                results: holderList.list,
                pagination: {
                  more: holderList.hasNextPage,
                },
              };
            },
            cache: true,
          },
          escapeMarkup: function (markup) {
            return markup;
          },
          minimumInputLength: 3,
          templateResult: formatRepo,
          templateSelection: formatRepoSelection,
        });
        function formatRepo(repo) {
          if (repo.loading) return repo.text;
          return repo.realName + ' (' + repo.mobile + ')';
        }

        function formatRepoSelection(repo) {
          self.vehicleList = JSON.parse(repo.carInfo);
          if (repo.realName == null) {
            return repo.mobile;
          }
          else {
            return repo.realName + ' (' + repo.mobile + ')';
          }
        }
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
