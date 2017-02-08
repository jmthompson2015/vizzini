define(["DefaultFilters", "EntityFilter", "RangeFilter", "process/Action", "../../../../../../../coreweb/src/main/js/ui/InputPanel2"],
    function(DefaultFilters, EntityFilter, RangeFilter, Action, InputPanel2)
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
                    var store = this.context.store;
                    var valueMap;
                    var clientProps = {};

                    switch (column.key)
                    {
                        case "designers":
                            valueMap = store.getState().designerMap;
                            clientProps["data-entitytype"] = "designers";
                            break;
                        case "categories":
                            valueMap = store.getState().categoryMap;
                            clientProps["data-entitytype"] = "categories";
                            break;
                        case "mechanics":
                            valueMap = store.getState().mechanicMap;
                            clientProps["data-entitytype"] = "mechanics";
                            break;
                        default:
                            throw "Unknown entity column: " + column.key;
                    }

                    var values = Object.values(valueMap);
                    this.sortEntities(values);

                    var nbsp = "\u00A0";
                    var labelFunction = function(value)
                    {
                        return value.name.replace(/ /g, nbsp) + nbsp + "(" + value.count + ")";
                    };
                    var oldFilter = this.context.store.getState().filters[column.key];
                    var initialValues = [];

                    if (oldFilter && oldFilter.values().length > 0)
                    {
                        var entities = oldFilter.values().map(function(id)
                        {
                            return valueMap[id];
                        });

                        initialValues.vizziniAddAll(entities);
                    }

                    var label = React.DOM.span(
                    {
                        className: "entityLabel",
                    }, column.label);
                    var checkboxPanel = React.createElement(InputPanel2,
                    {
                        onChange: this.handleEntityChange,
                        type: InputPanel2.Type.CHECKBOX,
                        values: values,

                        clientProps: clientProps,
                        initialValues: initialValues,
                        labelFunction: labelFunction,
                        panelClass: "entitiesTable",
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

                LOGGER.debug("selected = " + selected);
                var entityType = event.target.dataset.entitytype;
                LOGGER.debug("entityType = " + entityType);
                var ids = selected.map(function(entity)
                {
                    return entity.id;
                });
                LOGGER.debug("ids = " + ids);

                switch (entityType)
                {
                    case "designers":
                        this.setState(
                        {
                            designerValues: ids,
                        });
                        break;
                    case "categories":
                        this.setState(
                        {
                            categoryValues: ids,
                        });
                        break;
                    case "mechanics":
                        this.setState(
                        {
                            mechanicValues: ids,
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

            sortEntities: function(entities)
            {
                entities.sort(function(a, b)
                {
                    var answer = b.count - a.count;

                    if (answer === 0)
                    {
                        if (a.name > b.name)
                        {
                            answer = 1;
                        }
                        else if (a.name < b.name)
                        {
                            answer = -1;
                        }
                    }

                    return answer;
                });
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
