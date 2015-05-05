/*
 * Provides a formatter for commerce data.
 */
var CommerceFormat =
{
    createItemRow: function(result)
    {
        var answer = "";

        if (result)
        {
            var itemUrl = this.createItemUrl(result);
            var imgOnClick = "window.open(\"" + itemUrl + "\");"

            answer += "<tr>";
            answer += "<td style=\"text-align: left;\">";
            answer += "<a href=\"#\" onclick='";
            answer += imgOnClick;
            answer += "'>";
            answer += "<img src=\"";
            answer += ItemComputer.getImageUrl(result);
            answer += "\"></img>";
            answer += ItemComputer.getName(result);
            answer += "</a>";
            answer += "</td>";
            answer += "<td>";
            answer += this.formatType(result);
            answer += "</td>";
            answer += "<td>";
            answer += this.formatRarity(result);
            answer += "</td>";
            answer += "<td>";
            answer += ItemComputer.getBid(result);
            answer += "</td>";
            answer += "<td>";
            answer += ItemComputer.getAsk(result);
            answer += "</td>";
            answer += "<td>";
            answer += ItemComputer.getSupply(result);
            answer += "</td>";
            answer += "<td>";
            answer += ItemComputer.getDemand(result);
            answer += "</td>";
            answer += "<td>";
            answer += this.formatValue(ItemComputer
                    .computeRatioAskToBid(result));
            answer += "</td>";
            answer += "<td>";
            answer += this.formatValue(ItemComputer
                    .computeRatioDemandToSupply(result));
            answer += "</td>";
            answer += "</tr>";
        }

        return answer;
    },

    createItemUrl: function(result)
    {
        var itemUrl = "http://www.gw2spidy.com/item/"
                + ItemComputer.getId(result);

        return itemUrl;
    },

    formatItems: function(results, rarityId)
    {
        var start = new Date().getTime();
        var answer = "";

        if (results)
        {
            var len = results.length;

            for (var i = 0; i < len; i++)
            {
                var result = results[i];
                answer += this.createItemRow(result);
            }
        }

        if (LOGGER.isTimeEnabled())
        {
            LOGGER.time("CommerceFormat.formatItems()", start, new Date()
                    .getTime());
        }

        return answer;
    },

    formatRarity: function(result)
    {
        var answer = "&nbsp;";

        if (result)
        {
            var myRarity = ItemComputer.getRarity(result);

            if (myRarity)
            {
                answer = Rarity.properties[myRarity].name;
            }
        }

        return answer;
    },

    formatRarities: function()
    {
        var answer = "<option>*all*</option>";

        var values = Rarity.values;
        var properties = Rarity.properties;

        for (var i = 0; i < values.length; i++)
        {
            var value = values[i];
            var rarity = properties[value];

            answer += "<option value=\"";
            answer += rarity.id;
            answer += "\">";
            answer += rarity.id;
            answer += ": ";
            answer += rarity.name;
            answer += "</option>";
        }

        return answer;
    },

    formatType: function(result)
    {
        var answer = "&nbsp;";

        if (result)
        {
            var myType = ItemComputer.getType(result);

            if (myType)
            {
                answer = Type.properties[myType].name;
            }
        }

        return answer;
    },

    formatTypes: function()
    {
        var answer = "<option>*all*</option>";

        var values = Type.values;
        var properties = Type.properties;

        for (var i = 0; i < values.length; i++)
        {
            var value = values[i];
            var type = properties[value];

            answer += "<option value=\"";
            answer += type.id;
            answer += "\">";
            answer += type.name;
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
