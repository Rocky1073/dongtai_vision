"UTF-8";
var map;
/**
 * @desc 定义坐标系统与范围
 */
var worldExtent = [-180,-90,180,90 ];// 世界范围
var projection = ol.proj.get("EPSG:4326"); //4326坐标




/**
 * @desc 去掉第0层的天地图分辨率信息，不会出现缩放到最后是空白的现象
 */
var tdtResolutions = [ 0.703125, 0.3515625, 0.17578125, 0.087890625,
		0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625,
		0.00274658203125, 0.001373291015625, 0.0006866455078125,
		0.00034332275390625, 0.000171661376953125, 0.0000858306884765625,
		0.00004291534423828125, 0.000021457672119140625,
		0.0000107288360595703125];

/**
 *@desc 与分辨率信息需要每层严格对应起来
 */
var matrixIds = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

/**
 * @desc 天地图格网信息
 */
var tdtGrid = new ol.tilegrid.WMTS( {
	extent : worldExtent,
	origin : [ -180, 90 ],
	resolutions : tdtResolutions,
	matrixIds : matrixIds
});

/**
 * @desc 天地图图层
 */
var wmtsVecLayer = new ol.layer.Tile( {
	source : new ol.source.WMTS( {
		layer : 'vec',
		style : 'default',
		version : '1.0.0',
		matrixSet : 'c',
		format : 'tiles',
		url : 'http://t{0-6}.tianditu.com/vec_c/wmts',
		tileGrid : tdtGrid,
		wrapX : true,
		projection : projection
	})
});

var wmtsAnnoLayer = new ol.layer.Tile( {
	source : new ol.source.WMTS( {
		layer : 'cva',
		style : 'default',
		version : '1.0.0',
		matrixSet : 'c',
		format : 'tiles',
		url : 'http://t{0-6}.tianditu.com/cva_c/wmts',
		tileGrid : tdtGrid,
		wrapX : true,
		projection : projection
	})
});

var devVectorSource = new ol.source.Vector();
var devVectorLayer = new ol.layer.Vector({
		source:devVectorSource,
		style:pointStyleFunction
	});
var singleClickSelect = new ol.interaction.Select({
		layers:[devVectorLayer],
		style:clickSelectStyle
	});
var type;
var initExtent;

/**
 * @desc 初始化
 * @return
 */
$(function(){
	initMap();
	var data={"devWorking": {
                    "name": "窨井盖", 
                    "type": "1",  
		    "dev":[{"id":1,"devNo": "10002273","pointY":"120.320631","pointX":"30.311294","state":"在线"}]}};
	// loadData(data);
});


/**
 * @desc:初始化地图
 * @return
 */
function initMap() {     
	map = new ol.Map( {
		view : new ol.View({
			// extent:[120.320631,30.311294,120.332057,30.319126],//定义地图容器范围，不是地图的初始化范围
			center : [120.327218,30.317945],
			zoom :16,
			projection : projection
		}),
		layers : [ wmtsVecLayer,wmtsAnnoLayer],
		target : 'homepagemap'
	});
	initExtent = [120.320631,30.311294,120.332057,30.319126];
	map.getView().fit(initExtent,map.getSize());//自动定位区域	
	map.addLayer(devVectorLayer);
	// map.addInteraction(singleClickSelect);
	// singleClickSelect.on("select",devSelectHandler,this);
}

function devSelectHandler(evt){
	var selFeatures = evt.target.getFeatures();
	var devObj;
	if(selFeatures.getLength()>0){
			var ptCoord = selFeatures.item(0).getGeometry().getCoordinates();
	  		map.getView().setCenter(ptCoord);
			switch(type){
			case '1':
				devObj = {"devNo":selFeatures.item(0).get("devNo")};
				break;
			case '2':
				devObj = {"lampId":selFeatures.item(0).get("lampId")};
				break;
			case '3':
				devObj = {"firehydrantNo":selFeatures.item(0).get("firehydrantNo")};
				break;
			case '4':
				devObj = {"logicid":selFeatures.item(0).get("logicid")};
				break;
			case '5':
				devObj = {"code":selFeatures.item(0).get("code")};
				break;
			case '6':
				devObj = {"planeId":selFeatures.item(0).get("planeId")};
				break;
			case '7':
				devObj = {"envId":selFeatures.item(0).get("envId")};
				break;						
		}
		clickWindow(devObj);	
	}
}

function loadData(dataJson){
	  // var dataJson = $.parseJSON(data);
	  map.getView().fit(initExtent,map.getSize());
	  devVectorSource.clear();
	  singleClickSelect.getFeatures().clear();
	  type = dataJson.devWorking.type;
	  var devArr = dataJson.devWorking.dev;
	  var count = devArr.length;
	  if(count>0){
	  	var features = new Array();
		$.each(devArr,function(i,dev){
			if(dev.pointX && dev.pointY){
					var feature = new ol.Feature(new ol.geom.Point([parseFloat(dev.pointY),parseFloat(dev.pointX)]));
					feature.setProperties(dev);
					features.push(feature);
				}
			}
		);
		devVectorSource.addFeatures(features);
	  } 
}

