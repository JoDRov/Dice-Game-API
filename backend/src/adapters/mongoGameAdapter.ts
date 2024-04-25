import { GameManagementPort } from "../ports/gameManagementPort"
import { Game, Player } from '../models/playerModel'

export class MongoGameAdapter implements GameManagementPort {
    async recordGame(playerId: string, diceOne: number, diceTwo: number, result: boolean): Promise<any> {
        return new Game({ playerId, diceOneValue: diceOne, diceTwoValue: diceTwo, result }).save()
    }

    async deletePlayerGames(playerId: string): Promise<any> {
        return await Game.deleteMany({ playerId });
    }

    async listPlayerGames(playerId: string): Promise<any[]> {
        return Game.find({ playerId })    
    }

    async calculateRankings(): Promise<any[]> {
        return Game.aggregate([
            { $group: {
                _id: "$playerId",
                totalGames: { $sum: 1 },
                wins: { $sum: { $cond: ["$result", 1, 0] } }
            }},
            { $lookup: {
                from: Player.collection.name,
                localField: "_id",
                foreignField: "_id",
                as: "player"
            }},
            { $unwind: "$player" },
            { $project: {
                playerName: "$player.name",
                winPercentage: { $multiply: [{ $divide: ["$wins", "$totalGames"] }, 100] }
            }},
            { $sort: { winPercentage: -1 } }
        ])
    }

    async findWinner(): Promise<any> {
        const results = await this.calculateRankings()
        return results[0] || null
    }

    async findLoser(): Promise<any> {
        const results = await this.calculateRankings()
        return results.pop() || null
    }
}

