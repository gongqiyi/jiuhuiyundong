<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container-fluid">
    <div class="page-header mb-0 mt-0">
      <div class="pull-left">
        <h4>城市地区管理</h4>
        <breadcrumb v-bind:items="[{text: '内容管理', link: '/content'},{text: '城市地区管理', active: true}]"/>
      </div>
    </div>
    <div class="panel panel-white">
      <div class="panel-body">
        <form class="form-inline dk-search-list-bar area-form">
          <div class="form-group">
            <label for="province">省份</label>
            <input type="text" class="form-control" id="province" name="province">
          </div>
          <div class="form-group">
            <label for="area">城市</label>
            <input type="text" class="form-control" id="area" name="city">
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-default" v-on:click.prevent="search()">搜索</button>
          </div>
          <div class="form-group">
            <router-link to="/content/area/create" class="btn btn-default btn-info">添加</router-link>
          </div>
        </form>
        <table id="js-datatable_example" class="table table-bordered table-middle table-hover mt-1-5">
          <thead>
          <tr>
            <th class="text-center" width="30">
              序号
            </th>
            <th>省份</th>
            <th>城市</th>
            <th>创建时间</th>
            <th width="180">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in pageList.list">
            <td align="center">
              {{item.id}}
            </td>
            <td>{{item.province}}</td>
            <td>{{item.city}}</td>
            <td>{{item.createTime | formatDate}}</td>
            <td>
              <a v-on:click.prevent="deleteArea(item.id)" class="btn btn-sm btn-primary del-con"
                 href="#">删除</a>
              <!--<router-link class="btn btn-sm btn-warning" v-bind:to="'/content/area/edit/' + item.id">编辑</router-link>-->
              <!--<a class="btn btn-sm btn-primary" href="#">↑</a>-->
              <!--<a class="btn btn-sm btn-warning" href="#">↓</a>-->
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
      pagination: pagination,
      breadcrumb: breadcrumb,
    },
    created: function () {
      this.getAreaList();
    },
    mounted: function () {

    },
    methods: {
      getAreaList: function (data) {
        let self = this;
        self.ajax({
          url: api.content.venues.list.url,
          data: data,
          success: function (res) {
            self.pageList = res.areaList;
            self.currentIndex = res.areaList.pageIndex;
          }
        });
      },
      deleteArea: function (id) {
        let self = this;
        layer.confirm("确定删除该地区吗？", function () {
          self.ajax({
            type: 'POST',
            url: api.content.area.delete.url(id),
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
      search: function (data) {
        if (data == null) {
          data = {};
        }
        let formData = commonApp.tools.getFromData($('.area-form'));
        _.assign(data, formData);
//        console.log(data);
        this.getAreaList(data);
      }
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
