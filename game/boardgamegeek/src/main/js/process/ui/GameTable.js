define(["GameColumns", "process/ui/Connector", "process/ui/FilterUI", "../../../../../../../coreweb/src/main/js/ui/DataTable"],
    function(GameColumns, Connector, FilterUI, DataTable)
    {
        "use strict";

        function createEntitiesTable(entities, url)
        {
            var rows = [];

            entities.forEach(function(entity)
            {
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

        function createImageLink(src, href, className)
        {
            var myClassName = (className !== undefined ? className : "imageBlock");
            var image = React.DOM.img(
            {
                className: myClassName,
                src: src,
            });

            return React.DOM.a(
            {
                href: href,
                target: "_blank",
            }, image);
        }

        var valueFunctions = {
            "usernames": function(data)
            {
                var answer;
                if (data.usernames !== undefined)
                {
                    answer = data.usernames.reduce(function(previousValue, username, i)
                    {
                        return previousValue + username + (i < data.usernames.length - 1 ? ", " : "");
                    }, "");
                }
                return answer;
            },
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
            "usernames": function(data)
            {
                var answer;
                if (data.usernames !== undefined)
                {
                    var cells = [];
                    for (var i = 0; i < data.usernames.length; i++)
                    {
                        var username = data.usernames[i];
                        var src = "../resources/" + username + ".png";
                        var href = "https://www.boardgamegeek.com/collection/user/" + username;
                        cells.push(createImageLink(src, href, ""));
                    }
                    answer = React.DOM.span(
                    {
                        className: "widthFull",
                    }, cells);
                }
                return answer;
            },
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
            "geekRating": function(data)
            {
                return Math.vizziniFormat(data.geekRating, 2);
            },
            "averageWeight": function(data)
            {
                return Math.vizziniFormat(data.averageWeight, 2);
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
            contextTypes:
            {
                store: React.PropTypes.object.isRequired,
            },

            propTypes:
            {
                rowData: React.PropTypes.array.isRequired,
            },

            // Factories.
            Table: React.createFactory(Reactable.Table),
            Tr: React.createFactory(Reactable.Tr),
            Td: React.createFactory(Reactable.Td),

            render: function()
            {
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
        });

        return GameTable;
    });
