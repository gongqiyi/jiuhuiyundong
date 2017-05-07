(function () {
  var commonApp = function () {

    /**
     * 初始化
     * @private
     */
    var _init = function () {

      // 网页全屏
      _fullScreen($('#js-full-screen'), function (isNormalScreen, $e) {
        $e.html('<span class="ion ion-arrow-' + (isNormalScreen ? 'expand' : 'shrink') + '">');
      });

      // 加载侧导航
      _navNarrow($('#js-toggle-aside-nav'));
      _navCollapse($('#js-aside-collapse'));
    };

    /**
     * 侧导航折叠效果
     * @param $element 根<ul>元素
     * @private
     */
    var _navCollapse = function ($element) {
      $element.children('li').each(function (i, n) {
        var $this = $(n),
            $ul = $this.children('ul'),
            $a = $this.children('a');
        if ($ul.length > 0) {
          var aClass = 'collapsed',
              ulClass = '',
              thisClass = 'panel';
          if ($ul.children('.active').length > 0) {
            aClass = '';
            ulClass = 'collapse in';
            thisClass = 'panel has-children-active';
          }

          $this.attr({'class': thisClass});
          $a.attr({
                'data-toggle': 'collapse',
                'data-parent': '#' + $element[0].id,
                'class': aClass,
                'data-target': '#nav-aside-collapse-' + i,
                'data-index': i
              })
              .append('<span class="ion-chevron-right">');
          $ul.attr({'id': 'nav-aside-collapse-' + i, 'class': ulClass});
        }
      });
    };

    /**
     * 侧导航收起
     * @param $element
     * @private
     */
    var _navNarrow = function ($element) {
      /*if(localStorage.getItem('navAsideStatus')){
       $('body').addClass('dk-nav-aside-narrow');
       }*/
      $element.click(function () {
        var $body = $('body');
        if ($body.hasClass('dk-nav-aside-narrow')) {
          $body.removeClass('dk-nav-aside-narrow');
          //localStorage.removeItem('navAsideStatus');
        } else {
          $body.addClass('dk-nav-aside-narrow');
          //localStorage.setItem('navAsideStatus',true);
        }
      });
    };

    /**
     * 浏览器全屏
     * @private
     * @param $element
     * @param callback(isNormalScreen,$element)
     */
    var _fullScreen = function ($element, callback) {
      var isNormalScreen = function () {
            return !document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement;
          },
          fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;

      // 触发全屏切换
      $element.click(function () {
        if (fullscreenEnabled) {
          // 全屏
          if (isNormalScreen()) {
            var element = document.documentElement;
            if (element.requestFullscreen) {
              element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
              element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
              element.msRequestFullscreen();
            }
          }
          // 取消全屏
          else {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
            }
          }
        }
      });

      // 监听全屏事件
      var callbackFun = function (event) {
        if (typeof callback == "function") {
          callback(isNormalScreen(), $element);
        }
      };
      document.onwebkitfullscreenchange = callbackFun;
      document.onmozfullscreenchange = callbackFun;
      document.onwebkitfullscreenchange = callbackFun;
      document.onmsfullscreenchange = callbackFun;
    };

    /**
     * 工具
     * @private
     */
    var _tools = {};

    /**
     * 获取url参数
     * @param name
     * @returns {null}
     */
    _tools.getUrlParam = function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };

    /**
     * 获取表单数据
     * @param $form jquery对象
     * @returns {{}}
     */
    _tools.getFromData = function ($form) {
      var o = {};
      var a = $form.serializeArray();
      $.each(a, function () {
        if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
        } else {
          o[this.name] = this.value || '';
        }
      });
      return o;
    };

    /**
     * 初始化select2的选择
     * @param $select select标签
     * @param initValue 要初始话为的值
     * @param url 远程获取下拉的地址
     * @param idFieldName value的字段名
     * @param textFieldName text的字段名
     */
    _tools.resetSelect2Option = function resetSelect2Option(option) {
      var param = {
        $select: null,
        initValue: '',
        url: '',
        idFieldName: '',
        textFieldName: '',
      };
      _.assign(param, option);
      console.log(param);
      var $option = $('<option selected>加载中...</option>').val(param.$select);
      param.$select.append($option).trigger('change');
      $.ajax({
        type: 'GET',
        url: param.url,
        dataType: 'json',
        success: function (data) {
          if (data.code == 200) {
            console.log(data);
            $option.text(_.get(data, param.textFieldName)).val(_.get(data, param.idFieldName));
            $option.removeData();
            param.$select.trigger('change');
          }
        }
      });
    };

    return {
      init: _init,
      tools: _tools
    }

  }();

  window.commonApp = commonApp;
})();


