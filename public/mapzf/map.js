var map;
/**
 * @desc 定义坐标系统与范围
 */
var worldExtent = [-180,-90,180,90 ];// 世界范围
var projection = ol.proj.get("EPSG:4326"); //4326坐标
var jqLayer = new ol.layer.Vector({//街区图层
		// source:jqSource,
		style:jqStyleFunction
	});


/**
 * @desc 去掉第0层的天地图分辨率信息，不会出现缩放到最后是空白的现象
 */
var tdtResolutions = [ 0.703125, 0.3515625, 0.17578125, 0.087890625,
		0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625,
		0.00274658203125, 0.001373291015625, 0.0006866455078125,
		0.00034332275390625, 0.000171661376953125, 0.0000858306884765625,
		0.00004291534423828125, 0.000021457672119140625,
		0.0000107288360595703125,0.00000536441802978515625,
		0.000002682209014892578125, 0.0000013411045074462890625 ];

/**
 *@desc 与分辨率信息需要每层严格对应起来
 */
var matrixIds = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,18,19,20];

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

var citywmtsVecLayer = new ol.layer.Tile( {
	source : new ol.source.WMTS( {
		layer : 'TXEMAP',
		style : 'default',
		version : '1.0.0',
		matrixSet : 'TileMatrixSet0',
		format : 'image/png',
		url : 'http://www.txmap.gov.cn/TXEMAP/service/WMTS',
		tileGrid : tdtGrid,
		wrapX : true,
		projection : projection
	})
});

