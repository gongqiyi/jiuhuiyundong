<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>广告内容管理</h4>
        <breadcrumb
                v-bind:items="[{text: '内容管理'},{text:'广告内容管理'},{text: '添加广告内容', active: true}]"/>
      </div>
      <div class="pull-right">
        <router-link class="btn btn-primary mt-1-5 w-10-5" to="/content/link/list">返回</router-link>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <h4>添加广告内容</h4>
        <hr>
        <form class="form-horizontal mt-2 create-link-form" method="post" novalidate="novalidate">
          <div class="form-group ">
            <label for="title" class="control-label col-lg-2">标题</label>
            <div class="col-lg-10">
              <input class="form-control" id="title" name="title" type="text" required="" aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="position" class="control-label col-lg-2">位置</label>
            <div class="col-lg-10">
              <select class="form-control" id="position" name="position">
                <option v-for="(item,index) in positionList" v-bind:value="index">{{item}}</option>
              </select>
            </div>
          </div>
          <div class="form-group ">
            <label for="url" class="control-label col-lg-2">链接地址</label>
            <div class="col-lg-10">
              <input class="form-control" id="url" name="url" type="text" required="" aria-required="true">
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-lg-2">是否新标签打开</label>
            <div class="col-lg-10">
              <label class="radio-inline">
                <input type="radio" name="targetNew" value="true" checked="checked"> 是
              </label>
              <label class="radio-inline">
                <input type="radio" name="targetNew" value="false"> 否
              </label>
            </div>
          </div>
          <div class="form-group ">
            <label class="control-label col-md-2">图片</label>
            <div class="col-md-8">
              <div class="list-img list-img-multiple clearfix" id="upload">
                <input class="upload_input" name="image" type="hidden">
                <ul class="upload_list"></ul>
                <a class="upload upload_btn" href="javascript:;"><span class="ion ion-plus"></span></a>
              </div>
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
  import 'jquery-validation'
  import '../../../../static/js/plugins/ueditor/ueditor.config'
  import '../../../../static/js/plugins/ueditor/ueditor.all.min'
  import '../../../../static/js/plugins/ueditor/lang/zh-cn/zh-cn'
  import '../../../../static/js/plugins/uploadUeditor'

  import breadcrumb from "@/components/bootstrap/breadcrumb"

  export default{
    data: function () {
      return {
        positionList:{},
      }
    },
    components: {
      breadcrumb: breadcrumb,
    },
    created: function () {
      this.getPositionList();
    },
    mounted: function () {
      this.upload();
      this.submitForm();
    },
    destroyed: function () {
    },
    methods: {
      getPositionList: function () {
        let self = this;
        self.ajax({
          url: api.content.link.listPosition.url,
          success: function (res) {
            self.positionList = res.positionList;
          }
        })
      },
      submitForm: function () {
        let self = this;
        $.each($('.create-link-form'), function (i, obj) {
          $(obj).validate({
            rules: {
              title: {
                required: true
              },
              position: {
                required: true
              },
            },
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.content.link.create.url,
                data: commonApp.tools.getFromData($(form)),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
                    if (res.code === 200) {
                      self.$router.push('/content/link/list');
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
