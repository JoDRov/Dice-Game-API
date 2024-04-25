# Dice Game API 🎲

## Setup Instructions
First, clone the repository and navigate into the project directory:
```bash
git clone https://github.com/yourusername/juego-de-dados.git
cd juego-de-dados
cd backend
```
Install all necessary dependencies:
```bash
npm install
```
## Running the Application
To start the server:
```bash
npm start
```
Your server will be live at `http://localhost:3001`

## Testing
To run the automated tests and ensure everything is working as expected:
```bash
npm test
```

This will execute all predifined test suites

## API Features

# Player Management
POST /players: Register a new player with a name, or default to "ANONIMO" if no name is provided.

GET /players: Retrieve a list of all players along with their win rates.

# Game Operations
POST /games/{playerId}: Record a new game session for a player by rolling two dice.

GET /games/{playerId}: Fetch all game sessions for a specific player.

# Rankings
GET /ranking: Get a list of players ranked by success rate, along with the average success rate across all players.

GET /ranking/loser: Identify the player with the lowest success rate.

GET /ranking/winner: Determine the player with the highest success rate.

## Environment Configuration
Ensure the MONGO_URI environment variable is set for MongoDB connectivity:
```bash
export MONGO_URI="mongodb://localhost:27017/dicegame"
```