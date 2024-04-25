import mongoose from "mongoose"

const playerSchema = new mongoose.Schema({
    name: { type: String, default: 'Anonimo'},
    registrationDate: { type: Date, default: Date.now },
    games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
})

const gameSchema = new mongoose.Schema({
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    diceOneValue: Number,
    diceTwoValue: Number,
    result: Boolean
  })

export const Player = mongoose.model('Player', playerSchema)
export const Game = mongoose.model('Game', gameSchema)