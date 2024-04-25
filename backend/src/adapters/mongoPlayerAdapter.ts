import { PlayerManagementPort } from "../ports/playerManagementPort"
import { Player } from "../models/playerModel"

export class MongoPlayerAdapter implements PlayerManagementPort {
    async createPlayer(name: string, isAnonymous?: boolean | undefined): Promise<any> {
        return new Player({ name: isAnonymous ? 'ANONIMO' : name }).save()
    }

    async modifyPlayer(id: string, newName: string): Promise<any> {
        return Player.findByIdAndUpdate(id, {name: newName }, { new: true });
      }

    async listPlayers(): Promise<any[]> {
        return Player.find({})    
    }
}