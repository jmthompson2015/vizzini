define(["process/ui/ShipImage"], function(ShipImage)
{
   var ShipUI = React.createClass(
   {
      propTypes:
      {
         canvasId: PropTypes.string.isRequired,
         imageBase: PropTypes.string.isRequired,
         position: PropTypes.object.isRequired,
         shipTeam: PropTypes.object.isRequired,
      },

      componentDidMount: function()
      {
         this.paint();
      },

      componentDidUpdate: function()
      {
         this.paint();
      },

      getInitialState: function()
      {
         var shipTeam = this.props.shipTeam;
         var image = new Image();
         image.onload = function()
         {
            if (!this.state.isImageLoaded)
            {
               this.setState(
               {
                  isImageLoaded: true,
               });
            }
         }.bind(this);

         var imageBase = this.props.imageBase;
         image.src = imageBase + "ship/" + shipTeam.image;

         return (
         {
            image: image,
            isImageLoaded: false,
         });
      },

      render: function()
      {
         var shipTeam = this.props.shipTeam;
         var shipBase = shipTeam.ship.shipBase;

         return React.DOM.canvas(
         {
            id: this.props.canvasId,
            width: shipBase.width,
            height: shipBase.height,
            title: shipTeam.name,
         });
      },

      paint: function()
      {
         var shipTeam = this.props.shipTeam;
         var shipBase = shipTeam.ship.shipBase;
         var canvas = document.getElementById(this.props.canvasId);
         var context = canvas.getContext("2d");
         var scale = 1.0;
         var id;
         var image = this.state.image;
         var position = this.props.position;

         context.clearRect(0, 0, shipBase.width, shipBase.height);

         ShipImage.draw(context, scale, id, image, position, shipTeam);
      },
   });

   return ShipUI;
});
