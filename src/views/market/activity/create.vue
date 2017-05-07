<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>活动管理</h4>
        <breadcrumb
                v-bind:items="[{text: '推广管理'},{text:'活动管理'},{text:'添加活动', active: true}]"/>
      </div>
      <div class="pull-right">
        <router-link class="btn btn-primary mt-1-5 w-10-5" to="/market/activity/list">返回</router-link>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <h4>添加活动</h4>
        <hr>
        <form class="form-horizontal mt-2 create-activity-form" method="post" novalidate="novalidate">
          <div class="form-group ">
            <label for="name" class="control-label col-lg-2">名称</label>
            <div class="col-lg-10">
              <input class="form-control" id="name" name="name" type="text" required="" aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="url" class="control-label col-lg-2">链接地址</label>
            <div class="col-lg-10">
              <input class="form-control" id="url" name="url" type="text">
            </div>
          </div>
          <div class="form-group ">
            <label for="startTime" class="control-label col-lg-2">活动开始时间</label>
            <div class="col-lg-10">
              <input class="form-control" id="startTime" name="startTime" type="text" onclick="laydate({istime: false, format: 'YYYY-MM-DD'})"/>
            </div>
          </div>
          <div class="form-group ">
            <label for="endTime" class="control-label col-lg-2">活动结束时间</label>
            <div class="col-lg-10">
              <input class="form-control" id="endTime" name="endTime" type="text" onclick="laydate({istime: false, format: 'YYYY-MM-DD'})">
            </div>
          </div>
          <div class="form-group ">
            <label for="content" class="control-label col-lg-2">内容</label>
            <div class="col-lg-10">
              <textarea class="form-control" id="content" name="content"></textarea>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-lg-2">是否开启</label>
            <div class="col-lg-10">
              <label class="radio-inline">
                <input type="radio" name="enabled" value="true" checked="checked"> 是
              </label>
              <label class="radio-inline">
                <input type="radio" name="enabled" value="false"> 否
              </label>
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
  import '../../../../static/js/plugins/select2/js/select2.min'
  import '../../../../static/js/plugins/select2/js/i18n/zh-CN'
  import '../../../../static/js/plugins/select2/css/select2.min.css'
  import breadcrumb from "@/components/bootstrap/breadcrumb"

  export default{
    data: function () {
      return {}
    },
    components: {
      breadcrumb: breadcrumb,
    },
    created: function () {
    },
    mounted: function () {
      this.submitForm();
    },
    destroyed: function () {
    },
    methods: {
      submitForm: function () {
        let self = this;
        $.each($('.create-activity-form'), function (i, obj) {
          $(obj).validate({
            rules: {
              name: {
                required: true
              },
              url: {
                required: true
              },
              startTime: {
                required: true
              },
              endTime: {
                required: true
              },
              enabled: {
                required: true
              },
              content:{
                required:true
              }
            },
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.market.activity.create.url,
                data: commonApp.tools.getFromData($(form)),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
                    if (res.code === 200) {
                      self.$router.push('/market/activity/list');
                    }
                  });
                }
              });
            }
          });
        })
      },
    },
    watch: {}
  }
</script>
