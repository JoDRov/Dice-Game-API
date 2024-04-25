export interface PlayerManagementPort {
    createPlayer(name: string, isAnonymous?: boolean): Promise<any>
    modifyPlayer(id: string, newName: string): Promise<any>
    listPlayers(): Promise<any[]>
}