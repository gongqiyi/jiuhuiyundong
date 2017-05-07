<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>新闻资讯管理</h4>
        <breadcrumb
                v-bind:items="[{text: '内容管理'},{text:'新闻资讯管理'},{text:'类别管理',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar">
          <div class="form-group">
            <router-link to="/content/category/create" class="btn btn-default btn-info">添加</router-link>
          </div>
        </form>
        <table id="js-datatable_example" class="table table-bordered table-middle table-hover mt-1-5">
          <thead>
          <tr>
            <th class="text-center" width="30">
              序号
            </th>
            <th>标题</th>
            <th>编号</th>
            <th>创建时间</th>
            <th width="80" >操作</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="top in categoryTree">
            <tr style="background-color: #f8f8f8">
              <td align="center">
                {{top.id}}
              </td>
              <td>{{top.title}}</td>
              <td>{{top.slug}}</td>
              <td>{{top.createTime | formatDate}}</td>
              <td>
                <a v-on:click.prevent="deleteCategory(top.id)" class="btn btn-sm btn-primary del-con"
                   href="#">删除</a>
              </td>
            </tr>
            <template v-for="second in top.childrenList">
              <tr>
                <td align="center">
                  {{second.id}}
                </td>
                <td>|__{{second.title}}</td>
                <td>{{second.slug}}</td>
                <td>{{second.createTime | formatDate}}</td>
                <td>
                  <a v-on:click.prevent="deleteCategory(second.id)" class="btn btn-sm btn-primary del-con"
                     href="#">删除</a>
                </td>
              </tr>
              <tr v-for="third in second.childrenList">
                <td align="center">
                  {{third.id}}
                </td>
                <td>&nbsp;&nbsp;&nbsp;|__{{third.title}}</td>
                <td>{{third.slug}}</td>
                <td>{{third.createTime | formatDate}}</td>
                <td>
                  <a v-on:click.prevent="deleteCategory(third.id)" class="btn btn-sm btn-primary del-con"
                     href="#">删除</a>
                </td>
              </tr>
            </template>
          </template>
          </tbody>
        </table>
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
        categoryTree: []
      }
    },
    components: {
      breadcrumb: breadcrumb,
    },
    created: function () {
      this.getCategoryList();
    },
    mounted: function () {

    },
    methods: {
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
      deleteCategory: function (id) {
        let self = this;
        layer.confirm("删除分类将会删除其下所有子分类，确定这么做吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.content.category.delete.url(id),
            success: function (res) {
              layer.msg(res.message, {time: 1000}, function () {
                if (res.code === 200) {
                  self.getCategoryList();
                }
              });
            }
          });
        });
      },
    },
    watch: {}
  }
</script>
