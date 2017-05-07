<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>活动管理</h4>
        <breadcrumb
                v-bind:items="[{text: '推广管理'},{text:'活动管理'},{text:'活动列表',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar activity-form">
          <div class="form-group">
            <label for="name">名称</label>
            <input type="text" class="form-control" id="name" name="name">
          </div>
          <div class="form-group">
            <label>状态</label>
            <select class="form-control" id="status" name="status">
              <option value="">--请选择--</option>
              <option value="1">未开始</option>
              <option value="2">进行中</option>
              <option value="3">已结束</option>
            </select>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-default" v-on:click.prevent="search()">搜索</button>
          </div>
          <div class="form-group">
            <router-link to="/market/activity/create" class="btn btn-default btn-info">添加</router-link>
          </div>
        </form>
        <table id="js-datatable_example" class="table table-bordered table-middle table-hover mt-1-5">
          <thead>
          <tr>
            <th class="text-center" width="30">
              序号
            </th>
            <th>名称</th>
            <th>链接地址</th>
            <th>活动开始时间</th>
            <th>活动结束时间</th>
            <th>创建时间</th>
            <th>状态</th>
            <th>是否开启</th>
            <th class="text-center" width="230">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in pageList.list">
            <td align="center">
              {{item.id}}
            </td>
            <td>{{item.name}}</td>
            <td>{{item.url }}</td>
            <td>{{item.startTime | formatDate}}</td>
            <td>{{item.endTime | formatDate}}</td>
            <td>{{item.createTime | formatDate}}</td>
            <td>{{item.status | enumToDescription(statusList) }}</td>
            <td>{{item.enabled ? '是' : '否' }}</td>
            <td align="center">
              <router-link class="btn btn-sm btn-primary" v-bind:to="'/market/activity/update/' + item.id">编辑
              </router-link>
              <template v-if="item.enabled">
                <a v-on:click.prevent="closeActivity(item.id)" class="btn btn-sm btn-warning" href="#">关闭</a>
              </template>
              <template v-else>
                <a v-on:click.prevent="openActivity(item.id)" class="btn btn-sm btn-info" href="#">开启</a>
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
        statusList: {
          1: '未开始',
          2: '进行中',
          3: '已结束',
        }
      }
    },
    components: {
      breadcrumb: breadcrumb,
      pagination: pagination,
    },
    created: function () {
      this.getActivityList();
    },
    mounted: function () {
    },
    methods: {
      // 活动列表
      getActivityList: function (data) {
        let self = this;
        self.ajax({
          url: api.market.activity.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.activityDomainPageList;
            self.currentIndex = res.activityDomainPageList.pageIndex;
          }
        });
      },
      // 搜索
      search: function (data) {
        if (data == null) {
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.activity-form'));
        _.assign(data, formData);
        this.getActivityList(data);
      },
      // 开启
      openActivity: function (id) {
        let self = this;
        layer.confirm("确定要开启该活动吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.market.activity.open.url(id),
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
      //关闭
      closeActivity: function (id) {
        let self = this;
        layer.confirm("确定要关闭该活动吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.market.activity.close.url(id),
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
