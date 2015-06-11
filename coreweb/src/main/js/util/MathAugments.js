Math.Vizzini =
{
    randomIntFromRange: function(min, max)
    {
        var value = Math.Vizzini.randomRealFromRange(min, max);

        return Math.floor(value);
    },

    randomRealFromRange: function(min, max)
    {
        return Math.random() * (max - min) + min;
    },
}
