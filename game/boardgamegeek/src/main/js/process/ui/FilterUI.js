define(["DefaultFilters", "EntityFilter", "GameColumns", "RangeFilter", "process/Action"],
    function(DefaultFilters, EntityFilter, GameColumns, RangeFilter, Action)
    {
        "use strict";
        var FilterUI = React.createClass(
        {
            contextTypes:
            {
                store: React.PropTypes.object.isRequired,
            },

            propTypes:
            {
                filters: React.PropTypes.object.isRequired,
                gameDatabase: React.PropTypes.object.isRequired,
            },

            getInitialState: function()
            {
                return (
                {
                    designerValues: (this.props.filters.designers ? this.props.filters.designers.values() : []),
                    categoryValues: (this.props.filters.categories ? this.props.filters.categories.values() : []),
                    mechanicValues: (this.props.filters.mechanics ? this.props.filters.mechanics.values() : []),
                });
            },

            render: function()
            {
                var cells = [];
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                    className: "filterTable",
                }, this.createRangeTable()));
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                    className: "filtersUI",
                }, this.createEntityTable()));

                var rows = [];
                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, cells));

                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, React.DOM.td(
                {
                    colSpan: 4,
                }, this.createButtonTable())));

                return React.DOM.table(
                {
                    className: "filtersUI",
                }, React.DOM.tbody(
                {}, rows));
            },

            createButtonTable: function()
            {
                var filterCacheButton = React.DOM.button(
                {
                    onClick: this.filterCacheActionPerformed,
                }, "Clear Filter Cache");
                var dataCacheButton = React.DOM.button(
                {
                    onClick: this.dataCacheActionPerformed,
                }, "Clear Data Cache");
                var restoreButton = React.DOM.button(
                {
                    onClick: this.restoreActionPerformed,
                }, "Restore Defaults");
                var unfilterButton = React.DOM.button(
                {
                    onClick: this.unfilterActionPerformed,
                }, "Remove Filter");
                var filterButton = React.DOM.button(
                {
                    onClick: this.filterActionPerformed,
                }, "Apply Filter");

                var cells = [];
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                }, filterCacheButton));
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                }, dataCacheButton));
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                }, restoreButton));
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                }, unfilterButton));
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                }, filterButton));
                var row = React.DOM.tr(
                {}, cells);

                return React.DOM.table(
                {}, React.DOM.tbody(
                {}, row));
            },

            createEntityTable: function()
            {
                var cells = [];

                DefaultFilters.entityColumns.forEach(function(column)
                {
                    var gameDatabase = this.props.gameDatabase;
                    var values;
                    var clientProps = {};

                    switch (column.key)
                    {
                        case "designers":
                            values = gameDatabase.designers();
                            clientProps["data-entitytype"] = "designers";
                            break;
                        case "categories":
                            values = gameDatabase.categories();
                            clientProps["data-entitytype"] = "categories";
                            break;
                        case "mechanics":
                            values = gameDatabase.mechanics();
                            clientProps["data-entitytype"] = "mechanics";
                            break;
                        default:
                            throw "Unknown entity column: " + column.key;
                    }

                    var idFunction = function(value)
                    {
                        return value.id;
                    };
                    var labelFunction = function(value)
                    {
                        return value.name + " (" + value.count + ")";
                    };
                    var oldFilter = this.context.store.getState().filters[column.key];
                    var initialValues = [];

                    if (oldFilter)
                    {
                        initialValues.vizziniAddAll(oldFilter.values());
                    }

                    var label = React.DOM.span(
                    {
                        className: "entityLabel",
                    }, column.label);
                    var checkboxPanel = React.createElement(CheckboxInputPanel,
                    {
                        values: values,
                        idFunction: idFunction,
                        labelFunction: labelFunction,
                        initialValues: initialValues,
                        onChange: this.handleEntityChange,
                        panelClass: "entitiesTable",
                        clientProps: clientProps,
                    });

                    cells.push(React.DOM.td(
                    {
                        key: cells.length,
                        className: "entityFilterContainer",
                    }, label, React.DOM.div(
                    {
                        className: "entitiesContainer",
                    }, checkboxPanel)));
                }, this);

                var row = React.DOM.tr(
                {}, cells);

                return React.DOM.table(
                {
                    className: "filtersUI",
                }, React.DOM.tbody(
                {}, row));
            },

            createRangeTable: function()
            {
                var rows = [];

                DefaultFilters.rangeColumns.forEach(function(column)
                {
                    var filter = this.props.filters[column.key];
                    var cells = [];
                    cells.push(React.DOM.td(
                    {
                        key: cells.length,
                    }, React.DOM.input(
                    {
                        id: column.key + "MinChecked",
                        type: "checkbox",
                        defaultChecked: (filter ? filter.isMinEnabled() : false),
                        onChange: this.handleRangeChange,
                    })));
                    cells.push(React.DOM.td(
                    {
                        key: cells.length,
                    }, React.DOM.input(
                    {
                        id: column.key + "Min",
                        type: "number",
                        className: "filterField",
                        defaultValue: (filter ? filter.minValue() : 0),
                        onChange: this.handleRangeChange,
                    })));
                    cells.push(React.DOM.td(
                    {
                        key: cells.length,
                    }, "\u2264 " + column.label + " \u2264"));
                    cells.push(React.DOM.td(
                    {
                        key: cells.length,
                    }, React.DOM.input(
                    {
                        id: column.key + "MaxChecked",
                        type: "checkbox",
                        defaultChecked: (filter ? filter.isMaxEnabled() : false),
                        onChange: this.handleRangeChange,
                    })));
                    cells.push(React.DOM.td(
                    {
                        key: cells.length,
                    }, React.DOM.input(
                    {
                        id: column.key + "Max",
                        type: "number",
                        className: "filterField",
                        defaultValue: (filter ? filter.maxValue() : 10),
                        onChange: this.handleRangeChange,
                    })));

                    rows.push(React.DOM.tr(
                    {
                        key: rows.length,
                    }, cells));
                }, this);

                return React.DOM.table(
                {
                    className: "filterTable",
                }, React.DOM.tbody(
                {}, rows));
            },

            dataCacheActionPerformed: function(event)
            {
                LOGGER.trace("FilterUI.filterActionPerformed() start");
                localStorage.removeItem("gameSummaryTimestamp");
                localStorage.removeItem("gameSummaryMap");
                localStorage.removeItem("gameDetailTimestamp");
                localStorage.removeItem("gameDetailMap");
                localStorage.removeItem("entityTimestamp");
                localStorage.removeItem("entityMap");
                LOGGER.trace("FilterUI.filterActionPerformed() end");
            },

            filterActionPerformed: function(event)
            {
                LOGGER.trace("FilterUI.filterActionPerformed() start");

                var filters = {};

                DefaultFilters.entityColumns.forEach(function(column)
                {
                    var values = [];

                    switch (column.key)
                    {
                        case "designers":
                            values.vizziniAddAll(this.state.designerValues);
                            LOGGER.info("designerIds = " + values);
                            break;
                        case "categories":
                            values.vizziniAddAll(this.state.categoryValues);
                            break;
                        case "mechanics":
                            values.vizziniAddAll(this.state.mechanicValues);
                            break;
                        default:
                            throw "Unknown entity column: " + column.key;
                    }

                    var filter = new EntityFilter(column.key, values);
                    filters[column.key] = filter;
                }, this);

                DefaultFilters.rangeColumns.forEach(function(column)
                {
                    var isMinEnabled = document.getElementById(column.key + "MinChecked").checked;
                    var minValue = document.getElementById(column.key + "Min").value;
                    var isMaxEnabled = document.getElementById(column.key + "MaxChecked").checked;
                    var maxValue = document.getElementById(column.key + "Max").value;

                    var filter = new RangeFilter(column.key, isMinEnabled, minValue, isMaxEnabled, maxValue);
                    filters[column.key] = filter;
                });

                this.context.store.dispatch(Action.setFilters(filters));

                LOGGER.trace("FilterUI.filterActionPerformed() end");
            },

            filterCacheActionPerformed: function(event)
            {
                LOGGER.trace("FilterUI.filterActionPerformed() start");
                localStorage.removeItem("filters");
                LOGGER.trace("FilterUI.filterActionPerformed() end");
            },

            handleEntityChange: function(event, selected)
            {
                LOGGER.trace("FilterUI.handleEntityChange() start");

                var entityType = event.target.dataset.entitytype;
                LOGGER.debug("entityType = " + entityType);
                var values = [];
                var id = event.target.id;
                LOGGER.debug("id = " + id + " typeof " + (typeof id));
                var checked = event.target.checked;
                LOGGER.debug("checked ? " + checked);

                switch (entityType)
                {
                    case "designers":
                        var designerValues = this.state.designerValues;
                        if (checked) designerValues.push(id);
                        else designerValues.vizziniRemove(id);
                        this.setState(
                        {
                            designerValues: designerValues,
                        });
                        break;
                    case "categories":
                        var categoryValues = this.state.categoryValues;
                        if (checked) categoryValues.push(id);
                        else categoryValues.vizziniRemove(id);
                        this.setState(
                        {
                            categoryValues: categoryValues,
                        });
                        break;
                    case "mechanics":
                        var mechanicValues = this.state.mechanicValues;
                        if (checked) mechanicValues.push(id);
                        else mechanicValues.vizziniRemove(id);
                        this.setState(
                        {
                            mechanicValues: mechanicValues,
                        });
                        break;
                    default:
                        throw "Unknown entity column: " + column.key;
                }

                LOGGER.trace("FilterUI.handleEntityChange() end");
            },

            restoreActionPerformed: function(event)
            {
                LOGGER.trace("FilterUI.restoreActionPerformed() start");
                this.context.store.dispatch(Action.setDefaultFilters());
                LOGGER.trace("FilterUI.restoreActionPerformed() end");
            },

            unfilterActionPerformed: function(event)
            {
                LOGGER.trace("FilterUI.unfilterActionPerformed() start");
                this.context.store.dispatch(Action.removeFilters());
                LOGGER.trace("FilterUI.unfilterActionPerformed() end");
            },
        });

        return FilterUI;
    });
