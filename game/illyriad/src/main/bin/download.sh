#!/bin/bash

export BASE_URL="http://data-root.illyriad.co.uk"

# These should be static.
# This file is big. (44 MB)
export FILE0=datafile_worldmap.txt
curl -o ${FILE0}.gz http://data.illyriad.co.uk/${FILE0}
gunzip ${FILE0}.gz

export FILE1=datafile_factionhubs.xml
curl -o ${FILE1}.gz http://data.illyriad.co.uk/${FILE1}
gunzip ${FILE1}.gz
mv ${FILE1}.gz ${FILE1}

export FILE2=datafile_terrain_combat.xml
curl -o ${FILE2}.gz http://data.illyriad.co.uk/${FILE2}
gunzip ${FILE2}.gz
mv ${FILE2}.gz ${FILE2}

export FILE3=datafile_terrain.xml
curl -o ${FILE3}.gz http://data.illyriad.co.uk/${FILE3}
gunzip ${FILE3}.gz
mv ${FILE3}.gz ${FILE3}

# This is updated daily.
export FILE4=datafile_towns.xml
curl -o ${FILE4}.gz http://data.illyriad.co.uk/${FILE4}
gunzip ${FILE4}.gz

