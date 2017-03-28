window.PUBLIC_MENU_CONF = {
    "productId": 1006,
        "items": [
          {
            "title": "业务总览",
            "icon": "iconfont icon-jiaoyizonglan",
            "route": "/productors",
            "role": 1  // 此属性属于角色权限菜单配置项，1 or 0 或者不配置，不配置就是默认显示，1或0为角色权限
          },
          {
            "title": "业务中心",
            "icon": "iconfont icon-yewuzhongxin",
            "route": "/count"
          },
          {
            "title": "服务节点",
            "icon": "iconfont icon-fuwujiedian",
            "route": "/sources"
          },
          {
            "title": "告警台",
            "icon": "iconfont icon-gaojingtai",
            "route": "/monitor"
          },
          {
            "title": "统计报表",
            "icon": "iconfont icon-baobiao",
            "route": "/monitor"
          },
          {
            "title": "配置管理",
            "icon": "iconfont icon-autopeizhi",
            "route": "/deploy"
          },
          {
            "title": "帮助",
            "icon": "iconfont icon-uyunlogo",
            "href": "/help/index.html"
          }
      ]
    }