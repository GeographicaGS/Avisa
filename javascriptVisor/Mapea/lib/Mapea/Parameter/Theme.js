/**
 * TODO
 */
Mapea.Parameter.Theme = OpenLayers.Class(Mapea.Parameter, {
    
    isLoaded : false,

    callback : OpenLayers.Function.Void,

    initialize: function(parameter, callback) {
        Mapea.Parameter.prototype.initialize.apply(this, [parameter]);

        if (callback != null) {
            this.callback = callback;
        }
    },
    
    applyDefault : function() {
        this.buildTheme("default");
    },

    applyParameter : function() {
        this.buildTheme(this.parameter);
    },

    buildTheme : function(themeParameter) {

        // removes existing imported mapea styles
        Mapea.Util.removeMapeaCSSFiles();

        // redefines the THEME paths for the new theme
        Mapea.Util.setThemePaths(themeParameter);

        // loads the jquery CSS file
        if (!Mapea.global.jQueryCssLoaded) {
            Mapea.Util.loadCSSFile(Mapea.global.THEME_JQUERY_PATH,
                OpenLayers.Function.bind(function() {
                    Mapea.global.jQueryCssLoaded = true;
                    this.themeLoaded();
            }, this));
        }

        // loads the mapea CSS file
        Mapea.Util.loadCSSFile(Mapea.global.THEME_CSS_PATH,
            OpenLayers.Function.bind(function() {
                Mapea.global.mapeaCssLoaded = true;
                this.themeLoaded();
        }, this));
    },

    themeLoaded : function() {

        this.isLoaded = (Mapea.global.jQueryCssLoaded
            && Mapea.global.mapeaCssLoaded);

        // resize all panels
        if (this.isLoaded) {
            Mapea.Util.resizeAllPanels(this.map);

            /**
             * if the user specified the control measurebar
             * then establishes the defined color for
             * measure paths and areas
             */
            var measureControls = this.map.getControlsByClass("OpenLayers.Control.Measure");
            if (measureControls.length > 0) {
                // get the color defined in the theme
                var styleColor = Mapea.Util.getMeasurePathAreaColor(this.map);
                var pathAreaColorRule = new OpenLayers.Rule({
                    symbolizer: {
                        "Point": {
                            pointRadius: 6,
                            graphicName: "circle",
                            fillColor: styleColor,
                            fillOpacity: 0.3,
                            strokeWidth: 3,
                            strokeOpacity: 1,
                            strokeColor: styleColor
                        },
                        "Line": {
                            strokeWidth: 3,
                            strokeOpacity: 1,
                            strokeColor: styleColor,
                            strokeDashstyle: "none"
                        },
                        "Polygon": {
                            strokeWidth: 3,
                            strokeOpacity: 1,
                            strokeColor: styleColor,
                            fillColor: styleColor,
                            fillOpacity: 0.5
                        }
                    }
                });
                var newPathAreaColorStyle = new OpenLayers.Style();
                newPathAreaColorStyle.addRules([pathAreaColorRule]);

                // gets the measures
                for (var i=0,ilen=measureControls.length; i < ilen; i++) {
                    measureControls[i].handler.layerOptions.styleMap.styles["default"] = newPathAreaColorStyle;
                }
            }

            this.callback();
        }
    },

    CLASS_NAME: "Mapea.Parameter.Theme"
});