#!/bin/bash

export BASE1=/Volumes/StorageDrive/jmthompson/git/vizzini/game/starfightersquadrons/src/main/js
export BASE0=$BASE1

for filename0 in $(find $BASE0 -name "*.js"); do
    name0=$(basename "$filename0")
    for filename1 in $(find $BASE1 -name "*.js"); do
        name1=$(basename "$filename1" .js)
        if [ "$name0" != "$name1".js ]; then
            count=$(grep -wo "$name1" "$filename0" | wc -l)
            if [ $count -gt 1 ] && [ $count -lt 3 ]; then
                echo ${name0} ${name1} ${count}
            fi
        fi
    done
done
