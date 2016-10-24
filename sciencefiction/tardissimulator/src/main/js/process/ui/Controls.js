define([ "ConsolePanel", "DematStatus", "process/Action" ], function(ConsolePanel, DematStatus, Action)
{
    "use strict";
    var Controls = React.createClass(
    {
        render: function()
        {
            var isPowered = this.props.isPowered;
            var isDematerialised = [ DematStatus.DEMATERIALISING, DematStatus.DEMATERIALISED ]
                    .includes(this.props.dematStatus.value);

            var previousPanel = React.DOM.button(
            {
                onClick: this.previousPanel,
            }, "Previous");
            var nextPanel = React.DOM.button(
            {
                onClick: this.nextPanel,
            }, "Next");

            var dematStatus = React.DOM.span({}, this.props.dematStatus.name);

            var powerUI = React.DOM.input(
            {
                type: "checkbox",
                defaultChecked: isPowered,
                onClick: this.onPowerChange,
            });
            var powerLabel = React.DOM.label({}, powerUI, "Power ");
            var scannerUI = React.DOM.input(
            {
                type: "checkbox",
                defaultChecked: this.props.isScanning,
                onClick: this.onScannerChange,
                disabled: (!isPowered),
            });
            var scannerLabel = React.DOM.label({}, scannerUI, "Scanner ");
            var dematUI = React.DOM.input(
            {
                type: "checkbox",
                defaultChecked: this.props.isDematerialised,
                onClick: this.onDematChange,
                disabled: (!isPowered),
            });
            var dematLabel = React.DOM.label({}, dematUI, "Dematerialise");

            // Row 1.
            var rows = [];
            var cell = React.DOM.td({}, previousPanel, this.props.consolePanel.name, nextPanel);
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cell));

            // Row 2.
            cell = React.DOM.td({}, dematStatus);
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cell));

            // Row 3.
            cell = React.DOM.td({}, powerLabel, scannerLabel, dematLabel);
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cell));

            return React.DOM.table(
            {
                id: "controls",
            }, React.DOM.tbody({}, rows));
        },

        nextPanel: function(event)
        {
            var consolePanelKey = this.props.consolePanel.value;
            var values = ConsolePanel.values();
            var index = values.indexOf(consolePanelKey);
            index++;

            if (index >= values.length)
            {
                index = 0;
            }

            this.context.store.dispatch(Action.setConsolePanel(values[index]));
        },

        onDematChange: function(event)
        {
            var checked = event.target.checked;
            var newDematStatus = (checked ? DematStatus.DEMATERIALISING : DematStatus.MATERIALISING);
            this.context.store.dispatch(Action.setDematStatus(newDematStatus));
        },

        onPowerChange: function(event)
        {
            var isPowered = event.target.checked;
            this.context.store.dispatch(Action.setPowered(isPowered));
        },

        onScannerChange: function(event)
        {
            var isScanning = event.target.checked;
            this.context.store.dispatch(Action.setScanning(isScanning));
        },

        previousPanel: function(event)
        {
            var consolePanelKey = this.props.consolePanel.value;
            var values = ConsolePanel.values();
            var index = values.indexOf(consolePanelKey);
            index--;

            if (index < 0)
            {
                index = values.length - 1;
            }

            this.context.store.dispatch(Action.setConsolePanel(values[index]));
        },
    });

    Controls.contextTypes =
    {
        store: React.PropTypes.object.isRequired,
    };

    Controls.propTypes =
    {
        consolePanel: React.PropTypes.object.isRequired,
        dematStatus: React.PropTypes.object.isRequired,
        isPowered: React.PropTypes.bool.isRequired,
        isScanning: React.PropTypes.bool.isRequired,
    };

    if (Object.freeze)
    {
        Object.freeze(Controls);
    }

    return Controls;
});
