/*
 * Provides a formatter for crafting data.
 */
var CraftingFormat =
{
    createRecipeRow: function(result)
    {
        var answer = "";

        if (result)
        {
            var itemUrl = this.createRecipeUrl(result);
            var imgOnClick = "window.open(\"" + itemUrl + "\");"
            var productUrl = this.createProductUrl(result);
            var productOnClick = "window.open(\"" + productUrl + "\");"

            answer += "<tr>";
            answer += "<td style=\"text-align: left;\">";
            answer += "<a href=\"#\" onclick='";
            answer += imgOnClick;
            answer += "'>";
            answer += RecipeComputer.getName(result);
            answer += "</a>";
            answer += "</td>";
            answer += "<td>";
            answer += this.formatDiscipline(result);
            answer += "</td>";
            answer += "<td>";
            answer += RecipeComputer.getRating(result);
            answer += "</td>";
            answer += "<td style=\"text-align: left;\">";
            answer += "<a href=\"#\" onclick='";
            answer += productOnClick;
            answer += "'>";
            answer += RecipeComputer.getProductName(result);
            answer += "</a>";
            answer += "</td>";
            answer += "<td>";
            answer += RecipeComputer.getCost(result);
            answer += "</td>";
            answer += "<td>";
            answer += RecipeComputer.getBid(result);
            answer += "</td>";
            answer += "<td>";
            answer += RecipeComputer.getAsk(result);
            answer += "</td>";
            answer += "<td>";
            answer += RecipeComputer.getSupply(result);
            answer += "</td>";
            answer += "<td>";
            answer += RecipeComputer.getDemand(result);
            answer += "</td>";
            answer += "<td>";
            answer += this.formatValue(RecipeComputer
                    .computeBidCostRatio(result));
            answer += "</td>";
            answer += "<td>";
            answer += this.formatValue(RecipeComputer
                    .computeAskCostRatio(result));
            answer += "</td>";
            answer += "<td>";
            answer += this.formatValue(RecipeComputer
                    .computeAskBidRatio(result));
            answer += "</td>";
            answer += "<td>";
            answer += this.formatValue(RecipeComputer
                    .computeDemandSupplyRatio(result));
            answer += "</td>";
            answer += "</tr>";
        }

        return answer;
    },

    createProductUrl: function(result)
    {
        var itemUrl = "http://www.gw2spidy.com/item/"
                + RecipeComputer.getProductId(result);

        return itemUrl;
    },

    createRecipeUrl: function(result)
    {
        var itemUrl = "http://www.gw2spidy.com/recipe/"
                + RecipeComputer.getId(result);

        return itemUrl;
    },

    formatRecipes: function(results, rarityId)
    {
        var start = new Date().getTime();
        var answer = "";

        if (results)
        {
            var len = results.length;

            for (var i = 0; i < len; i++)
            {
                var result = results[i];
                answer += this.createRecipeRow(result);
            }
        }

        if (LOGGER.isTimeEnabled())
        {
            LOGGER.time("CraftingFormat.formatRecipes()", start, new Date()
                    .getTime());
        }

        return answer;
    },

    formatDiscipline: function(result)
    {
        var answer = "&nbsp;";

        if (result)
        {
            var myDiscipline = RecipeComputer.getDiscipline(result);

            if (myDiscipline)
            {
                answer = Discipline.properties[myDiscipline].name;
            }
        }

        return answer;
    },

    formatDisciplines: function()
    {
        var answer = "<option>*all*</option>";

        var values = Discipline.values;
        var properties = Discipline.properties;

        for (var i = 0; i < values.length; i++)
        {
            var value = values[i];
            var discipline = properties[value];

            answer += "<option value=\"";
            answer += discipline.id;
            answer += "\">";
            answer += discipline.id;
            answer += ": ";
            answer += discipline.name;
            answer += "</option>";
        }

        return answer;
    },

    formatValue: function(value)
    {
        var answer;

        if (value)
        {
            answer = this.round2(value).toFixed(2);
        }
        else
        {
            answer = "&nbsp;";
        }

        return answer;
    },

    round2: function(value)
    {
        var factor = 100.0;

        return Math.round(factor * value) / factor;
    },
}
