# Zeepkist Leaderboard Combiner

Combines leaderboard data from the monthly Zeepkist Super League (ZSL) events into a single dataset per event.

## How to use

### Pre-requisites

Install the following system dependencies:

- [Node.js](https://nodejs.org/en/) (19.5.0 or newer)

Install the following Zeepkist plugins:

- [Leaderboard Logger](https://zeepkist.old.mod.io/leaderboard-logger)

### Configure the Leaderboard Logger plugin

Open the logger config file (`Zeepkist/BepInEx/config/net.tnrd.zeepkist.leaderboardlogger.cfg`) and set the options to:

```conf
[Formatting]
Filename = %Date:yyyyMMddTHHmmss%_%LevelUid%_Xw==_%Name%.csv
Entry = %SteamId%,%Username%,%Time%,%ZeepkistId%,%ColorId%,%HatId%
```

### Save the leaderboard data in Zeepkist

Run Zeepkist and use `/start log` at the start of each level in an online room to log the leaderboard data (you do not need to be host)

Log files are saved to `%userprofile%\AppData\Roaming\Zeepkist\Leaderboard Logs`

### Install this app

```bash
npm install -g @zeepkist/combine
```

### Run this app

Create a new folder for the event and move the leaderboard logs into the folder. E.g `%userprofile%\AppData\Roaming\Zeepkist\Leaderboard Logs\Example Event`

Run the app with the following command:

```bash
super-league --input 'Example Event' --output 'Example Event Results'
```

The app will output the combined leaderboard data to the `Example Event Results` folder.

#### Multiple Events (with Season Standings)

If you have multiple events in the same season, you can combine them all into a single season standings with individual results for each event by running the app on the parent folder. E.g `%userprofile%\AppData\Roaming\Zeepkist\Leaderboard Logs\Season 1\Example Event`

```bash
super-league --input 'Season 1' --output 'Season 1 Results'
```

#### Multiple Seasons

If you have multiple seasons, you can generate all seasons at once by running the app on the parent folder. E.g `%userprofile%\AppData\Roaming\Zeepkist\Leaderboard Logs\Seasons\Season 1\Example Event`

```bash
super-league --input 'Seasons' --output 'Seasons Results'
```

## Input File Structure

### Single Event

One or more CSV leaderboard logs in the `input` folder

```text
Input Folder
 ├── 20221204T180734_18112022-104248521-AuthorName-481758454581-1683_Xw==_RoomName.csv
 ├── 2021-01-01T12:00:00_1234567890_Example Level 2.csv
 └── 2021-01-01T12:00:00_1234567890_Example Level 3.csv
```

### Multiple Events (with Season Standings)

One or more folders in the `input` folder each containing one or more CSV leaderboard logs

```text
Input Folder
   ├── Example Event 1
   │   └── 20221204T180734_18112022-104248521-AuthorName-481758454581-1683_Xw==_RoomName.csv
   └── Example Event 2
      └── 20221204T180734_18112022-104248521-AuthorName-481758454581-1683_Xw==_RoomName.csv
```

### Multiple Seasons

One or more folders in the `input` folder each containing one or more events (see above)

```text
Input Folder
   ├── Season 1
   │   ├── Example Event 1
   │   │   └── 20221204T180734_18112022-104248521-AuthorName-481758454581-1683_Xw==_RoomName.csv
   │   └── Example Event 2
   │      └── 20221204T180734_18112022-104248521-AuthorName-481758454581-1683_Xw==_RoomName.csv
   └── Season 2
      ├── Example Event 1
      │   └── 20221204T180734_18112022-104248521-AuthorName-481758454581-1683_Xw==_RoomName.csv
      └── Example Event 2
         └── 20221204T180734_18112022-104248521-AuthorName-481758454581-1683_Xw==_RoomName.csv
```

## Output File Structure

### Single Event

```text
Output Folder
 └── Output Folder.json
```

### Multiple Events (with Season Standings)

```text
Output Folder
 ├── metadata.json
 ├── standings.json
 ├── Example Event 1.json
 └── Example Event 2.json
```

### Multiple Seasons

```text
Output Folder
 ├── metadata.json # auto-generated file containing metadata for all seasons
 ├── Season 1
 │   ├── metadata.json
 │   ├── standings.json
 │   ├── Example Event 1.json
 │   └── Example Event 2.json
 └── Season 2
     ├── metadata.json
     ├── standings.json
     ├── Example Event 1.json
     └── Example Event 2.json
```

## Metadata Files (Optional)

You can add metadata to events and seasons by creating a `metadata.json` file in the season folder.

Metadata allows you to:

- Add a custom name and workshop ID to each event of a season.
- Change the point system for a season

#### Given the `input` folder structure of multiple events:

```text
Input Folder
   ├── metadata.json
   ├── 2023-01-01
   │   └── *.csv
   └── 2023-02-01
      └── *.csv
```

#### Given the `input` folder structure of multiple seasons:

```text
Input Folder
   └── Season 1
       ├── metadata.json
       ├── 2023-01-01
       │   └── *.csv
       └── 2023-02-01
          └── *.csv
```

The file should be structured as:

```json
{
  "events": {
    "2023-01-01": {
      "name": "Example Event 1",
      "workshopId": "1234"
    },
    "2023-02-01": {
      "name": "Example Event 2",
      "workshopId": "5678"
    }
  },
  "points": [10, 7, 5, 3], // 1st, 2nd, 3rd, 4th ... etc,
  "finishPoints": 0 // points for finishing the level (any position not covered by the "points" array, e.g 5th or lower in example above)
}
```
