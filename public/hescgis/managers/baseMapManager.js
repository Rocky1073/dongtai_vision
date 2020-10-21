goog.provide("HESCGIS.Managers.BaseMapManager");

goog.require("ol.layer.Group");

/**
 * 地图容器管理类，实现地图容器初始化和加载底图功能
 * @author  wujianqiang
 * @dateTime 2018-03-21T13:50:10+0800
 * @param    {[type]}                 opt_options [description]
 */
HESCGIS.Managers.BaseMapManager = function(opt_options){
	
	var options = opt_options ? opt_options : {};

	/**
	 * 地图配置
	 * @private
	 * @type {object}
	 */
	this.baseMapsConfig_ = options.baseMapsConfig ? options.baseMapsConfig : null;

	/**
	 * 地图对象
	 * @private
	 * @type {ol.Map}
	 */
	this.map_ = options.map ? options.map : null;

	this.projection_ = options.projection ? options.projection : "EPSG:4326";
	
//	this.baseMapLayerGroup = new ol.layer.Group();
	
	this.addBaseMap_();
};




/**
 * 加载地图
 * @author  wujianqiang
 * @dateTime 2018-03-28T09:57:12+0800
 */
HESCGIS.Managers.BaseMapManager.prototype.addBaseMap_ = function() {
	var baseMapConfigs = this.baseMapsConfig_;
	
	baseMapConfigs.forEach(function(currentMapConfig){
//		// this.createLayer(currentMapConfig);
//		var layer = this.createLayer_(currentMapConfig);
//	    if(layer){ //加入map中
////			this.map_.addLayer(layer);
//	    	this.baseMapLayerGroup.getLayers().push(layer);
		
			var layergroup = new ol.layer.Group();
			layergroup.set("name", currentMapConfig.name);
			layergroup.setVisible(currentMapConfig.visible);
			this.map_.getLayers().push(layergroup);
			
			var layerConfigs = currentMapConfig.layers;
			layerConfigs.forEach(function(currentLayerConfig){
				var layer = this.createLayer_(currentLayerConfig);
				if(layer){
					layergroup.getLayers().push(layer);
				}
			},this);
	},this);
	
//	this.baseMapLayerGroup.set("name","tdt");
	 
};


/** 
 * 地图创建
 * @author  wujianqiang
 * @dateTime 2018-03-28T09:58:41+0800
 * @param    {object}                 baseMapConfig 地图参数
 * @return   {ol.layer}               layer  图层
 */
HESCGIS.Managers.BaseMapManager.prototype.createLayer_ = function(baseMapConfig) {
	var layer;
	
	switch (baseMapConfig.mapType.toLowerCase()){ //不区分大小写匹配
		case "tdtwmts":{ //天地图WMTS
			layer = new HESCGIS.layer.TDTMaps({projection:this.getProjection(),map:this.map_}).createLayer(baseMapConfig);
			// new HESCGIS.layer.TDTMaps({projection:this.getProjection(),map:this.map_}).createLayer(baseMapConfig);
			break;
		}
		case "tdtxyz":{ //天地图XYZ
			layer = new HESCGIS.layer.TDTMaps({projection:this.getProjection(),map:this.map_}).createLayer(baseMapConfig);
			// new HESCGIS.layer.TDTMaps({projection:this.getProjection(),map:this.map_}).createLayer(baseMapConfig);
			break;
		}
		case  "arcserver":{ //arcserver发布
			
			break;
		}
		case "wms" :{
			layer = new ol.layer.Tile({
				source:new ol.source.TileWMS({
					url:"http://60.191.115.34:8080/geoserver/ditu/wms",
					params:{
						LAYERS:"ditu:ditu",
						VERSION:"1.1.0",
						STYLE:""
					},
					 serverType: 'geoserver'
				})
			});
			break;
		}
		case "wmts" :{
			// $.ajax({url:"http://t2.tianditu.com/vec_c/wmts?version=1.0.0&service=wmts&request=getcapabilities",dataType:"xml"})
			// .done(function(result){
			// 	console.log(result);
			// }).fail(function(error){
			// 	console.log(error);
			// })
			// new HESCGIS.layer.WMTSByCapabilitiesLayer({
			// 	"capabilitiesUrl":"http://t2.tianditu.com/vec_c/wmts?version=1.0.0&service=wmts&request=getcapabilities",
			// 	"projection":this.getProjection(),
			// 	"map":this.map_}).createWMTSLayer(baseMapConfig); 
			// if(baseMapConfig.version){
			// 	baseMapConfig.url +="?request=getCapabilities&service=wmts&version"+baseMapConfig.version; 
			// }else{
			// 	baseMapConfig.url +="?request=getCapabilities&service=wmts&version=1.0.0";
			// }
			
			// layer = new HESCGIS.layer.WMTSByCapabilitiesLayer({
			// 	"capabilitiesUrl":baseMapConfig.url,
			// 	"projection":this.getProjection(),
			// 	"map":this.map_
			// }).createWMTSLayer(baseMapConfig);
//			layer  = new ol.layer.Tile({
//				source:new ol.source.TileWMS({
//					url:"http://60.191.115.34:8080/geoserver/ditu/wms",
//					
//				})
//			});
			break;
		}
		default:{
			throw new Error("当前底图类型不支持"+baseMapConfig.mapType + "!");
			break;
		}	
	}
	return layer;
};

HESCGIS.Managers.BaseMapManager.prototype.getProjection = function(){
	return this.projection_;
};


