define(["DamageCard", "DamageCardV2", "damagestats/DamageData", "damagestats/DefaultFilters", "damagestats/EntityFilter", "damagestats/RangeFilter"],
    function(DamageCard, DamageCardV2, DamageData, DefaultFilters, EntityFilter, RangeFilter)
    {
        "use strict";

        function InitialState()
        {
            this.damageData = [];
            this.filteredDamageData = [];

            DamageCard.values().forEach(function(damageKey)
            {
                var damage = DamageCard.properties[damageKey];
                var damageData = DamageData.createDamageData(damage, "v1");
                this.damageData.push(damageData);
                this.filteredDamageData.push(damageData);
            }, this);

            DamageCardV2.values().forEach(function(damageKey)
            {
                var damage = DamageCardV2.properties[damageKey];
                var damageData = DamageData.createDamageData(damage, "v2");
                this.damageData.push(damageData);
                this.filteredDamageData.push(damageData);
            }, this);

            // FIXME
            // localStorage.removeItem("filters");
            // FIXME

            this.filters = DefaultFilters.create();
            var oldFilters = InitialState.loadFromLocalStorage();

            if (oldFilters)
            {
                this.merge(oldFilters);
            }
        }

        InitialState.prototype.merge = function(oldFilters)
        {
            InputValidator.validateNotNull("oldFilters", oldFilters);

            Object.getOwnPropertyNames(oldFilters).forEach(function(columnKey, i)
            {
                this.filters[columnKey] = oldFilters[columnKey];
            }, this);
        };

        InitialState.loadFromLocalStorage = function()
        {
            var answer;
            var filterObjects = JSON.parse(localStorage.filters || null);

            if (filterObjects)
            {
                answer = {};

                filterObjects.forEach(function(object, i)
                {
                    var filter;

                    switch (object.type)
                    {
                        case "EntityFilter":
                            filter = EntityFilter.fromObject(object);
                            break;
                        case "RangeFilter":
                            filter = RangeFilter.fromObject(object);
                            break;
                        default:
                            throw "Unknown filter type: " + JSON.stringify(object);
                    }

                    answer[filter.columnKey()] = filter;
                });
            }

            return answer;
        };

        return InitialState;
    });
