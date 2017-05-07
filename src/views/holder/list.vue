<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>会员管理</h4>
        <breadcrumb
                v-bind:items="[{text: '用户管理'},{text:'会员管理',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <div role="tabpanel" class="tab-pane active" id="tab-base-style-1">
          <form class="form-inline dk-search-list-bar holder-form">
            <div class="form-group mt-1-5">
              <label for="realName">姓名</label>
              <input type="text" class="form-control" id="realName" name="realName">
            </div>
            <div class="form-group mt-1-5">
              <label for="idNumber">身份证号</label>
              <input type="text" class="form-control" id="idNumber" name="idNumber">
            </div>
            <div class="form-group mt-1-5">
              <label>所属区域</label>
              <select class="form-control" id="areaId" name="areaId">
              </select>
            </div>
            <div class="form-group mt-1-5">
              <label>注册时间</label>
              <input type="text" class="form-control" id="createTimeStart" name="createTimeStart"
                     onclick="laydate({istime: false, format: 'YYYY-MM-DD'})">
              -
              <input type="text" class="form-control" id="createTimeEnd" name="createTimeEnd"
                     onclick="laydate({istime: false, format: 'YYYY-MM-DD'})">
            </div>
            <div class="form-group mt-1-5">
              <button type="submit" class="btn btn-default" v-on:click.prevent="search()">搜索</button>
            </div>
            <div class="form-group mt-1-5">
              <router-link to="/holder/create" class="btn btn-default btn-info ueser-more">添加用户</router-link>
            </div>
            <div class="form-group mt-1-5">
              <a class="btn btn-default btn-info">数据导出</a>
            </div>
          </form>
          <div class="table-overflow">
            <table class="table table-bordered table-middle table-hover mt-2-5 mb-1">
              <thead>
              <tr>
                <th class="text-center" width="30">
                  序号
                </th>
                <th>用户名</th>
                <th>姓名</th>
                <th>身份证号</th>
                <th>手机号</th>
                <th>车牌号和行驶证</th>
                <th>所在区域</th>
                <th>注册时间</th>
                <th>银行卡</th>
                <th>目前积分总数</th>
                <th>可兑换积分</th>
                <th>可提现积分</th>
                <th>已兑换积分</th>
                <th>已提现积分</th>
                <th>邀请码</th>
                <th>状态</th>
                <th width="180">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in pageList.list">
                <td align="center">
                  {{ item.id }}
                </td>
                <td>{{ item.userName }}</td>
                <td>{{ item.realName }}</td>
                <td>{{ item.idNumber }}</td>
                <td>{{ item.mobile }}</td>
                <td><a href="#" v-on:click.prevent="showVehicleList(item.id)">查看</a></td>
                <td>{{ item.areaName }}</td>
                <td>{{ item.createTime | formatDate }}</td>
                <td><a href="#" v-on:click.prevent="showBankList(item.id)">查看</a></td>
                <td>{{ item.exchangePoint + item.withdrawalPoint }}</td>
                <td>{{ item.exchangePoint }}</td>
                <td>{{ item.withdrawalPoint }}</td>
                <td>{{ item.hasExchangePoint }}</td>
                <td>{{ item.hasWithdrawalPoint }}</td>
                <td>{{ item.inviteCode }}</td>
                <td>{{ item.locked ? '已锁定' : '正常'}}</td>
                <td>
                  <router-link class="btn btn-sm btn-primary" v-bind:to="'/holder/update/' + item.id">修改</router-link>
                  <template v-if="item.locked">
                    <a class="btn btn-sm btn-primary del-con" href="#"
                       v-on:click.prevent="unLockHolder(item.id)">解锁</a>
                  </template>
                  <template v-else>
                    <a class="btn btn-sm btn-primary del-con" href="#" v-on:click.prevent="lockHolder(item.id)">锁定</a>
                  </template>
                  <!--<a class="btn btn-sm btn-primary" href="#">站内信</a>-->
                  <!--<a class="btn btn-sm btn-primary" href="#">短信</a>-->
                  <!--<a class="btn btn-sm btn-warning" href="#">重置密码</a>-->
                </td>
              </tr>
              </tbody>
            </table>
            <pagination size="md"
                        :total-rows="pageList.totalRecord"
                        :per-page="pageList.pageSize"
                        v-model="currentIndex"
            >
            </pagination>
          </div>
        </div>
      </div>
    </div>

    <!--车辆信息列表-->
    <template>
      <div class="panel-body" id="vehicle" style="display: none">
        <div class="form-inline form-group clearfix">
          <a v-on:click.prevent="showSaveVehicle()" class="btn btn-primary pull-right">添加</a>
        </div>
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
            <td ><img style="max-height: 200px" :src="item.vehicleLicenceImage | parseImageSrc" alt=""></td>
            <td><a v-on:click.prevent="showSaveVehicle(item.code)">编辑</a></td>
          </tr>
          </tbody>
        </table>
      </div>
    </template>
    <!--车辆信息列表-->

    <!--银行卡列表-->
    <template>
      <div id="bank" class="panel-body" style="display: none;">
        <table class="table table-bordered table-hover mt-1">
          <thead>
          <tr>
            <th>卡号</th>
            <th>银行</th>
            <th>城市</th>
            <th>开户行</th>
            <th>添加时间</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in bankList">
            <td>{{item.bankNumber}}</td>
            <td>{{item.bankType | enumToDescription(bankTypeList)}}</td>
            <td>{{item.city}}</td>
            <td>{{item.address}}</td>
            <td>{{item.createTime | formatDate}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </template>
    <!--银行卡列表-->

    <!--保存车辆信息-->
    <template>
      <div id="saveVehicle" class="panel-body" style="display: none">
        <form class="form-horizontal mt-2 save-vehicle-form" method="post" novalidate="novalidate">
          <input type="hidden" name="code" v-model="currentVehicle.code"/>
          <div class="form-group ">
            <label for="vehicleNumber" class="control-label col-lg-2">车牌号</label>
            <div class="col-lg-10">
              <input class="form-control" id="vehicleNumber" name="vehicleNumber" type="text" required=""
                     aria-required="true"
                     v-model="currentVehicle.vehicleNumber">
            </div>
          </div>
          <div class="form-group ">
            <label class="control-label col-md-2">行驶证</label>
            <div class="col-md-8">
              <div class="list-img list-img-multiple clearfix upload">
                <input class="upload_input" name="vehicleLicenceImage" type="hidden"
                       v-model="currentVehicle.vehicleLicenceImage">
                <ul class="upload_list"></ul>
                <a class="upload upload_btn" href="javascript:;"><span class="ion ion-plus"></span></a>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-offset-2 col-lg-10">
              <button class="btn btn-inverse" type="submit">保存</button>
            </div>
          </div>
        </form>
      </div>
    </template>
    <!--保存车辆信息-->

  </div>
</template>


<script>
  import 'jquery-validation'
  import '../../../static/js/plugins/select2/js/select2.min'
  import '../../../static/js/plugins/select2/js/i18n/zh-CN'
  import '../../../static/js/plugins/select2/css/select2.min.css'
  import '../../../static/js/plugins/laydate/laydate'
  import '../../../static/js/plugins/uploadUeditor'
  import pagination from "@/components/bootstrap/pagination"
  import breadcrumb from "@/components/bootstrap/breadcrumb"

  export default{
    data: function () {
      return {
        pageList: {
          pageSize: 1,
          pageIndex: 1,
          totalRecord: 0,
          totalPage: 1,
          list: [],
        },
        currentIndex: 1,
        currentVehicleHolderId:0,
        vehicleList: [],
        currentVehicle: {},
        bankList: [],
        bankTypeList: [],
      }
    },
    components: {
      pagination: pagination,
      breadcrumb: breadcrumb,
    },
    created: function () {
      this.getHolderList();
      this.getBankTypeList();
    },
    mounted: function () {
      this.initAreaSelect2();
      this.upload();
      this.saveVehicleForm();
    },
    updated: function () {
      this.upload();
    },
    methods: {
      // 获取用户列表
      getHolderList: function (data) {
        let self = this;
        self.ajax({
          url: api.holder.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.holderPageList;
            self.currentIndex = res.holderPageList.pageIndex;
          }
        });
      },
      // 锁定用户
      lockHolder: function (id) {
        let self = this;
        layer.confirm("确定锁定该用户吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.holder.lock.url(id),
            success: function (res) {
              layer.msg(res.message, {time: 1000}, function () {
                if (res.code === 200) {
                  self.search();
                }
              });
            }
          });
        });
      },
      // 解锁用户
      unLockHolder: function (id) {
        let self = this;
        layer.confirm("确定解锁该用户吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.holder.unLock.url(id),
            success: function (res) {
              layer.msg(res.message, {time: 1000}, function () {
                if (res.code === 200) {
                  self.search();
                }
              });
            }
          });
        });
      },
      // 筛选
      search: function (data) {
        if (data == null) {
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.holder-form'));
        _.assign(data, formData);
        this.getHolderList(data);
      },

      // 初始化地区选择
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
      // 获取银行卡类型列表
      getBankTypeList: function () {
        let self = this;
        self.ajax({
          url: api.holder.bank.type.url,
          success: function (res) {
            self.bankTypeList = res.bankTypeList;
          }
        });
      },
      // 获取用户银行卡列表
      getBankList: function (id) {
        let self = this;
        self.ajax({
          url: api.holder.bank.list.url(id),
          success: function (res) {
            self.bankList = res.bankList;
          }
        });
      },
      // 展示用户银行卡列表
      showBankList: function (id) {
        let self = this;
        layer.open({
          type: 1,
          area: ['800px', '500px'],
          title: false,
          shade: 0.01,
          shadeClose: true,
          content: $('#bank'),
          success: function (layero, index) {
            self.getBankList(id);
            $(layero).show();
          }
        });
      },
      // 获取车辆信息
      getVehicleList: function (id) {
        let self = this;
        let vehicleInfo = _.result(_.find(self.pageList.list, function (holder) {
          return holder.id == id;
        }), 'carInfo');
        self.currentVehicleHolderId = id;
        self.vehicleList = JSON.parse(vehicleInfo);
      },
      //展示用户车辆信息
      showVehicleList: function (id) {
        let self = this;
        layer.open({
          type: 1,
          area: ['800px', '600px'],
          title: false,
          shade: 0,
          content: $('#vehicle'),
          success: function (layero, index) {
            self.getVehicleList(id);
            $(layero).show();
          }
        });
      },
      // 获取用户车辆信息中某个车辆
      getVehicle: function (code) {
        let self = this;
        if (code != null) {
          let currentVehicle = _.find(self.vehicleList, function (vehicle) {
            return vehicle.code == code;
          });
          self.currentVehicle = currentVehicle;
        }
        else{
          self.currentVehicle = {};
        }
      },
      // 展示修改车辆信息弹窗
      showSaveVehicle: function (code) {
        let self = this;
        layer.open({
          type: 1,
          area: ['800px', '500px'],
          title: false,
          shade: 0,
          content: $('#saveVehicle'),
          success: function (layero, index) {
            self.getVehicle(code);
            $(layero).show();
          }
        });
      },
      // 上传图片初始化
      upload: function () {
        uploadUeditor.singleImage($('.upload'));
      },
      // 保存车辆信息表单
      saveVehicleForm: function () {
        let self = this;
        $.each($('.save-vehicle-form'), function (i, obj) {
          $(obj).validate({
            submitHandler: function (form) {
              self.ajax({
                type: 'POST',
                url: api.holder.vehicle.save.url(self.currentVehicleHolderId),
                data: commonApp.tools.getFromData($(form)),
                success: function (res) {
                  layer.msg(res.message, {time: 1000}, function () {
                    if (res.code === 200) {
                      layer.closeAll();
                      self.search();
                    }
                  });
                }
              });
            }
          });
        })
      },
    },
    watch: {
      currentIndex: function (newIndex) {
        let self = this;
        let query = {
          pageIndex: newIndex
        };
        self.search(query);
      }
    }
  }
</script>


