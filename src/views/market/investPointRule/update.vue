<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>投保返积分管理</h4>
        <breadcrumb
                v-bind:items="[{text: '推广管理'},{text:'投保返积分管理'},{text:'编辑规则', active: true}]"/>
      </div>
      <div class="pull-right">
        <router-link class="btn btn-primary mt-1-5 w-10-5" to="/market/investPointRule/list">返回</router-link>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <ul class="nav nav-tabs nav-justified" role="tablist">
          <li role="presentation" class="active"><a href="#tab-base-style-1" data-toggle="tab">全额保</a></li>
          <li role="presentation"><a href="#tab-base-style-2" data-toggle="tab">分期保</a></li>
        </ul>
        <div class="tab-content mt-1-5">
          <div role="tabpanel" class="tab-pane active" id="tab-base-style-1">
            <div class="box">
              <h1 class="text-center do-border-bottom pb-2-5">奖励绩效机制</h1>
              <form method="POST" class="full-rule-form">
                <input type="hidden" name="areaId" v-model="rule.areaId">
                <div class="form-group clearfix mb-1 col-md-12 do-border-bottom">
                  <div>
                    <div class="mb-1 col-md-12 ml-12">
                      <div class="radio">
                        <label>
                          <input type="radio" name="onlineFullType" id="online-times" v-bind:value="1"
                                 v-model="rule.onlineFullType">按有效投保次数结算(线上)
                        </label>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">每次有效投保奖励：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1 online-times-score" type="text"
                               v-model="onlineFullRule.perInvestPoint"
                               name="onlinePerInvestPoint">
                        <span class="form-absolute col-md-2">积分</span>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">可提现占积分比：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1 online-times-score" type="text"
                               v-model="onlineFullRule.canWithdrawalRate"
                               name="onlineNumCanWithdrawalRate">
                        <span class="form-absolute col-md-2">%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="mb-1 col-md-12 ml-12">
                      <div class="radio">
                        <label>
                          <input type="radio" name="onlineFullType" id="online-money" v-bind:value="2"
                                 v-model="rule.onlineFullType">按有效投保金额结算(线上)
                        </label>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">积分占交强险比例：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1 online-money-percent" type="text"
                               v-model="onlineFullRule.saliPointRate"
                               name="onlineSaliPointRate">
                        <span class="form-absolute col-md-2">%</span>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">积分占商业险比例：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1 online-money-percent" type="text"
                               v-model="onlineFullRule.commercialPointRate"
                               name="onlineCommercialPointRate">
                        <span class="form-absolute col-md-2">%</span>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">可提现占积分比：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1 online-money-percent" type="text"
                               v-model="onlineFullRule.commercialPointRate"
                               name="onlineNumCanWithdrawalRate">
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
                          <input type="radio" name="offlineFullType" id="offline-times" v-bind:value="1"
                                 v-model="rule.offlineFullType">按有效投保次数结算(线下)
                        </label>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">每次有效投保奖励：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1 offline-times-score" type="text"
                               v-model="offlineFullRule.perInvestPoint"
                               name="offlinePerInvestPoint">
                        <span class="form-absolute col-md-2">积分</span>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">可提现占积分比：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1  offline-times-score" type="text"
                               v-model="offlineFullRule.canWithdrawalRate"
                               name="offlineAmountCanWithdrawalRate">
                        <span class="form-absolute col-md-2">%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="mb-1 col-md-12 ml-12">
                      <div class="radio">
                        <label>
                          <input type="radio" name="offlineFullType" id="offline-money" v-bind:value="2"
                                 v-model="rule.offlineFullType">按有效投保金额结算(线下)
                        </label>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">积分占交强险比例：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1 offline-money-percent" type="text"
                               v-model="offlineFullRule.saliPointRate"
                               name="offlineSaliPointRate">
                        <span class="form-absolute col-md-2">%</span>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">积分占商业险比例：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1  offline-money-percent" type="text"
                               v-model="offlineFullRule.commercialPointRate"
                               name="offlineCommercialPointRate">
                        <span class="form-absolute col-md-2">%</span>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">可提现占积分比：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1  offline-money-percent" type="text"
                               v-model="offlineFullRule.offlineAmountCanWithdrawalRate"
                               name="offlineAmountCanWithdrawalRate">
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
              <form class="installment-rule-form">
                <input type="hidden" name="areaId" v-model="rule.areaId">
                <div class="form-group clearfix mb-1 col-md-12 do-border-bottom">
                  <div>
                    <div class="mb-1 col-md-12 ml-12">
                      <div class="radio">
                        <label>
                          <input type="radio" name="offlineInstallmentType" id="part-offline-times" v-bind:value="1"
                                 v-model="rule.offlineInstallmentType">按有效投保次数结算(线下)
                        </label>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">每次有效投保奖励：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1 part-offline-times-score" type="text"
                               name="offlinePerInvestPoint" v-model="offlineInstallmentRule.perInvestPoint">
                        <span class="form-absolute col-md-2">积分</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="mb-1 col-md-12 ml-12">
                      <div class="radio">
                        <label>
                          <input type="radio" name="offlineInstallmentType" id="part-offline-money" v-bind:value="2"
                                 v-model="rule.offlineInstallmentType">按有效投保金额结算(线下)
                        </label>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">积分占交强险比例：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1 part-offline-money-percent" type="text"
                               name="offlineSaliPointRate" v-model="offlineInstallmentRule.saliPointRate"
                        >
                        <span class="form-absolute col-md-2">%</span>
                      </div>
                    </div>
                    <div class="form-group col-md-12 ml-13 mt-1">
                      <label class="col-md-3 control-label">积分占商业险比例：</label>
                      <div class="col-md-6">
                        <input class="form-control col-md-2 w-10-5 ml--4 mt--1  part-offline-money-percent" type="text"
                               name="offlineCommercialPointRate" v-model="offlineInstallmentRule.commercialPointRate"
                        >
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
  import breadcrumb from "@/components/bootstrap/breadcrumb"

  export default{
    data: function () {
      return {
        rule: {},
        onlineFullRule: {},
        offlineFullRule: {},
        offlineInstallmentRule: {},
      }
    },
    components: {
      breadcrumb: breadcrumb,
    },
    created: function () {
      this.getRule();
    },
    mounted: function () {
      this.submitForm();
      this.ruleTypeChange();
    },
    updated: function () {
    },
    destroyed: function () {
    },
    methods: {
      getRule: function () {
        let self = this;
        self.ajax({
          url: api.market.investPointRule.get.url(self.$route.params.id),
          success: function (res) {
            let rule = res.investPointRule;
            let onlineFullRule = JSON.parse(rule.onlineFullRule) || {};
            let offlineFullRule = JSON.parse(rule.offlineFullRule) || {};
            let offlineInstallmentRule = JSON.parse(rule.offlineInstallmentRule) || {};
            self.rule = rule;
            self.onlineFullRule = onlineFullRule;
            self.offlineFullRule = offlineFullRule;
            self.offlineInstallmentRule = offlineInstallmentRule;
          }
        });
      },
      submitForm: function () {
        let self = this;
        $.each($('.full-rule-form'), function (i, obj) {
          $(obj).validate({
            rules: {},
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.market.investPointRule.saveFull.url,
                data: $(form).serialize(),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
                    if (res.code === 200) {
                      self.$router.push('/market/investPointRule/list');
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
                data: commonApp.tools.getFromData($(form)),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
                    if (res.code === 200) {
                      self.$router.push('/market/investPointRule/list');
                    }
                  });
                }
              });
            }
          });
        })

      },

      // 切换规则样式修改
      ruleTypeChange: function () {
        function online_times() {
          if ($("#online-times:checked")) {
            $("input.online-times-score").removeAttr("disabled");
            $("input.online-money-percent").attr("disabled", true);
          }
        }

        function online_money() {
          if ($("#online-money:checked")) {
            $("input.online-money-percent").removeAttr("disabled");
            $("input.online-times-score").attr("disabled", true);
          }
        }

        function offline_times() {
          if ($("#offline-times:checked")) {
            $("input.offline-times-score").removeAttr("disabled");
            $("input.offline-money-percent").attr("disabled", true);
          }
        }

        function offline_money() {
          if ($("#offline-money:checked")) {
            $("input.offline-money-percent").removeAttr("disabled");
            $("input.offline-times-score").attr("disabled", true);
          }
        }

        function part_offline_times() {
          if ($("#part-offline-times:checked")) {
            $("input.part-offline-times-score").removeAttr("disabled");
            $("input.part-offline-money-percent").attr("disabled", true);
          }
        }

        function part_offline_money() {
          if ($("#part-offline-money:checked")) {
            $("input.part-offline-money-percent").removeAttr("disabled");
            $("input.part-offline-times-score").attr("disabled", true);
          }
        }


        $("#online-times").click(online_times);
        $("#online-money").click(online_money);
        $("#offline-times").click(offline_times);
        $("#offline-money").click(offline_money);
        $("#part-offline-times").click(part_offline_times);
        $("#part-offline-money").click(part_offline_money);

        $("input[type = 'text']").on("keyup", function () {
          this.value = this.value.replace(/[^0-9-]+/, '');
        });
      }
    },
    watch: {}
  }
</script>
