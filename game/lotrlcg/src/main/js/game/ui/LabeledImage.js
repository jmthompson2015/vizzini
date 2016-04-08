/*
 * @param image (required)
 * @param label (required)
 * 
 * @param height (optional; default: 32)
 * @param labelClass (optional)
 * @param title (optional)
 * @param width (optional; default: 32)
 */
define(function()
{
    "use strict";
    var LabeledImage = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("label", this.props.label);
            InputValidator.validateNotNull("image", this.props.image);

            var answer;
            var label = this.props.label;

            if (label === 0)
            {
                answer = React.DOM.span();
            }
            else
            {
                var containerStyle = this.createContainerStyle();
                var title = this.props.title;

                if (label === 1)
                {
                    answer = React.DOM.div(
                    {
                        title: title,
                        style: containerStyle,
                    });
                }
                else
                {
                    var cell = React.DOM.div(
                    {
                        className: this.props.labelClass,
                        style:
                        {
                            display: "table-cell",
                            verticalAlign: "middle",
                        },
                    }, label);

                    answer = React.DOM.div(
                    {
                        title: title,
                        style: containerStyle,
                    }, cell);
                }
            }

            return answer;
        },

        createContainerStyle: function()
        {
            var height = (this.props.height !== undefined ? this.props.height : 32);
            var width = (this.props.width !== undefined ? this.props.width : 32);
            var answer =
            {
                backgroundImage: 'url(' + imageBase + this.props.image + ')',
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "table",
                minHeight: height,
                minWidth: width,
            };

            return answer;
        },
    });

    return LabeledImage;
});
