define(function()
{
    var CandidatesUI = React.createClass(
    {
        propTypes:
        {
            n: React.PropTypes.number.isRequired,
            candidates: React.PropTypes.array.isRequired,
        },

        render: function()
        {
            var n = this.props.n;
            var candidates = this.props.candidates;
            var rows = [];

            for (var j = 0; j < n; j++)
            {
                var cells = [];

                for (var i = 0; i < n; i++)
                {
                    var index = (j * n) + i;
                    var value = index + 1;

                    if (candidates.indexOf(value) < 0)
                    {
                        value = "";
                    }

                    cells.push(React.DOM.td(
                    {
                        key: "cell" + index,
                    }, value));
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
    });

    return CandidatesUI;
});
