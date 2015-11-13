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

        var rows2 = [];
        rows2.push(React.DOM.tr(
        {
            key: 0,
        }, React.DOM.td(
        {
            colSpan: 2,
        }, filterTable)));

        // var restoreButton = React.DOM.button(
        // {
        // onClick: this.restoreActionPerformed,
        // }, "Restore Defaults");
        var unfilterButton = React.DOM.button(
        {
            onClick: this.unfilterActionPerformed,
        }, "Remove Filter");
        var filterButton = React.DOM.button(
        {
            onClick: this.filterActionPerformed,
        }, "Apply Filter");
        rows2.push(React.DOM.tr(
        {
            key: 1,
        }, // React.DOM.td({}, restoreButton),
        React.DOM.td({}, unfilterButton), React.DOM.td({}, filterButton)));

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
            yearPublished: GameDatabase.newFilter("yearPublished", false, 2000, false, 2015),
            geekRating: GameDatabase.newFilter("geekRating", true, 7.2, false, 10),
            minPlayers: GameDatabase.newFilter("minPlayers", true, 2, true, 3),
            maxPlayers: GameDatabase.newFilter("maxPlayers", true, 4, false, 6),
            minPlayTime: GameDatabase.newFilter("minPlayTime", true, 30, false, 120),
            maxPlayTime: GameDatabase.newFilter("maxPlayTime", false, 30, true, 120),
        });
    },

    createFilter: function(columnKey)
    {
        var isMinEnabled = document.getElementById(columnKey + "MinChecked").checked;

        var minValue = document.getElementById(columnKey + "Min").value;
        minValue = (minValue ? parseFloat(minValue) : undefined);
        LOGGER.debug(columnKey + " isMinEnabled, minValue = " + isMinEnabled + " " + minValue);

        var isMaxEnabled = document.getElementById(columnKey + "MaxChecked").checked;

        var maxValue = document.getElementById(columnKey + "Max").value;
        maxValue = (maxValue ? parseFloat(maxValue) : undefined);
        LOGGER.debug(columnKey + " isMaxEnabled, maxValue = " + isMaxEnabled + " " + maxValue);

        return GameDatabase.newFilter(columnKey, isMinEnabled, minValue, isMaxEnabled, maxValue);
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
            defaultChecked: filter.isMinEnabled,
        })));
        cells.push(this.createCell(cells.length, column, React.DOM.input(
        {
            key: cells.length,
            id: column.key + "Min",
            type: "number",
            className: "filterField",
            defaultValue: filter.minValue,
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
            defaultChecked: filter.isMaxEnabled,
        })));
        cells.push(this.createCell(cells.length, column, React.DOM.input(
        {
            key: cells.length,
            id: column.key + "Max",
            type: "number",
            className: "filterField",
            defaultValue: filter.maxValue,
        })));

        return React.DOM.tr(
        {
            key: key
        }, cells);
    },

    filterActionPerformed: function(event)
    {
        LOGGER.info("FiltersUI.filterActionPerformed() start");

        var filters = [];

        this.filterColumns.forEach(function(column)
        {
            filters.push(this.createFilter(column.key));
        }, this);

        this.trigger("applyFilters", filters);
        localStorage.filters = JSON.stringify(filters);

        LOGGER.info("FiltersUI.filterActionPerformed() end");
    },

    // restoreActionPerformed: function(event)
    // {
    // LOGGER.info("FiltersUI.restoreActionPerformed() start");
    //
    // var filters = [];
    // this.setState(this.createDefaults());
    //
    // LOGGER.info("FiltersUI.restoreActionPerformed() end");
    // },

    unfilterActionPerformed: function(event)
    {
        LOGGER.info("FiltersUI.unfilterActionPerformed() start");

        var filters = [];

        this.trigger("applyFilters", filters);

        LOGGER.info("FiltersUI.unfilterActionPerformed() end");
    },
});

MicroEvent.mixin(FiltersUI);
