#! /bin/bash

export HOME=/Volumes/StorageDrive/jmthompson
export TARGET=${HOME}/git/vizzini/game/starfightersquadrons/src/main/js
export FORMAT="--format amd"

madge ${FORMAT} --circular ${TARGET}
