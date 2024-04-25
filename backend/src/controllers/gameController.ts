import { Request, Response } from 'express'
import { GameService } from '../services/gameService'
import { MongoGameAdapter } from '../adapters/mongoGameAdapter'

const gameService = new GameService(new MongoGameAdapter())

export const playGame = async (req: Request, res: Response) => {
    const { id } = req.params
    const diceOne = Math.floor(Math.random() * 6) + 1
    const diceTwo = Math.floor(Math.random() * 6) + 1

    try {
        const game = await gameService.recordGame(id, diceOne, diceTwo)
        if (!game) {
            return res.status(400).json({ message: "Failed to record game" })
        }
        res.status(201).json({
            playerId: id,
            diceOne,
            diceTwo,
            result: game.result
        })
    } catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

export const deleteGames = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const deletionResult = await gameService.deletePlayerGames(id)
        if (deletionResult.deletedCount === 0) {
            return res.status(404).json({ message: 'No games found for this player' })
        }
        res.json({ message: 'All games deleted for this player' })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const getGames = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const games = await gameService.listPlayerGames(id)
        if (games.length === 0) {
            return res.status(404).json({ message: 'No games found for this player' })
        }
        res.json(games)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const getRankings = async (req: Request, res: Response) => {
    try {
        const rankings = await gameService.calculateRankings()
        res.json(rankings)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
};

export const getLoser = async (req: Request, res: Response) => {
    try {
        const loser = await gameService.findLoser()
        res.json(loser)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
};

export const getWinner = async (req: Request, res: Response) => {
    try {
        const winner = await gameService.findWinner()
        res.json(winner)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}