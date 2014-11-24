/**
 * TODO
 */
Mapea.Parameter.Projection = OpenLayers.Class(Mapea.Parameter, {
	
	srs : null,

	units : null,

	isDefault : false,

	initialize: function(parameter) {
		Mapea.Parameter.prototype.initialize.apply(this, [parameter]);
		this.setMap(); // automatic execution
	},
	
	applyDefault : function() {
		this.buildProjection("EPSG:23030*m");
	},

	applyParameter : function() {
		this.buildProjection(this.parameter);
	},

	buildProjection : function(projectionParameter) {
		var srsUnit = projectionParameter.split("*");
							
		if (srsUnit.length == 2)
		{
			// SRS CODE
			var invalidCode = false;
			var projectionCode = srsUnit[0];
			if (projectionCode)
			{
				projectionCode =  OpenLayers.String.trim(projectionCode);
				(projectionCode.length > 0)? this.srs = projectionCode : invalidCode = true;
			}
			else
			{
				invalidCode = true;
			}
			if (invalidCode)
				Mapea.Util.showErrorMessage('El código SRS del parámetro <b><i>projection</i></b> no es válido');
			
			// UNITS
			var projectionUnits = srsUnit[1];
			if (projectionUnits)
			{
				projectionUnits = OpenLayers.String.trim(projectionUnits);
				if (/m|d|degrees/i.test(projectionUnits))
				{
					projectionUnits = projectionUnits.toLowerCase();
					if (projectionUnits == "d")
						projectionUnits = "degrees";
						
					this.units = projectionUnits	
				}
				else
				{
					throw 'La unidad del parámetro <b><i>projection</i></b> no es válida';
				}
			}
			else
			{
				throw 'No ha especificado la unidad en el parámetro <b><i>projection</i></b>';
			}
		}
		else 
		{
			throw 'El formato del parámetro <b><i>projection</i></b> es erróneo';
		}
	},

	CLASS_NAME: "Mapea.Parameter.Projection"
});