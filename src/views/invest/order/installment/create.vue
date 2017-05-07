<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>分期投保管理</h4>
        <breadcrumb
                v-bind:items="[{text: '投保管理'},{text:'分期投保管理'},{text:'线下购买',active:true}]"/>
      </div>
      <div class="pull-right">
        <router-link class="btn btn-primary mt-1-5 w-10-5" to="/invest/order/installment/list">返回</router-link>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <h4>线下购买</h4>
        <hr>
        <form class="form-horizontal mt-2 create-order-form" method="post" novalidate="novalidate">
          <div class="form-group ">
            <label for="holderId" class="control-label col-lg-2">投保人</label>
            <div class="col-lg-10">
              <select id="holderId" name="holderId" class="form-control">
              </select>
            </div>
          </div>
          <div class="form-group ">
            <label for="vehicleNumber" class="control-label col-lg-2">车牌号</label>
            <div class="col-lg-10">
              <input type="hidden" id="vehicleLicenseImage" name="vehicleLicenseImage">
              <input class="form-control" id="vehicleNumber" name="vehicleNumber" type="text" required=""
                     aria-required="true" readonly="readonly">
              <a class="btn btn-default" v-on:click.prevent="showVehicleList()">选择</a>
            </div>
          </div>
          <div class="form-group ">
            <label for="productId" class="control-label col-lg-2">投保产品</label>
            <div class="col-lg-10">
              <select id="productId" name="productId" class="form-control">
              </select>
            </div>
          </div>
          <div class="form-group ">
            <label for="insuranceType" class="control-label col-lg-2">所保险种</label>
            <div class="col-lg-10">
              <select id="insuranceType" name="insuranceType" class="form-control">
                <option value="1">交强险</option>
                <option value="2">商业险</option>
              </select>
            </div>
          </div>
          <div class="form-group ">
            <label for="totalAmount" class="control-label col-lg-2">保险金额</label>
            <div class="col-lg-10">
              <input class="form-control" id="totalAmount" name="totalAmount" type="text" required=""
                     aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="totalTerm" class="control-label col-lg-2">分期期数</label>
            <div class="col-lg-10">
              <input class="form-control" id="totalTerm" name="totalTerm" type="text" required=""
                     aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="rate" class="control-label col-lg-2">计算首期比率变量(%)</label>
            <div class="col-lg-10">
              <input class="form-control" id="rate" name="rate" type="text" required=""
                     aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label for="startTime" class="control-label col-lg-2">投保开始时间</label>
            <div class="col-lg-10">
              <input class="form-control" id="startTime" name="startTime" type="text" required=""
                     aria-required="true" onclick="laydate({istime: false, format: 'YYYY-MM-DD'})">
            </div>
          </div>
          <div class="form-group ">
            <label for="endTime" class="control-label col-lg-2">投保结束时间</label>
            <div class="col-lg-10">
              <input class="form-control" id="endTime" name="endTime" type="text" required=""
                     aria-required="true" onclick="laydate({istime: false, format: 'YYYY-MM-DD'})">
            </div>
          </div>
          <div class="form-group ">
            <label for="policyNumber" class="control-label col-lg-2">保单号</label>
            <div class="col-lg-10">
              <input class="form-control" id="policyNumber" name="policyNumber" type="text" required=""
                     aria-required="true">
            </div>
          </div>
          <div class="form-group ">
            <label class="control-label col-md-2">保单照片</label>
            <div class="col-md-8">
              <div class="list-img list-img-multiple clearfix" id="upload">
                <input class="upload_input" name="receiptsImage" type="hidden">
                <ul class="upload_list"></ul>
                <a class="upload upload_btn" href="javascript:;"><span class="ion ion-plus"></span></a>
              </div>
            </div>
          </div>
          <div class="form-group ">
            <label for="storeId" class="control-label col-lg-2">线下门店</label>
            <div class="col-lg-10">
              <select id="storeId" name="storeId" class="form-control">
              </select>
            </div>
          </div>
          <div class="form-group ">
            <label for="customerFrom" class="control-label col-lg-2">客户来源</label>
            <div class="col-lg-10">
              <input class="form-control" id="customerFrom" name="customerFrom" type="text" required="">
            </div>
          </div>
          <div class="form-group ">
            <label for="insurantRealName" class="control-label col-lg-2">被保险人</label>
            <div class="col-lg-10">
              <input class="form-control" id="insurantRealName" name="insurantRealName" type="text" required=""
              >
            </div>
          </div>
          <div class="form-group ">
            <label for="insurantMobile" class="control-label col-lg-2">被保险人手机号</label>
            <div class="col-lg-10">
              <input class="form-control" id="insurantMobile" name="insurantMobile" type="text" required=""
              >
            </div>
          </div>
          <div class="form-group ">
            <label for="insurantTel" class="control-label col-lg-2">被保人固定电话</label>
            <div class="col-lg-10">
              <input class="form-control" id="insurantTel" name="insurantTel" type="text" required=""
              >
            </div>
          </div>
          <div class="form-group ">
            <label for="insurantIdNumber" class="control-label col-lg-2">被保险人证件号</label>
            <div class="col-lg-10">
              <input class="form-control" id="insurantIdNumber" name="insurantIdNumber" type="text" required=""
              >
            </div>
          </div>
          <div class="form-group ">
            <label for="vehicleType" class="control-label col-lg-2">车辆种类</label>
            <div class="col-lg-10">
              <input class="form-control" id="vehicleType" name="vehicleType" type="text" required=""
              >
            </div>
          </div>
          <div class="form-group ">
            <label for="vehicleEngineNumber" class="control-label col-lg-2">发动机号</label>
            <div class="col-lg-10">
              <input class="form-control" id="vehicleEngineNumber" name="vehicleEngineNumber" type="text" required=""
              >
            </div>
          </div>
          <div class="form-group ">
            <label for="vehicleChassisNumber" class="control-label col-lg-2">车架号</label>
            <div class="col-lg-10">
              <input class="form-control" id="vehicleChassisNumber" name="vehicleChassisNumber" type="text" required=""
              >
            </div>
          </div>
          <div class="form-group ">
            <label for="vehicleBrandNumber" class="control-label col-lg-2">车辆品牌型号</label>
            <div class="col-lg-10">
              <input class="form-control" id="vehicleBrandNumber" name="vehicleBrandNumber" type="text" required=""
              >
            </div>
          </div>
          <div class="form-group ">
            <label for="vehicleRegisterTime" class="control-label col-lg-2"> 初次登记日期</label>
            <div class="col-lg-10">
              <input class="form-control" id="vehicleRegisterTime" name="vehicleRegisterTime" type="text" required=""
              >
            </div>
          </div>
          <div class="form-group ">
            <label for="vehicleNewPrice" class="control-label col-lg-2"> 新车购置价</label>
            <div class="col-lg-10">
              <input class="form-control" id="vehicleNewPrice" name="vehicleNewPrice" type="text" required=""
              >
            </div>
          </div>
          <div class="form-group ">
            <label for="vehicleActualPrice" class="control-label col-lg-2">车辆实际价值</label>
            <div class="col-lg-10">
              <input class="form-control" id="vehicleActualPrice" name="vehicleActualPrice" type="text" required=""
              >
            </div>
          </div>
          <div class="form-group ">
            <label for="vehicleDriverGender" class="control-label col-lg-2">主驾驶人性别</label>
            <div class="col-lg-10">
              <input class="form-control" id="vehicleDriverGender" name="vehicleDriverGender" type="text" required=""
              >
            </div>
          </div>
          <div class="form-group ">
            <label for="vehiclePassengerNumber" class="control-label col-lg-2">核定载客人数</label>
            <div class="col-lg-10">
              <input class="form-control" id="vehiclePassengerNumber" name="vehiclePassengerNumber" type="text"
                     required=""
              >
            </div>
          </div>
          <div class="form-group ">
            <label for="vehicleLoadingQuality" class="control-label col-lg-2">核定载质量</label>
            <div class="col-lg-10">
              <input class="form-control" id="vehicleLoadingQuality" name="vehicleLoadingQuality" type="text"
                     required="">
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

    <!--车辆信息列表-->
    <template>
      <div class="panel-body" id="vehicle" style="display: none">
        <table class="table table-bordered table-hover mt-1">
          <thead>
          <tr>
            <th>车牌号</th>
            <th>行驶证照片</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in vehicleList">
            <td>{{item.vehicleNumber}}</td>
            <td><img style="max-height: 200px" :src="item.vehicleLicenceImage | parseImageSrc" alt=""></td>
            <td><a href="javascript:void(0);" v-on:click.prevent="selectVehicle(item.code)">选中</a></td>
          </tr>
          </tbody>
        </table>
      </div>
    </template>
    <!--车辆信息列表-->

  </div>
