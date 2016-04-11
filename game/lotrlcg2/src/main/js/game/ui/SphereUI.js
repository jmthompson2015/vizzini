/*
 * @param sphereKey (required)
 * @param key (optional; default: 0)
 * @param isSmall (optional; default: false)
 */
define([ "Sphere" ], function(Sphere)
{
    "use strict";
    var SphereUI = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("sphereKey", this.props.sphereKey);

            var sphereKey = this.props.sphereKey;
            var sphere = Sphere.properties[sphereKey];
            var size = (this.props.isSmall !== undefined ? 24 : 32);
            var fileString = imageBase + "sphere/" + sphere.name + size + ".png";
            var myKey = (this.props.key !== undefined ? this.props.key : 0);

            var image = React.DOM.img(
            {
                key: myKey,
                className: "sphereUIImage",
                src: fileString,
                title: sphere.name,
            });
            var showName = (this.props.showName !== undefined ? this.props.showName : false);

            var answer = image;

            if (showName)
            {
                answer = React.DOM.span(
                {
                    className: "sphereUIImage",
                }, image, " ", sphere.name);
            }

            return answer;
        },
    });

    return SphereUI;
});
