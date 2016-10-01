define([ "EntityFilter", "GameColumns", "RangeFilter", "process/Action" ], function(EntityFilter, GameColumns,
        RangeFilter, Action)
{
    var FilterUI = React.createClass(
    {
        contextTypes:
        {
            store: React.PropTypes.object.isRequired,
        },

        propTypes:
        {
            gameDatabase: React.PropTypes.object.isRequired,
            designers: React.PropTypes.array.isRequired,
            categories: React.PropTypes.array.isRequired,
            mechanics: React.PropTypes.array.isRequired,
        },

        filterColumns: [],

        componentWillMount: function()
        {
            this.filterColumns = [];
            this.filterColumns.push(GameColumns[0]);
            this.filterColumns.push(GameColumns[3]);
            this.filterColumns.push(GameColumns[4]);
            this.filterColumns.push(GameColumns[5]);
            this.filterColumns.push(GameColumns[6]);
            this.filterColumns.push(GameColumns[7]);
            this.filterColumns.push(GameColumns[8]);
            this.filterColumns.push(GameColumns[9]);
        },

        getInitialState: function()
        {
            var answer;

            if (localStorage.filters)
            {
                answer = JSON.parse(localStorage.filters);
            }
            else
            {
                answer = this.createDefaults();
            }

            if (answer.designers && answer.designers.length > 0)
            {
                answer.designers.forEach(function(entity)
                {
                    entity.ids = entity.ids.map(function(id)
                    {
                        return parseInt(id);
                    });
                });
            }

            if (!answer.bestWithPlayers)
            {
                answer.bestWithPlayers = this.createDefaults().bestWithPlayers;
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
            }, React.DOM.tbody({}, rows));

            var gameDatabase = this.props.gameDatabase;
            var designerTable = this.createEntityTable(
            {
                "data-entitytype": "designer",
            }, this.props.designers, this.state.designers.ids, gameDatabase);
            var categoryTable = this.createEntityTable(
            {
                "data-entitytype": "category",
            }, this.props.categories, this.state.categories.ids, gameDatabase);
            var mechanicTable = this.createEntityTable(
            {
                "data-entitytype": "mechanic",
            }, this.props.mechanics, this.state.mechanics.ids, gameDatabase);

            var rows2 = [];
            var filterCell = React.DOM.td(
            {
                colSpan: 3,
            }, filterTable);
            var designerCell = React.DOM.td(
            {
                className: "entityFilterContainer",
            }, "Designer", designerTable);
            var categoryCell = React.DOM.td(
            {
                className: "entityFilterContainer",
            }, "Category", categoryTable);
            var mechanicCell = React.DOM.td(
            {
                className: "entityFilterContainer",
            }, "Mechanic", mechanicTable);
            rows2.push(React.DOM.tr(
            {
                key: 0,
            }, filterCell, designerCell, categoryCell, mechanicCell));

            var restoreButton = React.DOM.button(
            {
                onClick: this.restoreActionPerformed,
            }, "Restore Defaults");
            var unfilterButton = React.DOM.button(
            {
                // disabled: !this.state.isFiltered,
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
            }, React.DOM.tbody({}, rows2));
        },

        createCell: function(key, column, value)
        {
            return React.DOM.td(
            {
                key: key,
                className: column.className,
            }, value);
        },

        createDefaults: function()
        {
            return (
            {
                boardGameRank: RangeFilter.newFilterProps("boardGameRank", false, 1, false, 20),
                designers: EntityFilter.newFilterProps("designers", [], true),
                yearPublished: RangeFilter.newFilterProps("yearPublished", false, 2005, false, 2015),
                geekRating: RangeFilter.newFilterProps("geekRating", false, 7.2, false, 10),
                minPlayers: RangeFilter.newFilterProps("minPlayers", true, 2, true, 3),
                maxPlayers: RangeFilter.newFilterProps("maxPlayers", true, 4, false, 6),
                bestWithPlayers: RangeFilter.newFilterProps("bestWithPlayers", false, 3, false, 4),
                minPlayTime: RangeFilter.newFilterProps("minPlayTime", true, 30, false, 120),
                maxPlayTime: RangeFilter.newFilterProps("maxPlayTime", false, 30, true, 120),
                categories: EntityFilter.newFilterProps("categories", [], true),
                mechanics: EntityFilter.newFilterProps("mechanics", [], true),
            });
        },

        createEntityTable: function(clientProps, entities, selectedIds, gameDatabase)
        {
            if (entities && entities.length > 0)
            {
                var idFunction = function(value)
                {
                    return String(value.id);
                }
                var labelFunction = function(value)
                {
                    return value.name + " (" + value.count + ")";
                }
                var selectedValues = selectedIds.map(function(id)
                {
                    return gameDatabase.findEntityById(id);
                });
                var checkboxPanel = React.createElement(CheckboxInputPanel,
                {
                    values: entities,
                    idFunction: idFunction,
                    labelFunction: labelFunction,
                    initialValues: selectedValues,
                    onChange: this.handleChange,
                    panelClass: "entitiesTable",
                    clientProps: clientProps,
                });

                return React.DOM.div(
                {
                    className: "entitiesContainer",
                }, checkboxPanel);
            }
            else
            {
                return React.DOM.span({}, " ");
            }
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
            LOGGER.trace("FilterUI.filterActionPerformed() start");

            var filters = [];

            this.filterColumns.forEach(function(column)
            {
                filters.push(new RangeFilter(this.state[column.key]));
            }, this);

            filters.push(new EntityFilter(this.state.designers));
            filters.push(new EntityFilter(this.state.categories));
            filters.push(new EntityFilter(this.state.mechanics));

            this.context.store.dispatch(Action.setFilters(filters));
            this.setState(
            {
                isFiltered: true,
            });
            localStorage.filters = JSON.stringify(this.state);

            LOGGER.trace("FilterUI.filterActionPerformed() end");
        },

        handleChange: function(event, selected)
        {
            LOGGER.trace("FilterUI.handleChange() start");

            var entityType = event.target.dataset.entitytype;
            LOGGER.debug("entityType = " + entityType);
            var id = event.target.id;
            LOGGER.debug("handleChange() id = " + id);

            if (entityType)
            {
                var checked = event.target.checked;
                LOGGER.debug("checked ? " + checked);

                if (entityType === "designer")
                {
                    var designers = this.state.designers;

                    if (checked)
                    {
                        designers.ids.push(id);
                    }
                    else
                    {
                        designers.ids.vizziniRemove(id);
                    }

                    this.setState(
                    {
                        designers: designers,
                    });
                }
                else if (entityType === "category")
                {
                    var categories = this.state.categories;

                    if (checked)
                    {
                        categories.ids.push(id);
                    }
                    else
                    {
                        categories.ids.vizziniRemove(id);
                    }

                    this.setState(
                    {
                        categories: categories,
                    });
                }
                else if (entityType === "mechanic")
                {
                    var mechanics = this.state.mechanics;

                    if (checked)
                    {
                        mechanics.ids.push(id);
                    }
                    else
                    {
                        mechanics.ids.vizziniRemove(id);
                    }

                    this.setState(
                    {
                        mechanics: mechanics,
                    });
                }
            }
            else
            {
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

                if (columnKey && filter)
                {
                    this.setState(
                    {
                        columnKey: filter
                    });
                }
            }

            LOGGER.trace("FilterUI.handleChange() end");
        },

        restoreActionPerformed: function(event)
        {
            LOGGER.trace("FilterUI.restoreActionPerformed() start");

            this.setState(this.createDefaults());

            LOGGER.trace("FilterUI.restoreActionPerformed() end");
        },

        unfilterActionPerformed: function(event)
        {
            LOGGER.trace("FilterUI.unfilterActionPerformed() start");

            var filters = [];

            this.context.store.dispatch(Action.setFilters(filters));
            this.setState(
            {
                isFiltered: false,
            });

            LOGGER.trace("FilterUI.unfilterActionPerformed() end");
        },
    });

    return FilterUI;
});
