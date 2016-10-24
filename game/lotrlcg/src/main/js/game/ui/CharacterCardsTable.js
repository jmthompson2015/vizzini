define([ "AllyCard", "CardType", "HeroCard", "Sphere", "game/ui/SphereUI" ], function(AllyCard, CardType, HeroCard,
        Sphere, SphereUI)
{
    "use strict";
    var CardColumns = [
    {
        key: "sphere",
        label: "Sphere",
    },
    {
        key: "name",
        label: "Name",
        className: "textCell",
    },
    {
        key: "cardType",
        label: "Type",
        className: "textCell",
    },
    {
        key: "set",
        label: "Set",
        className: "textCell",
    },
    {
        key: "cost",
        label: "Cost",
        className: "numberCell",
    },
    {
        key: "willpower",
        label: "Willpower",
        className: "numberCell",
    },
    {
        key: "attack",
        label: "Attack",
        className: "numberCell",
    },
    {
        key: "defense",
        label: "Defense",
        className: "numberCell",
    },
    {
        key: "hitPoints",
        label: "Hit Points",
        className: "numberCell",
    },
    {
        key: "sumStats",
        label: "Sum Stats",
        className: "numberCell",
    },
    {
        key: "Sum / Cost",
        label: "Sum / Cost",
        className: "numberCell",
    }, ];

    var CharacterCardsTable = React.createClass(
    {
        // Factories.
        Table: React.createFactory(Reactable.Table),
        Tr: React.createFactory(Reactable.Tr),
        Td: React.createFactory(Reactable.Td),
        Tfoot: React.createFactory(Reactable.Tfoot),

        render: function()
        {
            var rows = [];

            var heroKeys = HeroCard.values();
            var self = this;

            heroKeys.forEach(function(heroKey, i)
            {
                var card = HeroCard.properties[heroKey];
                rows.push(self.createRow(card, i));
            });

            var allyKeys = AllyCard.values();

            allyKeys.forEach(function(allyKey, i)
            {
                var card = AllyCard.properties[allyKey];
                rows.push(self.createRow(card, i));
            });

            return this.Table(
            {
                id: "characterTable",
                columns: CardColumns,
                sortable: true,
            }, rows);
        },

        createCell: function(key, column, value)
        {
            return this.Td(
            {
                key: key,
                className: column.className,
                column: column.key,
            }, (value !== undefined && value !== null ? value : " "));
        },

        createRow: function(card, key)
        {
            var sphere = card.sphere;
            var cardType = card.cardType;
            var cardSet = card.cardSet;
            var sumStats = card.willpower + card.attack + card.defense + card.hitPoints;
            var cost = (card.cardTypeKey === CardType.HERO ? card.threatCost : card.cost);
            var ratio = (cost === 0 ? " " : Math.vizziniFormat(sumStats / cost, 2));

            var cells = [];
            var j = 0;

            cells.push(this.Td(
            {
                key: cells.length,
                className: "center",
                column: CardColumns[j++].key,
                value: sphere.name, // this allows sorting
            }, React.createElement(SphereUI,
            {
                sphereKey: card.sphereKey,
                isSmall: true,
            })));

            cells.push(this.createCell(cells.length, CardColumns[j++], card.name));
            cells.push(this.createCell(cells.length, CardColumns[j++], cardType.name));
            cells.push(this.createCell(cells.length, CardColumns[j++], cardSet.name));
            cells.push(this.createCell(cells.length, CardColumns[j++], cost));
            cells.push(this.createCell(cells.length, CardColumns[j++], card.willpower));
            cells.push(this.createCell(cells.length, CardColumns[j++], card.attack));
            cells.push(this.createCell(cells.length, CardColumns[j++], card.defense));
            cells.push(this.createCell(cells.length, CardColumns[j++], card.hitPoints));
            cells.push(this.createCell(cells.length, CardColumns[j++], sumStats));
            cells.push(this.createCell(cells.length, CardColumns[j++], ratio));

            return this.Tr(
            {
                key: key,
            }, cells);
        },
    });

    return CharacterCardsTable;
});
