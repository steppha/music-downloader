__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseResolver", function() { return BaseResolver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AjaxResolver", function() { return AjaxResolver; });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BaseResolver = /** @class */ (function () {
    function BaseResolver(options) {
        this._settings = $.extend(true, {}, this.getDefaults(), options);
    }
    BaseResolver.prototype.getDefaults = function () {
        return {};
    };
    BaseResolver.prototype.getResults = function (limit, start, end) {
        return this.results;
    };
    BaseResolver.prototype.search = function (q, cbk) {
        cbk(this.getResults());
    };
    return BaseResolver;
}());

var AjaxResolver = /** @class */ (function (_super) {
    __extends(AjaxResolver, _super);
    function AjaxResolver(options) {
        return _super.call(this, options) || this;
        // console.log('resolver settings', this._settings);
    }
    AjaxResolver.prototype.getDefaults = function () {
        return {
            url: '',
            method: 'get',
            queryKey: 'q',
            extraData: {},
            timeout: undefined,
            requestThrottling: 500
        };
    };
    AjaxResolver.prototype.search = function (q, cbk) {
        var _this = this;
        if (this.jqXHR != null) {
            this.jqXHR.abort();
        }
        var data = {};
        data[this._settings.queryKey] = q;
        $.extend(data, this._settings.extraData);
        // request throttling
        if (this.requestTID) {
            clearTimeout(this.requestTID);
        }
        this.requestTID = setTimeout(function () {
            _this.jqXHR = $.ajax(_this._settings.url, {
                method: _this._settings.method,
                data: data,
                timeout: _this._settings.timeout
            });
            _this.jqXHR.done(function (result) {
                cbk(result);
            });
            _this.jqXHR.fail(function (err) {
                // console.log(err);
            });
            _this.jqXHR.always(function () {
                _this.jqXHR = null;
            });
        }, this._settings.requestThrottling);
    };
    return AjaxResolver;
}(BaseResolver));



//# sourceURL=webpack:///./src/resolvers.ts?