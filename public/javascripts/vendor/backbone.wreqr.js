// Backbone.Wreqr (Backbone.Marionette)
// ----------------------------------
// v0.2.0
//
// Copyright (c)2013 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://github.com/marionettejs/backbone.wreqr


(function(t, e) {
	if( "object" == typeof exports ) {
		var n = require("underscore"), r = require("backbone");
		module.exports = e(n, r)
	} else"function" == typeof define && define.amd && define(["underscore", "backbone"], e)
})(this, function(t, e) {
	"use strict";
	return e.Wreqr = function(t, e, n) {
		var r = {};
		return r.Handlers = function(t, e) {
			var n = function(t) {
				this.options = t, this._wreqrHandlers = {}, e.isFunction(this.initialize) && this.initialize(t)
			};
			return n.extend = t.Model.extend, e.extend(n.prototype, t.Events, {setHandlers: function(t) {
				e.each(t, function(t, n) {
					var r = null;
					e.isObject(t) && !e.isFunction(t) && (r = t.context, t = t.callback), this.setHandler(n, t, r)
				}, this)
			}, setHandler: function(t, e, n) {
				var r = {callback: e, context: n};
				this._wreqrHandlers[t] = r, this.trigger("handler:add", t, e, n)
			}, hasHandler: function(t) {
				return!!this._wreqrHandlers[t]
			}, getHandler: function(t) {
				var e = this._wreqrHandlers[t];
				if( !e )throw Error("Handler not found for '" + t + "'");
				return function() {
					var t = Array.prototype.slice.apply(arguments);
					return e.callback.apply(e.context, t)
				}
			}, removeHandler: function(t) {
				delete this._wreqrHandlers[t]
			}, removeAllHandlers: function() {
				this._wreqrHandlers = {}
			}}), n
		}(t, n), r.CommandStorage = function() {
			var e = function(t) {
				this.options = t, this._commands = {}, n.isFunction(this.initialize) && this.initialize(t)
			};
			return n.extend(e.prototype, t.Events, {getCommands: function(t) {
				var e = this._commands[t];
				return e || (e = {command: t, instances: []}, this._commands[t] = e), e
			}, addCommand: function(t, e) {
				var n = this.getCommands(t);
				n.instances.push(e)
			}, clearCommands: function(t) {
				var e = this.getCommands(t);
				e.instances = []
			}}), e
		}(), r.Commands = function(t) {
			return t.Handlers.extend({storageType: t.CommandStorage, constructor: function(e) {
				this.options = e || {}, this._initializeStorage(this.options), this.on("handler:add", this._executeCommands, this);
				var n = Array.prototype.slice.call(arguments);
				t.Handlers.prototype.constructor.apply(this, n)
			}, execute: function(t, e) {
				t = arguments[0], e = Array.prototype.slice.call(arguments, 1), this.hasHandler(t) ? this.getHandler(t).apply(this, e) : this.storage.addCommand(t, e)
			}, _executeCommands: function(t, e, r) {
				var i = this.storage.getCommands(t);
				n.each(i.instances, function(t) {
					e.apply(r, t)
				}), this.storage.clearCommands(t)
			}, _initializeStorage: function(t) {
				var e, r = t.storageType || this.storageType;
				e = n.isFunction(r) ? new r : r, this.storage = e
			}})
		}(r), r.RequestResponse = function(t) {
			return t.Handlers.extend({request: function() {
				var t = arguments[0], e = Array.prototype.slice.call(arguments, 1);
				return this.getHandler(t).apply(this, e)
			}})
		}(r), r.EventAggregator = function(t, e) {
			var n = function() {
			};
			return n.extend = t.Model.extend, e.extend(n.prototype, t.Events), n
		}(t, n), r
	}(e, e.Marionette, t), e.Wreqr
});