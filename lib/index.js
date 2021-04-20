"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emit = exports.write = exports.onAny = exports.always = exports.once = exports.on = exports.socket = void 0;
var socket_io_client_1 = require("socket.io-client");
exports.socket = socket_io_client_1.io('wss://' + ((typeof location !== 'undefined')
    ? location.host
    : 'io.nodesite.eu:20122'));
exports.socket.sio = exports.socket.emit;
exports.socket.on('ConnectionSuccess', function (nsid) { return exports.socket.nsid = nsid; });
exports.socket.emit = function (e) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return exports.socket.sio('ctos', exports.socket.nsid, e, args);
};
exports.socket.sio('IOreg', location.host);
exports.socket.write = function (e) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    exports.socket.once('stoc-ping', function () {
        exports.socket.sio('ctos', exports.socket.nsid, e, args);
    });
    exports.socket.sio('ctos-ping', exports.socket.nsid);
    return exports.socket;
};
if (typeof window === 'object') {
    Object.assign(window, {
        io: exports.socket,
        socket: exports.socket,
    });
}
exports.default = exports.socket;
module.exports = exports.socket;
Object.assign(exports.socket, {
    default: exports.socket,
    socket: exports.socket,
    always: exports.socket.onAny,
});
function on(event, cb) {
    exports.socket.on(event, cb);
    return exports.socket;
}
exports.on = on;
function once(event, cb) {
    exports.socket.once(event, cb);
    return exports.socket;
}
exports.once = once;
function always(cb) {
    exports.socket.onAny(cb);
    return exports.socket;
}
exports.always = always;
function onAny(cb) {
    exports.socket.onAny(cb);
    return exports.socket;
}
exports.onAny = onAny;
function write(event) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    exports.socket.write.apply(exports.socket, __spreadArray([event], args));
    return exports.socket;
}
exports.write = write;
function emit(event) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    exports.socket.emit.apply(exports.socket, __spreadArray([event], args));
    return exports.socket;
}
exports.emit = emit;