var citywmtsAnnoLayer = new ol.layer.Tile( {
	source : new ol.source.WMTS( {
		layer : 'TXEMAPANNO',
		style : 'default',
		version : '1.0.0',
		matrixSet : 'TileMatrixSet0',
		format : 'image/png',
		url : 'http://www.txmap.gov.cn/TXEMAPANNO/service/WMTS',
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
// var isSel = false;

/**
 * @desc 初始化
 * @return
 */
$(function(){
	initMap();
	// showJq();
	// var data={"devWorking": {
 //                    "name": "窨井盖",
 //                    "type": "1",
	// 	    "dev":[{"id":1,"devNo": "10002273","pointY":"120.320631","pointX":"30.311294","state":"在线"}]}};
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
			center : [120.492186, 30.742600],
			zoom :17,
			maxZoom:20,
			projection : projection
		}),
		layers : [ wmtsVecLayer,wmtsAnnoLayer,citywmtsVecLayer,citywmtsAnnoLayer],
		target : 'map'
	});
	// initExtent = [120.451250,30.728373,120.526867,30.760560];
	// map.getView().fit(initExtent,map.getSize());//自动定位区域
	map.addLayer(jqLayer);
	map.addLayer(devVectorLayer);
	map.addInteraction(singleClickSelect);
	singleClickSelect.on("select",devSelectHandler,this);
}

function devSelectHandler(evt){
	// isSel = true ;
	var selFeatures = evt.target.getFeatures();
	var devObj;
	if(selFeatures.getLength()>0){
			var ptCoord = selFeatures.item(0).getGeometry().getCoordinates();
			console.log(selFeatures.item(0).getProperties());
	  		map.getView().setCenter(ptCoord);
	  		devObj = {"devNo":selFeatures.item(0).get("devNo"),"type":selFeatures.item(0).get("devType")};
		// 	switch(type){
		// 	case '1':
		// 		devObj = {"deviceId":selFeatures.item(0).get("deviceId")};
		// 		//devObj = {"devNo":selFeatures.item(0).get("devNo")};
		// 		break;
		// 	case '2':
		// 		devObj = {"devNo":selFeatures.item(0).get("devNo")};
		// 		//devObj = {"lightId":selFeatures.item(0).get("lightId")};
		// 		break;
		// 	case '3':
		// 		devObj = {"devNo":selFeatures.item(0).get("devNo")};
		// 		//devObj = {"firehydrantNo":selFeatures.item(0).get("firehydrantNo")};
		// 		break;
		// 	case '4':
		// 		devObj = {"devNo":selFeatures.item(0).get("devNo")};
		// 		devObj = {"deviceId":selFeatures.item(0).get("deviceId")};
		// 		//devObj = {"logicid":selFeatures.item(0).get("logicid")};
		// 		break;
		// 	case '5':
		// 		devObj = {"devNo":selFeatures.item(0).get("devNo")};
		// 		//devObj = {"deviceId":selFeatures.item(0).get("deviceId")};
		// 		//devObj = {"firehydrantNo":selFeatures.item(0).get("firehydrantNo")};
		// 		break;
		// 	case '6':
		// 		devObj = {"code":selFeatures.item(0).get("code")};
		// 		break;
		// 	case '7':
		// 		devObj = {"devNo":selFeatures.item(0).get("devNo")};
		// 		break;
		// 	case '8':
		// 		devObj = {"homeId":selFeatures.item(0).get("homeId")};
		// 		break;
		// 	case '9':
		// 		devObj = {"homeId":selFeatures.item(0).get("homeId")};
		// 		break
		// }
		clickWindow(devObj);
	}
}

function loadData(data,showType){
	var dataJson = data.result;
	  // var dataJson = $.parseJSON(data);
	//map.getView().fit(initExtent,map.getSize());
	devVectorSource.clear();
	singleClickSelect.getFeatures().clear();
	// if(dataJson.type=='8'){
	// 	type = '8';
	// 	var devArr = dataJson.data;
	// 	var count = devArr.length;
	// 	if(count>0){
	// 		var features = new Array();
	// 		$.each(devArr,function(i,dev){
	// 			if(dev.longitude && dev.latitude){
	// 					var feature = new ol.Feature(new ol.geom.Point([parseFloat(dev.longitude),parseFloat(dev.latitude)]));
	// 					feature.setProperties(dev);
	// 					feature.set("devType",type);
	// 					features.push(feature);
	// 				}
	// 			}
	// 		);
	// 		devVectorSource.addFeatures(features);
	// 		var num = parseInt(Math.random()*features.length,10);
	// 		var ft = features[num];
	// 		var ptCoord = ft.getGeometry().getCoordinates();
	// 		map.getView().setCenter(ptCoord);
	// 	}
	// }
	// else{
		type = dataJson.devWorking.type.toString();
		var devArr = dataJson.devWorking.dev;
		var count = devArr.length;

		if(count>0){
			var features = new Array();
			if(showType==null){
				if(type==10){
					var feature = new ol.Feature(new ol.geom.Point([parseFloat(devArr[0].pointX),parseFloat(devArr[0].pointY)]));
					feature.setProperties(devArr[0]);
					feature.set("devType",type);
					features.push(feature);
				}else{
					$.each(devArr,function(i,dev){
						if(dev.pointX && dev.pointY){
							var feature = new ol.Feature(new ol.geom.Point([parseFloat(dev.pointX),parseFloat(dev.pointY)]));
							feature.setProperties(dev);
							feature.set("devType",type);
							features.push(feature);
						}
					});
				}
			}else if(showType==4) {
				$.each(devArr,function(i,dev){
					if(dev.state == "告警"){
						if(dev.pointX && dev.pointY){
							var feature = new ol.Feature(new ol.geom.Point([parseFloat(dev.pointX),parseFloat(dev.pointY)]));
							feature.setProperties(dev);
							feature.set("devType",type);
							features.push(feature);
						}
					}
				});
			}
			devVectorSource.addFeatures(features);
			var num = parseInt(Math.random()*features.length,10);
			var ft = features[num];
			switch (type) {
				case "1":
					initExtent = [120.467828,30.735798,120.506001,30.753543];
					break;
				case "2":
					initExtent = [120.478037,30.746318,120.498057,30.755416];
					break;
				case "3":
					initExtent = [120.490603,30.746466,120.498249,30.750173];
					break;
				case "4":
					initExtent = [120.475134,30.745078,120.494500,30.753972];
					break;
				case "5":
					initExtent = [120.478037,30.746318,120.498057,30.755416];
					break;
				case "6":
					initExtent = [120.478037,30.746318,120.498057,30.755416];
					break;
				case "7":
					initExtent = [120.478037,30.746318,120.498057,30.755416];
					break;
				case "8":
					initExtent = [120.462687,30.7347403,120.501032,30.756479];
					break;
				case "9":
					initExtent = [120.488975,30.739096,120.508308,30.747872];
					break;
				case "10":
					initExtent = [120.497751,30.743261,120.502724,30.745533];
					break;
				default:
					initExtent = [120.478037,30.746318,120.498057,30.755416];
					break;
			}
			map.getView().fit(initExtent,map.getSize());
			// var ptCoord = ft.getGeometry().getCoordinates();
			// map.getView().setCenter(ptCoord);
			// map.getView().setZoom(map.getView().getZoom()+1);
		}
	// }
}

function pointStyleFunction(feature,resolution){
	var state = feature.get('state');
	var imgPath;
	switch(type){
		case '1':
		if(state=='在线'){
			if(feature.get('open')=="1"){
				imgPath = 'image/icon/jgd_open_online.png';
			}else {
				imgPath = 'image/icon/jgd_close_online.png';
			}
			
		}
		else if(state=='离线'){
			imgPath = 'image/icon/jgd_offline.png';
		}
		else if(state=='失联'){
			imgPath = 'image/icon/jgd_lose.png';
		}
		else{
			if(feature.get('open')=="1"){
				imgPath = 'image/icon/jgd_onlineopen_alarm.png';
			}else {
				imgPath = 'image/icon/jgd_onlineclose_alarm.png';
			}
			
		}
		break;
		case '2':
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
		// }
		break;
		case '3':
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
		case '4':
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
		case '5':
		if(state=='在线'){
			imgPath = 'image/icon/yw_online.png';
		}
		else if(state=='离线'){
			imgPath = 'image/icon/yw_offline.png';
		}
		else if(state=='失联'){
			imgPath = 'image/icon/yw_lose.png';
		}
		else{
			imgPath = 'image/icon/yw_alarm.png';
		}
		break;
		case '6':
		if(state=='在线'){
			imgPath = 'image/icon/yg_number_online.png';
		}
		else if(state=='离线'){
			imgPath = 'image/icon/yg_number_offline.png';
		}
		else if(state=='失联'){
			imgPath = 'image/icon/yg_nymber_lose.png';
		}
		else{
			imgPath = 'image/icon/yg_number_alarm.png';
		}
		break;
		case '7':
		if(state=='在线'){
			imgPath = 'image/icon/sz_online.png';
		}
		else if(state=='离线'){
			imgPath = 'image/icon/sz_offline.png';
		}
		else if(state=='失联'){
			imgPath = 'image/icon/sz_lose.png';
		}
		else{
			imgPath = 'image/icon/sz_alarm.png';
		}
		break;
		case '8':
		if(state=='在线'){
			imgPath = 'image/icon/hj_online.png';
		}
		else if(state=='离线'){
			imgPath = 'image/icon/hj_offline.png';
		}
		else if(state=='失联'){
			imgPath = 'image/icon/hj_lose.png';
		}
		else{
			imgPath = 'image/icon/hj_alarm.png';
		}
		break;
		case '9':
		if(state=='在线'){
			imgPath = 'image/icon/qx_online.png';
		}
		else if(state=='离线'){
			imgPath = 'image/icon/qx_offline.png';
		}
		else if(state=='失联'){
			imgPath = 'image/icon/qx_lose.png';
		}
		else{
			imgPath = 'image/icon/qx_alarm.png';
		}
		break;
		case '10':
		if(state=='在线'){
			imgPath = 'image/icon/tc_number_online.png';
		}
		else if(state=='离线'){
			imgPath = 'image/icon/tc_number_offline.png';
		}
		else if(state=='失联'){
			imgPath = 'image/icon/tc_number_lose.png';
		}
		else{
			imgPath = 'image/icon/tc_number_alarm.png';
		}
		break;
		// case '8':
		// var status="失联";
		// if(feature.get('devlist').length>0){
		// 	var isOffLine=false;
		// 	for(var i=0;i<feature.get('devlist').length;i++){
		// 		if(feature.get('devlist')[i].status=='离线'){
		// 			isOffLine=true;
		// 		}
		// 	}
		// 	status=isOffLine?'离线':'在线';
		// }
		// if(status=='在线'){
		// 	imgPath = 'image/icon/wf_online.png';
		// }
		// else if(status=='离线'){
		// 	imgPath = 'image/icon/wf_offline.png';
		// }
		// else if(status=='失联'){
		// 	imgPath = 'image/icon/wf_lose.png';
		// }
		// else{
		// 	imgPath = 'image/icon/wf_alarm.png';
		// }
		// break;
	}
	return [new ol.style.Style({
			image: new ol.style.Icon({
				// anchor: [0.5, 1],
				// opacity: 0.9,
				src: 'src/' + imgPath
			})
		})]
}


var ldFeature;
function clickSelectStyle(feature,resolution){
	var state = feature.get('state');
	var imgPath;
	switch(type){
		case '1':
		if(state=='在线'){
			if(feature.get('open')=="1"){
				imgPath = 'image/select/jgd_onlineopen_sel.png';
			}else {
				imgPath = 'image/select/jgd_onlineclose_sel.png';
			}
		}
		else if(state=='离线'){
			imgPath = 'image/select/jgd_offline_sel.png';
		}
		else if(state=='失联'){
			imgPath = 'image/select/jgd_lose_sel.png';
		}
		else{
			if(feature.get('open')=="1"){
				imgPath = 'image/select/jgd_onlineopen_alarm_sel.png';
			}else {
				imgPath = 'image/select/jgd_onlineclose_alarm_sel.png';
			}
			
		}
		break;
		case '2':
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
		// }
		// ldFeature = feature;
		// changeLdIcon(false);
		break;
		case '3':
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
		case '4':
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
		case '5':
		if(state=='在线'){
			imgPath = 'image/select/yw_online_sel.png';
		}
		else if(state=='离线'){
			imgPath = 'image/select/yw_offline_sel.png';
		}
		else if(state=='失联'){
			imgPath = 'image/select/yw_lose_sel.png';
		}
		else{
			imgPath = 'image/select/yw_alarm_sel.png';
		}
		break;
		case '6':
		if(state=='在线'){
			imgPath = 'image/select/yg_onlinenumber_sel.png';
		}
		else if(state=='离线'){
			imgPath = 'image/select/yg_offlinenumber_sel.png';
		}
		else if(state=='失联'){
			imgPath = 'image/select/yg_losenumber_sel.png';
		}
		else{
			imgPath = 'image/select/yg_alarmnumber_sel.png';
		}
		break;
		case '7':
		if(state=='在线'){
			imgPath = 'image/select/sz_online_sel.png';
		}
		else if(state=='离线'){
			imgPath = 'image/select/sz_offline_sel.png';
		}
		else if(state=='失联'){
			imgPath = 'image/select/sz_lose_sel.png';
		}
		else{
			imgPath = 'image/select/sz_alarm_sel.png';
		}
		break;
		case '8':
		if(state=='在线'){
			imgPath = 'image/select/hj_online_sel.png';
		}
		else if(state=='离线'){
			imgPath = 'image/select/hj_offline_sel.png';
		}
		else if(state=='失联'){
			imgPath = 'image/select/hj_lose_sel.png';
		}
		else{
			imgPath = 'image/select/hj_alarm_sel.png';
		}
		break;
		case '9':
		if(state=='在线'){
			imgPath = 'image/select/qx_online_sel.png';
		}
		else if(state=='离线'){
			imgPath = 'image/select/qx_offline_sel.png';
		}
		else if(state=='失联'){
			imgPath = 'image/select/qx_lose_sel.png';
		}
		else{
			imgPath = 'image/select/qx_alarm_sel.png';
		}
		break;
		case '10':
		if(state=='在线'){
			imgPath = 'image/select/tc_onlinenumber_sel.png';
		}
		else if(state=='离线'){
			imgPath = 'image/select/tc_offlinenumber_sel.png';
		}
		else if(state=='失联'){
			imgPath = 'image/select/tc_losenumber_sel.png';
		}
		else{
			imgPath = 'image/select/tc_alarmnumber_sel.png';
		}
		break;
		// case '8':
		// var status="失联";
		// if(feature.get('devlist').length>0){
		// 	var isOffLine=false;
		// 	for(var i=0;i<feature.get('devlist').length;i++){
		// 		if(feature.get('devlist')[i].status=='离线'){
		// 			isOffLine=true;
		// 		}
		// 	}
		// 	status=isOffLine?'离线':'在线';
		// }
		// if(status=='在线'){
		// 	imgPath = 'image/select/wf_online_sel.png';
		// }
		// else if(status=='离线'){
		// 	imgPath = 'image/select/wf_offline_sel.png';
		// }
		// else if(status=='失联'){
		// 	imgPath = 'image/select/wf_lose_sel.png';
		// }
		// else{
		// 	imgPath = 'image/select/wf_alarm_sel.png';
		// }
		// break;
	}
	return [new ol.style.Style({
			image: new ol.style.Icon({
				// anchor: [0.5, 1],
				// opacity: 0.9,
				src: 'src/' + imgPath
			})
		})]
}

function changeLdIcon(isOpen){
	var state = ldFeature.get('state');
	var imgPath;
	if(ldFeature){
		if(isOpen){
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
		var style = new ol.style.Style({
			image: new ol.style.Icon({
				src: 'src/' + imgPath
			})
		});
		ldFeature.setStyle(style);
	}
	return ldFeature;
}

function showJq(){
	var esrijsonFormater = new ol.format.EsriJSON();
	var jqSource = new ol.source.Vector();
	// var jqLayer = new ol.layer.Vector({//街区图层
	// 	// source:jqSource,
	// 	style:jqStyleFunction
	// });
	var url="http://202.96.123.73:6080/arcgis/rest/services/xiasha/xiashajq/MapServer/0/query"
	var data ={
		f:'pjson',
		where:'1=1',
		returnGeometry:true,
		outFields:'*'
	};
	$.ajax({
		url:url,
		data:data,
		success:function(results){
			var features = esrijsonFormater.readFeatures(results);
			if(features.length>0){
				jqSource.addFeatures(features);
			}
		}
	});

	if(jqLayer.getSource()){//source不为空
		jqLayer.setSource(null);
	}else{//图层source为空时设置source
		jqLayer.setSource(jqSource);
	}
}

function jqStyleFunction(feature,resolution){
	var jqStyle = new ol.style.Style({
			fill:new ol.style.Fill({
				color:"rgba(20,131,255,0.2)"
			}),
			stroke:new ol.style.Stroke({
				color: "#1483ff",
				width: 3,
				lineDash:[5]
			})
		});
	return [jqStyle];
}
