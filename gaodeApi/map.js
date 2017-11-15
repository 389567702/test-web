 /***************************************
                                                                                                                                                                                                                                由于Chrome、IOS10等已不再支持非安全域的浏览器定位请求，为保证定位成功率和精度，请尽快升级您的站点到HTTPS。
                                                                                                                                                                                                                                ***************************************/
 (function () {
     var GDMap = (function () {
         function GDMap() {
             //  地图
             this.map = null;
             //  定位
             this.geolocation = null;
             this.geolocationComplete = null;
             //  搜索
             this.placeSearch = null;
             this.driving = null;
             this.init();
         }
         /**
          * 初始化
          */
         GDMap.prototype.init = function () {
             var _this = this;
             //  构造一个地图对象
             this.map = new AMap.Map('container', {
                 resizeEnable: true
             });

             if (location.href.indexOf('&guide=1') !== -1) {
                 this.map.setStatus({
                     scrollWheel: false
                 })
             }
             this.plugin();
         }
         /**
          * 加载插件
          */
         GDMap.prototype.plugin = function () {
             var _this = this;
             var plugin = [
                 "AMap.ToolBar",
                 "AMap.Geolocation",
                 "AMap.PlaceSearch",
                 "AMap.Autocomplete",
                 "AMap.Driving",
             ];
             this.map.plugin(plugin, function () {

                 //  加载 添加 工具栏插件
                 _this.map.addControl(new AMap.ToolBar());
                 //  定位
                 _this.aMapGeolocation();
                 //  搜索
                 _this.search();
                 //  导航
                 _this.drivingSearch();
             });
         }
         /**
          * 定位
          */
         GDMap.prototype.aMapGeolocation = function () {
             var _this = this;
             if (this.geolocation) {
                 return;
             }
             this.geolocation = new AMap.Geolocation({
                 enableHighAccuracy: true, //是否使用高精度定位，默认:true
                 timeout: 10000, //超过10秒后停止定位，默认：无穷大
                 buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                 zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                 buttonPosition: 'RB'
             });
             this.map.addControl(this.geolocation);
             this.geolocation.getCurrentPosition();
             //返回定位信息
             AMap.event.addListener(this.geolocation, 'complete', function (data) {
                 _this.geolocationComplete = data;
                 var str = ['定位成功'];
                 str.push(data.formattedAddress);
                 str.push('经度：' + data.position.getLng());
                 str.push('纬度：' + data.position.getLat());
                 if (data.accuracy) {
                     str.push('精度：' + data.accuracy + ' 米');
                 } //如为IP精确定位结果则没有精度信息
                 str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
                 document.getElementById('tip').innerHTML = str.join('<br>');
             });
             //返回定位出错信息
             AMap.event.addListener(this.geolocation, 'error', function (data) {
                 document.getElementById('tip').innerHTML = '定位失败';
             });


         }
         //  搜索
         GDMap.prototype.search = function (param) {
             var _this = this;
             if (this.placeSearch) {
                 return;
             }
             //构造地点查询类
             this.placeSearch = new AMap.PlaceSearch({
                 map: this.map,
             });
             //注册监听，当选中某条记录时会触发
             AMap.event.addListener(new AMap.Autocomplete({
                 input: "tipinput"
             }), "select", function (e) {
                 _this.placeSearch.setCity(e.poi.adcode);
                 _this.placeSearch.search(e.poi.name); //关键字查询查询
             });
             AMap.event.addListener(this.placeSearch, 'complete', function (data) {
                 console.log(data);
             });
             //  选中搜索的点
             AMap.event.addListener(this.placeSearch, 'selectChanged', function (data) {
                 _this.drivingSearch(_this.geolocationComplete.position, data.selected.data.location);
             });
         }
         //  导航
         GDMap.prototype.drivingSearch = function (start, end) {
             if (!this.driving) {
                 this.driving = new AMap.Driving({
                     map: this.map,
                     panel: "panel"
                 });
             }
             if (start && end) {
                 this.driving.search(start, end);
             }
             //  this.driving.search(new AMap.LngLat(param.startX, param.startY), new AMap.LngLat(param.endX, param.endY));
         }
         return GDMap;
     })();
     //  
     var gd = new GDMap();
     console.log(gd);

 })()