/*
 * Provides a rectangular path of points.
 */
function RectanglePath(width, height)
{
    var x = -width / 2;
    var y = -height / 2;
    var path = new Path();

    path.add(x + width, y); // forward port
    path.add(x + width, y + height); // forward starboard
    path.add(x, y + height); // aft starboard
    path.add(x, y); // aft port
    path.close();

    this.getPoints = function()
    {
        return path.getPoints();
    }

    this.getPointsLength = function()
    {
        return path.getPointsLength();
    }

    this.paintComponent = function(context, strokeStyle)
    {
        path.paintComponent(context, strokeStyle);
    }

    this.rotate = function(angle, centerX, centerY)
    {
        path.rotate(angle, centerX, centerY);
    }

    this.toString = function()
    {
        return path.toString();
    }

    this.translate = function(dx, dy)
    {
        path.translate(dx, dy);
    }
}
