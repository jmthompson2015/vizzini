/*
 * Provides an item computer.
 */
var ItemComputer =
{
    computeAskBidRatio: function(result)
    {
        var answer;

        if (result)
        {
            var bid = this.getBid(result);

            if (bid != 0)
            {
                answer = this.getAsk(result) / bid;
            }
        }

        return answer;
    },

    computeDemandSupplyRatio: function(result)
    {
        var answer;

        if (result)
        {
            var supply = this.getSupply(result);

            if (supply != 0)
            {
                answer = this.getDemand(result) / supply;
            }
        }

        return answer;
    },

    getAsk: function(result)
    {
        var answer;

        if (result)
        {
            answer = result.min_sale_unit_price;
        }

        return answer;
    },

    getBid: function(result)
    {
        var answer;

        if (result)
        {
            answer = result.max_offer_unit_price;
        }

        return answer;
    },

    getDemand: function(result)
    {
        var answer;

        if (result)
        {
            answer = result.offer_availability;
        }

        return answer;
    },

    getId: function(result)
    {
        var answer;

        if (result)
        {
            answer = result.data_id;
        }

        return answer;
    },

    getImageUrl: function(result)
    {
        var answer;

        if (result)
        {
            answer = result.img;
        }

        return answer;
    },

    getName: function(result)
    {
        var answer;

        if (result)
        {
            answer = result.name;
        }

        return answer;
    },

    getRarity: function(result)
    {
        var answer;

        if (result)
        {
            var id = this.getRarityId(result);
            answer = Rarity.findById(id);
        }

        return answer;
    },

    getRarityId: function(result)
    {
        var answer;

        if (result)
        {
            answer = result.rarity;
        }

        return answer;
    },

    getSubTypeId: function(result)
    {
        var answer;

        if (result)
        {
            answer = result.sub_type_id;
        }

        return answer;
    },

    getSupply: function(result)
    {
        var answer;

        if (result)
        {
            answer = result.sale_availability;
        }

        return answer;
    },

    getType: function(result)
    {
        var answer;

        if (result)
        {
            var id = this.getTypeId(result);
            answer = Type.findById(id);
        }

        return answer;
    },

    getTypeId: function(result)
    {
        var answer;

        if (result)
        {
            answer = result.type_id;
        }

        return answer;
    },
}
