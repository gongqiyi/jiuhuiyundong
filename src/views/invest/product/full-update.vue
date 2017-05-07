<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>全额投保产品管理</h4>
        <breadcrumb
                v-bind:items="[{text: '投保管理'},{text:'产品管理'},{text:'全额投保产品管理'},{text: '编辑产品', active: true}]"/>
      </div>
      <div class="pull-right">
        <router-link class="btn btn-primary mt-1-5 w-10-5" to="/invest/product/full/list">返回</router-link>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <h4>编辑产品</h4>
        <hr>
        <form class="form-horizontal mt-2 update-product-form" method="post" novalidate="novalidate">
          <input type="hidden" name="id" v-model="product.id">
          <div class="form-group ">
            <label for="name" class="control-label col-lg-2">产品名称</label>
            <div class="col-lg-10">
              <input class="form-control" v-model="product.name" id="name" name="name" type="text" required="" aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label class="control-label col-md-2">缩略图</label>
            <div class="col-md-8">
              <div class="list-img list-img-multiple clearfix" id="upload">
                <input class="upload_input" name="image" type="hidden" v-model="product.image">
                <ul class="upload_list"></ul>
                <a class="upload upload_btn" href="javascript:;"><span class="ion ion-plus"></span></a>
              </div>
            </div>
          </div>

          <div class="form-group ">
            <label for="companyName" class="control-label col-lg-2">保险公司名称</label>
            <div class="col-lg-10">
              <input class="form-control" v-model="product.companyName" id="companyName" name="companyName" type="text" required=""
                     aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="companyAddress" class="control-label col-lg-2">保险公司地址</label>
            <div class="col-lg-10">
              <input class="form-control" v-model="product.companyAddress" id="companyAddress" name="companyAddress" type="text" required=""
                     aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="companyTel" class="control-label col-lg-2">保险公司联系方式</label>
            <div class="col-lg-10">
              <input class="form-control" v-model="product.companyTel" id="companyTel" name="companyTel" type="text" required=""
                     aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="saliRate" class="control-label col-lg-2">交强险手续费率(%)</label>
            <div class="col-lg-10">
              <input class="form-control" v-model="product.saliRate" id="saliRate" name="saliRate" type="text" required="" aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="commercialRate" class="control-label col-lg-2">商业险手续费率(%)</label>
            <div class="col-lg-10">
              <input class="form-control" v-model="product.commercialRate" id="commercialRate" name="commercialRate" type="text" required=""
                     aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="url" class="control-label col-lg-2">购买链接</label>
            <div class="col-lg-10">
              <input class="form-control" v-model="product.url" id="url" name="url" type="text" required=""
                     aria-required="true" >
            </div>
          </div>
          <div class="form-group ">
            <label class="control-label col-md-2">是否生成二维码</label>
            <div class="col-lg-10">
              <label class="radio-inline">
                <input type="radio" name="generateQrCode" v-bind:value="true" v-model="product.generateQrCode" > 是
              </label>
              <label class="radio-inline">
                <input type="radio" name="generateQrCode" v-bind:value="false" v-model="product.generateQrCode"> 否
              </label>
            </div>
          </div>
          <div class="form-group ">
            <label for="description" class="control-label col-lg-2">描述</label>
            <div class="col-lg-10">
              <textarea class="form-control" v-model="product.description" id="description" name="description"></textarea>
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
        product:{},
      }
    },
    components: {
      breadcrumb: breadcrumb,
    },
    created: function () {
    },
    mounted: function () {
      this.getProduct();
      this.upload();
      this.submitForm();
    },
    updated: function () {
      this.upload();
    },
    destroyed: function () {
    },
    methods: {
      getProduct: function () {
        let self = this;
        self.ajax({
          url: api.invest.product.full.get.url(self.$route.params.id),
          success: function (res) {
            self.product = res.investProductFull;
          }
        });
      },
      submitForm: function () {
        let self = this;
        $.each($('.update-product-form'), function (i, obj) {
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
            },
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.invest.product.full.update.url,
                data: commonApp.tools.getFromData($(form)),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
                    if (res.code === 200) {
                      self.$router.push('/invest/product/full/list');
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
        uploadUeditor.singleImage($('#uploadQrCode'));
      },
    },
    watch: {}
  }
</script>
