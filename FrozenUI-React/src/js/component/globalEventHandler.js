define(function (require, exports, module) {
    var throttle = function(fn, interval){ //节流
        var _self = fn,
            timer,
            firstTime = true;
        return function(){
            var args = arguments,
                _me = this;
            if(firstTime){
                _self.apply(_me, args);
                return firstTime = false;
            }
            if(timer) return false;
            timer = setTimeout(function(){
                clearTimeout(timer);
                timer = null;
                _self.apply(_me, args);
            }, interval || 300)
        }
    };

    module.exports = {
        windowResize : function(cb){
            if(typeof cb !== 'function') return;
            window.onresize = throttle(cb)
        }
    };

});