/*
 * Provides a recipe computer.
 */
var RecipeComputer =
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

    computeAskCostRatio: function(result)
    {
        var answer;

        if (result)
        {
            var cost = this.getCost(result);

            if (cost != 0)
            {
                answer = this.getAsk(result) / cost;
            }
        }

        return answer;
    },

    computeBidCostRatio: function(result)
    {
        var answer;

        if (result)
        {
            var cost = this.getCost(result);

            if (cost != 0)
            {
                answer = this.getBid(result) / cost;
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
            answer = result.result_item_min_sale_unit_price;
        }

        return answer;
    },

    getBid: function(result)
    {
        var answer;

        if (result)
        {
            answer = result.result_item_max_offer_unit_price;
        }

        return answer;
    },

    getCost: function(result)
    {
        var answer;

        if (result)
        {
            answer = result.crafting_cost;
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

    getDiscipline: function(result)
    {
        var answer;

        if (result)
        {
            var id = this.getDisciplineId(result);
            answer = Discipline.findById(id);
        }

        return answer;
    },

    getDisciplineId: function(result)
    {
        var answer;

        if (result)
        {
            answer = result.discipline_id;
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

    getProductId: function(result)
    {
        var answer;

        if (result)
        {
            answer = result.result_item_data_id;
        }

        return answer;
    },

    getProductName: function(result)
    {
        var answer;

        if (result)
        {
            answer = result.result_item_name;
        }

        return answer;
    },

    getRating: function(result)
    {
        var answer;

        if (result)
        {
            answer = result.rating;
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
}
