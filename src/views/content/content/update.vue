<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>内容管理</h4>
        <breadcrumb
                v-bind:items="[{text: '内容管理'},{text:'新闻资讯管理'},{text:'内容管理'},{text: '编辑内容', active: true}]"/>
      </div>
      <div class="pull-right">
        <router-link class="btn btn-primary mt-1-5 w-10-5" to="/content/content/list">返回</router-link>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <h4>编辑内容</h4>
        <hr>
        <form class="form-horizontal mt-2 create-category-form" method="post" novalidate="novalidate">
          <input type="hidden" v-bind:value="content.id" name="id"/>
          <div class="form-group ">
            <label for="title" class="control-label col-lg-2">标题</label>
            <div class="col-lg-10">
              <input class=" form-control" id="title" name="title" type="text" required="" aria-required="true"
                     v-model="content.title">
            </div>
          </div>
          <div class="form-group ">
            <label for="categoryId" class="control-label col-lg-2">分类</label>
            <div class="col-lg-10">
              <select class="form-control" id="categoryId" name="categoryId" v-model="content.categoryId">
                <template v-for="top in categoryTree">
                  <option v-bind:value="top.id">{{top.title}}</option>
                  <template v-for="second in top.childrenList">
                    <option v-bind:value="second.id">|__{{second.title}}</option>
                    <template v-for="third in second.childrenList">
                      <option v-bind:value="third.id">&nbsp;&nbsp;&nbsp;|_{{third.title}}
                      </option>
                    </template>
                  </template>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group ">
            <label class="control-label col-md-2">缩略图</label>
            <div class="col-md-8">
              <div class="list-img list-img-multiple clearfix" id="upload">
                <input class="upload_input" name="image" type="hidden" v-bind:value="content.image">
                <ul class="upload_list"></ul>
                <a class="upload upload_btn" href="javascript:;"><span class="ion ion-plus"></span></a>
              </div>
            </div>
          </div>
          <div class="form-group ">
            <label for="editor" class="control-label col-md-2">内容</label>
            <div class="col-md-8">
              <script id="editor" name="content" type="text/plain" style="width:100%;height:500px;"></script>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-lg-2">是否显示在PC端</label>
            <div class="col-lg-10">
              <label class="radio-inline">
                <input type="radio" name="pcVisible" v-bind:value="true" v-model="content.pcVisible"> 显示
              </label>
              <label class="radio-inline">
                <input type="radio" name="pcVisible" v-bind:value="false" v-model="content.pcVisible"> 不显示
              </label>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-lg-2">是否显示在APP端</label>
            <div class="col-lg-10">
              <label class="radio-inline">
                <input type="radio" name="appVisible" v-bind:value="true" v-model="content.appVisible"> 显示
              </label>
              <label class="radio-inline">
                <input type="radio" name="appVisible" v-bind:value="false" v-model="content.appVisible"> 不显示
              </label>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-lg-2">是否显示在微信端</label>
            <div class="col-lg-10">
              <label class="radio-inline">
                <input type="radio" name="wechatVisible" v-bind:value="true" v-model="content.wechatVisible"> 显示
              </label>
              <label class="radio-inline">
                <input type="radio" name="wechatVisible" v-bind:value="false" v-model="content.wechatVisible"> 不显示
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-offset-2 col-lg-10">
              <button class="btn btn-inverse" type="submit">保存</button>
              <button class="btn btn-default" type="reset">取消</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import 'jquery-validation'
  import '../../../../static/js/plugins/ueditor/ueditor.config'
  import '../../../../static/js/plugins/ueditor/ueditor.all.min'
  import '../../../../static/js/plugins/ueditor/lang/zh-cn/zh-cn'
  import '../../../../static/js/plugins/uploadUeditor'

  import breadcrumb from "@/components/bootstrap/breadcrumb"

  export default{
    data: function () {
      return {
        content: {},
        categoryTree: [],
        editor: null,
      }
    },
    components: {
      breadcrumb: breadcrumb,
    },
    created: function () {
      this.getContent();
      this.getCategoryList();
    },
    mounted: function () {
      let self = this;
      self.upload();
      self.submitForm();
      self.editor = UE.getEditor('editor');
      self.editor.ready(function () {
        self.editor.setContent(self.content.content);
      });
    },
    updated: function () {
      this.upload();
    },
    destroyed: function () {
      this.editor.destroy();
    },
    methods: {
      getContent: function () {
        let self = this;
        self.ajax({
          url: api.content.content.get.url(self.$route.params.id),
          success: function (res) {
            self.content = res.content;
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
      submitForm: function () {
        let self = this;
        $.each($('.create-category-form'), function (i, obj) {
          $(obj).validate({
            rules: {
              title: {
                required: true
              },
              parentId: {
                required: true
              }
            },
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.content.content.update.url,
                data: commonApp.tools.getFromData($(form)),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
                    if (res.code === 200) {
                      self.$router.push('/content/content/list');
                    }
                  });
                }
              });
            }
          });
        })
      },
      upload: function () {
        uploadUeditor.singleImage($('#upload'));
      },
    },
    watch: {}
  }
</script>
