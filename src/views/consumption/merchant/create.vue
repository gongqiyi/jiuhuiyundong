<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>商户管理</h4>
        <breadcrumb
                v-bind:items="[{text: '消费管理'},{text:'商户管理'},{text:'添加商户', active: true}]"/>
      </div>
      <div class="pull-right">
        <router-link class="btn btn-primary mt-1-5 w-10-5" to="/consumption/merchant/list">返回</router-link>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <h4>添加商户</h4>
        <hr>
        <form class="form-horizontal mt-2 create-merchant-form" method="post" novalidate="novalidate">
          <div class="form-group ">
            <label for="name" class="control-label col-lg-2">商户名称</label>
            <div class="col-lg-10">
              <input class="form-control" id="name" name="name" type="text" required="" aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="areaId" class="control-label col-lg-2">所在地区</label>
            <div class="col-lg-10">
              <select class="form-control" id="areaId" name="areaId">
              </select>
            </div>
          </div>
          <div class="form-group ">
            <label for="address" class="control-label col-lg-2">地址</label>
            <div class="col-lg-10">
              <input class="form-control" id="address" name="address" type="text">
            </div>
          </div>
          <div class="form-group ">
            <label for="tel" class="control-label col-lg-2">电话</label>
            <div class="col-lg-10">
              <input class="form-control" id="tel" name="tel" type="text" required="" aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label class="control-label col-md-2">缩略图</label>
            <div class="col-md-8">
              <div class="list-img list-img-multiple clearfix" id="upload">
                <input class="upload_input" name="thumb" type="hidden">
                <ul class="upload_list"></ul>
                <a class="upload upload_btn" href="javascript:;"><span class="ion ion-plus"></span></a>
              </div>
            </div>
          </div>
          <div class="form-group ">
            <label for="description" class="control-label col-lg-2">描述</label>
            <div class="col-lg-10">
              <textarea class="form-control" id="description" name="description"></textarea>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-lg-2">是否推荐</label>
            <div class="col-lg-10">
              <label class="radio-inline">
                <input type="radio" name="recommended" value="true"> 是
              </label>
              <label class="radio-inline">
                <input type="radio" name="recommended" value="false"> 否
              </label>
            </div>
          </div>
          <div class="form-group ">
            <label for="userName" class="control-label col-lg-2">用户名</label>
            <div class="col-lg-10">
              <input class="form-control" id="userName" name="userName" type="text" required="" aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="password" class="control-label col-lg-2">密码</label>
            <div class="col-lg-10">
              <input class="form-control" id="password" name="password" type="text" required="" aria-required="true">
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
      this.initAreaSelect2();
      this.submitForm();
      this.upload();
    },
    updated: function () {
      this.upload();
    },
    destroyed: function () {
    },
    methods: {
      submitForm: function () {
        let self = this;
        $.each($('.create-merchant-form'), function (i, obj) {
          $(obj).validate({
            rules: {
              name: {
                required: true
              },
              areaId: {
                required: true
              },
              address: {
                required: true
              },
              tel: {
                required: true
              },
              userName: {
                required: true
              },
              password: {
                required: true
              }
            },
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.consumption.merchant.register.url,
                data: commonApp.tools.getFromData($(form)),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
                    if (res.code === 200) {
                      self.$router.push('/consumption/merchant/list');
                    }
                  });
                }
              });
            }
          });
        })
      },
      initAreaSelect2: function () {
        $('#areaId').select2({
          language: 'zh-CN',
          width: '100px',
          placeholder: {
            id: '',
            text: '--请选择--'
          },
          allowClear: true,
          ajax: {
            data: function (params) {
              return {
                city: params.term,
                pageIndex: params.page,
              };
            },
            url: api.content.area.list.url,
            dataType: 'json',
            delay: 250,
            processResults: function (data, params) {
              let areaList = data.areaList;
              let results = _.map(areaList.list, function (area) {
                return {id: area.id, text: area.city};
              });
              return {
                results: results,
                pagination: {
                  more: data.areaList.hasNextPage,
                }
              };
            },
            cache: true
          },
        });
      },
      upload: function () {
        uploadUeditor.singleImage($('#upload'));
      },
    },
    watch: {}
  }
</script>
