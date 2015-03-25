var Range =
{
    ONE: "one",
    TWO: "two",
    THREE: "three",
    properties:
    {
        "one":
        {
            minDistance: 0, // Minimum distance. (mm)
            maxDistance: 100, // Maximum distance. (mm)
            getDisplayName: function()
            {
                return "1";
            },
            toString: function()
            {
                return this;
            },
        },
        "two":
        {
            minDistance: 101, // Minimum distance. (mm)
            maxDistance: 200, // Maximum distance. (mm)
            getDisplayName: function()
            {
                return "2";
            },
            toString: function()
            {
                return this;
            },
        },
        "three":
        {
            minDistance: 201, // Minimum distance. (mm)
            maxDistance: 300, // Maximum distance. (mm)
            getDisplayName: function()
            {
                return "3";
            },
            toString: function()
            {
                return this;
            },
        },
    },
    values: [ "one", "two", "three" ],
};

/*
 * @param distance Distance. (mm)
 * 
 * @return the range value for the given parameter.
 */
Range.findRange = function(distance)
{
    var answer;

    for (var i = 0; i < Range.values.length; i++)
    {
        var r = Range.values[i];
        var min = Range.properties[r].minDistance;
        var max = Range.properties[r].maxDistance;

        if ((min <= distance) && (distance <= max))
        {
            answer = r;
            break;
        }
    }

    return answer;
}

if (Object.freeze)
{
    Object.freeze(Range)
};

function RangeRuler()
{
    /*
     * @param attacker Attacking token. @param attackerPosition Attacker
     * position. @param defender Defending token. @param defenderPosition
     * Defender position.
     * 
     * @return the range.
     */
    this.getRange = function(attacker, attackerPosition, defender,
            defenderPosition)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenderPosition", defenderPosition);

        var attackerBase = attacker.getShipBase();
        var defenderBase = defender.getShipBase();

        var attackerPolygon = ShipBase.computePolygon(attackerBase,
                attackerPosition.getX(), attackerPosition.getY(),
                attackerPosition.getHeading());
        var defenderPolygon = ShipBase.computePolygon(defenderBase,
                defenderPosition.getX(), defenderPosition.getY(),
                defenderPosition.getHeading());

        // FIXME
        // var distance = SHAPE_UTILS.computeMinimumDistance(attackerPolygon,
        // defenderPolygon);
        var distance = attackerPosition.computeDistance(defenderPosition);
        // LOGGER.trace("distance = "+distance);

        return Range.findRange(Math.round(distance));
    }
}
