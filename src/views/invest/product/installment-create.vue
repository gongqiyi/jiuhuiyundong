<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>分期投保产品管理</h4>
        <breadcrumb
                v-bind:items="[{text: '投保管理'},{text:'产品管理'},{text:'分期投保产品管理'},{text: '添加产品', active: true}]"/>
      </div>
      <div class="pull-right">
        <router-link class="btn btn-primary mt-1-5 w-10-5" to="/invest/product/installment/list">返回</router-link>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <h4>添加产品</h4>
        <hr>
        <form class="form-horizontal mt-2 create-product-form" method="post" novalidate="novalidate">
          <div class="form-group ">
            <label for="name" class="control-label col-lg-2">产品名称</label>
            <div class="col-lg-10">
              <input class="form-control" id="name" name="name" type="text" required="" aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="companyName" class="control-label col-lg-2">保险公司名称</label>
            <div class="col-lg-10">
              <input class="form-control" id="companyName" name="companyName" type="text" required=""
                     aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="companyAddress" class="control-label col-lg-2">保险公司地址</label>
            <div class="col-lg-10">
              <input class="form-control" id="companyAddress" name="companyAddress" type="text" required=""
                     aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="companyTel" class="control-label col-lg-2">保险公司联系方式</label>
            <div class="col-lg-10">
              <input class="form-control" id="companyTel" name="companyTel" type="text" required=""
                     aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="saliRate" class="control-label col-lg-2">交强险手续费率(%)</label>
            <div class="col-lg-10">
              <input class="form-control" id="saliRate" name="saliRate" type="text" required="" aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="commercialRate" class="control-label col-lg-2">商业险手续费率(%)</label>
            <div class="col-lg-10">
              <input class="form-control" id="commercialRate" name="commercialRate" type="text" required=""
                     aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="totalTerm" class="control-label col-lg-2">分期总期数</label>
            <div class="col-lg-10">
              <input class="form-control" id="totalTerm" name="totalTerm" type="text" required=""
                     aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="firstTermRate" class="control-label col-lg-2">首期还款比率(%)</label>
            <div class="col-lg-10">
              <input class="form-control" id="firstTermRate" name="firstTermRate" type="text" required=""
                     aria-required="true">
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-lg-2">是否上架</label>
            <div class="col-lg-10">
              <label class="radio-inline">
                <input type="radio" name="enabled" value="true" checked="checked"> 是
              </label>
              <label class="radio-inline">
                <input type="radio" name="enabled" value="false"> 否
              </label>
            </div>
          </div>
          <div class="form-group ">
            <label for="description" class="control-label col-lg-2">描述</label>
            <div class="col-lg-10">
              <textarea class="form-control" id="description" name="description"></textarea>
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
      return {}
    },
    components: {
      breadcrumb: breadcrumb,
    },
    created: function () {
    },
    mounted: function () {
//      this.upload();
      this.submitForm();
    },
    updated: function () {
//      this.upload();
    },
    destroyed: function () {
    },
    methods: {
      submitForm: function () {
        let self = this;
        $.each($('.create-product-form'), function (i, obj) {
          $(obj).validate({
            rules: {
              name: {
                required: true
              },
              description: {
                required: true
              },
              enabled: {
                required: true,
              },
              companyName: {
                required: true,
              },
              companyAddress: {
                required: true,
              },
              companyTel: {
                required: true,
              },
              saliRate: {
                required: true,
                digits: true,
              },
              commercialRate: {
                required: true,
                digits: true,
              },
              totalTerm: {
                required: true,
                number: true,
              },
              firstTermRate: {
                required: true,
                digits: true,
              },
            },
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.invest.product.installment.create.url,
                data: commonApp.tools.getFromData($(form)),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
                    if (res.code === 200) {
                      self.$router.push('/invest/product/installment/list');
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
