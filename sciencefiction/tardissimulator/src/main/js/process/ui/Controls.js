define([ "ConsolePanel", "DematStatus", "process/Action" ], function(ConsolePanel, DematStatus, Action)
{
    "use strict";
    var Controls = React.createClass(
    {
        render: function()
        {
            var isPowered = this.props.isPowered;

            var previousPanel = React.DOM.button(
            {
                key: 0,
                onClick: this.previousPanel,
            }, "Previous");
            var powerUI = React.DOM.input(
            {
                type: "checkbox",
                defaultChecked: isPowered,
                onClick: this.onPowerChange,
            });
            var scannerUI = React.DOM.input(
            {
                type: "checkbox",
                defaultChecked: this.props.isScanning,
                onClick: this.onScannerChange,
                disabled: (!isPowered),
            });
            var dematUI = React.DOM.input(
            {
                type: "checkbox",
                defaultChecked: this.props.isDematerialised,
                onClick: this.onDematChange,
                disabled: (!isPowered),
            });
            var nextPanel = React.DOM.button(
            {
                key: 4,
                onClick: this.nextPanel,
            }, "Next");

            var cells = [];
            cells.push(previousPanel);

            var powerLabel = React.DOM.label(
            {
                key: cells.length,
            }, powerUI, "Power");
            cells.push(powerLabel);

            var scannerLabel = React.DOM.label(
            {
                key: cells.length,
            }, scannerUI, "Scanner");
            cells.push(scannerLabel);

            var dematLabel = React.DOM.label(
            {
                key: cells.length,
            }, dematUI, "Dematerialise");
            cells.push(dematLabel);

            cells.push(nextPanel);

            return React.DOM.span(
            {
                id: "controls",
            }, cells);
        },

        nextPanel: function(event)
        {
            var consolePanelKey = this.context.store.getState().consolePanelKey;
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
            var consolePanelKey = this.context.store.getState().consolePanelKey;
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
        isDematerialised: React.PropTypes.bool.isRequired,
        isPowered: React.PropTypes.bool.isRequired,
        isScanning: React.PropTypes.bool.isRequired,
    };

    if (Object.freeze)
    {
        Object.freeze(Controls);
    }

    return Controls;
});
