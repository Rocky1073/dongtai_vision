<template>
  <div id="map"></div>
</template>

<script>
import 'ol/ol.css';
import { Map, View } from 'ol';
import { defaults } from 'ol/control';
import { defaults as interactionDefaults } from 'ol/interaction';
import { Vector as VectorLayer } from 'ol/layer.js';
import Select from 'ol/interaction/Select';
import { pointerMove } from 'ol/events/condition.js';
import { Vector as VectorSource } from 'ol/source.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import Stroke from 'ol/style/Stroke';
import layerData from './data/daishan.json';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

let fillLayer;
let clickFeature;
export default {
  name: 'olMap',
  data() {
    return {
      centers: [
        {
          name: '高亭镇',
          center: [122.1676254272461, 30.259437561035156],
        },
        {
          name: '岱东镇',
          center: [122.20521926879883, 30.301494598388672],
        },
        {
          name: '东沙镇',
          center: [122.16951370239258, 30.314197540283203],
        },
        {
          name: '岱西镇',
          center: [122.11638450622559, 30.292139053344727],
        },
        {
          name: '长涂镇',
          center: [122.3550796508789, 30.25737762451172],
        },
        {
          name: '衢山镇',
          center: [122.33036041259766, 30.44757843017578],
        },
        {
          name: '秀山乡',
          center: [122.16419219970705, 30.17566680908203],
        },
      ],
      centerLayer: null,
    };
  },
  mounted() {
    // 初始化地图底图
    this.initMap();
  },
  computed: {
    optionCode() {
      return this.$store.state.optionCode;
    },
  },
  watch: {
    optionCode: function(code) {
      if (code === '330921001') {
        code = '330921100';
      }
      this.focusTo(code);
    },
  },
  methods: {
    initMap() {
      const _this = this;
      /* 添加地图 */
      this.map = new Map({
        loadTilesWhileAnimating: true,
        target: 'map',
        // 设置地图控件，默认的三个控件都不显示
        controls: defaults({
          attribution: false,
          zoom: false,
          rotate: false,
        }),
        //设置地图鼠标事件，默认的都改成false
        interactions: interactionDefaults({
          doubleClickZoom: false,
          // mouseWheelZoom:false,
          altShiftDragRotate: false,
          keyboard: false,
          shiftDragZoom: false,
          // dragPan:false,
          pinchZoom: false,
        }),
        view: new View({
          projection: 'EPSG:4326',
          center: [122.22390299972, 30.31116000004],
          zoom: 11,
          maxZoom: 20,
          minZoom: 5,
        }),
      });
      if (this.$store.state.optionCode === '330921001') {
        this.focusTo('330921100');
      } else {
        this.focusTo(this.$store.state.optionCode);
      }

      let features = [];
      for (let i = 0; i < this.centers.length; i++) {
        let feature = new Feature({
          geometry: new Point(this.centers[i].center), //在中心位置实例化一个要素，设置要素的样式
        });
        feature.setStyle(
          new Style({
            text: new Text({
              font: '14px Microsoft YaHei',
              text: this.centers[i].name,
              fill: new Fill({
                color: '#fff',
              }),
            }),
          }),
        );
        feature.set('name', this.centers[i].name);
        features.push(feature);
      }
      const source = new VectorSource({});
      this.centerLayer = new VectorLayer({
        source,
        zIndex: 999,
      });
      source.addFeatures(features);
      this.map.addLayer(this.centerLayer);
      let pointer = new Select({
        condition: pointerMove,
        style: this.hoverStyle,
      });
      this.map.addInteraction(pointer);
      // 鼠标移动事件
      pointer.on('select', function(e) {
        let features = fillLayer.getSource().getFeatures();
        for (let f in features) {
          features[f].setStyle(
            new Style({
              fill: new Fill({
                //矢量图层填充颜色，以及透明度
                color: '#0d1593',
              }),
              stroke: new Stroke({
                //边界样式
                color: '#3b66f9',
                width: 2,
              }),
            }),
          );
        }
        if (clickFeature) {
          clickFeature.setStyle(
            new Style({
              fill: new Fill({
                //矢量图层填充颜色，以及透明度
                color: '#0118f4',
              }),
              stroke: new Stroke({
                //边界样式
                color: '#48d6fd',
                width: 2,
              }),
            }),
          );
        }
        let feature = e.target.getFeatures().getArray()[0];
        let centerFeatures = _this.centerLayer.getSource().getFeatures();
        for (let f in centerFeatures) {
          centerFeatures[f].setStyle(
            new Style({
              text: new Text({
                font: '14px Microsoft YaHei',
                text: centerFeatures[f].get('name'),
                fill: new Fill({
                  color: '#fff',
                }),
              }),
            }),
          );
        }
        if (feature && feature.get('code')) {
          _this.pointerCallback(feature.get('code'));
          feature.setStyle(
            new Style({
              fill: new Fill({
                //矢量图层填充颜色，以及透明度
                color: '#0118f4',
              }),
              stroke: new Stroke({
                //边界样式
                color: '#48d6fd',
                width: 2,
              }),
            }),
          );
        }
      });
      // 单击事件
      let olMap = this.map;
      this.map.on('click', function({ pixel }) {
        let feature = olMap.forEachFeatureAtPixel(pixel, feature => feature);
        if (feature && feature.get('code')) {
          clickFeature = feature;
          _this.clickCallback(feature.get('code'));
          let features = fillLayer.getSource().getFeatures();
          for (let f in features) {
            features[f].setStyle(
              new Style({
                fill: new Fill({
                  //矢量图层填充颜色，以及透明度
                  color: '#0d1593',
                }),
                stroke: new Stroke({
                  //边界样式
                  color: '#3b66f9',
                  width: 2,
                }),
              }),
            );
          }
          feature.setStyle(
            new Style({
              fill: new Fill({
                //矢量图层填充颜色，以及透明度
                color: '#0118f4',
              }),
              stroke: new Stroke({
                //边界样式
                color: '#48d6fd',
                width: 2,
              }),
            }),
          );
        }
      });
    },
    focusTo(code) {
      if (fillLayer) {
        this.map.removeLayer(fillLayer);
      }
      fillLayer = new VectorLayer({
        source: new VectorSource({
          features: new GeoJSON().readFeatures(layerData),
        }),
        style: this.fillStyle,
      });
      this.map.addLayer(fillLayer);
      if (code.length === 9) {
        const features = fillLayer.getSource().getFeatures();
        for (let k in features) {
          if (features[k].get('code') == code) {
            clickFeature = features[k];
            features[k].setStyle(
              new Style({
                fill: new Fill({
                  //矢量图层填充颜色，以及透明度
                  color: '#0118f4',
                }),
                stroke: new Stroke({
                  //边界样式
                  color: '#48d6fd',
                  width: 2,
                }),
              }),
            );
            break;
          }
        }
      }
    },
    hoverStyle(feature) {
      return new Style({
        fill: new Fill({
          //矢量图层填充颜色，以及透明度
          color: '#0118f4',
        }),
        stroke: new Stroke({
          //边界样式
          color: '#48d6fd',
          width: 2,
        }),
      });
    },
    fillStyle(feature) {
      return new Style({
        fill: new Fill({
          //矢量图层填充颜色，以及透明度
          color: '#0d1593',
        }),
        stroke: new Stroke({
          //边界样式
          color: '#3b66f9',
          width: 2,
        }),
      });
    },
    //地图click事件绑定回调
    clickCallback(code) {
      this.$emit('click-Back', code);
    },
    //地图hover事件绑定回调
    pointerCallback(code) {
      this.$emit('pointer-Back', code);
    },
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
