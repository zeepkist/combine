# Zeepkist Super League

Combines leaderboard data from the monthly Zeepkist Super League (ZSL) events into a single dataset per event.

## How to use

### Pre-requisites

Install the following system dependencies:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/) (19.5.0 or newer)
- [Yarn](https://yarnpkg.com/getting-started/install) (or *npm*, which comes with Node.js)

### Clone the repository

This will create a new directory called `zeepkist-super-league` in your current working directory and then enter it.

```bash
git clone https://github.com/wopian/zeepkist-super-league && cd zeepkist-super-league
```

### Install project dependencies

```bash
yarn
```
```bash
# if using npm:
npm install
```

### Run

```bash
yarn start
```
```bash
# if using npm:
npm run start
```

After running the command above, the combined data will be available in the `event-data` directory.

You can copy the contents of these files into a Google Sheets document and expand the columns with `Data -> Split text to columns` to view the data. The output is formatted to work with the [Super League Events Template](https://docs.google.com/spreadsheets/d/1QaLowfkiIYQhugZABP3YpIqtZf1qvA2T5SNb6tp_WTQ/edit?usp=sharing) spreadsheet which you can copy and use for your own events.

You may need to select the `Total` column and set the format to `Auto` for the formula to work.

## Using your own leaderboard data

1. Download the leaderboard logger from [zeepkist.mod.io](https://zeepkist.old.mod.io/leaderboard-logger)
2. Open the logger config file (`Zeepkist/BepInEx/config/net.tnrd.zeepkist.leaderboardlogger.cfg`) and set the options to:

   ```conf
   [Formatting]
   Filename = %Date:yyyyMMddTHHmmss%_%LevelUid%_%Name%.csv
   Entry = %SteamId%,%Username%,%Time%,%ZeepkistId%,%ColorId%,%HatId%
   ```

3. Run Zeepkist and use `/start log` at the start of each level in an online room to log the leaderboard data (you do not need to be host)
4. Create a new directory inside the `data` directory and name it after the event
5. Copy the leaderboard data from the `%userprofile%\AppData\Roaming\Zeepkist\C:\Users\wopia\AppData\Roaming\Zeepkist\Leaderboard Logs` directory into the directory you created in step 4
6. Optionally edit the array in `src/pointsDistribution.ts` to change the points distribution for your event
   - The array is ordered from first to last place that receives points and the values are the number of points each place receives
7. Follow the steps in the [How to Use](#how-to-use) / [Run](#run) section to combine the leaderboard data into a single file

Remember to clear out your leaderboard logs after each event to avoid combining leaderboards from previous events.

## Data

The raw data is available in the `data` directory and is split into folders for each event.

Each event folder contains a series of CSV files. The CSV files are named after the room name and level played and contain the following columns:

```ts
interface Data {
  SteamId: string
  Username: string
  Time: number // in seconds
}
```
