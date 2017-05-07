<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>投保返积分管理</h4>
        <breadcrumb
                v-bind:items="[{text: '推广管理'},{text:'投保返积分管理'},{text:'添加规则', active: true}]"/>
      </div>
      <div class="pull-right">
        <router-link class="btn btn-primary mt-1-5 w-10-5" to="/market/investPointRule/list">返回</router-link>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <div style="position: relative;top:125px;left: 25%;">
          <label class="">区域：</label>
            <select class="" id="areaId" name="areaId">
            </select>
        </div>
        <ul class="nav nav-tabs nav-justified" role="tablist">
          <li role="presentation" class="active"><a href="#tab-base-style-1" data-toggle="tab">全额保</a></li>
          <li role="presentation"><a href="#tab-base-style-2" data-toggle="tab">分期保</a></li>
        </ul>
        <div class="tab-content mt-1-5">
          <div role="tabpanel" class="tab-pane active" id="tab-base-style-1">
            <div class="box">
              <h1 class="text-center do-border-bottom pb-2-5">奖励绩效机制</h1>
              <form action="" method="POST" class="full-rule-form">
                <input type="hidden" name="areaId">
                <div class="form-group clearfix mb-1 col-md-12 do-border-bottom">
                  <div>
                    <div class="mb-1 col-md-12 ml-12">
                      <div class="radio">
                        <label>
                          <input type="radio" name="onlineFullType" id="online-times" value="1" checked>按有效投保次数结算(线上)
                        </label>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">每次有效投保奖励：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1 online-times-score" type="text"
                               name="onlinePerInvestPoint">
                        <span class="form-absolute col-md-2">积分</span>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">可提现占积分比：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1 online-times-score" type="text"
                               name="onlineNumCanWithdrawalRate">
                        <span class="form-absolute col-md-2">%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="mb-1 col-md-12 ml-12">
                      <div class="radio">
                        <label>
                          <input type="radio" name="onlineFullType" id="online-money" value="2">按有效投保金额结算(线上)
                        </label>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">积分占交强险比例：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1 online-money-percent" type="text"
                               name="onlineSaliPointRate" disabled>
                        <span class="form-absolute col-md-2">%</span>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">积分占商业险比例：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1 online-money-percent" type="text"
                               name="onlineCommercialPointRate" disabled>
                        <span class="form-absolute col-md-2">%</span>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">可提现占积分比：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1 online-money-percent" type="text"
                               name="onlineNumCanWithdrawalRate" disabled>
                        <span class="form-absolute col-md-2">%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group clearfix mb-1 col-md-12 do-border-bottom">
                  <div>
                    <div class="mb-1 col-md-12 ml-12">
                      <div class="radio">
                        <label>
                          <input type="radio" name="offlineFullType" id="offline-times" value="1" checked>按有效投保次数结算(线下)
                        </label>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">每次有效投保奖励：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1 offline-times-score" type="text"
                               name="offlinePerInvestPoint">
                        <span class="form-absolute col-md-2">积分</span>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">可提现占积分比：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1  offline-times-score" type="text"
                               name="offlineAmountCanWithdrawalRate" >
                        <span class="form-absolute col-md-2">%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="mb-1 col-md-12 ml-12">
                      <div class="radio">
                        <label>
                          <input type="radio" name="offlineFullType" id="offline-money" value="2" >按有效投保金额结算(线下)
                        </label>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">积分占交强险比例：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1 offline-money-percent" type="text"
                               name="offlineSaliPointRate" disabled>
                        <span class="form-absolute col-md-2">%</span>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">积分占商业险比例：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1  offline-money-percent" type="text"
                               name="offlineCommercialPointRate" disabled>
                        <span class="form-absolute col-md-2">%</span>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">可提现占积分比：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1  offline-money-percent" type="text"
                               name="offlineAmountCanWithdrawalRate" disabled>
                        <span class="form-absolute col-md-2">%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group text-center pt-0-5 mb-3">
                  <button class="btn btn-inverse w-10-5 mt-2" type="submit">确认并提交</button>
                </div>
              </form>
            </div>
          </div>
          <div role="tabpanel" class="tab-pane" id="tab-base-style-2">
            <div class="box">
              <h1 class="text-center do-border-bottom pb-2-5">奖励绩效机制</h1>
              <form class="installment-rule-form" >
                <input type="hidden" name="areaId">
                <div class="form-group clearfix mb-1 col-md-12 do-border-bottom">
                  <div>
                    <div class="mb-1 col-md-12 ml-12">
                      <div class="radio">
                        <label>
                          <input type="radio" name="offlineInstallmentType" id="part-offline-times" value="1" checked>按有效投保次数结算(线下)
                        </label>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">每次有效投保奖励：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1 part-offline-times-score" type="text" name="offlinePerInvestPoint">
                        <span class="form-absolute col-md-2">积分</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="mb-1 col-md-12 ml-12">
                      <div class="radio">
                        <label>
                          <input type="radio" name="offlineInstallmentType" id="part-offline-money" value="2" >按有效投保金额结算(线下)
                        </label>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">积分占交强险比例：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1 part-offline-money-percent" type="text" name="offlineSaliPointRate"
                               disabled>
                        <span class="form-absolute col-md-2">%</span>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">积分占商业险比例：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1  part-offline-money-percent" type="text" name="offlineCommercialPointRate"
                               disabled>
                        <span class="form-absolute col-md-2">%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group text-center pt-0-5 mb-3">
                  <button class="btn btn-inverse w-10-5 mt-2" type="submit">确认并提交</button>
                </div>
              </form>
            </div>
          </div>
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
      this.ruleTypeChange();
    },
    updated: function () {
    },
    destroyed: function () {
    },
    methods: {
      submitForm: function () {
        let self = this;
        $.each($('.full-rule-form'), function (i, obj) {
          $(obj).validate({
            rules: {},
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.market.investPointRule.saveFull.url,
                data: commonApp.tools.getFromData($(form)),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
                    if (res.code === 200) {
//                      self.$router.push('/market/investPointRule/list');
                    }
                  });
                }
              });
            }
          });
        })
        $.each($('.installment-rule-form'), function (i, obj) {
          $(obj).validate({
            rules: {},
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.market.investPointRule.saveInstallment.url,
                data: $(form).serialize(),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
                    if (res.code === 200) {
//                      self.$router.push('/market/investPointRule/list');
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
        $('#areaId').on('select2:select', function (e) {
            let selectValue = e.params.data.id;
            $('input[name=areaId]').val(selectValue);
        });
      },

      // 切换规则样式修改
      ruleTypeChange: function () {
        $("#online-times").click(function(){
          if($("#online-times:checked")){
            $("input.online-times-score").removeAttr("disabled");
            $("input.online-money-percent").attr("disabled",true);
          }
        });
        $("#online-money").click(function(){
          if($("#online-money:checked")){
            $("input.online-money-percent").removeAttr("disabled");
            $("input.online-times-score").attr("disabled",true);
          }
        });
        $("#offline-times").click(function(){
          if($("#offline-times:checked")){
            $("input.offline-times-score").removeAttr("disabled");
            $("input.offline-money-percent").attr("disabled",true);
          }
        });
        $("#offline-money").click(function(){
          if($("#offline-money:checked")){
            $("input.offline-money-percent").removeAttr("disabled");
            $("input.offline-times-score").attr("disabled",true);
          }
        });
        $("#part-offline-times").click(function(){
          if($("#part-offline-times:checked")){
            $("input.part-offline-times-score").removeAttr("disabled");
            $("input.part-offline-money-percent").attr("disabled",true);
          }
        });
        $("#part-offline-money").click(function(){
          if($("#part-offline-money:checked")){
            $("input.part-offline-money-percent").removeAttr("disabled");
            $("input.part-offline-times-score").attr("disabled",true);
          }
        });

        $("input[type = 'text']").on("keyup",function(){
          this.value=this.value.replace(/[^0-9-]+/,'');
        });
      }
    },
    watch: {}
  }
</script>
