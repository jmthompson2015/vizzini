/*
 * @see <a href="https://en.wikipedia.org/wiki/Table_of_food_nutrients">Table of food nutrients</a>
 */
var FoodType =
{
    BASIC: "basic",
    BEVERAGE: "beverage",
    CEREAL: "cereal", // breads, cereals and grains
    DAIRY: "dairy",
    DESSERT: "dessert", // desserts and sweets
    FISH: "fish", // fish and seafood
    FRUIT: "fruit",
    MEAT: "meat", // meat and poultry
    NUTS: "nuts", // nuts and seeds
    OIL: "oil", // oils, fats and shortenings
    PREPARED: "prepared", // prepared meals (e.g. Chipotle burrito)
    SOUP: "soup", // soups: canned and diluted
    VEGETABLE: "vegetable",
    properties:
    {
        "basic":
        {
            displayName: "Basic",
        },
        "beverage":
        {
            displayName: "Beverage",
        },
        "cereal":
        {
            displayName: "Cereal",
        },
        "dairy":
        {
            displayName: "Dairy",
        },
        "dessert":
        {
            displayName: "Dessert",
        },
        "fish":
        {
            displayName: "Fish",
        },
        "fruit":
        {
            displayName: "Fruit",
        },
        "meat":
        {
            displayName: "Meat",
        },
        "nuts":
        {
            displayName: "Nuts",
        },
        "oil":
        {
            displayName: "Oil",
        },
        "prepared":
        {
            displayName: "Prepared",
        },
        "soup":
        {
            displayName: "Soup",
        },
        "vegetable":
        {
            displayName: "Vegetable",
        },
    },

    getDisplayName: function(foodType)
    {
        var answer;

        if (foodType)
        {
            var properties = FoodType.properties[foodType];

            if (!properties) { throw "Couldn't find properties for foodType = "
                    + foodType; }

            answer = properties.displayName;
        }

        return answer;
    },

    values: function()
    {
        return Object.getOwnPropertyNames(FoodType.properties);
    },
}

if (Object.freeze)
{
    Object.freeze(FoodType)
};
