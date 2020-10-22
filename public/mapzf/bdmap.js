// var baseurl='http://36.22.189.85:83';
var baseurl = 'http://192.168.71.33:84';

var map;

/**
 * @desc 定义坐标系统与范围
 */
var worldExtent = [-180, -90, 180, 90]; // 世界范围
var projection = ol.proj.get('EPSG:4326'); //4326坐标
var projectionExtent = projection.getExtent();
/**
 * @desc 去掉第0层的天地图分辨率信息，不会出现缩放到最后是空白的现象
 */
var tdtResolutions = [
  0.02197265625,
  0.010986328125,
  0.0054931640625,
  0.00274658203125,
  0.001373291015625,
  0.0006866455078125,
  0.00034332275390625,
  0.000171661376953125,
  0.0000858306884765625,
  0.00004291534423828125,
  0.000021457672119140625,
  0.0000107288360595703125,
  0.00000536441802978515625,
  0.000002682209014892578125,
  0.0000013411045074462890625,
];

/**
 *@desc 与分辨率信息需要每层严格对应起来
 */
var matrixIds = [6, 7, 8, 9, 10, 11, 12, 13, 14];
var matrixIdszj = [15, 16, 17, 18, 19, 20];

/**
 * @desc 天地图格网信息
 */
var tdtGrid = new ol.tilegrid.WMTS({
  origin: ol.extent.getTopLeft(projectionExtent),
  resolutions: tdtResolutions.slice(0, 9),
  matrixIds: matrixIds,
});
var tdtGridzj = new ol.tilegrid.WMTS({
  origin: ol.extent.getTopLeft(projectionExtent),
  resolutions: tdtResolutions.slice(9, 15),
  matrixIds: matrixIdszj,
});

/**
 * @desc 国家天地图图层
 */
var wmtsVecLayer = new ol.layer.Tile({
  source: new ol.source.WMTS({
    layer: 'vec',
    style: 'default',
    version: '1.0.0',
    matrixSet: 'c',
    format: 'tiles',
    url: 'http://t{0-6}.tianditu.com/vec_c/wmts?tk=94ac8a858f38f8630ec138766cd13951',
    tileGrid: tdtGrid,
    wrapX: true,
  }),
  minResolution: 0.0000858306884765625,
  maxResolution: 0.02197265625,
});

var wmtsAnnoLayer = new ol.layer.Tile({
  source: new ol.source.WMTS({
    layer: 'cva',
    style: 'default',
    version: '1.0.0',
    matrixSet: 'c',
    format: 'tiles',
    url: 'http://t{0-6}.tianditu.com/cva_c/wmts?tk=94ac8a858f38f8630ec138766cd13951',
    tileGrid: tdtGrid,
    wrapX: true,
  }),
  minResolution: 0.0000858306884765625,
  maxResolution: 0.02197265625,
});

/**
 * @desc 浙江天地图图层
 */
var zJVecLayer = new ol.layer.Tile({
  source: new ol.source.WMTS({
    style: 'default',
    version: '1.0.0',
    wrapX: true,
    layer: 'ZJEMAP',
    matrixSet: 'TileMatrixSet0',
    format: 'image/png',
    url: 'http://srv.zjditu.cn/ZJEMAP_2D/wmts',
    tileGrid: tdtGridzj,
    wrapX: true,
  }),
  minResolution: 0.0000013411045074462890625,
  maxResolution: 0.0000858306884765625,
});

var zJAnnoLayer = new ol.layer.Tile({
  source: new ol.source.WMTS({
    style: 'default',
    version: '1.0.0',
    wrapX: true,
    layer: 'ZJEMAPANNO',
    matrixSet: 'TileMatrixSet0',
    format: 'image/png',
    url: 'http://srv.zjditu.cn/ZJEMAPANNO_2D/wmts',
    tileGrid: tdtGridzj,
    wrapX: true,
  }),
  minResolution: 0.0000013411045074462890625,
  maxResolution: 0.0000858306884765625,
});

var devVectorSource = new ol.source.Vector();
var devVectorLayer = new ol.layer.Vector({
  source: devVectorSource,
  style: pointStyleFunction,
});

/**
 * @desc:初始化地图
 * @return
 */
function initMap() {
  map = new ol.Map({
    // 设置地图控件，默认的三个控件都不显示
    controls: ol.control.defaults({
      attribution: false,
      zoom: false,
    }),
    view: new ol.View({
      // extent:[120.320631,30.311294,120.332057,30.319126],//定义地图容器范围，不是地图的初始化范围
      center: [120.720484, 30.525141],
      zoom: 13,
      projection: projection,
      maxZoom: 21,
      minZoom: 9,
    }),
    // logo: false,     // 不显示logo
    // logo: 'logo.png',     // 用一个图片 logo.png 作为logo
    //logo: {src: 'images/logo.png', href: 'http://www.openstreetmap.org/'},    // 点击能跳转到对应页面
    layers: [wmtsVecLayer, wmtsAnnoLayer, zJVecLayer, zJAnnoLayer],
    target: 'map',
    // interactions: ol.interaction.defaults({
    // 	pinchRotate:false
    // }).extend([new app.Drag()])
  });
  map.addLayer(devVectorLayer);
}

/**
 *加载点位数据
 */
