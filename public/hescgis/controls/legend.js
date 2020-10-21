goog.provide("HESCGIS.control.Legend");

goog.require('ol.control.Control');


HESCGIS.control.Legend = function(opt_options){
	var options = opt_options ? opt_options : {};

	//this.layers_ = options.layers ? options.layers : [];

	this.display_  = options.dsiplay ? options.display : true;

	var cssClassName_ = options.className ? options.className : "hescgis-control-legend";
	var containerElement = this.div_ = document.createElement("div");
	containerElement.className = cssClassName_ + ' ' + ol.css.CLASS_UNSELECTABLE + ' ' + ol.css.CLASS_CONTROL;
	
	this.legendDiv_ = null;
	
	ol.control.Control.call(this, {
		element: containerElement,
		target:options.target
	});
	
	
//	this.init_();
};
ol.inherits(HESCGIS.control.Legend, ol.control.Control);

HESCGIS.control.Legend.prototype.setMap = function(map){
	ol.control.Control.prototype.setMap.call(this, map);
	if (map) {
		
		//this.init_();
		this.loadContents();
	} else {
		//this.destroy_();
	}
};

HESCGIS.control.Legend.prototype.init_ = function(){
	this.addEventListener(HESCGIS.event.EventType.LayerChange,function(evt){
		evt.preventDefault();
//		var layer = ol.layer.Vector()
	});
};
//
//HESCGIS.control.Legend.prototype.init_ = function(){
//
//};
//
//HESCGIS.control.Legend.prototype.destroy_ = function(){
//
//};


HESCGIS.control.Legend.prototype.setDisplay = function(display){
	this.display_  = display;
};


HESCGIS.control.Legend.prototype.loadContents = function(){
	if(!this.legendDiv_){
		this.legendDiv_ = document.createElement("div");
		this.legendDiv_.className = "legendDiv";
		this.div_.appendChild(this.legendDiv_);

		// create span
		var labelSpan = document.createElement("label");
		labelSpan.innerHTML = "图 例";
		labelSpan.className = "title";
		this.legendDiv_.appendChild(labelSpan); 
		var brSpan = document.createElement("br");
		this.legendDiv_.appendChild(brSpan); 
	}
};


