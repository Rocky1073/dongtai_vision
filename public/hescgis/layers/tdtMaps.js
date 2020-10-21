goog.provide("HESCGIS.layer.TDTMaps");

goog.require("ol.layer.Tile");
goog.require("ol.source.WMTS");
goog.require("ol.source.XYZ");



HESCGIS.layer.TDTMaps = function(opt_options){
	var options = opt_options ? opt_options : {} ; 
	
	/**
	 * 天地图分辨率
	 * @private
	 * @type {Array}
	 */
	this.resolutions_ = options.resolutions ? options.resolutions : [1.40625,0.703125, 0.3515625, 0.17578125, 0.087890625,0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625,0.00274658203125, 0.001373291015625, 0.0006866455078125,0.00034332275390625, 0.000171661376953125, 0.0000858306884765625, 0.00004291534423828125, 0.000021457672119140625,0.0000107288360595703125, 0.00000536441802978515625,0.000002682209014892578125, 0.0000013411045074462890625];

	/**
	 * 数组长度需要和分辨率长度一致
	 * @private
	 * @type {Array}
	 */
	this.matrixIds_ = options.matrixIds ? options.matrixIds : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

	/**
	 * 地图 必须
	 * @type {ol.Map}
	 */
	this.map_ = options.map;

	/**
	 * OGC WMTS规范中DPI采用90.71（即采用0.028mm作为一个像素的物理宽度），
	 * 而天地图使用的DPI采用国家标准规定的96（见《电子地图规范》）。
	 * 由于ArcGIS WMTS接口实现均遵循OGC WMTS标准，使用90.71作为DPI来计算分辨率，
	 * 导致ArcGIS通过WMTS接口访问天地图时，图片物理尺寸变大，使得地图看上去向右下方偏移。
	 * @private
	 * @type {Number}
	 */
	this.dpi_ = 96;

	/**
	 * 坐标系，默认"EPSG:4326"
	 * @private
	 * @type {ol.ProjectionLike}
	 */
	this.projection_ = options.projection ? options.projection : "EPSG:4326";

	/**
	 * 坐标系范围
	 * @private
	 * @type {Array} [-180,-90,180,90]
	 */
	this.projectionExtent_ = options.projectionExtent ? options.projectionExtent : ol.proj.get(this.projection_).getExtent();

	/**
	 * 坐标系原始点，一般为左上，不排除其他情况
	 * @private
	 * @type {Array}  [0,0]
 	 */
	this.origin_  = options.origin ? options.origin : ol.extent.getTopLeft(this.projectionExtent_),

	/**
	 * 格网
	 * @private
	 * @type {ol.tilegrid.TileGrid}
	 */
	this.tileGrid_ = options.tileGrid ? options.tileGrid : this.createTileGrid_();

};


/**
 * 创建格网模式
 * @author  wujianqiang
 * @dateTime 2018-03-21T11:15:47+0800
 * @return   {ol.tilegrid.TileGrid}
 */
HESCGIS.layer.TDTMaps.prototype.createTileGrid_ = function(){
	// var projectionExtent = ol.proj.get(this.projection_).getExtent();
 //    var size = ol.extent.getWidth(projectionExtent) / 256;
 //    var resolutions = [];
 //    var matrixIds = [];
 //    for (var z = 2; z < 19; ++z) {
 //        resolutions[z] = size / Math.pow(2, z);
 //        matrixIds[z] = z;
 //    }
 //    this.projectionExtent_ =  projectionExtent;
 //    this.resolutions_ = resolutions;
 //    this.matrixIds_ = matrixIds;
 //    this.origin_ = ol.extent.getTopLeft(projectionExtent);

    return new ol.tilegrid.WMTS({
                origin: this.origin_,
                resolutions: this.resolutions_,
                matrixIds: this.matrixIds_
         	});
};

/** 
 * 根据天地图加载类型和天地图配置，创建天地图图层。
 * @author  wujianqiang
 * @dateTime 2018-03-19T18:23:21+0800
 * @param    {string}                 loadType  天地图加载类型 【WMTS】 【XYZ】
 * @param    {object}                 mapConfig 天地图配置
 * @return   {ol.layer.Tile}          layer     天地图图层
 */
