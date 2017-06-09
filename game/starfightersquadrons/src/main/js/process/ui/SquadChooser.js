define(["process/SimpleAgent", "process/SquadBuilder", "process/ui/SquadUI"],
   function(SimpleAgent, SquadBuilder, SquadUI)
   {
      "use strict";
      var SquadChooser = React.createClass(
      {
         propTypes:
         {
            iconBase: React.PropTypes.string.isRequired,
            imageBase: React.PropTypes.string.isRequired,
            squadBuilders: React.PropTypes.array.isRequired,

            onChange: React.PropTypes.func,
         },

         getInitialState: function()
         {
            var squadBuilders = this.props.squadBuilders;
            InputValidator.validateNotEmpty("squadBuilders", squadBuilders);

            return (
            {
               squadBuilder: squadBuilders[0],
            });
         },

         render: function()
         {
            var faction = this.state.squadBuilder.factionKey();

            var squadLabelFunction = function(value)
            {
               return value.toString();
            };
            var squadBuilders = this.props.squadBuilders;
            var selectedSquadBuilder = this.state.squadBuilder;
            var squadChooserSelect = React.createElement(Select,
            {
               values: squadBuilders,
               labelFunction: squadLabelFunction,
               initialSelectedValue: selectedSquadBuilder,
               onChange: this.handleSquadChange,
            });
            var agent = new SimpleAgent("Placeholder", faction);
            var mySquad = selectedSquadBuilder.buildSquad(agent);
            var squadDisplayPanel = React.createElement(SquadUI,
            {
               iconBase: this.props.iconBase,
               imageBase: this.props.imageBase,
               squad: mySquad,
            });

            var rows = [];
            var cells = [];
            cells.push(React.DOM.td(
            {
               key: "squadLabel",
            }, "Squad:"));
            cells.push(React.DOM.td(
            {
               key: "squadChooserSelect",
               className: "squadChooserSelect",
            }, squadChooserSelect));
            rows.push(React.DOM.tr(
            {
               key: "selectRow",
            }, cells));

            rows.push(React.DOM.tr(
            {
               key: "displayRow",
            }, React.DOM.td(
            {
               colSpan: 2,
            }, squadDisplayPanel)));

            return React.DOM.table(
            {
               className: "squadChooser",
            }, React.DOM.tbody(
            {}, rows));
         },

         handleSquadChange: function(event)
         {
            var selected = event.target.value;
            LOGGER.debug("handleSquadChange() selected = " + selected);
            var year = parseInt(selected.substring(0, 4));
            LOGGER.debug("year = " + year + " " + (typeof year));
            var name = selected.substring(5);
            var index = name.indexOf("(");
            name = name.substring(0, index - 1);
            LOGGER.debug("name = [" + name + "]");
            var squadBuilder = SquadBuilder.findByNameAndYear(name, year);
            this.setState(
            {
               squadBuilder: squadBuilder,
            });

            if (this.props.onChange)
            {
               this.props.onChange(squadBuilder);
            }
         },
      });

      return SquadChooser;
   });