function loadData(dataJson) {
  devVectorSource.clear();
  //isCheck = dataJson.dev.isCheck;
  var devArr = dataJson.result;
  var features = new Array();
  for (var i = 0; i < dataJson.result.length; i++) {
    if (dataJson.result[i].coordinatex && dataJson.result[i].coordinatey) {
      var feature = new ol.Feature(
        new ol.geom.Point([parseFloat(dataJson.result[i].coordinatex), parseFloat(dataJson.result[i].coordinatey)]),
      );
      feature.setProperties(dataJson.result[i]);
      features.push(feature);
    }
  }
  devVectorSource.addFeatures(features);
  var num = parseInt(Math.random() * features.length, 10);
  var ft = features[num];
  var ptCoord = ft.getGeometry().getCoordinates();
  map.getView().setCenter(ptCoord);
  map.getView().setZoom(10);
}
$(document).ready(function() {
  initMap();
  $('#gffx li').click(function() {
    var index = $(this).index() + 1;
    $.get(baseurl + '/haining_bigscreen/urp/lawhightop/getHighTopFive.json?type=' + index, function(data) {
      console.log(data);
      gflx(data);
      var mess = {
        result: [],
      };
      $('.top-list li').click(function() {
        var mess = {
          result: [],
        };
        var index = $(this).index() + 1;
        $('.top-list li').removeClass('active-li');
        $(this).addClass('active-li');
        for (var i = 0; i < data.highMap.length; i++) {
          if (data.highMap[i].index == index) {
            mess.result.push({
              // "coordinatex":data.highMap[i].lon,"coordinatey":data.highMap[i].lat,"sta":data.highMap[i].item
              coordinatex: data.highMap[i].lon,
              coordinatey: data.highMap[i].lat,
              sta: data.highMap[i].item,
              index: data.highMap[i].index,
              acceptTimeCas: data.highMap[i].acceptTimeCas,
              actCas: data.highMap[i].actCas,
              nameDep: data.highMap[i].nameDep,
              nameHoco: data.highMap[i].nameHoco,
              closeTimeCas: data.highMap[i].closeTimeCas,
            });
          }
        }
        loadData(mess);
      });
      for (var i = 0; i < data.highMap.length; i++) {
        mess.result.push({
          // "coordinatex":data.highMap[i].lon,"coordinatey":data.highMap[i].lat,"sta":data.highMap[i].item
          coordinatex: data.highMap[i].lon,
          coordinatey: data.highMap[i].lat,
          sta: data.highMap[i].item,
          index: data.highMap[i].index,
          acceptTimeCas: data.highMap[i].acceptTimeCas,
          actCas: data.highMap[i].actCas,
          nameDep: data.highMap[i].nameDep,
          nameHoco: data.highMap[i].nameHoco,
          closeTimeCas: data.highMap[i].closeTimeCas,
        });
      }
      loadData(mess);
      var container = document.getElementById('popup');
      var content = document.getElementById('popup-content');
      var closer = document.getElementById('popup-closer');
      /**
       * Add a click handler to hide the popup.
       * @return {boolean} Don't follow the href.
       */
      closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
      };
      /**
       * Create an overlay to anchor the popup to the map.
       */
      var overlay = new ol.Overlay(
        /** @type {olx.OverlayOptions} */ ({
          element: container,
          autoPan: true,
          autoPanAnimation: {
            duration: 250, //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度. 单位为毫秒（ms）
          },
        }),
      );

      /**
       * Add a click handler to the map to render the popup.
       */
      map.addEventListener('click', function(evt) {
        var pixel = map.getEventPixel(evt.originalEvent);
        var featureInfo = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
          return { feature: feature, layer: layer };
        });
        if (featureInfo !== undefined && featureInfo !== null && featureInfo.layer !== null) {
          //coodinate存放了点击时的坐标信息
          var coodinate = featureInfo.feature.getGeometry().getCoordinates();
          //设置弹出框内容，可以HTML自定义
          var html = '';
          console.log(featureInfo.feature.values_.closeTimeCas);
          if (featureInfo.feature.values_.closeTimeCas) {
            html =
              '<p>立案时间:' +
              featureInfo.feature.values_.acceptTimeCas +
              '</p>' +
              '<p>主办部门:' +
              featureInfo.feature.values_.nameDep +
              '</p>' +
              '<p>承办队员:' +
              featureInfo.feature.values_.nameHoco +
              '</p>' +
              '<p>结案时间:' +
              featureInfo.feature.values_.closeTimeCas +
              '</p>' +
              '<p>违法行为:' +
              featureInfo.feature.values_.actCas +
              '</p>';
          } else {
            html =
              '<p>立案时间:' +
              featureInfo.feature.values_.acceptTimeCas +
              '</p>' +
              '<p>主办部门:' +
              featureInfo.feature.values_.nameDep +
              '</p>' +
              '<p>承办队员:' +
              featureInfo.feature.values_.nameHoco +
              '</p>' +
              '<p>违法行为:' +
              featureInfo.feature.values_.actCas +
              '</p>';
          }
          content.innerHTML = html;
          //设置overlay的显示位置
          overlay.setPosition(coodinate);
          overlay.setOffset([0, -34]);
          //显示overlay
          map.addOverlay(overlay);
        }
      });
    });
  });

  $('#gffx li:last-child').trigger('click');
});

function clickWindow(devno, x, y) {}
function pointStyleFunction(feature, resolution) {
  var imgPath;
  imgPath = 'image/dianwei/dingweired' + feature.values_.index + '.png';

  return [
    new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        // opacity: 0.9,
        src: imgPath,
      }),
    }),
  ];
}