function pointStyleFunction(feature,resolution){
	var state = feature.get('state');
	var imgPath;
	switch(type){
		case '1':
		if(state=='在线'){
			imgPath = 'image/icon/jg_online.png';
		}
		else if(state=='离线'){
			imgPath = 'image/icon/jg_offline.png';
		}
		else if(state=='失联'){
			imgPath = 'image/icon/jg_lose.png';
		}
		else{
			imgPath = 'image/icon/jg_alarm.png';
		}
		break;
		case '2':
		var open = feature.get('open');
		if(open=='开'){
			imgPath = 'image/icon/ld_bright.png';
		}
		else{
			if(state=='在线'){
				imgPath = 'image/icon/ld_online.png';
			}
			else if(state=='离线'){
				imgPath = 'image/icon/ld_offline.png';
			}
			else if(state=='失联'){
				imgPath = 'image/icon/ld_lose.png';
			}
			else{
				imgPath = 'image/icon/ld_alarm.png';
			}
		}		
		break;
		case '3':
		if(state=='在线'){
			imgPath = 'image/icon/xfs_online.png';
		}
		else if(state=='离线'){
			imgPath = 'image/icon/xfs_offline.png';
		}
		else if(state=='失联'){
			imgPath = 'image/icon/xfs_lose.png';
		}
		else{
			imgPath = 'image/icon/xfs_alarm.png';
		}
		break;
		case '4':
		if(state=='在线'){
			imgPath = 'image/icon/tc_online.png';
		}
		else if(state=='离线'){
			imgPath = 'image/icon/tc_offline.png';
		}
		else if(state=='失联'){
			imgPath = 'image/icon/tc_lose.png';
		}
		else{
			imgPath = 'image/icon/tc_alarm.png';
		}
		break;
		case '5':
		if(state=='在线'){
			imgPath = 'image/icon/ljt_online.png';
		}
		else if(state=='离线'){
			imgPath = 'image/icon/ljt_offline.png';
		}
		else if(state=='失联'){
			imgPath = 'image/icon/ljt_lose.png';
		}
		else{
			imgPath = 'image/icon/ljt_alarm.png';
		}
		break;
		case '6':
		if(state=='在线'){
			imgPath = 'image/icon/wrj_online.png';
		}
		else if(state=='离线'){
			imgPath = 'image/icon/wrj_offline.png';
		}
		else if(state=='失联'){
			imgPath = 'image/icon/wrj_lose.png';
		}
		else{
			imgPath = 'image/icon/wrj_alarm.png';
		}
		break;
		case '7':
		if(state=='在线'){
			imgPath = 'image/icon/hjjc_online.png';
		}
		else if(state=='离线'){
			imgPath = 'image/icon/hjjc_offline.png';
		}
		else if(state=='失联'){
			imgPath = 'image/icon/hjjc_lose.png';
		}
		else{
			imgPath = 'image/icon/hjjc_alarm.png';
		}
		break;		
	}
	return [new ol.style.Style({
			image: new ol.style.Icon({
				src: 'src/' + imgPath
			})
		})]
}



function clickSelectStyle(feature,resolution){
	var state = feature.get('state');
	var imgPath;
	switch(type){
		case '1':
		if(state=='在线'){
			imgPath = 'image/select/jg_online_sel.png';
		}
		else if(state=='离线'){
			imgPath = 'image/select/jg_offline_sel.png';
		}
		else if(state=='失联'){
			imgPath = 'image/select/jg_lose_sel.png';
		}
		else{
			imgPath = 'image/select/jg_alarm_sel.png';
		}
		break;
		case '2':
		var open = feature.get('open');
		if(open=='开'){
			imgPath = 'image/select/ld_bright_sel.png';
		}
		else{
			if(state=='在线'){
				imgPath = 'image/select/ld_online_sel.png';
			}
			else if(state=='离线'){
				imgPath = 'image/select/ld_offline_sel.png';
			}
			else if(state=='失联'){
				imgPath = 'image/select/ld_lose_sel.png';
			}
			else{
				imgPath = 'image/select/ld_alarm_sel.png';
			}
		}
		break;
		case '3':
		if(state=='在线'){
			imgPath = 'image/select/xfs_online_sel.png';
		}
		else if(state=='离线'){
			imgPath = 'image/select/xfs_offline_sel.png';
		}
		else if(state=='失联'){
			imgPath = 'image/select/xfs_lose_sel.png';
		}
		else{
			imgPath = 'image/select/xfs_alarm_sel.png';
		}
		break;
		case '4':
		if(state=='在线'){
			imgPath = 'image/select/tc_online_sel.png';
		}
		else if(state=='离线'){
			imgPath = 'image/select/tc_offline_sel.png';
		}
		else if(state=='失联'){
			imgPath = 'image/select/tc_lose_sel.png';
		}
		else{
			imgPath = 'image/select/tc_alarm_sel.png';
		}
		break;
		case '5':
		if(state=='在线'){
			imgPath = 'image/select/ljt_online_sel.png';
		}
		else if(state=='离线'){
			imgPath = 'image/select/ljt_offline_sel.png';
		}
		else if(state=='失联'){
			imgPath = 'image/select/ljt_lose_sel.png';
		}
		else{
			imgPath = 'image/select/ljt_alarm_sel.png';
		}
		break;
		case '6':
		if(state=='在线'){
			imgPath = 'image/select/wrj_online_sel.png';
		}
		else if(state=='离线'){
			imgPath = 'image/select/wrj_offline_sel.png';
		}
		else if(state=='失联'){
			imgPath = 'image/select/wrj_lose_sel.png';
		}
		else{
			imgPath = 'image/select/wrj_alarm_sel.png';
		}
		break;
		case '7':
		if(state=='在线'){
			imgPath = 'image/select/hjjc_online_sel.png';
		}
		else if(state=='离线'){
			imgPath = 'image/select/hjjc_offline_sel.png';
		}
		else if(state=='失联'){
			imgPath = 'image/select/hjjc_lose_sel.png';
		}
		else{
			imgPath = 'image/select/hjjc_alarm_sel.png';
		}
		break;		
	}
	return [new ol.style.Style({
			image: new ol.style.Icon({
				src: 'src/' + imgPath
			})
		})]
}



