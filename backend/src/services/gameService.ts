import { GameManagementPort } from "../ports/gameManagementPort"

export class GameService {
    constructor(private gamePort: GameManagementPort) {}

    recordGame(playerId: string, diceOne: number, diceTwo: number): Promise<any> {
        const result = (diceOne + diceTwo) === 7;
        return this.gamePort.recordGame(playerId, diceOne, diceTwo, result);
    }

    deletePlayerGames(playerId: string): Promise<any> {
        return this.gamePort.deletePlayerGames(playerId)
    }

    listPlayerGames(playerId: string): Promise<any[]> {
        return this.gamePort.listPlayerGames(playerId)
    }

    calculateRankings(): Promise<any[]> {
        return this.gamePort.calculateRankings()
    }

    findLoser(): Promise<any> {
        return this.gamePort.findLoser()
    }

    findWinner(): Promise<any> {
        return this.gamePort.findWinner()
    }
}