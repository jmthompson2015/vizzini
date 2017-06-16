define(["FiringArc", "RangeRuler", "UpgradeHeader", "UpgradeRestriction", "UpgradeType", "upgradestats/Action", "upgradestats/DefaultFilters", "upgradestats/EntityFilter", "upgradestats/RangeFilter", "../../../../../../../coreweb/src/main/js/ui/InputPanel2"],
   function(FiringArc, RangeRuler, UpgradeHeader, UpgradeRestriction, UpgradeType, Action, DefaultFilters, EntityFilter, RangeFilter, InputPanel)
   {
      "use strict";
      var FilterUI = React.createClass(
      {
         contextTypes:
         {
            store: PropTypes.object.isRequired,
         },

         propTypes:
         {
            filters: PropTypes.object.isRequired,
         },

         getInitialState: function()
         {
            return (
            {
               typeValues: (this.props.filters.typeKey ? this.props.filters.typeKey.values() : []),
               restrictionValues: (this.props.filters.restrictionKeys ? this.props.filters.restrictionKeys.values() : []),
               headerValues: (this.props.filters.headerKey ? this.props.filters.headerKey.values() : []),
               isImplementedValues: (this.props.filters.isImplemented ? this.props.filters.isImplemented.values() : []),
               rangeValues: (this.props.filters.rangeKeys ? this.props.filters.rangeKeys.values() : []),
               firingArcValues: (this.props.filters.firingArcKey ? this.props.filters.firingArcKey.values() : []),
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
               colSpan: 6,
            }, this.createButtonTable())));

            return React.DOM.table(
            {
               className: "filtersUI",
            }, React.DOM.tbody(
            {}, rows));
         },

         createButtonTable: function()
         {
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
               var values;
               var labelFunction;
               var clientProps = {};

               switch (column.key)
               {
                  case "typeKey":
                     values = UpgradeType.values();
                     labelFunction = function(value)
                     {
                        return UpgradeType.properties[value].name;
                     };
                     clientProps["data-entitytype"] = "typeKey";
                     break;
                  case "restrictionKeys":
                     values = UpgradeRestriction.values();
                     labelFunction = function(value)
                     {
                        return UpgradeRestriction.properties[value].name;
                     };
                     clientProps["data-entitytype"] = "restrictionKeys";
                     break;
                  case "headerKey":
                     values = UpgradeHeader.values();
                     labelFunction = function(value)
                     {
                        return UpgradeHeader.properties[value].name;
                     };
                     clientProps["data-entitytype"] = "headerKey";
                     break;
                  case "isImplemented":
                     values = [true, false];
                     labelFunction = function(value)
                     {
                        return (value ? "true" : "false");
                     };
                     clientProps["data-entitytype"] = "isImplemented";
                     break;
                  case "rangeKeys":
                     values = RangeRuler.values();
                     labelFunction = function(value)
                     {
                        return RangeRuler.properties[value].name;
                     };
                     clientProps["data-entitytype"] = "rangeKeys";
                     break;
                  case "firingArcKey":
                     values = FiringArc.values();
                     labelFunction = function(value)
                     {
                        return FiringArc.properties[value].name;
                     };
                     clientProps["data-entitytype"] = "firingArcKey";
                     break;
                  default:
                     throw "Unknown entity column: " + column.key;
               }

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
               var checkboxPanel = React.createElement(InputPanel,
               {
                  type: InputPanel.Type.CHECKBOX,
                  values: values,
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

         filterActionPerformed: function(event)
         {
            LOGGER.trace("FilterUI.filterActionPerformed() start");

            var filters = {};

            DefaultFilters.entityColumns.forEach(function(column)
            {
               var values = [];

               switch (column.key)
               {
                  case "typeKey":
                     values.vizziniAddAll(this.state.typeValues);
                     break;
                  case "restrictionKeys":
                     values.vizziniAddAll(this.state.restrictionValues);
                     break;
                  case "headerKey":
                     values.vizziniAddAll(this.state.headerValues);
                     break;
                  case "isImplemented":
                     values.vizziniAddAll(this.state.isImplementedValues);
                     break;
                  case "rangeKeys":
                     values.vizziniAddAll(this.state.rangeValues);
                     break;
                  case "firingArcKey":
                     values.vizziniAddAll(this.state.firingArcValues);
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

         handleEntityChange: function(event, selected)
         {
            LOGGER.trace("FilterUI.handleEntityChange() start");

            var entityType = event.target.dataset.entitytype;
            LOGGER.debug("entityType = " + entityType);
            var values = [];
            values.vizziniAddAll(selected);

            switch (entityType)
            {
               case "typeKey":
                  this.setState(
                  {
                     typeValues: values,
                  });
                  break;
               case "restrictionKeys":
                  this.setState(
                  {
                     restrictionValues: values,
                  });
                  break;
               case "headerKey":
                  this.setState(
                  {
                     headerValues: values,
                  });
                  break;
               case "isImplemented":
                  this.setState(
                  {
                     isImplementedValues: values,
                  });
                  break;
               case "rangeKeys":
                  this.setState(
                  {
                     rangeValues: values,
                  });
                  break;
               case "firingArcKey":
                  this.setState(
                  {
                     firingArcValues: values,
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
