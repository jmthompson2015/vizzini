var FiltersUI = React.createClass(
{
    filterColumns: [],

    componentWillMount: function()
    {
        this.filterColumns.push(GameColumns[0]);
        this.filterColumns.push(GameColumns[3]);
        this.filterColumns.push(GameColumns[4]);
        this.filterColumns.push(GameColumns[5]);
        this.filterColumns.push(GameColumns[6]);
        this.filterColumns.push(GameColumns[7]);
        this.filterColumns.push(GameColumns[8]);
    },

    getInitialState: function()
    {
        var answer;

        if (localStorage.filters)
        {
            var filters = JSON.parse(localStorage.filters);
            answer = {};

            filters.forEach(function(filter)
            {
                answer[filter.columnKey] = filter;
            });
        }
        else
        {
            answer = this.createDefaults();
        }

        answer.isFiltered = false;

        return answer;
    },

    render: function()
    {
        var rows = [];

        this.filterColumns.forEach(function(column)
        {
            rows.push(this.createRow(rows.length, column));
        }, this);

        var filterTable = React.DOM.table(
        {
            className: "filterTable",
        }, rows);

        // var gameDatabase = this.props.gameDatabase;
        // var designerTable =
        // this.createEntityTable(gameDatabase.getDesigners());
        // var categoryTable =
        // this.createEntityTable(gameDatabase.getCategories());
        // var mechanicTable =
        // this.createEntityTable(gameDatabase.getMechanics());
        //
        var rows2 = [];
        var filterCell = React.DOM.td(
        {
            colSpan: 3,
        }, filterTable);
        // var designerCell = React.DOM.td(
        // {
        // className: "alignTop"
        // }, designerTable);
        // var categoryCell = React.DOM.td(
        // {
        // className: "alignTop"
        // }, categoryTable);
        // var mechanicCell = React.DOM.td(
        // {
        // className: "alignTop"
        // }, mechanicTable);
        rows2.push(React.DOM.tr(
        {
            key: 0,
        }, filterCell
        // , designerCell, categoryCell, mechanicCell
        ));

        var restoreButton = React.DOM.button(
        {
            onClick: this.restoreActionPerformed,
        }, "Restore Defaults");
        var unfilterButton = React.DOM.button(
        {
            disabled: !this.state.isFiltered,
            onClick: this.unfilterActionPerformed,
        }, "Remove Filter");
        var filterButton = React.DOM.button(
        {
            onClick: this.filterActionPerformed,
        }, "Apply Filter");
        rows2.push(React.DOM.tr(
        {
            key: 1,
        }, React.DOM.td({}, restoreButton), React.DOM.td({}, unfilterButton), React.DOM.td({}, filterButton)));

        return React.DOM.table(
        {
            className: "filtersUI",
        }, rows2);
    },

    createCell: function(key, column, value)
    {
        return React.DOM.td(
        {
            key: key,
            className: column.className,
            column: column.key,
        }, value);
    },

    createDefaults: function()
    {
        return (
        {
            boardGameRank: GameDatabase.newFilter("boardGameRank", false, 1, false, 20),
            yearPublished: GameDatabase.newFilter("yearPublished", false, 2005, false, 2015),
            geekRating: GameDatabase.newFilter("geekRating", false, 7.2, false, 10),
            minPlayers: GameDatabase.newFilter("minPlayers", true, 2, true, 3),
            maxPlayers: GameDatabase.newFilter("maxPlayers", true, 4, false, 6),
            minPlayTime: GameDatabase.newFilter("minPlayTime", true, 30, false, 120),
            maxPlayTime: GameDatabase.newFilter("maxPlayTime", false, 30, true, 120),
        });
    },

    createEntityTable: function(entities)
    {
        var rows = [];

        entities.forEach(function(entity)
        {
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td({}, entity.name + " (" + entity.count + ")")));
        });

        var answer = React.DOM.table(
        {
            className: "entitiesTable"
        }, React.DOM.tbody({}, rows));

        return answer;
    },

    createRow: function(key, column)
    {
        var cells = [];
        var filter = this.state[column.key];
        if (!filter) { throw "ERROR: missing filter for column = " + column.key; }

        cells.push(this.createCell(cells.length, column, React.DOM.input(
        {
            key: cells.length,
            id: column.key + "MinChecked",
            type: "checkbox",
            checked: filter.isMinEnabled,
            onChange: this.handleChange,
        })));
        cells.push(this.createCell(cells.length, column, React.DOM.input(
        {
            key: cells.length,
            id: column.key + "Min",
            type: "number",
            className: "filterField",
            value: filter.minValue,
            onChange: this.handleChange,
        })));

        cells.push(React.DOM.td(
        {
            key: cells.length,
            className: "filterLabel",
            column: column.key,
        }, "\u2264 " + column.label + " \u2264"));

        cells.push(this.createCell(cells.length, column, React.DOM.input(
        {
            key: cells.length,
            id: column.key + "MaxChecked",
            type: "checkbox",
            checked: filter.isMaxEnabled,
            onChange: this.handleChange,
        })));
        cells.push(this.createCell(cells.length, column, React.DOM.input(
        {
            key: cells.length,
            id: column.key + "Max",
            type: "number",
            className: "filterField",
            value: filter.maxValue,
            onChange: this.handleChange,
        })));

        return React.DOM.tr(
        {
            key: key
        }, cells);
    },

    filterActionPerformed: function(event)
    {
        LOGGER.trace("FiltersUI.filterActionPerformed() start");

        var filters = [];

        this.filterColumns.forEach(function(column)
        {
            filters.push(this.state[column.key]);
        }, this);

        this.trigger("applyFilters", filters);
        this.setState(
        {
            isFiltered: true,
        });
        localStorage.filters = JSON.stringify(filters);

        LOGGER.trace("FiltersUI.filterActionPerformed() end");
    },

    handleChange: function(event)
    {
        LOGGER.trace("FiltersUI.handleChange() start");

        var id = event.target.id;
        var columnKey;
        var filter;

        if (id.endsWith("MinChecked"))
        {
            columnKey = id.substring(0, id.length - "MinChecked".length);
            filter = this.state[columnKey];
            filter.isMinEnabled = event.target.checked;
        }
        else if (id.endsWith("Min"))
        {
            columnKey = id.substring(0, id.length - "Min".length);
            filter = this.state[columnKey];
            filter.minValue = event.target.value;
        }
        else if (id.endsWith("MaxChecked"))
        {
            columnKey = id.substring(0, id.length - "MaxChecked".length);
            filter = this.state[columnKey];
            filter.isMaxEnabled = event.target.checked;
        }
        else if (id.endsWith("Max"))
        {
            columnKey = id.substring(0, id.length - "Max".length);
            filter = this.state[columnKey];
            filter.maxValue = event.target.value;
        }

        LOGGER.debug("new filter = " + JSON.stringify(filter));

        this.setState(
        {
            columnKey: filter
        });

        LOGGER.trace("FiltersUI.handleChange() end");
    },

    restoreActionPerformed: function(event)
    {
        LOGGER.trace("FiltersUI.restoreActionPerformed() start");

        this.setState(this.createDefaults());

        LOGGER.trace("FiltersUI.restoreActionPerformed() end");
    },

    unfilterActionPerformed: function(event)
    {
        LOGGER.trace("FiltersUI.unfilterActionPerformed() start");

        var filters = [];

        this.trigger("applyFilters", filters);
        this.setState(
        {
            isFiltered: false,
        });

        LOGGER.trace("FiltersUI.unfilterActionPerformed() end");
    },
});

MicroEvent.mixin(FiltersUI);
