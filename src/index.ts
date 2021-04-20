import { io, Socket } from 'socket.io-client';

export interface NodeSiteIOSocket extends Socket {
	nsid: number;
	sio: (ev: string, ...args: any[]) => NodeSiteIOSocket;
	write: (ev: string, ...args: any[]) => NodeSiteIOSocket;
}

export const socket: NodeSiteIOSocket = io('wss://' + (
	(typeof location !== 'undefined')
	? location.host
	: 'io.nodesite.eu:20122'
)) as any;

socket.sio = socket.emit;
socket.on('ConnectionSuccess', (nsid: number) => socket.nsid = nsid);
socket.emit = (e: string, ...args: any[]) => socket.sio('ctos', socket.nsid, e, args);
socket.sio('IOreg', location.host);

socket.write = (e: string, ...args: any[]) => {
	socket.once('stoc-ping', () => {
		socket.sio('ctos', socket.nsid, e, args);
	});
	socket.sio('ctos-ping', socket.nsid);
	return socket;
}

if (typeof window === 'object') {
	Object.assign(window, {
		io: socket,
		socket,
	});
}

export default socket;
module.exports = socket;

Object.assign(socket, {
	default: socket,
	socket,
	always: socket.onAny,
});

export function on (event: string, cb: (...args: any[]) => void): NodeSiteIOSocket {
	socket.on(event, cb);
	return socket;
}

export function once (event: string, cb: (...args: any[]) => void): NodeSiteIOSocket {
	socket.once(event, cb);
	return socket;
}

export function always (cb: (...args: any[]) => void): NodeSiteIOSocket {
	socket.onAny(cb);
	return socket;
}

export function onAny (cb: (...args: any[]) => void): NodeSiteIOSocket {
	socket.onAny(cb);
	return socket;
}

export function write(event: string, ...args: any[]): NodeSiteIOSocket {
	socket.write(event, ...args);
	return socket;
}

export function emit(event: string, ...args: any[]): NodeSiteIOSocket {
	socket.emit(event, ...args);
	return socket;
}
