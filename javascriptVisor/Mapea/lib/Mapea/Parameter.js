Mapea.Parameter = OpenLayers.Class({
	
	parameter : null,

	map : null,

	defined : false,

	isDefault : true,

	initialize: function(parameter) {
		this.parameter = parameter;
		this.isDefault = Mapea.Util.isNullOrEmpty(parameter);
	},

	setMap : function(map) {
		this.map = map;
		this.isDefault? this.applyDefault() : this.applyParameter();
	},

	CLASS_NAME: "Mapea.Parameter"
});