HESCGIS.layer.TDTMaps.prototype.createLayer = function(mapConfig){
	var layer;
	var loadType = mapConfig.mapType.toLowerCase().indexOf("wmts") == -1 ? "XYZ":"WMTS";
	var url = mapConfig.url;
    var paramsObj = mapConfig.params;
    var layerTitle = mapConfig.label;
	var layerVisible = mapConfig.visible;
	var mapRangeType = mapConfig.rangeType;

	var mapUrl = this.getDistributeUlr_(url);
	//显示范围
	var zoomLevel =  this.getZoomLevel_(mapRangeType,loadType); 

	if(loadType == "WMTS"){ //【WMTS】 
		var style = paramsObj.style;
		var layerName = paramsObj.layer;
		var format = paramsObj.format;
		var version = paramsObj.version;
		var tilematrixset = paramsObj.tilematrixset
		layer = new ol.layer.Tile({
			title:layerTitle,
			visible:layerVisible,
			minResolution:zoomLevel.minZoom,
			maxResolution:zoomLevel.maxZoom,
			source:new ol.source.WMTS({
				url:mapUrl,
                projection: ol.proj.get(this.projection_),
                style: style,
                format: format,
                matrixSet: tilematrixset,
                layer: layerName,
                version: version,
                tileGrid: this.tileGrid_,
                wrapX:true,
			})
		});
	} else { //【XYZ】
		var xyzUrl = this.joinUrl_(mapUrl,paramsObj);
		layer =  new ol.layer.Tile({
			visible : layerVisible,
			source: new ol.source.XYZ({
				url:xyzUrl+"&x={x}&y={y}&l={z}",
				minZoom:zoomLevel.minZoom,
				maxZoom:zoomLevel.maxZoom
			})
		})
	}
	 return layer;
//	if(layer){
//		this.map_.addLayer(layer);
//	}
	
};

/** 
 * 获取分布式地址
 * @author  wujianqiang
 * @dateTime 2018-03-26T23:11:09+0800
 * @param    {string}      url 地图地址
 * @return   {string}               
 */
HESCGIS.layer.TDTMaps.prototype.getDistributeUlr_ = function(url){
	var tdtUrl;
	if(url.indexOf("tianditu.com")!=-1){  //国家天地图
		tdtUrl = url.replace(new RegExp(/[0-9]/),"{0-7}");
	}else if(url.indexOf("zjditu.cn")!=-1){ //浙江省天地图
		tdtUrl = url.replace(new RegExp(/[0-9]/),"{0-7}");
	}else{
		tdtUrl = url;
	}
	return tdtUrl;
};
/**
 * 地图服务地址参数拼接
 * @author  wujianqiang
 * @dateTime 2018-03-19T17:26:22+0800
 * @param    {string}                 url       地图服务地址
 * @param    {object}                 urlParams url参数
 * @return   {string}                 tdtUrl    拼接完成的地图服务地址
 */
HESCGIS.layer.TDTMaps.prototype.joinUrl_ = function(url,urlParams){
	var tdtUrl;
	tdtUrl = url.concat("?");
	for(var param in urlParams){ //参数拼接
		var tempArr  = new Array();
		tempArr.push(param);
		var tempValue = urlParams[param]
		tempArr.push(tempValue);
		var tempParamUrl = tempArr.join("="); 
		tdtUrl = tdtUrl.concat(tempParamUrl).concat("&");
	}
	//去除最后多余的 "&"
	//tdtUrl = tdtUrl.replace(new RegExp(/(/&*$)/g), "");  
	tdtUrl = tdtUrl.substring(0,tdtUrl.length-1);
 	return tdtUrl;
};

/**
 * 获取该天地图级别所对应的level范围：【0-14】 国家天地图，【15-17】 省级天地图， 【18-20】 市级天地图
 * @author  wujianqiang
 * @dateTime 2018-03-19T15:54:52+0800
 * @param    {string}                 mapRangeType 天地图级别 【nation】 国家，【province】 省级， 【city】 市级
 * @return   {object}                 levelObj  {minZoom,maxZoom} 可自定义 待实现
 */
HESCGIS.layer.TDTMaps.prototype.getZoomLevel_ = function(mapRangeType,loadType){
	var levelObj;
	switch(mapRangeType.toLocaleLowerCase()){
		case "nation":{
			if(loadType == "WMTS"){
				levelObj = {"minZoom" : this.resolutions_[14],"maxZoom" :  this.resolutions_[1]};
			}else{
				levelObj = {"minZoom" : 1,"maxZoom" : 14};
			}
			
			break;
		}
		case "province":{
			if(loadType == "WMTS"){ //resolutions 和 zoom 是相反的关系
				levelObj = {"minZoom" : this.resolutions_[17],"maxZoom" : this.resolutions_[14]};
			}else{
				levelObj =  {"minZoom" : 14,"maxZoom" : 16};
			}
			break;
		}
		case "city":{
			if(loadType == "WMTS"){
				levelObj = {"minZoom" : this.resolutions_[20],"maxZoom" : this.resolutions_[16]};
			}else{
				levelObj = {"minZoom" : 18,"maxZoom" : 20};
			}
			break;
		}
		default:{
			if(loadType == "WMTS"){
				levelObj = {"minZoom" : this.resolutions_[14],"maxZoom" : this.resolutions_[0]};
			}else{
				levelObj = {"minZoom" : 0,"maxZoom" : 14};
			}
			
			break;
		}
	}
	return levelObj;
};


HESCGIS.layer.TDTMaps.prototype.getTileGrid = function(){
	return this.tileGrid_;
};
