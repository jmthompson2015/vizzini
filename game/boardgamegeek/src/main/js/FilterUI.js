var FiltersUI = React.createClass(
{
    getInitialState: function()
    {
        return this.createDefaults();
    },

    render: function()
    {
        var rows = [];

        rows.push(this.createRow(rows.length, GameColumns[0]));
        rows.push(this.createRow(rows.length, GameColumns[2]));
        rows.push(this.createRow(rows.length, GameColumns[3]));
        rows.push(this.createRow(rows.length, GameColumns[4]));
        rows.push(this.createRow(rows.length, GameColumns[5]));
        rows.push(this.createRow(rows.length, GameColumns[6]));
        rows.push(this.createRow(rows.length, GameColumns[7]));

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
            boardGameRankMinChecked: false,
            boardGameRankMin: 1,
            boardGameRankMaxChecked: false,
            boardGameRankMax: 20,

            yearPublishedMinChecked: false,
            yearPublishedMin: 2000,
            yearPublishedMaxChecked: false,
            yearPublishedMax: 2015,

            geekRatingMinChecked: true,
            geekRatingMin: 7.2,
            geekRatingMaxChecked: false,
            geekRatingMax: 10,

            minPlayersMinChecked: false,
            minPlayersMin: 1,
            minPlayersMaxChecked: true,
            minPlayersMax: 3,

            maxPlayersMinChecked: true,
            maxPlayersMin: 3,
            maxPlayersMaxChecked: false,
            maxPlayersMax: 6,

            minPlayTimeMinChecked: true,
            minPlayTimeMin: 30,
            minPlayTimeMaxChecked: false,
            minPlayTimeMax: 120,

            maxPlayTimeMinChecked: false,
            maxPlayTimeMin: 30,
            maxPlayTimeMaxChecked: true,
            maxPlayTimeMax: 120,
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

        return new Filter(columnKey, isMinEnabled, minValue, isMaxEnabled, maxValue);
    },

    createRow: function(key, column)
    {
        var cells = [];
        var minId = column.key + "Min";
        var minChecked = this.state[minId + "Checked"];
        var minValue = this.state[minId];
        var maxId = column.key + "Max";
        var maxChecked = this.state[maxId + "Checked"];
        var maxValue = this.state[maxId];

        var minCheckbox = React.DOM.input(
        {
            key: 0,
            id: column.key + "MinChecked",
            type: "checkbox",
            defaultChecked: minChecked,
        });
        var minField = React.DOM.input(
        {
            key: 1,
            id: minId,
            type: "number",
            className: "filterField",
            defaultValue: minValue,
        });
        cells.push(this.createCell(cells.length, column, React.DOM.span({}, minCheckbox, " ", minField)));

        cells.push(React.DOM.td(
        {
            key: cells.length,
            className: "filterLabel",
            column: column.key,
        }, "\u2264 " + column.label + " \u2264"));

        var maxCheckbox = React.DOM.input(
        {
            key: 0,
            id: column.key + "MaxChecked",
            type: "checkbox",
            defaultChecked: maxChecked,
        });
        var maxField = React.DOM.input(
        {
            key: 1,
            id: maxId,
            type: "number",
            className: "filterField",
            defaultValue: maxValue,
        });
        cells.push(this.createCell(cells.length, column, React.DOM.span({}, maxCheckbox, " ", maxField)));

        return React.DOM.tr(
        {
            key: key
        }, cells);
    },

    filterActionPerformed: function(event)
    {
        LOGGER.info("FiltersUI.filterActionPerformed() start");

        var filters = [];

        filters.push(this.createFilter(GameColumns[0].key));
        filters.push(this.createFilter(GameColumns[2].key));
        filters.push(this.createFilter(GameColumns[3].key));
        filters.push(this.createFilter(GameColumns[4].key));
        filters.push(this.createFilter(GameColumns[5].key));
        filters.push(this.createFilter(GameColumns[6].key));
        filters.push(this.createFilter(GameColumns[7].key));

        this.trigger("applyFilters", filters);

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
