define(["process/ui/CandidatesUI"], function(CandidatesUI)
{
    "use strict";
    var CandidatePad = React.createClass(
    {
        propTypes:
        {
            callback: React.PropTypes.func.isRequired,
            n: React.PropTypes.number.isRequired,

            isDisabled: React.PropTypes.bool,
        },

        render: function()
        {
            var n = this.props.n;
            var isDisabled = (this.props.isDisabled !== undefined ? this.props.isDisabled : false);
            var rows = [];

            for (var j = 0; j < n; j++)
            {
                var cells = [];

                for (var i = 0; i < n; i++)
                {
                    var index = (j * n) + i;
                    var value = index + 1;
                    var component = React.createElement(CandidatesUI,
                    {
                        n: 3,
                        candidates: [value],
                    });
                    var button = React.DOM.button(
                    {
                        disabled: isDisabled,
                        onClick: this.buttonClicked,
                        "data-value": value,
                    }, component);

                    cells.push(React.DOM.td(
                    {
                        key: "cell" + index,
                    }, button));
                }

                rows.push(React.DOM.tr(
                {
                    key: "row" + j,
                }, cells));
            }

            var tbody = React.DOM.tbody(
            {}, rows);

            return React.DOM.table(
            {}, tbody);
        },

        buttonClicked: function(event)
        {
            var element = event.currentTarget;
            var selectedValue = parseInt(element.dataset.value);
            var callback = this.props.callback;
            callback(selectedValue);
        },
    });

    return CandidatePad;
});
