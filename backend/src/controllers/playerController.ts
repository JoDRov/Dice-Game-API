import { Request, Response } from 'express'
import { PlayerService } from '../services/playerService'
import { MongoPlayerAdapter } from '../adapters/mongoPlayerAdapter'

const playerService = new PlayerService(new MongoPlayerAdapter())

export const createPlayer = async (req: Request, res: Response) => {
  try {
    const { name, isAnonymous } = req.body
    const player = await playerService.createPlayer(name, isAnonymous)
    res.status(201).json(player)
  }
  catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const modifyPlayer = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const updatedPlayer = await playerService.modifyPlayer(id, name)
    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" })
    }
    res.json(updatedPlayer)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const getAllPlayers = async (req: Request, res: Response) => {
  try {
    const players = await playerService.listPlayers()
    res.json(players)
  }
  catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}