</template>

<script>
  import 'jquery-validation'
  import '../../../../../static/js/plugins/select2/js/select2.min'
  import '../../../../../static/js/plugins/select2/js/i18n/zh-CN'
  import '../../../../../static/js/plugins/select2/css/select2.min.css'
  import '../../../../../static/js/plugins/laydate/laydate'
  import '../../../../../static/js/plugins/ueditor/ueditor.config'
  import '../../../../../static/js/plugins/ueditor/ueditor.all.min'
  import '../../../../../static/js/plugins/ueditor/lang/zh-cn/zh-cn'
  import '../../../../../static/js/plugins/uploadUeditor'

  import breadcrumb from "@/components/bootstrap/breadcrumb"

  export default{
    data: function () {
      return {
        vehicleList: [],
      }
    },
    components: {
      breadcrumb: breadcrumb,
    },
    created: function () {
    },
    mounted: function () {
      this.upload();
      this.submitForm();
      this.initHolderSelect2();
      this.initProductSelect2();
      this.initStoreSelect2();
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
        $.each($('.create-order-form'), function (i, obj) {
          $(obj).validate({
            rules: {
              holderId: {
                required: true
              },
              vehicleNumber: {
                required: true
              },
              startTime: {
                required: true
              },
              endTime: {
                required: true
              },
              insuranceType: {
                required: true
              },
              totalAmount: {
                required: true
              },
              totalTerm: {
                required: true
              },
              rate: {
                required: true
              },
              receiptsImage: {
                required: true
              },
              policyNumber: {
                required: true
              },
              productId: {
                required: true
              },
            },
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.invest.order.installment.create.url,
                data: commonApp.tools.getFromData($(form)),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
                    if (res.code === 200) {
                      self.$router.push('/invest/order/installment/list');
                    }
                  });
                }
              });
            }
          });
        })
      },
      // 图片上传
      upload: function () {
        uploadUeditor.singleImage($('#upload'));
      },
      // 初始化选择用户
      initHolderSelect2: function () {
        let self = this;
        $('#holderId').select2({
          language: 'zh-CN',
          ajax: {
            data: function (params) {
              return {
                mobile: params.term,
                pageIndex: params.page,
              };
            },
            url: api.holder.list.url,
            dataType: 'json',
            delay: 250,
            processResults: function (data, params) {
              let holderList = data.holderPageList;
              return {
                results: holderList.list,
                pagination: {
                  more: holderList.hasNextPage,
                },
              };
            },
            cache: true,
          },
          escapeMarkup: function (markup) {
            return markup;
          },
          minimumInputLength: 3,
          templateResult: formatRepo,
          templateSelection: formatRepoSelection,
        });
        function formatRepo(repo) {
          if (repo.loading) return repo.text;
          return repo.realName + ' (' + repo.mobile + ')';
        }

        function formatRepoSelection(repo) {
          self.vehicleList = JSON.parse(repo.carInfo);
          if (repo.realName == null) {
            return repo.mobile;
          }
          else {
            return repo.realName + ' (' + repo.mobile + ')';
          }
        }
      },
      // 初始化选择产品
      initProductSelect2: function () {
        let self = this;
        $('#productId').select2({
          language: 'zh-CN',
          ajax: {
            data: function (params) {
              return {
                name: params.term,
                pageIndex: params.page,
              };
            },
            url: api.invest.product.installment.list.url,
            dataType: 'json',
            delay: 250,
            processResults: function (data, params) {
              let productList = data.investProductInstallmentPageList;
              return {
                results: productList.list,
                pagination: {
                  more: productList.hasNextPage,
                },
              };
            },
            cache: true,
          },
          escapeMarkup: function (markup) {
            return markup;
          },
          templateResult: formatRepo,
          templateSelection: formatRepoSelection,
        });
        function formatRepo(repo) {
          if (repo.loading) return repo.text;
          return repo.name + ' - ' + repo.companyName;
        }

        function formatRepoSelection(repo) {
          return repo.name + ' - ' + repo.companyName;
        }
      },

      // 初始化选择门店
      initStoreSelect2: function () {
        let self = this;
        $('#storeId').select2({
          language: 'zh-CN',
          ajax: {
            data: function (params) {
              return {
                name: params.term,
                pageIndex: params.page,
              };
            },
            url: api.invest.store.list.url,
            dataType: 'json',
            delay: 250,
            processResults: function (data, params) {
              let storeList = data.investStoreDomainPageList;
              return {
                results: storeList.list,
                pagination: {
                  more: storeList.hasNextPage,
                },
              };
            },
            cache: true,
          },
          escapeMarkup: function (markup) {
            return markup;
          },
          templateResult: formatRepo,
          templateSelection: formatRepoSelection,
        });
        function formatRepo(repo) {
          if (repo.loading) return repo.text;
          return repo.name;
        }

        function formatRepoSelection(repo) {
          return repo.name;
        }
      },

      // 展示用户车辆信息
      showVehicleList: function () {
        let self = this;
        console.log(self.vehicleList);
        layer.open({
          type: 1,
          area: ['800px', '600px'],
          title: false,
          shade: 0,
          content: $('#vehicle'),
          success: function (layero, index) {
            $(layero).show();
          }
        });
      },
      // 选择车辆信息
      selectVehicle: function (code) {
        let self = this;
        if (code != null) {
          let currentVehicle = _.find(self.vehicleList, function (vehicle) {
            return vehicle.code == code;
          });
          $('#vehicleNumber').val(currentVehicle.vehicleNumber);
          $('#vehicleLicenseImage').val(currentVehicle.vehicleLicenseImage);
          layer.closeAll();
        }
      },
    },
    watch: {}
  }
</script>
