/*
 * Provides a squad chooser.
 * 
 * @param name Radio button list name.
 * @param squadBuilders Squad builders. (required)
 * @param onChange Function called when the selection changes. (optional)
 */
define([ "SimpleAgent", "SquadBuilder", "ui/SquadUI" ], function(SimpleAgent, SquadBuilder, SquadUI)
{
    var SquadChooser = React.createClass(
    {
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
            var faction = this.state.squadBuilder.getFaction();

            var squadIdFunction = function(value)
            {
                return value.getYear() + "_" + value.getName();
            };
            var squadLabelFunction = function(value)
            {
                return value.toString();
            };
            var squadBuilders = this.props.squadBuilders;
            var selectedSquadBuilder = this.state.squadBuilder;
            var squadChooserPanel = React.createElement(InputPanel,
            {
                type: "radio",
                values: squadBuilders,
                name: this.props.name,
                idFunction: squadIdFunction,
                labelFunction: squadLabelFunction,
                initialValues: selectedSquadBuilder,
                onChange: this.handleSquadChange,
                panelClass: "squadChooserPanel",
            });
            var agent = new SimpleAgent("Placeholder", faction, selectedSquadBuilder);
            var mySquad = selectedSquadBuilder.buildSquad(agent);
            var squadDisplayPanel = React.createElement(SquadUI,
            {
                squad: mySquad,
            });

            var rows = [];

            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td({}, squadChooserPanel)));

            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td({}, squadDisplayPanel)));

            return React.DOM.table(
            {
                className: "squadChooser",
            }, React.DOM.tbody({}, rows));
        },

        handleSquadChange: function(event)
        {
            var selected = event.target.id;
            LOGGER.debug("handleSquadChange() selected = " + selected);
            var parts = selected.split("_");
            var year = parseInt(parts[0]);
            var name = parts[1];
            LOGGER.debug("name = " + name + " year = " + year);
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
