/*
 * Provides an enumeration of ship bases for Starfighter Squadrons.
 */
define([ "RectanglePath" ], function(RectanglePath)
{
    var ShipBase =
    {
        STANDARD: "standard",
        LARGE: "large",
        HUGE1: "huge1",
        HUGE2: "huge2",
        properties:
        {
            "standard":
            {
                width: 40,
                height: 40,
            },
            "large":
            {
                width: 80,
                height: 80,
            },
            "huge1":
            {
                width: 195,
                height: 80,
            },
            "huge2":
            {
                width: 225,
                height: 80,
            }
        }
    };

    ShipBase.computePolygon = function(shipBase, x, y, heading)
    {
        var properties = ShipBase.properties[shipBase];

        var answer = new RectanglePath(properties.width, properties.height);

        answer.rotate(heading * Math.PI / 180);
        answer.translate(x, y);

        return answer;
    }

    if (Object.freeze)
    {
        Object.freeze(ShipBase);
    };

    return ShipBase;
});
