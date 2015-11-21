var GameColumns = [
{
    key: "boardGameRank",
    label: "Board Game Rank",
    className: "numberCell",
},
{
    key: "title",
    label: "Title",
    className: "textCell",
},
{
    key: "designers",
    label: "Designer",
},
{
    key: "yearPublished",
    label: "Year Published",
    className: "numberCell",
},
{
    key: "geekRating",
    label: "Geek Rating",
    className: "numberCell",
},
{
    key: "minPlayers",
    label: "Min. Players",
    className: "numberCell",
},
{
    key: "maxPlayers",
    label: "Max. Players",
    className: "numberCell",
},
{
    key: "bestWithPlayers",
    label: "Best with Players",
    className: "numberCell",
},
{
    key: "minPlayTime",
    label: "Min. Play Time",
    className: "numberCell",
},
{
    key: "maxPlayTime",
    label: "Max. Play Time",
    className: "numberCell",
},
{
    key: "categories",
    label: "Category",
},
{
    key: "mechanics",
    label: "Mechanic",
}, ];

var GameTable = React.createClass(
{
    // Factories.
    Table: React.createFactory(Reactable.Table),
    Tr: React.createFactory(Reactable.Tr),
    Td: React.createFactory(Reactable.Td),

    render: function()
    {
        var gameDatabase = this.props.gameDatabase;
        var gameSummaries = gameDatabase.getGameSummaries();
        var rows = [];

        gameSummaries.forEach(function(gameSummary, i)
        {
            rows.push(this.createRow(gameSummary, i));
        }.bind(this));

        var table = this.Table(
        {
            className: "dataTable",
            columns: GameColumns,
            sortable: true,
        }, rows);

        var rows2 = [];

        var rowCount = "Row Count: " + gameSummaries.length;
        rows2.push(React.DOM.tr(
        {
            key: rows2.length
        }, React.DOM.td(
        {
            className: "rowCount"
        }, rowCount)));
        rows2.push(React.DOM.tr(
        {
            key: rows2.length
        }, React.DOM.td({}, table)));

        return React.DOM.table({}, React.DOM.tbody({}, rows2));
    },

    createCell: function(key, column, value, displayValue)
    {
        displayValue = (displayValue ? displayValue : value);

        return this.Td(
        {
            key: key,
            className: column.className,
            column: column.key,
            value: value,
        }, displayValue);
    },

    createEntitiesTable: function(entities, url)
    {
        var rows = [];

        entities.forEach(function(entity)
        {
            var link = React.DOM.a(
            {
                href: url + entity.id,
                target: "_blank",
            }, entity.name);

            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td({}, link)));
        });

        return React.DOM.table(
        {
            className: "entitiesTable",
        }, React.DOM.tbody({}, rows));
    },

    createLink: function(href, label)
    {
        return React.DOM.a(
        {
            href: href,
            target: "_blank",
        }, label);
    },

    createLinkCell: function(key, column, id, title)
    {
        var link = this.createLink("https://www.boardgamegeek.com/boardgame/" + id, title);

        return this.Td(
        {
            key: key,
            className: column.className,
            column: column.key,
            value: title,
        }, link);
    },

    createRow: function(gameSummary, key)
    {
        var gameDatabase = this.props.gameDatabase;
        var gameDetail = gameDatabase.findGameDetailById(gameSummary.id);
        var title = (gameDetail ? gameDetail.title : gameSummary.title);
        var yearPublished = (gameDetail ? gameDetail.yearPublished : "");

        var cells = [];

        var i = 0;
        cells.push(this.createCell(cells.length, GameColumns[i++], gameSummary.boardGameRank));
        cells.push(this.createLinkCell(cells.length, GameColumns[i++], gameSummary.id, title));

        if (gameDetail)
        {
            var designers = gameDetail.designers;

            if (designers && designers.length > 0)
            {
                cells.push(this.createCell(cells.length, GameColumns[i++], designers[0].name, this.createEntitiesTable(
                        designers, "https://www.boardgamegeek.com/boardgamedesigner/")));
            }
            else
            {
                cells.push(this.createCell(cells.length, GameColumns[i++], " "));
            }
        }
        else
        {
            cells.push(this.createCell(cells.length, GameColumns[i++], " "));
        }

        cells.push(this.createCell(cells.length, GameColumns[i++], yearPublished));
        cells.push(this.createCell(cells.length, GameColumns[i++], gameSummary.geekRating,
                gameSummary.geekRatingDisplay));

        if (gameDetail)
        {
            cells.push(this.createCell(cells.length, GameColumns[i++], gameDetail.minPlayers));
            cells.push(this.createCell(cells.length, GameColumns[i++], gameDetail.maxPlayers));
            cells.push(this.createCell(cells.length, GameColumns[i++], gameDetail.bestWithPlayers));
            cells.push(this.createCell(cells.length, GameColumns[i++], gameDetail.minPlayTime));
            cells.push(this.createCell(cells.length, GameColumns[i++], gameDetail.maxPlayTime));

            var categories = gameDetail.categories;

            if (categories && categories.length > 0)
            {
                cells.push(this.createCell(cells.length, GameColumns[i++], categories[0].name, this
                        .createEntitiesTable(categories, "https://www.boardgamegeek.com/boardgamecategory/")));
            }
            else
            {
                cells.push(this.createCell(cells.length, GameColumns[i++], " "));
            }

            var mechanics = gameDetail.mechanics;

            if (mechanics && mechanics.length > 0)
            {
                cells.push(this.createCell(cells.length, GameColumns[i++], mechanics[0].name, this.createEntitiesTable(
                        mechanics, "https://www.boardgamegeek.com/boardgamemechanic/")));
            }
            else
            {
                cells.push(this.createCell(cells.length, GameColumns[i++], " "));
            }
        }

        return this.Tr(
        {
            key: key,
        }, cells);
    },
});
