define(function()
{
    var Operator = {
        ADD: "add",
        SUBTRACT: "subtract",

        properties:
        {
            "add":
            {
                name: "+",
                value: "add",
            },
            "subtract":
            {
                name: "-",
                value: "subtract",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Operator.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Operator);
    }

    return Operator;
});
