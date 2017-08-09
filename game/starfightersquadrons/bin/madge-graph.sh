#! /bin/bash

export HOME=/Volumes/StorageDrive/jmthompson
export TARGET=${HOME}/git/vizzini/game/starfightersquadrons/src/main/js
export FORMAT="--format amd"
#export LAYOUT="--layout dot"
export LAYOUT="--layout neato"
#export LAYOUT="--layout fdp"
#export LAYOUT="--layout twopi"
#export LAYOUT="--layout circo"

# All
madge ${FORMAT} ${LAYOUT} --exclude '^(abilitystats|arena|damagestats|pilotstats|squadstats|upgradestats)' --image starfighterSquadrons.svg ${TARGET}

# Data
madge ${FORMAT} ${LAYOUT} --exclude '^(abilitystats|arena|damagestats|pilotstats|squadstats|upgradestats|process)' --image starfighterSquadronsData.svg ${TARGET}

# Process
madge ${FORMAT} ${LAYOUT} --exclude '^(abilitystats|arena|damagestats|pilotstats|squadstats|upgradestats|process/ui)' --image starfighterSquadronsProcess.svg ${TARGET}

# UI
madge ${FORMAT} ${LAYOUT} --exclude '^(abilitystats|arena|damagestats|pilotstats|squadstats|upgradestats)' --image starfighterSquadronsUI.svg ${TARGET}
