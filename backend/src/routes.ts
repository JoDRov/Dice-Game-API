import { Router } from 'express'
import { createPlayer, modifyPlayer, getAllPlayers } from './controllers/playerController'
import { playGame, deleteGames, getGames, getRankings, getLoser, getWinner } from './controllers/gameController'

export const router = Router()

router.post('/players', createPlayer)
router.put('/players/:id', modifyPlayer)
router.get('/players', getAllPlayers)
router.post('/games/:id', playGame)
router.delete('/games/:id', deleteGames)
router.get('/games/:id', getGames)
router.get('/ranking', getRankings)
router.get('/ranking/loser', getLoser)
router.get('/ranking/winner', getWinner)