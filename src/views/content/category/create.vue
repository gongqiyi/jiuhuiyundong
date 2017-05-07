<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>内容管理</h4>
        <breadcrumb
                v-bind:items="[{text: '内容管理'},{text:'新闻资讯管理'},{text:'类别管理'},{text: '添加类别', active: true}]"/>
      </div>
      <div class="pull-right">
        <router-link class="btn btn-primary mt-1-5 w-10-5" to="/content/category/list">返回</router-link>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <h4>添加类别</h4>
        <hr>
        <form class="form-horizontal mt-2 create-category-form" method="post" novalidate="novalidate">
          <div class="form-group ">
            <label for="title" class="control-label col-lg-2">标题</label>
            <div class="col-lg-10">
              <input class=" form-control" id="title" name="title" type="text" required="" aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="slug" class="control-label col-lg-2">编号</label>
            <div class="col-lg-10">
              <input class=" form-control" id="slug" name="slug" type="text" required="" aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="parentId" class="control-label col-lg-2">选择父分类</label>
            <div class="col-lg-10">
              <select class="form-control" id="parentId" name="parentId">
                <option value="0">根分类</option>
                <template v-for="top in categoryTree">
                  <option v-bind:value="top.id">|__{{top.title}}</option>
                  <template v-for="second in top.childrenList">
                    <option v-bind:value="second.id">&nbsp;&nbsp;&nbsp;|__{{second.title}}</option>
                    <template v-for="third in second.childrenList">
                      <option v-bind:value="third.id">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_{{third.title}}</option>
                    </template>
                  </template>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-offset-2 col-lg-10">
              <button class="btn btn-inverse" type="submit">添加</button>
              <button class="btn btn-default" type="reset">取消</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import breadcrumb from "@/components/bootstrap/breadcrumb"
  import 'jquery-validation'

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
      this.submitForm();
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
      submitForm: function () {
        let self = this;
        $.each($('.create-category-form'), function (i, obj) {
          $(obj).validate({
            rules: {
              title: {
                required: true
              },
              slug: {
                required: true
              },
              parentId: {
                required: true
              }

            },
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.content.category.create.url,
                data: commonApp.tools.getFromData($(form)),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
                    if (res.code === 200) {
                      self.$router.push('/content/category/list');
                    }
                  });
                }
              });
            }
          });
        })
      }
    },
    watch: {}
  }
</script>
