define(function()
{
   "use strict";
   var ImplementedImage = React.createClass(
   {
      propTypes:
      {
         iconBase: PropTypes.string.isRequired,

         isImplemented: PropTypes.bool,
      },

      render: function()
      {
         var isImplemented = this.props.isImplemented;
         var answer;

         if (isImplemented !== undefined)
         {
            var iconBase = this.props.iconBase;
            var src = iconBase + (isImplemented ? "accept.png" : "delete.png");
            var title = (isImplemented ? "Implemented" : "Not Implemented");

            answer = React.DOM.img(
            {
               src: src,
               title: title,
            });
         }
         else
         {
            answer = React.DOM.span(
            {});
         }

         return answer;
      },
   });

   return ImplementedImage;
});
