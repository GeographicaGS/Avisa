/* 
 * Copyright (c) 2013 GUADALTEL S.L. 
 * 
 * In this file are all the patches applied over OpenLayers we can not override
 * because the modified class has a lot of dependences.
 */

/**
 * Proxy patch. We use this patch to
 * keep all the calls to the mapea proxy.
 */
OpenLayers.Request.makeSameOrigin = function(url, proxy) {
    if (proxy) {
        if (typeof proxy == "function") {
            url = proxy(url);
        } else {
            url = proxy + encodeURIComponent(url);
        }
    } else {
        OpenLayers.Console.warn(
            OpenLayers.i18n("proxyNeeded"), {url: url});
    }
	return url;
};

/**
 * Handler patch. We allow the propagation of the 
 * dragstart event in mobile devices with navtoolbar
 * control enabled.
 */
OpenLayers.Handler.Drag.prototype.dragstart = function (evt) {
    if (!Mapea.Util.allowDragPropagation(evt)) {
        OpenLayers.Event.stop(evt, false);
        return false;
    }
    
    var propagate = true;
    this.dragging = false;
    if (this.checkModifiers(evt) &&
           (OpenLayers.Event.isLeftClick(evt) ||
            OpenLayers.Event.isSingleTouch(evt))) {
        this.started = true;
        this.start = evt.xy;
        this.last = evt.xy;
        OpenLayers.Element.addClass(
            this.map.viewPortDiv, "olDragDown"
        );
        this.down(evt);
        this.callback("down", [evt.xy]);

        OpenLayers.Event.stop(evt);

        if(!this.oldOnselectstart) {
            this.oldOnselectstart = document.onselectstart ?
                document.onselectstart : OpenLayers.Function.True;
        }
        document.onselectstart = OpenLayers.Function.False;
        /*
         * PATCH:
         * propagate = !this.stopDown;
         */
        propagate = (!this.stopDown || Mapea.Util.isMobile);
    } else {
        this.started = false;
        this.start = null;
        this.last = null;
    }
    return propagate;
};

/**
 * recalculates the maxZIndex when the
 * the layer changes its z-index
 */
OpenLayers.Layer.prototype.setZIndex = function (zIndex) {
    this.div.style.zIndex = zIndex;
    if (this.map) {
        this.map.recalculateMaxZIndex();
    }
};


/**
 * Adds support to "onstart" events in ajax calls
 * of OpenLayers
 */
 OpenLayers.Request.issue = function(config) {        
    // apply default config - proxy host may have changed
    var defaultConfig = OpenLayers.Util.extend(
        this.DEFAULT_CONFIG,
        {proxy: OpenLayers.ProxyHost}
    );
    config = OpenLayers.Util.applyDefaults(config, defaultConfig);
    
    // Always set the "X-Requested-With" header to signal that this request
    // was issued through the XHR-object. Since header keys are case 
    // insensitive and we want to allow overriding of the "X-Requested-With"
    // header through the user we cannot use applyDefaults, but have to 
    // check manually whether we were called with a "X-Requested-With"
    // header.
    var customRequestedWithHeader = false,
        headerKey;
    for(headerKey in config.headers) {
        if (config.headers.hasOwnProperty( headerKey )) {
            if (headerKey.toLowerCase() === 'x-requested-with') {
                customRequestedWithHeader = true;
            }
        }
    }
    if (customRequestedWithHeader === false) {
        // we did not have a custom "X-Requested-With" header
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
    }

    // create request, open, and set headers
    var request = new OpenLayers.Request.XMLHttpRequest();
    var url = OpenLayers.Util.urlAppend(config.url, 
        OpenLayers.Util.getParameterString(config.params || {}));
    url = OpenLayers.Request.makeSameOrigin(url, config.proxy);
    request.open(
        config.method, url, config.async, config.user, config.password
    );
    for(var header in config.headers) {
        request.setRequestHeader(header, config.headers[header]);
    }

    var events = this.events;

    // we want to execute runCallbacks with "this" as the
    // execution scope
    var self = this;
    
    request.onreadystatechange = function() {
        if(request.readyState == OpenLayers.Request.XMLHttpRequest.DONE) {
            var proceed = events.triggerEvent(
                "complete",
                {request: request, config: config, requestUrl: url}
            );
            if(proceed !== false) {
                self.runCallbacks(
                    {request: request, config: config, requestUrl: url}
                );
            }
        }
    };

    // triggers onstart events
    events.triggerEvent("onstart", {request: request, config: config, requestUrl: url});
    
    // send request (optionally with data) and return
    // call in a timeout for asynchronous requests so the return is
    // available before readyState == 4 for cached docs
    if(config.async === false) {
        request.send(config.data);
    } else {
        window.setTimeout(function(){
            if (request.readyState !== 0) { // W3C: 0-UNSENT
                request.send(config.data);
            }
        }, 0);
    }
    return request;
};



/**
 * Method: handleBrowserEvent
 * Basically just a wrapper to the triggerEvent() function, but takes 
 *     care to set a property 'xy' on the event with the current mouse 
 *     position.
 *
 * Parameters:
 * evt - {Event} 
 */
OpenLayers.Events.prototype.handleBrowserEvent = function (evt) {
    var type = evt.type, listeners = this.listeners[type];
    if(!listeners || listeners.length == 0) {
        // noone's listening, bail out
        return;
    }
    // add clientX & clientY to all events - corresponds to average x, y
    var touches = evt.touches;
    
    /* PATCH: if touches is empty the gets
     * changedTouches */
    if (!touches || touches.length == 0) {
        touches = evt.changedTouches;
    }
    if (touches && touches[0]) {
        var x = 0;
        var y = 0;
        var num = touches.length;
        var touch;
        for (var i=0; i<num; ++i) {
            touch = touches[i];
            x += touch.clientX;
            y += touch.clientY;
        }
        evt.clientX = x / num;
        evt.clientY = y / num;
    }
    if (this.includeXY) {
        evt.xy = this.getMousePosition(evt);
    } 
    this.triggerEvent(type, evt);
};