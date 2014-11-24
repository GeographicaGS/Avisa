/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Popup/Framed.js
 * @requires OpenLayers/Util.js
 */

/**
 * Class: OpenLayers.Popup.FramedCloud
 * 
 * Inherits from: - <OpenLayers.Popup.Framed>
 */
Mapea.Popup.FramedCloud = OpenLayers.Class(OpenLayers.Popup.FramedCloud, {

    /**
     * APIProperty: imageSize {<OpenLayers.Size>}
     */
    imageSize : new OpenLayers.Size(676, 736),
    
    /**
     * APIProperty: isAlphaImage {Boolean} The FramedCloud does
     * not use an alpha image (in honor of the good ie6 folk out
     * there)
     */
    isAlphaImage : false,
    
    /**
     * APIProperty: fixedRelativePosition {Boolean} The Framed
     * Cloud popup works in just one fixed position.
     */
    fixedRelativePosition : false,
    
    /**
     * Property: positionBlocks {Object} Hash of differen
     * position blocks, keyed by relativePosition two-character
     * code string (ie "tl", "tr", "bl", "br")
     */
    positionBlocks : {
        "tl" : {
            //'offset' : new OpenLayers.Pixel(44, 0),
            'offset' : new OpenLayers.Pixel(44, 7),
            'padding' : new OpenLayers.Bounds(8, 40, 8, 9),
            'blocks' : [
                    { // top-left
                        size : new OpenLayers.Size('auto',
                                'auto'),
                        anchor : new OpenLayers.Bounds(0, 51,
                                22, 0),
                        position : new OpenLayers.Pixel(0, 0)
                    },
                    { // top-right
                        size : new OpenLayers.Size(22, 'auto'),
                        anchor : new OpenLayers.Bounds(null,
                                50, 0, 0),
                        position : new OpenLayers.Pixel(-638, 0)
                    },
                    { // bottom-left
                        size : new OpenLayers.Size('auto', 19),
                        anchor : new OpenLayers.Bounds(0, 32,
                                22, null),
                        position : new OpenLayers.Pixel(0, -631)
                    },
                    { // bottom-right
                        size : new OpenLayers.Size(22, 18),
                        anchor : new OpenLayers.Bounds(null,
                                32, 0, null),
                        position : new OpenLayers.Pixel(-638,
                                -632)
                    },
                    { // stem
                        size : new OpenLayers.Size(83, 35),
                        anchor : new OpenLayers.Bounds(null, 0,
                                0, null),
                        position : new OpenLayers.Pixel(0, -687)
                    } ]
        },
        "tr" : {
            //'offset' : new OpenLayers.Pixel(-45, 0),
            'offset' : new OpenLayers.Pixel(-44, 7),
            'padding' : new OpenLayers.Bounds(8, 40, 8, 9),
            'blocks' : [
                    { // top-left
                        size : new OpenLayers.Size('auto',
                                'auto'),
                        anchor : new OpenLayers.Bounds(0, 51,
                                22, 0),
                        position : new OpenLayers.Pixel(0, 0)
                    },
                    { // top-right
                        size : new OpenLayers.Size(22, 'auto'),
                        anchor : new OpenLayers.Bounds(null,
                                50, 0, 0),
                        position : new OpenLayers.Pixel(-638, 0)
                    },
                    { // bottom-left
                        size : new OpenLayers.Size('auto', 19),
                        anchor : new OpenLayers.Bounds(0, 32,
                                22, null),
                        position : new OpenLayers.Pixel(0, -631)
                    },
                    { // bottom-right
                        size : new OpenLayers.Size(22, 19),
                        anchor : new OpenLayers.Bounds(null,
                                32, 0, null),
                        position : new OpenLayers.Pixel(-638,
                                -631)
                    },
                    { // stem
                        size : new OpenLayers.Size(81, 35),
                        anchor : new OpenLayers.Bounds(0, 0,
                                null, null),
                        position : new OpenLayers.Pixel(-216,
                                -687)
                    } ]
        },
        "bl" : {
            'offset' : new OpenLayers.Pixel(44, 0),
            'padding': new OpenLayers.Bounds(8, 9, 8, 40),
            'blocks' : [
                    { // top-left
                        // size: new OpenLayers.Size('auto',
                        // 300),
                        size : new OpenLayers.Size('auto',
                                'auto'),
                        anchor : new OpenLayers.Bounds(0, 21,
                                22, 32),
                        position : new OpenLayers.Pixel(0, 0)
                    },
                    { // top-right
                        // size: new OpenLayers.Size(22, 300),
                        size : new OpenLayers.Size(22, 'auto'),
                        anchor : new OpenLayers.Bounds(null,
                                21, 0, 32),
                        position : new OpenLayers.Pixel(-638, 0)
                    },
                    { // bottom-left
                        size : new OpenLayers.Size('auto', 21),
                        anchor : new OpenLayers.Bounds(0, 0,
                                22, null),
                        position : new OpenLayers.Pixel(0, -629)
                    },
                    { // bottom-right
                        size : new OpenLayers.Size(22, 21),
                        anchor : new OpenLayers.Bounds(null, 0,
                                0, null),
                        position : new OpenLayers.Pixel(-638,
                                -629)
                    },
                    { // stem
                        size : new OpenLayers.Size(87, 35),
                        anchor : new OpenLayers.Bounds(null,
                                null, 0, 0),
                        position : new OpenLayers.Pixel(-99,
                                -674)
                    } ]
        },
        "br" : {
            'offset' : new OpenLayers.Pixel(-44, 0),
            'padding' : new OpenLayers.Bounds(8, 9, 8, 40),
            'blocks' : [
                    { // top-left
                        // size: new OpenLayers.Size('auto',
                        // 300),
                        size : new OpenLayers.Size('auto',
                                'auto'),
                        anchor : new OpenLayers.Bounds(0, 21,
                                22, 32),
                        position : new OpenLayers.Pixel(0, 0)
                    },
                    { // top-right
                        // size: new OpenLayers.Size(22, 300),
                        size : new OpenLayers.Size(22, 'auto'),
                        anchor : new OpenLayers.Bounds(null,
                                21, 0, 32),
                        position : new OpenLayers.Pixel(-638, 0)
                    },
                    { // bottom-left
                        size : new OpenLayers.Size('auto', 21),
                        anchor : new OpenLayers.Bounds(0, 0,
                                22, null),
                        position : new OpenLayers.Pixel(0, -629)
                    },
                    { // bottom-right
                        size : new OpenLayers.Size(22, 21),
                        anchor : new OpenLayers.Bounds(null, 0,
                                0, null),
                        position : new OpenLayers.Pixel(-638,
                                -629)
                    },
                    { // stem
                        size : new OpenLayers.Size(81, 35),
                        anchor : new OpenLayers.Bounds(0, null,
                                null, 0),
                        position : new OpenLayers.Pixel(-312,
                                -674)
                    } ]
        }
    },
    
    /**
     * APIProperty: minSize {<OpenLayers.Size>}
     */
    minSize : new OpenLayers.Size(105, 10),
    
    /**
     * APIProperty: maxSize {<OpenLayers.Size>}
     */
    maxSize : new OpenLayers.Size(600, 660),
    
    /**
     * Property: jsBlockedMessage Message to show when someone
     * tried to execute javascript code in a popup
     */
    jsBlockedMessage : "<br/><br/><i>-- javascript blocked --</i><br/><br/>",
    
    /**
     * Property: scriptRegExp RegExp to detect nested script
     * tags
     */
    scriptRegExp : /(<(\s)*script([^>])*>)+([^<])*(<(\s)*\/(\s)*script([^>])*>)+/gi,
    
    /**
     * Property: evalRegExp RegExp to detect an execution of
     * eval
     */
    evalRegExp : /\+?(\s)*eval(\s)*\(.*\)(\s)*\+?/gi,
    
    /**
     * Property: mobilePopupTop {Integer} CSS top property
     * applied to collapsible popups in device mobiles
     */
    mobilePopupTop : null,
    
    /**
     * Property: popupHeader {DOMElement} Div corresponding
     * to collapsible popup head
     */
    popupHeader : null,
    
    /**
     * Property: closeDiv {DOMElement} Div corresponding
     * to popup close
     */
    closeDiv : null,
    
    /**
     * APIProperty: closeDiv {String} The HTML of the collapsible
     * popups header
     */
    headerHTML : null,

    /**
     * Property: currentState {Enum} State of the collapsible popup
     */
    currentState : null,
    
    /**
     * Constructor: OpenLayers.Popup.FramedCloud
     * 
     * Parameters: id - {String} lonlat - {<OpenLayers.LonLat>}
     * contentSize - {<OpenLayers.Size>} contentHTML - {String}
     * anchor - {Object} Object to which we'll anchor the popup.
     * Must expose a 'size' (<OpenLayers.Size>) and 'offset' (<OpenLayers.Pixel>)
     * (Note that this is generally an <OpenLayers.Icon>).
     * closeBox - {Boolean} closeBoxCallback - {Function}
     * Function to be called on closeBox click.
     */
    initialize : function(id, lonlat, contentSize, contentHTML,
            anchor, closeBox, closeBoxCallback, headerHTML) {
        
        this.imageSrc = Mapea.global.THEME_IMG_PATH + 'popup/cloud-popup-relative.png';
    
        // avoid js execution
        var textLabel = contentHTML;
        textLabel = textLabel.replace(this.scriptRegExp,this.jsBlockedMessage);
        textLabel = textLabel.replace(this.evalRegExp,this.jsBlockedMessage);
    
        /*
         * if it is a mobile device then shows
         * the bottom panel
         */
        if (!Mapea.Util.isMobile) {
            var newArguments = [ id, lonlat, contentSize,textLabel, anchor, closeBox, closeBoxCallback ];
            OpenLayers.Popup.Framed.prototype.initialize.apply(this, newArguments);
            this.contentDiv.className = this.contentDisplayClass;
        }
        else {
            this.id = id;
            this.lonlat = lonlat;
            this.headerHTML = headerHTML;
            this.contentHTML = textLabel;
            this.anchor = anchor;
            this.closeBox = closeBox;
            this.closeBoxCallback = closeBoxCallback;
            this.size = this.maxSize;
            this.lonlat = lonlat;
        }
        
    },
    
    /**
     * Method: updateRelativePosition
     * When the relative position changes, we need to set the new padding 
     *     BBOX on the popup, reposition the close div, and update the blocks.
     */
    updateRelativePosition: function() {
        if (!Mapea.Util.isMobile) {
            //update the padding
            this.padding = this.positionBlocks[this.relativePosition].padding;

            //update the position of our close box to new padding
            if (this.closeDiv) {
                // use the content div's css padding to determine if we should
                //  padd the close div
                var contentDivPadding = this.getContentDivPadding();

                this.closeDiv.style.right = (contentDivPadding.right - 2) + 
                                            this.padding.right + "px";
                this.closeDiv.style.top = (contentDivPadding.top - 2) + 
                                          this.padding.top + "px";
            }
            this.updateBlocks();
        }
    },

    /**
     * Method: setSize
     * Used to adjust the size of the popup. 
     *
     * Parameters:
     * contentSize - {<OpenLayers.Size>} the new size for the popup's 
     *     contents div (in pixels).
     */
    setSize:function(contentSize) {
        if (!Mapea.Util.isMobile) {
            var newContentSize = new OpenLayers.Size(contentSize.w + 16, contentSize.h + 5);
            OpenLayers.Popup.FramedCloud.prototype.setSize.apply(this, [newContentSize]);
        }
    },


    /** 
     * APIMethod: destroy
     */
    destroy: function() {
        if (Mapea.Util.isMobile) {
            OpenLayers.Event.stopObservingElement(this.closeDiv);
            OpenLayers.Event.stopObservingElement(this.popupHeader);
        }
        OpenLayers.Popup.FramedCloud.prototype.destroy.apply(this, arguments);
    },

    /** 
    * Method: draw
    * Constructs the elements that make up the popup.
    *
    * Parameters:
    * px - {<OpenLayers.Pixel>} the position the popup in pixels.
    * 
    * Returns:
    * {DOMElement} Reference to a div that contains the drawn popup
    */
    draw: function(px) {
        if (!Mapea.Util.isMobile) {
            // Map object will put the div into map contianer
            return OpenLayers.Popup.FramedCloud.prototype.draw.apply(this, arguments);
        }
        else {
            // gets the pixel
            if (px == null) {
                if ((this.lonlat != null) && (this.map != null)) {
                    px = this.map.getLayerPxFromLonLat(this.lonlat);
                }
            }

            // creates div and adds classes
            this.div = document.createElement("div");
            OpenLayers.Element.addClass(this.div, "popup-mobile");
            
            // close
            this.closeDiv = document.createElement("div");
            OpenLayers.Element.addClass(this.closeDiv, "popup-close");
            this.div.appendChild(this.closeDiv);
            
            // header
            this.popupHeader = document.createElement("div");
            OpenLayers.Element.addClass(this.popupHeader, "popup-header");
            // headerHTML
            if (this.headerHTML) {
                this.popupHeader.innerHTML = this.headerHTML;
            }
            this.div.appendChild(this.popupHeader);
            
            // content
            this.contentDiv = document.createElement("div");
            OpenLayers.Element.addClass(this.contentDiv, "popup-body");
            this.div.appendChild(this.contentDiv);

            // set content
            this.setContentHTML();

            // register events to close popup
            var closePopup = this.closeBoxCallback || function(e) {
                this.hide();
                OpenLayers.Event.stop(e);
            };
            OpenLayers.Event.observe(this.closeDiv, "touchend", 
                    OpenLayers.Function.bindAsEventListener(closePopup, this));
            
            // registers and manages collapse events
            this.manageCollapsableMobilePopup();
            
            // append the popup
            jQuery(this.map.div).parent().get(0).appendChild(this.div);
        }
    },
    
    /**
     * Method: setContentHTML
     * Allows the user to set the HTML content of the popup.
     *
     * Parameters:
     * contentHTML - {String} HTML for the div.
     */
    setContentHTML:function(contentHTML) {
        if (!Mapea.Util.isMobile) {
            OpenLayers.Popup.FramedCloud.prototype.setContentHTML.apply(this, arguments);
        }
        else {
            if (contentHTML != null) {
                this.contentHTML = contentHTML;
            }
           
            if ((this.contentDiv != null) && 
                (this.contentHTML != null) &&
                (this.contentHTML != this.contentDiv.innerHTML)) {
           
                this.contentDiv.innerHTML = this.contentHTML;
            }
        }
    },
    
    
    /**
     * Method: manageCollapsableMobilePopup
     * Registers and manages collapsing events depending on
     * the current position of the popup header and the direction
     * 
     * These are the thresholds:
     *  _____________
     * |     0%      | 6
     * |-------------| 5
     * |     25%     |
     * |-------------| 4
     * |     35%     |
     * |-------------| 3
     * |     50%     |
     * |-------------| 2
     * |     80%     |
     * |-------------| 1
     * |____ 85% ____|
     *
     */
    manageCollapsableMobilePopup : function(updating) {
        // first, calculates the differents tops
        var MAP_HEIGHT = jQuery(this.map.viewPortDiv).height();
        
        // 1
        var COLLAPSED_TOP = MAP_HEIGHT * 0.9;
        var COLLAPSED_HEIGHT = 0;

        // 2
        var SHOW_HALF_THRESHOLD = MAP_HEIGHT * 0.8;

        // 3
        var COLLAPSED_TOP_THRESHOLD = MAP_HEIGHT * 0.5;

        // 4
        var HALF = MAP_HEIGHT * 0.35;
        var HALF_HEIGHT = MAP_HEIGHT * 0.55;

        // 5
        var FULL_TOP_THRESHOLD = MAP_HEIGHT * 0.15;

        // 6
        var FULL_TOP = 0;
        var FULL_HEIGHT = MAP_HEIGHT * 0.9;
        
        // gets jquery div and content div
        var jPopupDiv = jQuery(this.div);
        var jPopupContentDiv = jQuery(this.contentDiv);
        var jPopupHeadDiv = jQuery(this.popupHeader);
        var jPopupCloseDiv = jQuery(this.closeDiv);
        
        var headHeight = Math.min(MAP_HEIGHT * 0.1);
        jPopupHeadDiv.css("height", headHeight).children().css("line-height", headHeight + "px");
        jPopupCloseDiv.css("height", headHeight);

        // if it is updating then unregisters previous events
        if (updating) {
            OpenLayers.Event.stopObservingElement(this.popupHeader);
        }

        // gets the Y position of the popup
        var yStart;
        var headTop;
        OpenLayers.Event.observe(this.popupHeader, "touchstart",
                OpenLayers.Function.bindAsEventListener(function(event) {
            if (event.touches && (event.touches.length > 0)) {
                Mapea.Util.disableVerticalScroll();
                yStart = event.touches[0].clientY;
                headTop = jPopupDiv.offset().top;
                
                /* disable transitions while the user
                 * is dragging the popup */
                var css3TopTransition = {
                    '-webkit-transition' : 'none',
                    '-moz-transition' : 'none',
                    '-ms-transition' : 'none',
                    '-o-transition' : 'none',
                    'transition' : 'none'
                };
                jPopupDiv.css(css3TopTransition);
                jPopupContentDiv.css("height", "100%");
            }
        }, this));

        /* moves the popup (css top property) while
           the user is dragging it */
        OpenLayers.Event.observe(this.popupHeader, "touchmove",
                OpenLayers.Function.bindAsEventListener(function(event) {
            if (event.touches && (event.touches.length > 0)) {
                var touchDifference = (event.touches[0].clientY - yStart);
                this.mobilePopupTop = headTop + touchDifference;
                
                // check top and bottom limits
                if (this.boundsContainsPopup(MAP_HEIGHT, headHeight)) {
                    var cssTop = this.mobilePopupTop + "px";
                    this.div.style.top = cssTop;
                }
                else {
                    return false;
                }
            }
        }, this));
        
        // manages end positions
        OpenLayers.Event.observe(this.popupHeader, "touchend",
                OpenLayers.Function.bindAsEventListener(function(event) {
            // enables again the transitions
            var css3TopTransition = {
                '-webkit-transition' : '',
                '-moz-transition' : '',
                '-ms-transition' : '',
                '-o-transition' : '',
                'transition' : ''
            };
            jPopupDiv.css(css3TopTransition);
            
            /* if mobilePopupTop is undefined or null then the
               user clicked over the popup head */
            if (!this.mobilePopupTop) {
                if (headTop < COLLAPSED_TOP_THRESHOLD) {
                    // collapse
                    this.collapsePopup(jPopupDiv, jPopupContentDiv, COLLAPSED_TOP, COLLAPSED_HEIGHT);
                }
                else {
                    // show half
                    this.showHalfPopup(jPopupDiv, jPopupContentDiv, HALF, HALF_HEIGHT);
                }
            }
            else {
                // checks the direction
                var GO_UP = (yStart > this.mobilePopupTop);
                
                if (GO_UP) {
                    if (this.mobilePopupTop < FULL_TOP_THRESHOLD) {
                        // full top
                        this.showFullPopup(jPopupDiv, jPopupContentDiv, FULL_TOP, FULL_HEIGHT);
                    }
                    else if (this.mobilePopupTop < SHOW_HALF_THRESHOLD) {
                        // show half
                        this.showHalfPopup(jPopupDiv, jPopupContentDiv, HALF, HALF_HEIGHT);
                    }
                    else {
                        // collapsed
                        this.collapsePopup(jPopupDiv, jPopupContentDiv, COLLAPSED_TOP, COLLAPSED_HEIGHT);
                    }
                }
                else {
                    if (this.mobilePopupTop > COLLAPSED_TOP_THRESHOLD) {
                        // collapsed
                        this.collapsePopup(jPopupDiv, jPopupContentDiv, COLLAPSED_TOP, COLLAPSED_HEIGHT);
                    }
                    else if (this.mobilePopupTop > FULL_TOP_THRESHOLD) {
                        // show half
                        this.showHalfPopup(jPopupDiv, jPopupContentDiv, HALF, HALF_HEIGHT);
                    }
                    else {
                        // full top
                        this.showFullPopup(jPopupDiv, jPopupContentDiv, FULL_TOP, FULL_HEIGHT);
                    }
                }
                // reset property
                this.mobilePopupTop = null;
            }
            Mapea.Util.enableVerticalScroll();
            
        }, this));
        
        // by default the popup is collapsed
//        if (!updating || Mapea.Util.isMobile) {
            if (!this.currentState || (this.currentState == Mapea.Popup.FramedCloud.COLLAPSED)) {
                this.collapsePopup(jPopupDiv, jPopupContentDiv, COLLAPSED_TOP, COLLAPSED_HEIGHT);
            }
            else if (this.currentState == Mapea.Popup.FramedCloud.HALF) {
                this.showHalfPopup(jPopupDiv, jPopupContentDiv, HALF, HALF_HEIGHT);
            }
            else if (this.currentState == Mapea.Popup.FramedCloud.FULL) {
                this.showFullPopup(jPopupDiv, jPopupContentDiv, FULL_TOP, FULL_HEIGHT);
            }
//        }
    },
    
    /**
     * Method: boundsContainsPopup
     * Checks if the popup head is contained in the map div
     *
     * Parameters:
     * mapHeight - {Integer} height of the map div
     * headHeight - {Integer} height of the popup head
     *
     * Returns:
     * {Boolean} true if the map div contains the head popup
     */
    boundsContainsPopup : function(mapHeight, headHeight) {
        var isContained = false;
        
        var topLimit = this.mobilePopupTop;
        var botLimit = (this.mobilePopupTop + headHeight);
        var IS_BELOW_TOP_LIMIT = (topLimit >= 0);
        var IS_OVER_BOTTOM_LIMIT = (botLimit <= mapHeight);
        
        isContained = (IS_BELOW_TOP_LIMIT && IS_OVER_BOTTOM_LIMIT);
        
        return isContained;
    },
    
    /**
     * Method: collapsePopup
     * Collapses the popup and center to popup coordinates
     *
     * Parameters:
     * jPopupDiv - {DOMElement} div of the popup
     * jPopupContentDiv - {DOMElement} div of the popup content
     * collapsedTop - {Integer} CSS top of the popup when is collapsed
     * collapsedHeight - {Integer} height of the popup content when is collapsed
     */
    collapsePopup : function(jPopupDiv, jPopupContentDiv, collapsedTop, collapsedHeight) {
        jPopupDiv.css("top", collapsedTop);
        jPopupContentDiv.css("height", collapsedHeight);
        
        
        this.map.panTo(this.lonlat)
        
        this.currentState = Mapea.Popup.FramedCloud.COLLAPSED;
    },
    
    /**
     * Method: showFullPopup
     * Show the popup full screen
     *
     * Parameters:
     * jPopupDiv - {DOMElement} div of the popup
     * jPopupContentDiv - {DOMElement} div of the popup content
     * fullTop - {Integer} CSS top of the popup when is full screen
     * fullHeight - {Integer} height of the popup content when is full screen
     */
    showFullPopup : function(jPopupDiv, jPopupContentDiv, fullTop, fullHeight) {
        jPopupDiv.css("top", fullTop);
        jPopupContentDiv.css("height", fullHeight);

        this.currentState = Mapea.Popup.FramedCloud.FULL;
    },
    
    /**
     * Method: showHalfPopup
     * Show the popup half screen and centers to desplaced popup coordinates
     *
     * Parameters:
     * jPopupDiv - {DOMElement} div of the popup
     * jPopupContentDiv - {DOMElement} div of the popup content
     * halfTop - {Integer} CSS top of the popup when is half screen
     * halfHeight - {Integer} height of the popup content when is half screen
     */
    showHalfPopup : function(jPopupDiv, jPopupContentDiv, halfTop, halfHeight) {
        jPopupDiv.css("top", halfTop);
        jPopupContentDiv.css("height", halfHeight);
        
        // center map
        // desplaced down the clicked point pixel
        var clickedPixel = this.map.getPixelFromLonLat(this.lonlat);
        clickedPixel.y += halfTop;
        // gets the new lonlat of the desplaced pixel
        var desplacedLonLat = this.map.getLonLatFromPixel(clickedPixel);
        if (this.map.panTween && this.map.panTween.playing) {
            this.map.panTween.stop();
        }
        this.map.panTo(desplacedLonLat);

        this.currentState = Mapea.Popup.FramedCloud.HALF;
    },
    
    /**
     * Method: setHeader
     * Sets the popup head
     *
     * Parameters:
     * headerHTML - {DOMElement} HTML of the head popup to replace
     */
    setHeader : function(headerHTML) {
        this.headerHTML = headerHTML;
        if (this.headerHTML && this.popupHeader && Mapea.Util.isMobile) {
            this.popupHeader.innerHTML = this.headerHTML;
        }
    },
    
    /** 
     * Method: updatePosition
     * if the popup has a lonlat and its map members set, 
     * then have it move itself to its proper position
     */
    updatePosition: function() {
        if (Mapea.Util.isMobile) {
            this.manageCollapsableMobilePopup(true);
        }
        else {
            if ((this.lonlat) && (this.map)) {
                var px = this.map.getLayerPxFromLonLat(this.lonlat);
                if (px) {
                    this.moveTo(px);
                }    
            }
        }
    },

    CLASS_NAME : "Mapea.Popup.FramedCloud"
});

Mapea.Popup.FramedCloud.COLLAPSED = 0;
Mapea.Popup.FramedCloud.HALF = 1;
Mapea.Popup.FramedCloud.FULL = 2;