import { Socket } from 'net'
import { ConnectionType, SocketDescription } from './socketConnection'

/** */
export class Server {
	// private _connected: boolean
	// private _lastSeen: number
	private _sockets: {[socketID: string]: SocketDescription} = {}

	/** */
	registerIncomingConnection (socketID: number, socket: Socket, portDescription: ConnectionType) {
		this._sockets[socketID + ''] = {
			socket: socket,
			portDescription: portDescription
		}
	}

	/** */
	removeSocket (socketID: number) {
		delete this._sockets[socketID + '']
	}

	private _getSockets (portDescription: string): Socket[] {
		let sockets: Socket[] = []
		for (let i in this._sockets) {
			if (this._sockets[i].portDescription === portDescription) {
				sockets.push(this._sockets[i].socket)
			}
		}

		return sockets
	}
	/** */
	get lowerPortSockets (): Socket[] {
		return this._getSockets('lower')
	}

	/** */
	get upperPortSockets (): Socket[] {
		return this._getSockets('upper')
	}

	/** */
	get queryPortSockets (): Socket[] {
		return this._getSockets('query')
	}
}
