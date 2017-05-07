<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>内容管理</h4>
        <breadcrumb
                v-bind:items="[{text: '内容管理'},{text:'新闻资讯管理'},{text:'内容管理',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar content-form">
          <div class="form-group">
            <label>所属分类</label>
              <select class="form-control" id="categoryId" name="categoryId" v-on:change="search()">
                <option value="">--请选择--</option>
                <template v-for="top in categoryTree">
                  <option v-bind:value="top.id">{{top.title}}</option>
                  <template v-for="second in top.childrenList">
                    <option v-bind:value="second.id">|__{{second.title}}</option>
                    <template v-for="third in second.childrenList">
                      <option v-bind:value="third.id">&nbsp;&nbsp;&nbsp;|_{{third.title}}</option>
                    </template>
                  </template>
                </template>
              </select>
          </div>
          <div class="form-group">
            <router-link to="/content/content/create" class="btn btn-default btn-info">添加</router-link>
          </div>
        </form>
        <table id="js-datatable_example" class="table table-bordered table-middle table-hover mt-1-5">
          <thead>
          <tr>
            <th class="text-center" width="30">
              序号
            </th>
            <th>标题</th>
            <th>所属分类</th>
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
            <td>{{item.categoryTitle}}</td>
            <td>{{item.createTime | formatDate}}</td>
            <td align="center">{{item.rank}}</td>
            <td align="center">
              <a v-on:click.prevent="rankUp(item.id)" class="btn btn-sm btn-info" href="#">↑</a>
              <a v-on:click.prevent="rankDown(item.id)" class="btn btn-sm btn-info" href="#">↓</a>
              <router-link class="btn btn-sm btn-primary" v-bind:to="'/content/content/update/' + item.id">编辑
              </router-link>
              <a v-on:click.prevent="deleteContent(item.id)" class="btn btn-sm btn-warning del-con"
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
        categoryTree: [],
      }
    },
    components: {
      breadcrumb: breadcrumb,
      pagination: pagination,
    },
    created: function () {
      this.getHolderList();
      this.getCategoryList();
    },
    mounted: function () {

    },
    methods: {
      getHolderList: function (data) {
        let self = this;
        self.ajax({
          url: api.content.content.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.contentDomainPageList;
            self.currentIndex = res.contentDomainPageList.pageIndex;
          }
        });
      },
      getCategoryList: function (data) {
        let self = this;
        self.ajax({
          url: api.content.category.list.url,
          data: data,
          success: function (res) {
            self.categoryTree = res.contentCategoryTree;
          }
        });
      },
      deleteContent: function (id) {
        let self = this;
        layer.confirm("确定删除该内容吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.content.content.delete.url(id),
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
          url: api.content.content.rankUp.url(id),
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
          url: api.content.content.rankDown.url(id),
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
        let formData = commonApp.tools.getFromData($('.content-form'));
        _.assign(data, formData);
        this.getHolderList(data);
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
