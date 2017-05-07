<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>广告内容管理</h4>
        <breadcrumb
                v-bind:items="[{text: '内容管理'},{text:'广告内容管理',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar link-form">
          <div class="form-group">
            <label>位置</label>
            <select class="form-control" id="position" name="position" v-on:change="search()">
              <option value="">--请选择--</option>
              <option v-for="(item,index) in positionList" v-bind:value="index">{{item}}</option>
            </select>
          </div>
          <div class="form-group">
            <router-link to="/content/link/create" class="btn btn-default btn-info">添加</router-link>
          </div>
        </form>
        <table id="js-datatable_example" class="table table-bordered table-middle table-hover mt-1-5">
          <thead>
          <tr>
            <th class="text-center" width="30">
              序号
            </th>
            <th>标题</th>
            <th>位置</th>
            <th>链接</th>
            <th>是否新窗口打开</th>
            <th>创建时间</th>
            <th class="text-center" width="50">排序</th>
            <th class="text-center" width="230">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in pageList.list">
            <td align="center">
              {{item.id}}
            </td>
            <td>{{item.title}}</td>
            <td>{{item.position | enumToDescription(positionList) }}</td>
            <td>{{item.url}}</td>
            <td>{{item.targetNew ? '是' : '否'}}</td>
            <td>{{item.createTime | formatDate}}</td>
            <td align="center">{{item.rank}}</td>
            <td align="center">
              <a v-on:click.prevent="rankUp(item.id)" class="btn btn-sm btn-info" href="#">↑</a>
              <a v-on:click.prevent="rankDown(item.id)" class="btn btn-sm btn-info" href="#">↓</a>
              <router-link class="btn btn-sm btn-primary" v-bind:to="'/content/link/update/' + item.id">编辑
              </router-link>
              <a v-on:click.prevent="deleteLink(item.id)" class="btn btn-sm btn-warning del-con"
                 href="#">删除</a>
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
        positionList:{},
      }
    },
    components: {
      pagination: pagination,
      breadcrumb: breadcrumb,
    },
    created: function () {
      this.getHolderList();
      this.getPositionList();
    },
    mounted: function () {

    },
    methods: {
      getHolderList: function (data) {
        let self = this;
        self.ajax({
          url: api.content.link.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.linkPageList;
            self.currentIndex = res.linkPageList.pageIndex;
          }
        });
      },
      getPositionList: function () {
        let self = this;
        self.ajax({
          url: api.content.link.listPosition.url,
          success: function (res) {
            self.positionList = res.positionList;
          }
        })
      },
      deleteLink: function (id) {
        let self = this;
        layer.confirm("确定删除该内容吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.content.link.delete.url(id),
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
      rankUp: function (id) {
        let self = this;
        self.ajax({
          type: 'POST',
          url: api.content.link.rankUp.url(id),
          success: function (res) {
            layer.msg(res.message, {time: 1000}, function () {
              if (res.code === 200) {
                self.search();
              }
            });
          }
        });
      },
      rankDown: function (id) {
        let self = this;
        self.ajax({
          type: 'POST',
          url: api.content.link.rankDown.url(id),
          success: function (res) {
            layer.msg(res.message, {time: 1000}, function () {
              if (res.code === 200) {
                self.search();
              }
            });
          }
        });
      },
      search: function (data) {
        if(data == null){
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.link-form'));
        _.assign(data, formData);
        this.getHolderList(data);
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
