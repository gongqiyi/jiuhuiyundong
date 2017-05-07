<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>全额投保管理</h4>
        <breadcrumb
                v-bind:items="[{text: '投保管理'},{text:'全额投保管理'},{text:'数据导入',active:true}]"/>
      </div>
      <div class="pull-right">
        <router-link class="btn btn-primary mt-1-5 w-10-5" to="/invest/order/full/list">返回</router-link>
      </div>
    </div>

    <div class="panel panel-white">
      <div class="panel-body">
        <h4>数据导入</h4>
        <hr>
        <form class="form-horizontal mt-2 import-order-form" method="post" novalidate="novalidate">
          <div class="form-group ">
            <label class="control-label col-md-2">Excel文件</label>
            <div class="col-md-8">
              <div class="list-img list-img-multiple clearfix" id="upload">
                <input class="upload_input" name="file" type="hidden">
                <ul class="upload_list"></ul>
                <a class="upload upload_btn" href="javascript:;"><span class="ion ion-plus"></span></a>
              </div>
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
  import '../../../../../static/js/plugins/ueditor/ueditor.config'
  import '../../../../../static/js/plugins/ueditor/ueditor.all.min'
  import '../../../../../static/js/plugins/ueditor/lang/zh-cn/zh-cn'
  import '../../../../../static/js/plugins/uploadUeditor'

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
      this.upload();
      this.submitForm();
    },
    updated: function () {
      this.upload();
    },
    destroyed: function () {
    },
    methods: {
      // 表单提交
      submitForm: function () {
        let self = this;
        $.each($('.import-order-form'), function (i, obj) {
          $(obj).validate({
            rules: {},
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.invest.order.full.matchExcel.url,
                data: commonApp.tools.getFromData($(form)),
                success: function (res) {
                  layer.msg(res.message, {time: 2000}, function () {
                    if (res.code === 200) {
                    }
                  });
                }
              });
            }
          });
        })
      },
      // excel上传
      upload: function () {
        uploadUeditor.singleAttachment($('#upload'));
      },
    },
    watch: {}
  }
</script>
