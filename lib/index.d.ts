import { Socket } from 'socket.io-client';
export interface NodeSiteIOSocket extends Socket {
    nsid: number;
    sio: (ev: string, ...args: any[]) => NodeSiteIOSocket;
    write: (ev: string, ...args: any[]) => NodeSiteIOSocket;
}
export declare const socket: NodeSiteIOSocket;
export declare function init(site: string): NodeSiteIOSocket;
export default socket;
export declare function on(event: string, cb: (...args: any[]) => void): NodeSiteIOSocket;
export declare function once(event: string, cb: (...args: any[]) => void): NodeSiteIOSocket;
export declare function always(cb: (...args: any[]) => void): NodeSiteIOSocket;
export declare function onAny(cb: (...args: any[]) => void): NodeSiteIOSocket;
export declare function write(event: string, ...args: any[]): NodeSiteIOSocket;
export declare function emit(event: string, ...args: any[]): NodeSiteIOSocket;
