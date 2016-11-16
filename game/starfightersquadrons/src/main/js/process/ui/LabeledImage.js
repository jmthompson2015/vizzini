define(function()
{
    "use strict";
    var LabeledImage = React.createClass(
    {
        propTypes:
        {
            image: React.PropTypes.string.isRequired,
            imageBase: React.PropTypes.string.isRequired,
            label: React.PropTypes.string.isRequired,

            // default: 32
            height: React.PropTypes.number,
            // default: undefined
            labelClass: React.PropTypes.string,
            // default: false
            showOne: React.PropTypes.bool,
            // default: undefined
            title: React.PropTypes.string,
            // default: 32
            width: React.PropTypes.number,
        },

        render: function()
        {
            var answer;
            var label = this.props.label;

            if (label === "0")
            {
                answer = React.DOM.span();
            }
            else
            {
                var containerStyle = this.createContainerStyle();
                var title = this.props.title;

                if (!this.props.showOne && label === "1")
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

            return (
            {
                backgroundImage: 'url(' + this.props.imageBase + this.props.image + ')',
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "table",
                minHeight: height,
                minWidth: width,
            });
        },
    });

    return LabeledImage;
});
