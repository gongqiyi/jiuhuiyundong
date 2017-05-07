<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>邀请记录管理</h4>
        <breadcrumb
                v-bind:items="[{text: '推广管理'},{text:'邀请记录管理',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar invite-form">
          <div class="form-group">
            <label>邀请人</label>
            <select class="form-control" id="invitorId" name="invitorId">
            </select>
          </div>
          <div class="form-group">
            <label>被邀请人</label>
            <select class="form-control" id="invitedId" name="invitedId">
            </select>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-default" v-on:click.prevent="search()">搜索</button>
          </div>
        </form>
        <div class="table-overflow">
          <table id="js-datatable_example" class="table table-bordered table-middle table-hover mt-1-5">
            <thead>
            <tr>
              <th class="text-center" width="30">
                序号
              </th>
              <th>邀请人</th>
              <th>邀请人手机号</th>
              <th>邀请人邀请码</th>
              <th>被邀请人</th>
              <th>被邀请人手机号</th>
              <th>邀请时间</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in pageList.list">
              <td align="center">
                {{item.id}}
              </td>
              <td>{{item.invitor.realName}}</td>
              <td>{{item.invitor.mobile}}</td>
              <td>{{item.invitor.inviteCode}}</td>
              <td>{{item.invited.realName}}</td>
              <td>{{item.invited.mobile}}</td>
              <td>{{item.createTime | formatDate }}</td>
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
      }
    },
    components: {
      breadcrumb: breadcrumb,
      pagination: pagination,
    },
    created: function () {
      this.getInviteRecordList();
    },
    mounted: function () {
      this.initHolderSelect2();
    },
    methods: {
      // 邀请记录列表
      getInviteRecordList: function (data) {
        let self = this;
        self.ajax({
          url: api.market.inviteRecord.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.inviteRecordPageList;
            self.currentIndex = res.inviteRecordPageList.pageIndex;
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
        this.getInviteRecordList(data);
      },
      // 初始化用户选择
      initHolderSelect2: function () {
        let self = this;
        $('#invitorId,#invitedId').select2({
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
