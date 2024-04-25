import { PlayerManagementPort } from "../ports/playerManagementPort"

export class PlayerService {
    constructor(private playerPort: PlayerManagementPort) {}

    createPlayer(name: string, isAnonymous?: boolean): Promise<any> {
        return this.playerPort.createPlayer(name, isAnonymous)
    }

    modifyPlayer(id: string, newName: string): Promise<any> {
        return this.playerPort.modifyPlayer(id, newName)
    }

    listPlayers(): Promise<any> {
        return this.playerPort.listPlayers()
    }
}