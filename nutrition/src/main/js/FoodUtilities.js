var FoodUtilities =
{
    combine: function(brand, name, foods)
    {
        var answer = {};

        var properties = FoodProperty.numberValues();

        properties.forEach(function(property)
        {
            answer[property] = 0;
        });

        var self = this;

        foods.forEach(function(food)
        {
            properties.forEach(function(property)
            {
                answer[property] += self.safeNumber(food[property]);
            });
        });

        answer.type = FoodType.PREPARED;
        answer.brand = brand;
        answer.name = name;
        answer.servingSize = "1";
        answer.servingsPerContainer = undefined;

        return answer;
    },

    multiply: function(food, value)
    {
        food.servingSize = (value === food.servingsPerContainer ? "container"
                : value + " * " + food.servingSize);

        var properties = FoodProperty.numberValues();

        properties.forEach(function(property)
        {
            if (food[property] !== undefined)
            {
                food[property] = value * food[property];
            }
        });
    },

    normalize: function(value, range)
    {
        return (this.safeNumber(value) - range.low) / (range.high - range.low);
    },

    safeNumber: function(value)
    {
        return (value === undefined ? 0.0 : value);
    },
}
