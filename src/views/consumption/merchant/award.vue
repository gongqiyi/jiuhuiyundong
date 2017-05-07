<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>商户管理</h4>
        <breadcrumb
                v-bind:items="[{text: '消费管理'},{text:'商户绩效奖励机制管理',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <h4>商户绩效奖励机制管理</h4>
        <hr>
        <div class="box clearfix">
          <h1 class="text-center do-border-bottom pb-2-5 mt-3">绩效奖励机制</h1>
          <form action="" class="award-setting-form" method="POST">
            <div class="form-group clearfix mb-1 col-md-12 ml-12 mt-3">
              <input class="v-t ml-6" type="radio" checked="checked"><span class="v-t ml-1">按有效消费订单个数结算</span>
            </div>
            <div class="form-group clearfix mb-1 col-md-12 ml-13 mt-1">
              <label class="col-md-3">每个有效消费订单奖励：</label>
              <div class="col-md-7">
                <input class="form-control col-md-1 w-6 mt--1 ml--2" v-model="setting.amountPerOrder"
                       name="amountPerOrder" type="text"><span class="col-md-1">元</span>
              </div>
            </div>
            <!--<div class="form-group clearfix mb-1 col-md-12 ml-13 mt-1">-->
              <!--<label class="col-md-6">当前每个有效消费订单奖励 <span>{{setting.amountPerOrder}}</span> 元</label>-->
            <!--</div>-->
            <p class="col-md-12 ml-12 mt-20-5">注：有效消费订单指商户和用户都确认消费的订单</p>
            <div class="form-group text-center">
              <button type="submit" class="btn btn-inverse w-10-5 mt-3 mb-3">确认</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import breadcrumb from "@/components/bootstrap/breadcrumb"

  export default{
    data: function () {
      return {
        setting: {},
      }
    },
    components: {
      breadcrumb: breadcrumb,
    },
    created: function () {
      this.getAwardSetting();
    },
    mounted: function () {
      this.submitForm();
    },
    methods: {
      // 获取设置
      getAwardSetting: function (data) {
        let self = this;
        self.ajax({
          url: api.consumption.merchant.award.url,
          data: data,
          success: function (res) {
            self.setting = res.setting;
          }
        });
      },
      // 保存设置
      submitForm: function () {
        let self = this;
        $.each($('.award-setting-form'), function (i, obj) {
          $(obj).validate({
            rules: {
              amountPerOrder: {
                required: true
              },
            },
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.consumption.merchant.saveAward.url,
                data: commonApp.tools.getFromData($(form)),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
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
