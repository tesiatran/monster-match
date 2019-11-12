# Monster Match

[Live Site](http://monsters.tesiatran.com/)

## Game Details

Monster Match is a Monsters Inc. themed memory matching card game. Click on a card to reveal the monster. Match two of the same monsters to help Boo find her way home. If the monsters don't match, they will flip back over, and you will have to try again. There are 16 monsters total.

### Tech Stack

- JavaScript
- jQuery
- CSS3
- HTML5
- PHP
- MySQL
- AJAX calls

## Initial Setup

Before starting on this project, you will need to **fork** and then **clone** this repository into your `lfz` folder on your current development environment.

1. Fork this repository from LearningFuze
    - Click on the <kbd>**Fork**</kbd> button at the top right of the page.
    - Select your Github user name to complete the fork

2. Clone this repository to your development environment
    - In your terminal, navigate to the location of your `lfz` folder
    - `cd ~/lfz` or `cd ~/Desktop/lfz`
    - `git clone https://github.com/[Your User Name]/memory_match.git`

3. Navigate into the `memory_match` directory
    - `cd memory_match`
    - You are now ready to get started!
    - If you are not in the proper directory, navigate to the `lfz` folder, if you're not sure how, contact an instructor.

## Getting Started

After navigating into this repository, you will want to start by creating a new branch off of the `master` branch to contain the code required for the next feature of this project.

### Before each feature

- Make sure that the current branch says `master`.
  - Check that with the `git status` command.
    1. If you are on `master`:
       - `git pull origin master`, will get your most up to date changes and update this branch.
       - `git checkout -b FEATURE_NAME_HERE`, will create a new branch based on the name provided to represent this next feature.
    2. If not, `git checkout master`, will take you back to the default branch.
       - Go back to step 1.
    3. If you're not sure how, contact an instructor.
- **Example**
  - `git status`
  - `git checkout master`
  - `git pull origin master`
  - `git checkout -b skeleton`

You are now ready to start on the first feature!

### Features
- HTML Skeleton - [Instructions](guides/features/skeleton.md)
- Flip One Card - [Instructions](guides/features/flip-one-card.md)
- Match Two Cards - [Instructions](guides/features/match-two-cards.md)
- Win Condition - [Instructions](guides/features/win-condition.md)
- Tracking Stats - [Instructions](guides/features/tracking-stats.md)
- Resetting Game - [Instructions](guides/features/resetting-game.md)

### Bonus Feature / Challenge
- Shuffling cards
- Dynamically creating cards
