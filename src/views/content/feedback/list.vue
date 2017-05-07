<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>意见反馈管理</h4>
        <breadcrumb v-bind:items="[{text: '内容管理'},{text: '意见反馈管理', active: true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar feedback-form">
          <div class="form-group">
            <label>是否已读</label>
            <select class="form-control" id="hasRead" name="hasRead">
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
            <th>姓名</th>
            <th>电话</th>
            <th>邮箱</th>
            <th>内容</th>
            <th>反馈时间</th>
            <th>是否已读</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in pageList.list">
            <td align="center">
              {{item.id}}
            </td>
            <td>{{item.name}}</td>
            <td>{{item.tel}}</td>
            <td>{{item.email}}</td>
            <td><a href="javascript:void(0);" v-on:click.prevent="viewDetail(item.id)">查看</a></td>
            <td>{{item.createTime | formatDate}}</td>
            <td>{{item.hasRead ? '是' : '否'}}</td>
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

    <!--反馈详情-->
    <template>
      <div id="feedback" style="display: none;">
        <p style="margin: 20px">{{currentFeedback.body}}</p>
      </div>
    </template>
    <!--反馈详情-->

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
        currentFeedback: {},
      }
    },
    components: {
      pagination: pagination,
      breadcrumb: breadcrumb,
    },
    created: function () {
      this.getFeedbackList();
    },
    mounted: function () {

    },
    methods: {
      // 反馈列表
      getFeedbackList: function (data) {
        let self = this;
        self.ajax({
          url: api.content.feedback.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.feedbackPageList;
            self.currentIndex = res.feedbackPageList.pageIndex;
          }
        });
      },
      // 反馈详情
      getFeedback: function (id) {
        let self = this;
        self.ajax({
          url: api.content.feedback.get.url(id),
          success: function (res) {
            self.currentFeedback = res.feedback;
          }
        });
      },
      // 搜索
      search: function (data) {
        if (data == null) {
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.feedback-form'));
        _.assign(data, formData);
        this.getFeedbackList(data);
      },
      // 查看详情
      viewDetail: function (id) {
        let self = this;
        layer.open({
          type: 1,
          area: ['500px', '300px'],
          title: false,
          shade: 0.01,
          shadeClose: true,
          content: $('#feedback'),
          success: function (layero, index) {
            self.getFeedback(id);
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
