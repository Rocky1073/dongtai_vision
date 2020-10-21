goog.provide("HESCGIS.utils.ToolUtil");

HESCGIS.utils.ToolUtil  = {
		/**
		 * 获取当前根目录地址
		 */
		getWebRootPath:function(){
				//获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
			 var curWwwPath = window.document.location.href;
			 //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
			 var pathName = window.document.location.pathname;
			 var pos = curWwwPath.indexOf(pathName);
			 //获取主机地址，如： http://localhost:8083
			 var localhostPaht = curWwwPath.substring(0, pos);
			 //获取带"/"的项目名，如：/uimcardprj
			 var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
			 return (localhostPaht + projectName); 
		},
		
		
		loadGeoSvrWFSSource: function(url,typename, filter) {
			var me = this;
			var vectorSource = new ol.source.Vector({
				loader: function(extent, resolution, projection) {
					jQuery.support.cors = true;
					$.ajax({
						url: url,
						cache: false,
						dataType: 'json',
						data: {
							'service': 'WFS',
							'version': '1.0.0',
							'request': 'GetFeature',
							'outputFormat': 'application/json',
							'typename': typename,
							'filter': filter ? filter : ''
//							'CQL_FILTER':"streetcode='002001004001'"
						}
					}).done(function(data) {
						var total = data.totalFeatures;
						console.log('共加载' + total + '个Feature。');
						if (total) { // 要素总数存在且不为0
							// 设置几何字段名，默认为'geometry'，而PostGIS图层的几何字段名为'the_geom'
							var geojsonFormat = new ol.format.GeoJSON({
								geometryName: data.features[0].geometry_name
							});
							vectorSource.addFeatures(geojsonFormat.readFeatures(data));
						}
					}).fail(function(data, status, desc) {
						throw new Error(status + "\n" + desc);
					});
				},
				strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({maxZoom:20}))
			});
			return vectorSource;
		}
};