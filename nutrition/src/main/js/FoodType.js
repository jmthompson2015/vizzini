/*
 * @see <a href="https://en.wikipedia.org/wiki/Table_of_food_nutrients">Table of food nutrients</a>
 */
var FoodType =
{
    BASIC: "Basic",
    BEVERAGE: "Beverage",
    CEREAL: "Cereal", // breads, cereals and grains
    DAIRY: "Dairy",
    DESSERT: "Dessert", // desserts and sweets
    FISH: "Fish", // fish and seafood
    FRUIT: "Fruit",
    MEAT: "Meat", // meat and poultry
    NUTS: "Nuts", // nuts and seeds
    OIL: "Oil", // oils, fats and shortenings
    PREPARED: "Prepared", // prepared meals (e.g. Chipotle burrito)
    SOUP: "Soup", // soups: canned and diluted
    SUPPLEMENT: "Supplement",
    VEGETABLE: "Vegetable",

    values: function()
    {
        var values = Object.getOwnPropertyNames(FoodType);
        values.vizziniRemove("values");

        var answer = values.map(function(value)
        {
            return FoodType[value];
        });

        return answer;
    },
}

if (Object.freeze)
{
    Object.freeze(FoodType)
};
