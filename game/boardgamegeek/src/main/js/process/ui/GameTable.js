define(["GameColumns", "process/ui/Connector", "process/ui/FilterUI", "../../../../../../../coreweb/src/main/js/ui/DataTable"],
    function(GameColumns, Connector, FilterUI, DataTable)
    {
        "use strict";

        function createEntitiesTable(entities, url)
        {
            var rows = [];

            entities.forEach(function(entity)
            {
                // var link = React.DOM.a(
                // {
                //     href: url + entity.id,
                //     target: "_blank",
                // }, entity.name);
                //
                // rows.push(React.DOM.tr(
                // {
                //     key: rows.length,
                // }, React.DOM.td(
                // {}, link)));

                var src = "../resources/BoardGameGeek16.png";
                var href = url + entity.id;
                var link = createImageLink(src, href);

                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, React.DOM.td(
                {}, entity.name, link)));
            });

            return React.DOM.table(
            {
                className: "entitiesTable",
            }, React.DOM.tbody(
            {}, rows));
        }

        function createImageLink(src, href)
        {
            var image = React.DOM.img(
            {
                className: "imageBlock",
                src: src,
            });

            return React.DOM.a(
            {
                href: href,
                target: "_blank",
            }, image);
        }

        var valueFunctions = {
            "designers": function(data)
            {
                return data.designers.reduce(function(previousValue, designer, i)
                {
                    return previousValue + designer.name + (i < data.designers.length - 1 ? ", " : "");
                }, "");
            },
            "categories": function(data)
            {
                return data.categories.reduce(function(previousValue, category, i)
                {
                    return previousValue + category.name + (i < data.categories.length - 1 ? ", " : "");
                }, "");
            },
            "mechanics": function(data)
            {
                return data.mechanics.reduce(function(previousValue, mechanic, i)
                {
                    return previousValue + mechanic.name + (i < data.mechanics.length - 1 ? ", " : "");
                }, "");
            },
        };
        var cellFunctions = {
            "title": function(data)
            {
                var src = "../resources/BoardGameGeek16.png";
                var href = "https://www.boardgamegeek.com/boardgame/" + data.id;
                var link = createImageLink(src, href);
                return React.DOM.span(
                {
                    className: "textImageLink",
                }, data.title, link);
            },
            "designers": function(data)
            {
                var entities = data.designers;
                var url = "https://www.boardgamegeek.com/boardgamedesigner/";
                return createEntitiesTable(entities, url);
            },
            "categories": function(data)
            {
                var entities = data.categories;
                var url = "https://www.boardgamegeek.com/boardgamecategory/";
                return createEntitiesTable(entities, url);
            },
            "mechanics": function(data)
            {
                var entities = data.mechanics;
                var url = "https://www.boardgamegeek.com/boardgamemechanic/";
                return createEntitiesTable(entities, url);
            },
        };

        var GameTable = React.createClass(
        {
            // propTypes:
            // {
            //     gameDatabase: React.PropTypes.object.isRequired,
            //     gameSummaries: React.PropTypes.array.isRequired,
            // },

            contextTypes:
            {
                store: React.PropTypes.object.isRequired,
            },

            propTypes:
            {
                filters: React.PropTypes.object.isRequired,
                gameDatabase: React.PropTypes.object.isRequired,
                rowData: React.PropTypes.array.isRequired,
            },

            // Factories.
            Table: React.createFactory(Reactable.Table),
            Tr: React.createFactory(Reactable.Tr),
            Td: React.createFactory(Reactable.Td),

            render: function()
            {
                // var gameSummaries = this.props.gameSummaries;
                // var rows = [];
                //
                // gameSummaries.forEach(function(gameSummary, i)
                // {
                //     rows.push(this.createRow(gameSummary, i));
                // }.bind(this));
                //
                // var table = this.Table(
                // {
                //     className: "dataTable",
                //     columns: GameColumns,
                //     sortable: true,
                // }, rows);
                //
                // var rows2 = [];
                //
                // var rowCount = "Row Count: " + gameSummaries.length;
                // rows2.push(React.DOM.tr(
                // {
                //     key: rows2.length
                // }, React.DOM.td(
                // {
                //     className: "rowCount"
                // }, rowCount)));
                // rows2.push(React.DOM.tr(
                // {
                //     key: rows2.length
                // }, React.DOM.td(
                // {}, table)));
                //
                // return React.DOM.table(
                // {}, React.DOM.tbody(
                // {}, rows2));

                var connector = ReactRedux.connect(Connector.FilterUI.mapStateToProps)(FilterUI);
                var filterUI = React.createElement(ReactRedux.Provider,
                {
                    store: this.context.store,
                }, React.createElement(connector));

                var table = React.createElement(DataTable,
                {
                    columns: GameColumns,
                    rowData: this.props.rowData,
                    cellFunctions: cellFunctions,
                    valueFunctions: valueFunctions,
                });

                var rows = [];
                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, React.DOM.td(
                {}, filterUI)));
                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, React.DOM.td(
                {}, table)));

                return React.DOM.table(
                {}, React.DOM.tbody(
                {}, rows));
            },

            // createCell: function(key, column, value, displayValue)
            // {
            //     displayValue = (displayValue ? displayValue : value);
            //
            //     return this.Td(
            //     {
            //         key: key,
            //         className: column.className,
            //         column: column.key,
            //         value: value,
            //     }, displayValue);
            // },
            //
            // createEntitiesTable: function(entities, url)
            // {
            //     var rows = [];
            //
            //     entities.forEach(function(entity)
            //     {
            //         var link = React.DOM.a(
            //         {
            //             href: url + entity.id,
            //             target: "_blank",
            //         }, entity.name);
            //
            //         rows.push(React.DOM.tr(
            //         {
            //             key: rows.length,
            //         }, React.DOM.td(
            //         {}, link)));
            //     });
            //
            //     return React.DOM.table(
            //     {
            //         className: "entitiesTable",
            //     }, React.DOM.tbody(
            //     {}, rows));
            // },
            //
            // createLink: function(href, label)
            // {
            //     return React.DOM.a(
            //     {
            //         href: href,
            //         target: "_blank",
            //     }, label);
            // },
            //
            // createLinkCell: function(key, column, id, title)
            // {
            //     var link = this.createLink("https://www.boardgamegeek.com/boardgame/" + id, title);
            //
            //     return this.Td(
            //     {
            //         key: key,
            //         className: column.className,
            //         column: column.key,
            //         value: title,
            //     }, link);
            // },
            //
            // createRow: function(gameSummary, key)
            // {
            //     var gameDatabase = this.props.gameDatabase;
            //     var gameDetail = gameDatabase.findGameDetailById(gameSummary.id);
            //     var title = (gameDetail ? gameDetail.title : gameSummary.title);
            //     var yearPublished = (gameDetail ? gameDetail.yearPublished : "");
            //
            //     var cells = [];
            //
            //     var i = 0;
            //     cells.push(this.createCell(cells.length, GameColumns[i++], gameSummary.boardGameRank));
            //     cells.push(this.createLinkCell(cells.length, GameColumns[i++], gameSummary.id, title));
            //
            //     if (gameDetail)
            //     {
            //         var designers = gameDetail.designers;
            //
            //         if (designers && designers.length > 0)
            //         {
            //             cells.push(this.createCell(cells.length, GameColumns[i++], designers[0].name, this
            //                 .createEntitiesTable(designers, "https://www.boardgamegeek.com/boardgamedesigner/")));
            //         }
            //         else
            //         {
            //             cells.push(this.createCell(cells.length, GameColumns[i++], " "));
            //         }
            //     }
            //     else
            //     {
            //         cells.push(this.createCell(cells.length, GameColumns[i++], " "));
            //     }
            //
            //     cells.push(this.createCell(cells.length, GameColumns[i++], yearPublished));
            //     cells.push(this.createCell(cells.length, GameColumns[i++], gameSummary.geekRating,
            //         gameSummary.geekRatingDisplay));
            //
            //     if (gameDetail)
            //     {
            //         cells.push(this.createCell(cells.length, GameColumns[i++], gameDetail.minPlayers));
            //         cells.push(this.createCell(cells.length, GameColumns[i++], gameDetail.maxPlayers));
            //         cells.push(this.createCell(cells.length, GameColumns[i++], gameDetail.bestWithPlayers));
            //         cells.push(this.createCell(cells.length, GameColumns[i++], gameDetail.minPlayTime));
            //         cells.push(this.createCell(cells.length, GameColumns[i++], gameDetail.maxPlayTime));
            //
            //         var categories = gameDetail.categories;
            //
            //         if (categories && categories.length > 0)
            //         {
            //             cells.push(this.createCell(cells.length, GameColumns[i++], categories[0].name, this
            //                 .createEntitiesTable(categories, "https://www.boardgamegeek.com/boardgamecategory/")));
            //         }
            //         else
            //         {
            //             cells.push(this.createCell(cells.length, GameColumns[i++], " "));
            //         }
            //
            //         var mechanics = gameDetail.mechanics;
            //
            //         if (mechanics && mechanics.length > 0)
            //         {
            //             cells.push(this.createCell(cells.length, GameColumns[i++], mechanics[0].name, this
            //                 .createEntitiesTable(mechanics, "https://www.boardgamegeek.com/boardgamemechanic/")));
            //         }
            //         else
            //         {
            //             cells.push(this.createCell(cells.length, GameColumns[i++], " "));
            //         }
            //     }
            //
            //     return this.Tr(
            //     {
            //         key: key,
            //     }, cells);
            // },
        });

        return GameTable;
    });
