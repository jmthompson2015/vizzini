define([ "AllyCard", "CardSet", "CardType", "HeroCard", "Sphere", "game/ui/SphereUI" ], function(AllyCard, CardSet,
        CardType, HeroCard, Sphere, SphereUI)
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
        key: "threatCost",
        label: "Threat Cost",
        className: "numberCell",
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
            var sphere = Sphere.properties[card.sphere].name;
            var cardType = CardType.properties[card.cardType].name;
            var cardSet = CardSet.properties[card.set].name;

            var cells = [];
            var j = 0;

            cells.push(this.Td(
            {
                key: cells.length,
                className: "center",
                column: CardColumns[j++].key,
                value: sphere, // this allows sorting
            }, React.createElement(SphereUI,
            {
                sphereKey: card.sphere,
                isSmall: true,
            })));

            cells.push(this.createCell(cells.length, CardColumns[j++], card.name));
            cells.push(this.createCell(cells.length, CardColumns[j++], cardType));
            cells.push(this.createCell(cells.length, CardColumns[j++], cardSet));
            cells.push(this.createCell(cells.length, CardColumns[j++], card.threatCost));
            cells.push(this.createCell(cells.length, CardColumns[j++], card.cost));
            cells.push(this.createCell(cells.length, CardColumns[j++], card.willpower));
            cells.push(this.createCell(cells.length, CardColumns[j++], card.attack));
            cells.push(this.createCell(cells.length, CardColumns[j++], card.defense));

            return this.Tr(
            {
                key: key,
            }, cells);
        },
    });

    return CharacterCardsTable;
});
