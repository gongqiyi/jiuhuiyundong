<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>短信管理</h4>
        <breadcrumb v-bind:items="[{text: '内容管理', link: '/content'},{text: '短信管理', active: true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar sms-form">
          <div class="form-group">
            <label for="scene">场景</label>
            <input type="text" class="form-control" id="scene" name="scene">
          </div>
          <div class="form-group">
            <label for="mobile">发送号码</label>
            <input type="text" class="form-control" id="mobile" name="mobile">
          </div>
          <div class="form-group">
            <label for="status">状态</label>
            <select id="status" name="status" class="form-control">
              <option value="">--请选择--</option>
              <option value="1">发送中</option>
              <option value="2">成功</option>
              <option value="-1">失败</option>
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
            <th>手机号</th>
            <th>场景</th>
            <th>发送时间</th>
            <th>状态</th>
            <th>成功时间</th>
            <th>错误代码</th>
            <th>错误信息</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in pageList.list">
            <td align="center">
              {{item.id}}
            </td>
            <td>{{item.mobile}}</td>
            <td>{{item.scene}}</td>
            <td>{{item.createTime | formatDate}}</td>
            <td>{{item.status | enumToDescription(statusList)}}</td>
            <td>{{item.successTime | formatDate}}</td>
            <td>{{item.errorCode}}</td>
            <td>{{item.errorMessage}}</td>
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
        statusList: {
          '1': '发送中',
          '2': '成功',
          '-1': '失败',
        },

      }
    },
    components: {
      pagination: pagination,
      breadcrumb: breadcrumb,
    },
    created: function () {
      this.getSmsList();
    },
    mounted: function () {

    },
    methods: {
      getSmsList: function (data) {
        let self = this;
        self.ajax({
          url: api.content.sms.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.smsPageList;
            self.currentIndex = res.smsPageList.pageIndex;
          }
        });
      },
      search: function (data) {
        if (data == null) {
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.sms-form'));
        _.assign(data, formData);
        this.getSmsList(data);
      }
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
