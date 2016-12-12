define(["DamageCard", "Pilot", "UpgradeCard", "abilitystats/AbilityData", "abilitystats/DefaultFilters", "abilitystats/EntityFilter", "abilitystats/RangeFilter"],
    function(DamageCard, Pilot, UpgradeCard, AbilityData, DefaultFilters, EntityFilter, RangeFilter)
    {
        "use strict";

        function InitialState()
        {
            this.abilityData = [];
            this.filteredAbilityData = [];

            DamageCard.values().forEach(function(damageKey)
            {
                var damage = DamageCard.properties[damageKey];
                var abilityData = AbilityData.createAbilityData(damage, "DamageCard");
                this.abilityData.push(abilityData);
                this.filteredAbilityData.push(abilityData);
            }, this);

            Pilot.values().forEach(function(pilotKey)
            {
                var pilot = Pilot.properties[pilotKey];
                var abilityData = AbilityData.createAbilityData(pilot, "Pilot");
                this.abilityData.push(abilityData);
                this.filteredAbilityData.push(abilityData);
            }, this);

            UpgradeCard.values().forEach(function(upgradeKey)
            {
                var upgrade = UpgradeCard.properties[upgradeKey];
                var abilityData = AbilityData.createAbilityData(upgrade, "UpgradeCard");
                this.abilityData.push(abilityData);
                this.filteredAbilityData.push(abilityData);
            }, this);

            this.filteredAbilityData.sort(function(a, b)
            {
                var answer = -1;

                var nameA = a.name.replace(/\"/g, "");
                var nameB = b.name.replace(/\"/g, "");

                if (nameA === nameB)
                {
                    answer = 0;
                }
                else if (nameA > nameB)
                {
                    answer = 1;
                }

                return answer;
            });

            // FIXME
            localStorage.removeItem("filters");
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
