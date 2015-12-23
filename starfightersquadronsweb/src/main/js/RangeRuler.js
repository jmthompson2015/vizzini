define([ "Maneuver" ], function(Maneuver)
{
    var RangeRuler =
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
                displayName: "1",
                value: "one",
            },
            "two":
            {
                minDistance: 101, // Minimum distance. (mm)
                maxDistance: 200, // Maximum distance. (mm)
                displayName: "2",
                value: "two",
            },
            "three":
            {
                minDistance: 201, // Minimum distance. (mm)
                maxDistance: 300, // Maximum distance. (mm)
                displayName: "3",
                value: "three",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(this.properties);
        },
    }

    RangeRuler.findRange = function(distance)
    {
        var answer;

        var values = this.values();

        for (var i = 0; i < values.length; i++)
        {
            var r = values[i];
            var min = this.properties[r].minDistance;
            var max = this.properties[r].maxDistance;

            if ((min <= distance) && (distance <= max))
            {
                answer = r;
                break;
            }
        }

        return answer;
    }

    RangeRuler.getRange = function(attacker, attackerPosition, defender, defenderPosition)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenderPosition", defenderPosition);

        var attackerBase = attacker.shipBase();
        var defenderBase = defender.shipBase();

        var attackerPolygon = Maneuver.computePolygon(attackerBase, attackerPosition.x(), attackerPosition.y(),
                attackerPosition.heading());
        var defenderPolygon = Maneuver.computePolygon(defenderBase, defenderPosition.x(), defenderPosition.y(),
                defenderPosition.heading());

        // FIXME
        // var distance = SHAPE_UTILS.computeMinimumDistance(attackerPolygon,
        // defenderPolygon);
        var distance = attackerPosition.computeDistance(defenderPosition);
        // LOGGER.trace("distance = "+distance);

        return RangeRuler.findRange(Math.round(distance));
    }

    if (Object.freeze)
    {
        Object.freeze(RangeRuler);
    };

    return RangeRuler;
});
