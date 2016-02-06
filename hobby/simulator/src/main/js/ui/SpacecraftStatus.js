define(function()
{
    "use strict";
    var SpacecraftStatus = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("state", this.props.state);

            var state = this.props.state;
            var timestamp = state.date().format("YYYY-MM-DD HH:mm:ss");
            var rightAscension = state.orientation().rightAscension();
            var declination = state.orientation().declination();
            var heading = this.pad(Math.round(rightAscension), 3) + "m" + this.pad(Math.round(declination), 2);

            var rows = [];

            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td(
            {
                className: "spacecraftStatusLabel",
            }, "Time"), React.DOM.td(
            {
                className: "spacecraftStatusValue",
            }, timestamp)));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td(
            {
                className: "spacecraftStatusLabel",
            }, "Heading"), React.DOM.td(
            {
                className: "spacecraftStatusValue",
            }, heading)));

            return React.DOM.table(
            {
                className: "spacecraftStatusPanel",
            }, rows);
        },

        pad: function(n, width, z)
        {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        },
    });

    return SpacecraftStatus;
});
