<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>提现管理</h4>
        <breadcrumb
                v-bind:items="[{text: '财务管理'},{text:'提现管理'},{text:'提现相关配置',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <h4>提现相关配置</h4>
        <hr>
        <div class="box clearfix">
          <h1 class="text-center do-border-bottom pb-2-5 mt-3">提现相关配置</h1>
          <form action="" class="withdrawal-setting-form" method="POST">
            <div class="form-group clearfix mb-1 col-md-12 ml-13 mt-1">
              <label class="col-md-3">最小提现积分：</label>
              <div class="col-md-7">
                <input class="form-control col-md-1 w-10-5 mt--1 ml--2" v-model="setting.minPoint"
                       name="minPoint" type="text"><span class="col-md-1">点</span>
              </div>
            </div>
            <div class="form-group clearfix mb-1 col-md-12 ml-13 mt-1">
              <label class="col-md-3">提现金额积分比：</label>
              <div class="col-md-7">
                <input class="form-control col-md-1 w-10-5 mt--1 ml--2" v-model="setting.pointAmountRate"
                       name="pointAmountRate" type="text"><span class="col-md-1">%</span>
              </div>
            </div>
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
      this.getWithdrawalSetting();
    },
    mounted: function () {
      this.submitForm();
    },
    methods: {
      // 获取设置
      getWithdrawalSetting: function () {
        let self = this;
        self.ajax({
          url: api.finance.withdrawal.setting.url,
          success: function (res) {
            self.setting = res.setting;
          }
        });
      },
      // 保存设置
      submitForm: function () {
        let self = this;
        $.each($('.withdrawal-setting-form'), function (i, obj) {
          $(obj).validate({
            rules: {
              minPoint: {
                required: true
              },
              pointAmountRate: {
                required: true
              },
            },
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.finance.withdrawal.saveSetting.url,
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
