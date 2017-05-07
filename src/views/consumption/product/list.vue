<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>消费券管理</h4>
        <breadcrumb
                v-bind:items="[{text: '消费管理'},{text:'消费券管理',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar product-form">
          <div class="form-group">
            <label for="name">产品名称</label>
            <input type="text" class="form-control" id="name" name="name">
          </div>
          <div class="form-group">
            <label for="remark">备注</label>
            <input type="text" class="form-control" id="remark" name="remark">
          </div>
          <div class="form-group">
            <label for="enabled">是否上架</label>
            <select id="enabled" name="enabled" class="form-control">
              <option value="">--请选择--</option>
              <option value="true">是</option>
              <option value="false">否</option>
            </select>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-default" v-on:click.prevent="search()">搜索</button>
          </div>
          <div class="form-group">
            <router-link to="/consumption/product/create" class="btn btn-default btn-info">添加</router-link>
          </div>
        </form>
        <table id="js-datatable_example" class="table table-bordered table-middle table-hover mt-1-5">
          <thead>
          <tr>
            <th class="text-center" width="30">
              序号
            </th>
            <th>产品名称</th>
            <th>积分点数</th>
            <th>起始时间</th>
            <th>过期时间</th>
            <th>说明</th>
            <th>备注</th>
            <th>已兑换次数</th>
            <th>已消费次数</th>
            <th>支持商户</th>
            <th>创建时间</th>
            <th>是否上架</th>
            <th class="text-center" width="230">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in pageList.list">
            <td align="center">
              {{item.id}}
            </td>
            <td>{{item.name}}</td>
            <td>{{item.point }}</td>
            <td>{{item.validTimeStart | formatDate}}</td>
            <td>{{item.validTimeEnd | formatDate}}</td>
            <td>{{item.description }}</td>
            <td>{{item.remark }}</td>
            <td>{{item.exchangeCount }}</td>
            <td>{{item.consumptionCount }}</td>
            <td><a href="javascript:void(0);" v-on:click.prevent="showMerchantList(item.id)">查看</a></td>
            <td>{{item.createTime | formatDate}}</td>
            <td>{{item.enabled ? '是' : '否'}}</td>
            <td align="center">
              <template v-if="item.enabled">
                <a v-on:click.prevent="close(item.id)" class="btn btn-sm btn-info" href="#">下架</a>
              </template>
              <template v-else>
                <a v-on:click.prevent="open(item.id)" class="btn btn-sm btn-info" href="#">上架</a>
              </template>
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

    <template>
      <div class="panel panel-white" id="merchantList" style="display: none">
        <div class="panel-body">
          <table id="js-datatable_example_merchant" class="table table-bordered table-middle table-hover mt-1-5">
            <thead>
            <tr>
              <th>名称</th>
              <th>地区</th>
              <th>地址</th>
              <th>电话</th>
              <th>已消费次数</th>
              <th>创建时间</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in currentProduct.relatedMerchantList">
              <td>{{item.name}}</td>
              <td>{{item.areaName }}</td>
              <td>{{item.address }}</td>
              <td>{{item.tel }}</td>
              <td>{{item.consumptionCount}}</td>
              <td>{{item.createTime | formatDate}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
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
        currentProduct:{},
      }
    },
    components: {
      breadcrumb: breadcrumb,
      pagination: pagination,
    },
    created: function () {
      this.getProductList();
    },
    mounted: function () {

    },
    methods: {
      // 产品列表
      getProductList: function (data) {
        let self = this;
        self.ajax({
          url: api.consumption.product.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.productPageList;
            self.currentIndex = res.productPageList.pageIndex;
          }
        });
      },
      // 搜索
      search: function (data) {
        if (data == null) {
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.product-form'));
        _.assign(data, formData);
        this.getProductList(data);
      },
      // 显示支持商户列表
      showMerchantList: function (id) {
        let self = this;
        self.currentProduct = _.find(self.pageList.list, function (product) {
          return product.id == id;
        });
        layer.open({
          type: 1,
          area: ['800px', '400px'],
          title: false,
          shade: 0,
          content: $('#merchantList'),
          success: function (layero, index) {
            $(layero).show();
          }
        });
      },
      // 上架
      open: function (id) {
        let self = this;
        layer.confirm("确定要上架该产品吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.consumption.product.open.url(id),
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
      // 下架
      close: function (id) {
        let self = this;
        layer.confirm("确定要下架该产品吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.consumption.product.close.url(id),
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
