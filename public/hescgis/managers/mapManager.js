goog.provide("HESCGIS.Managers.MapManager");

goog.require('ol.Object');

HESCGIS.Managers.MapManager = function(opt_options){
	
	 ol.Object.call(this);

	var options = opt_options ? opt_options : {};

	this.configUrl_ = options.configUrl ? options.configUrl : "./configs/config.json";

	this.map_  = options.map ? options.map : null;

	this.mapConfig_ = options.mapConfig ? options.mapConfig : null;

	this.projection_ = options.projection ? options.projection : "EPSG:4326";
	
	this.baseMapManager_ = null;
	
	this.legendControl_ = null;

	this.loadConfig_();
};

ol.inherits(HESCGIS.Managers.MapManager, ol.Object);


HESCGIS.Managers.MapManager.prototype.loadConfig_ = function(){
	var me = this;
	$.ajax({
		url:this.configUrl_,
		dataType:"json",
		async:false,
		type:"GET",
		success:function(resultConfig){
			if(resultConfig){
				me.mapConfig_ = resultConfig;
				me.initMap_();
				me.LoadBaseMap_();
//				me.loadControls_();
			}
		},
		error:function(request,status,desc){
			alert(status+":"+desc);
		}
	});
};

HESCGIS.Managers.MapManager.prototype.initMap_ = function(){
	var mapConfig = this.mapConfig_.Map;
	this.map_ = new ol.Map({
		loadTilesWhileAnimating: true,
		target: mapConfig.Target,
		view: new ol.View({
			projection:mapConfig.Projection,
			center:mapConfig.InitCenter,
			zoom:mapConfig.Zoom,
			maxZoom:mapConfig.MaxZoom,
			minZoom:mapConfig.MinZoom
		}),
		controls:ol.control.defaults({zoom:false,attribution:false,rotate:false}) //取消默认加载的控件
	});
};


HESCGIS.Managers.MapManager.prototype.LoadBaseMap_ = function(){
	var baseMapConfigs  = this.mapConfig_.Map.BaseMaps;
	this.baseMapManager_ = new HESCGIS.Managers.BaseMapManager({baseMapsConfig:baseMapConfigs,map:this.map_,projection:this.getProjection()});
};

HESCGIS.Managers.MapManager.prototype.loadControls_ = function(){
//	var fullExtentControl  = new HESCGIS.control.FullExtent({element: document.getElementById("fullMapDiv"),extent:this.mapConfig_.Map.FullExtent,tipLabel:"全图",map:this.map_});
	var legendControl = this.legendControl_  = new HESCGIS.control.Legend();
	var scaleLineControl = new ol.control.ScaleLine({units:"metric"});
	this.map_.addControl(legendControl);
	this.map_.addControl(scaleLineControl);
	var  mapSwitcher = new HESCGIS.control.MapSwitcher({element:"mapswitcher"});
	this.map_.addControl(mapSwitcher);
};


/**
 * @public
 * @param type
 * @param url
 * @param params
 */
HESCGIS.Managers.MapManager.prototype.LoadOpLayer = function(type,url,params){
	var opLayer  = new ol.layer.Vector({source:HESCGIS.utils.ToolUtil.loadGeoSvrWFSSource(url,params.typeName)});
	this.map_.addLayer(opLayer);
//	this.legendControl_.dispatchEvent(new ol.Object.Event(HESCGIS.event.EventType.LayerChange,"layer", opLayer));
	
};



HESCGIS.Managers.MapManager.prototype.getMap = function(){
	return this.map_;
};

HESCGIS.Managers.MapManager.prototype.getProjection = function(){
	return this.projection_;
};

HESCGIS.Managers.MapManager.prototype.getMapConfig = function(){
	return this.mapConfig_;
};

HESCGIS.Managers.MapManager.prototype.getBaseMapManager = function(){
	return this.baseMapManager_;
};

