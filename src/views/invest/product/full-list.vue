<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>全额投保产品管理</h4>
        <breadcrumb
                v-bind:items="[{text: '投保管理'},{text:'产品管理'},{text:'全额投保产品管理',active:true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar product-full-form">
          <div class="form-group">
            <label for="name">产品名称</label>
            <input type="text" class="form-control" id="name" name="name">
          </div>
          <div class="form-group">
            <label for="companyName">保险公司名称</label>
            <input type="text" class="form-control" id="companyName" name="companyName">
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
            <router-link to="/invest/product/full/create" class="btn btn-default btn-info">添加</router-link>
          </div>
        </form>
        <table id="js-datatable_example" class="table table-bordered table-middle table-hover mt-1-5">
          <thead>
          <tr>
            <th class="text-center" width="30">
              序号
            </th>
            <th>产品名称</th>
            <th>保险公司名称</th>
            <th>交强险手续费率(%)</th>
            <th>商业险手续费率(%)</th>
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
            <td>{{item.companyName }}</td>
            <td>{{item.saliRate }}</td>
            <td>{{item.commercialRate }}</td>
            <td>{{item.createTime | formatDate}}</td>
            <td>{{item.enabled ? '是' : '否'}}</td>
            <td align="center">
              <template v-if="item.enabled">
                <a v-on:click.prevent="close(item.id)" class="btn btn-sm btn-info" href="#">下架</a>
              </template>
              <template v-else>
                <a v-on:click.prevent="open(item.id)" class="btn btn-sm btn-info" href="#">上架</a>
              </template>
              <router-link class="btn btn-sm btn-primary" v-bind:to="'/invest/product/full/update/' + item.id">编辑
              </router-link>
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
          url: api.invest.product.full.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.investProductFullPageList;
            self.currentIndex = res.investProductFullPageList.pageIndex;
          }
        });
      },
      // 搜索
      search: function (data) {
        if (data == null) {
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.product-full-form'));
        _.assign(data, formData);
        this.getProductList(data);
      },
      // 上架
      open: function (id) {
        let self = this;
        layer.confirm("确定要上架该产品吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.invest.product.full.open.url(id),
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
            url: api.invest.product.full.close.url(id),
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
