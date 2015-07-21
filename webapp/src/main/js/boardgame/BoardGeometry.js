/*
 * Provides an enumeration of board rotations.
 */
var Rotation =
{
    X090: "X090",
    X180: "X180",
    X270: "X270",
    Y090: "Y090",
    Y180: "Y180",
    Y270: "Y270",
    Z090: "Z090",
    Z180: "Z180",
    Z270: "Z270",
    values2D: [ "X180", "Y180", "Z090", "Z180", "Z270" ],
    values3D: [ "X090", "X180", "X270", "Y090", "Y180", "Y270", "Z090", "Z180",
            "Z270" ],
}

if (Object.freeze)
{
    Object.freeze(Rotation)
};

/*
 * Provides geometry for a game board.
 * 
 *<pre>
 * Level 0
 * 00 | 01 | 02
 * 03 | 04 | 05
 * 06 | 07 | 08
 * 09 | 10 | 11
 * 
 * Level 1
 * 12 | 13 | 14
 * 15 | 16 | 17
 * 18 | 19 | 20
 * 21 | 22 | 23
 * 
 * Level 2
 * 24 | 25 | 26
 * 27 | 28 | 29
 * 30 | 31 | 32
 * 33 | 34 | 35
 * 
 * Level 3
 * 36 | 37 | 38
 * 39 | 40 | 41
 * 42 | 43 | 44
 * 45 | 46 | 47
 * 
 * Level 4
 * 48 | 49 | 50
 * 51 | 52 | 53
 * 54 | 55 | 56
 * 57 | 58 | 59
 *</pre>
 * 
 *<pre>
 * +-------------> X
 * |\
 * | \
 * | \
 * | v Z (in)
 * |
 * v Y
 *</pre>
 */
