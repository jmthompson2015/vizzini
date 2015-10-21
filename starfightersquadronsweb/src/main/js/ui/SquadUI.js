var SquadColumns = [
{
    key: "action",
    label: "Action",
    className: "actionCell",
},
{
    key: "pilot",
    label: "Pilot",
    className: "squadUIPilotName",
},
{
    key: "ship",
    label: "Ship",
    className: "squadUIPilotName",
},
{
    key: "pilotSkill",
    label: "Pilot Skill",
    className: "numberCell",
},
{
    key: "primaryWeapon",
    label: "Primary Weapon",
    className: "numberCell",
},
{
    key: "agility",
    label: "Agility",
    className: "numberCell",
},
{
    key: "hull",
    label: "Hull",
    className: "numberCell",
},
{
    key: "shield",
    label: "Shield",
    className: "numberCell",
},
{
    key: "squadPointCost",
    label: "Squad Points",
    className: "numberCell",
} ];

/*
 * Provides a user interface for a starfighter squadron.
 * 
 * @param squad Squad.
 * 
 * @param removeFunction Called after an item is removed.
 */
var SquadUI = React.createClass(
{
    // Factories.
    Table: React.createFactory(Reactable.Table),
    Tr: React.createFactory(Reactable.Tr),
    Td: React.createFactory(Reactable.Td),
    Tfoot: React.createFactory(Reactable.Tfoot),

    render: function()
    {
        var squad = this.props.squad;
        var self = this;

        // Assign actions.
        squad.forEach(function(token)
        {
            if (!token.removeAction)
            {
                token.removeAction = self.createRemoveAction(token);
            }
        });

        var rows = squad.map(function(token, i)
        {
            return self.createRows(token, i);
        });
        var footer = this.Tfoot(
        {
            key: "footer"
        }, this.createTotalsRow());

        return this.Table(
        {
            className: "squadUI",
            columns: SquadColumns,
        }, rows, footer);
    },

    createCell: function(key, column, value)
    {
        return this.Td(
        {
            key: key,
            className: column.className,
            column: column.key,
        }, value);
    },

    createRemoveAction: function(token)
    {
        var removeFunction = this.props.removeFunction;
        var myOnClick = function(event)
        {
            removeFunction(token);
        };
        var image = React.DOM.img(
        {
            // src: "../../../main/resources/delete.png"
            src: "../resources/delete.png"
        });

        return React.DOM.a(
        {
            href: "#",
            className: "removeButton",
            onClick: myOnClick
        }, image);
    },

    createRows: function(token, i)
    {
        var answer = [];

        answer.push(this.createTokenRow(token, i));

        var upgrades = token.getUpgrades();
        var self = this;

        upgrades.forEach(function(upgrade, j)
        {
            answer.push(self.createUpgradeRow(upgrade, j));
        });

        return answer;
    },

    createTokenRow: function(token, i)
    {
        var cells = [];
        var createCell = this.createCell;
        var actionFunction = token["removeAction"];
        cells.push(createCell(cells.length, SquadColumns[0], actionFunction));

        var pilotProps = Pilot.properties[token.getPilot()];
        var shipProps = Ship.properties[token.getShip()];
        cells.push(createCell(cells.length, SquadColumns[1], pilotProps.name));
        cells.push(createCell(cells.length, SquadColumns[2], shipProps.name));

        var shipState = pilotProps.shipState;
        cells.push(createCell(cells.length, SquadColumns[3], shipState.getPilotSkillValue()));
        cells.push(createCell(cells.length, SquadColumns[4], shipState.getPrimaryWeaponValue()));
        cells.push(createCell(cells.length, SquadColumns[5], shipState.getAgilityValue()));
        cells.push(createCell(cells.length, SquadColumns[6], shipState.getHullValue()));
        cells.push(createCell(cells.length, SquadColumns[7], shipState.getShieldValue()));

        cells.push(createCell(cells.length, SquadColumns[8], pilotProps.squadPointCost));

        return this.Tr(
        {
            key: i
        }, cells);
    },

    createTotalsRow: function()
    {
        var squad = this.props.squad;
        var sums = {};
        sums[SquadColumns[0].key] = " ";
        sums[SquadColumns[1].key] = " ";
        sums[SquadColumns[2].key] = "Totals";
        for (var i = 3; i < SquadColumns.length; i++)
        {
            sums[SquadColumns[i].key] = 0;
        }

        squad.forEach(function(token)
        {
            var pilot = token.getPilot();
            var pilotProps = Pilot.properties[pilot];
            var shipState = pilotProps.shipState;
            var values = [ shipState.getPilotSkillValue(), shipState.getPrimaryWeaponValue(),
                    shipState.getAgilityValue(), shipState.getHullValue(), shipState.getShieldValue(),
                    pilotProps.squadPointCost ];
            for (var i = 3; i < SquadColumns.length; i++)
            {
                sums[SquadColumns[i].key] += values[i - 3];
            }

            var upgrades = token.getUpgrades();
            upgrades.forEach(function(upgrade)
            {
                var upgradeProps = UpgradeCard.properties[upgrade];
                var shipState = upgradeProps.shipState;

                if (shipState)
                {
                    var values = [ shipState.getPilotSkillValue(), shipState.getPrimaryWeaponValue(),
                            shipState.getAgilityValue(), shipState.getHullValue(), shipState.getShieldValue() ];
                    for (var i = 3; i < SquadColumns.length - 1; i++)
                    {
                        sums[SquadColumns[i].key] += values[i - 3];
                    }
                }
                sums[SquadColumns[8].key] += upgradeProps.squadPointCost;
            });
        });

        var cells = [];
        SquadColumns.forEach(function(column)
        {
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: "squadUISum"
            }, sums[column.key]));
        });

        return React.DOM.tr({}, cells);
    },

    createUpgradeRow: function(upgrade, i)
    {
        var cells = [];
        var createCell = this.createCell;
        cells.push(createCell(cells.length, SquadColumns[0], ""));

        var upgradeProps = UpgradeCard.properties[upgrade];
        var image = UpgradeCardUI.createUpgradeImage(upgradeProps.type, 0);
        cells.push(this.Td(
        {
            key: cells.length,
            className: "squadUIPilotName",
            column: SquadColumns[1].key,
        }, React.DOM.span({}, image, " ", upgradeProps.name)));

        var shipState = upgradeProps.shipState;
        cells.push(createCell(cells.length, SquadColumns[3], (shipState ? shipState.getPilotSkillValue() : "")));
        cells.push(createCell(cells.length, SquadColumns[4], (shipState ? shipState.getPrimaryWeaponValue() : "")));
        cells.push(createCell(cells.length, SquadColumns[5], (shipState ? shipState.getAgilityValue() : "")));
        cells.push(createCell(cells.length, SquadColumns[6], (shipState ? shipState.getHullValue() : "")));
        cells.push(createCell(cells.length, SquadColumns[7], (shipState ? shipState.getShieldValue() : "")));

        cells.push(createCell(cells.length, SquadColumns[8], upgradeProps.squadPointCost));

        return this.Tr(
        {
            key: i
        }, cells);
    },

    removeFunction: function(selected, event)
    {
        this.props.removeFunction(selected, event);
    },
});
