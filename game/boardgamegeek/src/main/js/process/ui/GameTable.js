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
                return data.designers.reduce(function(previousValue, designer)
                {
                    return previousValue + designer.name + " ";
                }, "");
            },
            "categories": function(data)
            {
                return data.categories.reduce(function(previousValue, category)
                {
                    return previousValue + category.name + " ";
                }, "");
            },
            "mechanics": function(data)
            {
                return data.mechanics.reduce(function(previousValue, mechanic)
                {
                    return previousValue + mechanic.name + " ";
                }, "");
            },
        };

        var cellFunctions = {
            "title": function(data)
            {
                var src = "../resources/BoardGameGeek16.png";
                var href = "https://www.boardgamegeek.com/boardgame/" + data.id;
                var image = createImageLink(src, href);
                return React.DOM.span(
                {
                    className: "textImageLink",
                }, data.title, image);
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
