define(function()
{
    "use strict";
    var MessageAreaUI = React.createClass(
    {
        propTypes:
        {
            userMessage: React.PropTypes.string.isRequired,
        },

        render: function()
        {
            var userMessage = this.props.userMessage;

            return React.DOM.span(
            {
                id: "messageArea",
            }, userMessage);
        },
    });

    return MessageAreaUI;
});
