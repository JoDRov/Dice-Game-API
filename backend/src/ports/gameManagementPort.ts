export interface GameManagementPort {
    recordGame(playerId: string, diceOne: number, diceTwo: number, result: boolean): Promise<any>
    deletePlayerGames(playerId: string): Promise<void>
    listPlayerGames(playerId: string): Promise<any[]>
    calculateRankings(): Promise<any[]>
    findWinner(): Promise<any>
    findLoser(): Promise<any>
}
