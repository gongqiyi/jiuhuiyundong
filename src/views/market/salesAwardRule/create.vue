<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>客户经理邀请奖励管理</h4>
        <breadcrumb
                v-bind:items="[{text: '推广管理'},{text:'客户经理邀请奖励管理'},{text:'添加规则', active: true}]"/>
      </div>
      <div class="pull-right">
        <router-link class="btn btn-primary mt-1-5 w-10-5" to="/market/salesAwardRule/list">返回</router-link>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <h4>客户经理邀请奖励管理</h4>
        <hr>
        <div class="box clearfix">
          <h1 class="text-center do-border-bottom pb-2-5">客户经理邀请奖励管理</h1>
          <form class="rule-form" method="POST">
            <div class="form-group col-md-12 ml-10 mt-1">
              <label class="col-md-1 control-label">地区：</label>
              <div class="col-md-6">
                <select class="" id="areaId" name="areaId">
                </select>
              </div>
            </div>
            <div class="form-group clearfix mb-1 col-md-12">
              <div class="">
                <div class="mb-1 col-md-12 ml-12">
                  <div class="radio">
                    <label>
                      <input type="radio" name="ruleType" checked value="1">按有效邀请好友个数结算
                    </label>
                  </div>
                </div>
                <div class="form-group col-md-12 ml-13 mt-1">
                  <label class="col-md-3 control-label">每个有效好友奖励：</label>
                  <div class="col-md-6">
                    <input class="form-control col-md-2 w-10-5 ml--4 mt--1" type="text" name="perPerson">
                    <span class="form-absolute col-md-2">元</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group clearfix mb-1 col-md-12">
              <div class="col-md-12">
                <div class="ml-12">
                  <div class="radio">
                    <label>
                      <input type="radio" name="ruleType" value="2">按有效邀请会员购买保险次数计算
                    </label>
                  </div>
                </div>
                <div class="form-group col-md-12 ml-10 mt-1">
                  <label class="col-md-5 control-label">被邀好友线上全额购买所获奖励：</label>
                  <div class="col-md-6">
                    <input class="form-control col-md-2 w-10-5 ml--7 mt--1" type="text" name="perFullOnline">
                    <span class="form-absolute col-md-2">元</span>
                  </div>
                </div>
                <div class="form-group col-md-12 ml-10 mt-1">
                  <label class="col-md-5 control-label">被邀好友线下全额购买所获奖励：</label>
                  <div class="col-md-6">
                    <input class="form-control col-md-2 w-10-5 ml--7 mt--1" type="text" name="perFullOffline">
                    <span class="form-absolute col-md-2">元</span>
                  </div>
                </div>
                <div class="form-group col-md-12 ml-10 mt-1">
                  <label class="col-md-5 control-label">被邀好友线下分期购买所获奖励：</label>
                  <div class="col-md-6">
                    <input class="form-control col-md-2 w-10-5 ml--7 mt--1" type="text" name="perInstallmentOffline">
                    <span class="form-absolute col-md-2">元</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group clearfix mb-1 col-md-12">
              <div class="col-md-12">
                <div class="ml-12">
                  <div class="radio">
                    <label>
                      <input type="radio" name="ruleType" value="3">按有效邀请会员投保金额计算
                    </label>
                  </div>
                </div>

                <div class="form-group col-md-12 ml-10 mt-1">
                  <label class="col-md-5 control-label">被邀客户线上全额购买所获奖励：</label>
                  <div class="col-md-6">
                    <input class="form-control col-md-2 w-10-5 ml--7 mt--1" type="text" name="fullOnlineRate">
                    <span class="form-absolute col-md-4">% 金额占比</span>
                  </div>
                </div>
                <div class="form-group col-md-12 ml-10 mt-1">
                  <label class="col-md-5 control-label">被邀客户线下全额购买所获奖励：</label>
                  <div class="col-md-6">
                    <input class="form-control col-md-2 w-10-5 ml--7 mt--1" type="text" name="fullOfflineRate">
                    <span class="form-absolute col-md-4">% 金额占比</span>
                  </div>
                </div>
                <div class="form-group col-md-12 ml-10 mt-1">
                  <label class="col-md-5 control-label">被邀客户线下分期购买所获奖励：</label>
                  <div class="col-md-6">
                    <input class="form-control col-md-2 w-10-5 ml--7 mt--1" type="text" name="installmentOfflineRate">
                    <span class="form-absolute col-md-4">% 金额占比</span>
                  </div>
                </div>

              </div>
            </div>
            <div class="form-group clearfix mb-1 col-md-12 ml-13 mt-5">
              注：1、有效好友是指通过链接或邀请码注册的会员
            </div>
            <div class="form-group col-md-12 text-center mt-5 mb-3">
              <button class="btn btn-inverse w-10-5" type="submit">确认并提交</button>
            </div>
          </form>
        </div>
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
      this.initAreaSelect2();
      this.submitForm();
    },
    updated: function () {
    },
    destroyed: function () {
    },
    methods: {
      submitForm: function () {
        let self = this;
        $.each($('.rule-form'), function (i, obj) {
          $(obj).validate({
            rules: {},
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.market.salesAwardRule.save.url,
                data: commonApp.tools.getFromData($(form)),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
                    if (res.code === 200) {
                      self.$router.push('/market/salesAwardRule/list');
                    }
                  });
                }
              });
            }
          });
        })
      },
      // 城市选择
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

    },
    watch: {}
  }
</script>
