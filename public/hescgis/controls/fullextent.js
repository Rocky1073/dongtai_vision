goog.provide("HESCGIS.control.FullExtent");

goog.require('ol.control.Control');

/**
 * 伪控件:全图。
 */
HESCGIS.control.FullExtent = function(opt_options){

	var options = opt_options ? opt_options : {};

	this.map_ = options.map ? options.map : null;

	/**
	 * @type {ol.Extent}
	 * @protected
	 */
	this.extent = options.extent ? options.extent : null;

	/**
	 * @type {element}
	 * @protected required
	 */
	this.element = options.element ? options.element :null;

	var tipLabel = options.tipLabel !== undefined ?
			options.tipLabel : '全图';

	if(this.element){
		this.element.title = tipLabel;

	ol.events.listen(this.element, ol.events.EventType.CLICK,
				this.handleClick_, this);
	}else{
		throw new Error("element 未定义!")
	}
};


/**
 * @param {Event} event The event to handle
 * @private
 */
HESCGIS.control.FullExtent.prototype.handleClick_ = function(event) {
	event.preventDefault();
	this.handleZoomToExtent();
};


/**
 * @protected
 */
HESCGIS.control.FullExtent.prototype.handleZoomToExtent = function() {
	if(this.map_){
		var view = this.map_.getView();
		var extent = !this.extent ? view.getProjection().getExtent() : this.extent;
		view.fit(extent);
	}else{
		throw new Error("map未定义！");
	}

};