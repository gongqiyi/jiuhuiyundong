<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>站内信管理</h4>
        <breadcrumb v-bind:items="[{text: '内容管理'},{text: '站内信管理'},{text: '站内信列表', active: true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar message-form">
          <div class="form-group">
            <label for="title">标题</label>
            <input type="text" class="form-control" id="title" name="title">
          </div>
          <div class="form-group">
            <label>是否已读</label>
            <select class="form-control" id="hasRead" name="hasRead">
              <option value="">--请选择--</option>
              <option value="true">是</option>
              <option value="false">否</option>
            </select>
          </div>
          <div class="form-group">
            <label>是否已删除</label>
            <select class="form-control" id="hasDelete" name="hasDelete">
              <option value="">--请选择--</option>
              <option value="true">是</option>
              <option value="false">否</option>
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
            <th>标题</th>
            <th>收件人</th>
            <th>收件人手机号</th>
            <th>发送时间</th>
            <th>内容</th>
            <th>是否已读</th>
            <th>是否已删除</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in pageList.list">
            <td align="center">
              {{item.id}}
            </td>
            <td>{{item.title}}</td>
            <td>{{item.receiver.realName}}</td>
            <td>{{item.receiver.mobile}}</td>
            <td>{{item.createTime | formatDate}}</td>
            <td><a href="javascript:void(0);" v-on:click.prevent="viewDetail(item.id)">查看</a></td>
            <td>{{item.hasRead ? '是' : '否'}}</td>
            <td>{{item.hasDelete ? '是' : '否'}}</td>
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

    <!--站内信详情-->
    <template>
      <div id="message" style="display: none;">
        <p style="margin: 20px">{{body}}</p>
      </div>
    </template>
    <!--站内信详情-->


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
        body: "",
      }
    },
    components: {
      pagination: pagination,
      breadcrumb: breadcrumb,
    },
    created: function () {
      this.getMessageList();
    },
    mounted: function () {

    },
    methods: {
      //站内信列表
      getMessageList: function (data) {
        let self = this;
        self.ajax({
          url: api.content.message.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.messageDomainPageList;
            self.currentIndex = res.messageDomainPageList.pageIndex;
          }
        });
      },
      // 搜索
      search: function (data) {
        if (data == null) {
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.message-form'));
        _.assign(data, formData);
        this.getMessageList(data);
      },
      // 查看详情
      viewDetail: function (id) {
        let self = this;

        self.body = _.result(_.find(self.pageList.list, function (message) {
          return message.id == id;
        }),'body');

        layer.open({
          type: 1,
          area: ['500px', '300px'],
          title: false,
          shade: 0.01,
          shadeClose: true,
          content: $('#message'),
          success: function (layero, index) {
            $(layero).show();
          }
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