function BoardGeometry(maxFile, maxRank, maxLevel)
{
    InputValidator.validateNotNull("maxFile", maxFile);
    InputValidator.validateNotNull("maxRank", maxRank);
    InputValidator.validateNotNull("maxLevel", maxLevel);

    var maxCells = maxFile * maxRank * maxLevel;
    var directions;

    this.UNIAXIALS = [
    // X axis.
    [ 1, 0, 0 ], [ -1, 0, 0 ],
    // Y axis.
    [ 0, 1, 0 ], [ 0, -1, 0 ],
    // Z axis.
    [ 0, 0, 1 ], [ 0, 0, -1 ], ];

    this.BIAXIALS = [
    // XY plane.
    [ 1, 1, 0 ], [ -1, 1, 0 ], [ 1, -1, 0 ], [ -1, -1, 0 ],
    // Up.
    [ 0, 1, 1 ], [ 1, 0, 1 ], [ -1, 0, 1 ], [ 0, -1, 1 ],
    // Down.
    [ 0, 1, -1 ], [ 1, 0, -1 ], [ -1, 0, -1 ], [ 0, -1, -1 ], ];

    this.TRIAXIALS = [
    // Up.
    [ 1, 1, 1 ], [ -1, 1, 1 ], [ 1, -1, 1 ], [ -1, -1, 1 ],
    // Down.
    [ 1, 1, -1 ], [ -1, 1, -1 ], [ 1, -1, -1 ], [ -1, -1, -1 ], ];

    this.computeIndex = function(file, rank, level)
    {
        InputValidator.validateNotNull("file", file);
        InputValidator.validateNotNull("rank", rank);
        InputValidator.validateNotNull("level", level);

        var answer;

        if (this.isOnBoard(file, rank, level))
        {
            answer = (level * maxRank + rank) * maxFile + file;
        }
        else
        {
            InputValidator.validateInRange("file", file, 0, maxFile - 1);

            if (typeof file !== "number") { throw "file is not a number: "
                    + file; }

            InputValidator.validateInRange("rank", rank, 0, maxRank - 1);

            if (typeof rank !== "number") { throw "rank is not a number: "
                    + rank; }

            InputValidator.validateInRange("level", level, 0, maxLevel - 1);

            if (typeof level !== "number") { throw "level is not a number: "
                    + level; }
        }

        return answer;
    }

    this.directions = function()
    {
        if (!directions)
        {
            directions = [];

            if (this.getMaxLevel() === 1)
            {
                // 2D
                for (var i = 0; i < this.UNIAXIALS.length; i++)
                {
                    var direction = this.UNIAXIALS[i];

                    if (direction[2] === 0)
                    {
                        directions[directions.length] = direction;
                    }
                }

                for (var i = 0; i < this.BIAXIALS.length; i++)
                {
                    var direction = this.BIAXIALS[i];

                    if (direction[2] === 0)
                    {
                        directions[directions.length] = direction;
                    }
                }
            }
            else
            {
                // 3D
                directions = directions.concat(this.UNIAXIALS);
                directions = directions.concat(this.BIAXIALS);
                directions = directions.concat(this.TRIAXIALS);
            }
        }

        return directions;
    }

    this.getMaxCells = function()
    {
        return maxCells;
    }

    this.getMaxFile = function()
    {
        return maxFile;
    }

    this.getMaxLevel = function()
    {
        return maxLevel;
    }

    this.getMaxRank = function()
    {
        return maxRank;
    }

    this.isOnBoard = function(file, rank, level)
    {
        return (file !== null && 0 <= file && file < maxFile)
                && (rank !== null && 0 <= rank && rank < maxRank)
                && (level !== null && 0 <= level && level < maxLevel);
    }

    this.rotate = function(index, rotation)
    {
        validateIndex(index);

        var answer;

        if (!rotation)
        {
            answer = index;
        }
        else
        {
            var file = this.toFile(index);
            var rank = this.toRank(index);
            var level = this.toLevel(index);

            if (rotation === Rotation.X090)
            {
                answer = this.computeIndex(file, level, maxRank - 1 - rank);
            }
            else if (rotation === Rotation.X180)
            {
                answer = this.computeIndex(file, maxRank - 1 - rank, maxLevel
                        - 1 - level);
            }
            else if (rotation === Rotation.X270)
            {
                answer = this.computeIndex(file, maxLevel - 1 - level, rank);
            }
            else if (rotation === Rotation.Y090)
            {
                answer = this.computeIndex(maxLevel - 1 - level, rank, file);
            }
            else if (rotation === Rotation.Y180)
            {
                answer = this.computeIndex(maxFile - 1 - file, rank, maxLevel
                        - 1 - level);
            }
            else if (rotation === Rotation.Y270)
            {
                answer = this.computeIndex(level, rank, maxFile - 1 - file);
            }
            else if (rotation === Rotation.Z090)
            {
                answer = this.computeIndex(maxRank - 1 - rank, file, level);
            }
            else if (rotation === Rotation.Z180)
            {
                answer = this.computeIndex(maxFile - 1 - file, maxRank - 1
                        - rank, level);
            }
            else if (rotation === Rotation.Z270)
            {
                answer = this.computeIndex(rank, maxFile - 1 - file, level);
            }
            else
            {
                throw "Unknown rotation: " + rotation;
            }
        }

        return answer;
    }

    this.toFile = function(index)
    {
        validateIndex(index);

        return index % maxFile;
    }

    this.toLevel = function(index)
    {
        validateIndex(index);

        return Math.floor(index / (maxRank * maxFile));
    }

    this.toRank = function(index)
    {
        validateIndex(index);

        return Math.floor(index / maxFile) % maxRank;
    }

    this.unrotate = function(index, rotation)
    {
        validateIndex(index);

        var answer;

        if (!rotation)
        {
            answer = index;
        }
        else if (rotation === Rotation.X180 || rotation === Rotation.Y180
                || rotation === Rotation.Z180)
        {
            answer = this.rotate(index, rotation);
        }
        else if (rotation === Rotation.X090)
        {
            answer = this.rotate(index, Rotation.X270);
        }
        else if (rotation === Rotation.X270)
        {
            answer = this.rotate(index, Rotation.X090);
        }
        else if (rotation === Rotation.Y090)
        {
            answer = this.rotate(index, Rotation.Y270);
        }
        else if (rotation === Rotation.Y270)
        {
            answer = this.rotate(index, Rotation.Y090);
        }
        else if (rotation === Rotation.Z090)
        {
            answer = this.rotate(index, Rotation.Z270);
        }
        else if (rotation === Rotation.Z270)
        {
            answer = this.rotate(index, Rotation.Z090);
        }
        else
        {
            throw "Unknown rotation: " + rotation;
        }

        return answer;
    }

    function validateIndex(index)
    {
        InputValidator.validateNotNull("index", index);
        if (!Number.vizziniIsInteger(index)) { throw "index is not an integer: "
                + index; }
        InputValidator.validateInRange("index", index, 0, maxCells - 1);
    }
}
