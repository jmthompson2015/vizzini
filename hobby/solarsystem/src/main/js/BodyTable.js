var BodyColumns = [
{
    key: "name",
    label: "Body",
    className: "textCell",
},
{
    key: "type",
    label: "Type",
    className: "textCell",
},
{
    key: "parent",
    label: "Parent",
    className: "textCell",
},
{
    key: "radius",
    label: "Radius (km)",
    className: "numberCell",
},
{
    key: "mass",
    label: "Mass (kg)",
    className: "numberCell",
},
{
    key: "positionMagnitude",
    label: "Position (km)",
    className: "numberCell",
},
{
    key: "velocityMagnitude",
    label: "Velocity (km/s)",
    className: "numberCell",
}, ];

var BodyTable = React.createClass(
{
    // Factories.
    Table: React.createFactory(Reactable.Table),
    Tr: React.createFactory(Reactable.Tr),
    Td: React.createFactory(Reactable.Td),
    Tfoot: React.createFactory(Reactable.Tfoot),

    render: function()
    {
        var rows = [];

        var bodyKeys = Body.values();
        var self = this;

        bodyKeys.forEach(function(bodyKey, i)
        {
            rows.push(self.createRow(bodyKey, i));
        });

        return this.Table(
        {
            id: "bodyTable",
            columns: BodyColumns,
            sortable: true,
        }, rows);
    },

    createCell: function(key, column, value, displayValue)
    {
        displayValue = (displayValue ? displayValue : value);

        return this.Td(
        {
            key: key,
            className: column.className,
            column: column.key,
            value: value,
        }, displayValue);
    },

    createRow: function(bodyKey, i)
    {
        var cells = [];

        var body = Body.properties[bodyKey];
        var i = 0;

        var imageSrc = "../resources/" + body.name + ".jpg";
        var image = React.DOM.img(
        {
            src: imageSrc,
            style:
            {
                "verticalAlign": "middle"
            },
        });
        cells.push(this.Td(
        {
            key: cells.length,
            className: BodyColumns[i].className,
            column: BodyColumns[i++].key,
            value: body.name,
        }, React.DOM.span({}, image, " ", body.name)));

        var typeValue = BodyType.properties[body.type].sortOrder;
        var typeName = BodyType.properties[body.type].name;
        cells.push(this.createCell(cells.length, BodyColumns[i++], typeValue, typeName));

        var parent = (body.parent ? body.parent : undefined);
        var parentDisplay = (parent ? Body.properties[parent].name: " ");
        cells.push(this.createCell(cells.length, BodyColumns[i++], parent, parentDisplay));

        var radius = (body.radius ? body.radius : undefined);
        var radiusDisplay = (radius ? radius.toExponential(4) : " ");
        cells.push(this.createCell(cells.length, BodyColumns[i++], radius, radiusDisplay));

        var mass = (body.mass ? body.mass : undefined);
        var massDisplay = (mass ? mass.toExponential(4) : " ");
        cells.push(this.createCell(cells.length, BodyColumns[i++], mass, massDisplay));

        var posMag = (body.position ? body.position.magnitude() : undefined);
        var posDisplay = (posMag ? posMag.toExponential(4) : " ")
        cells.push(this.createCell(cells.length, BodyColumns[i++], posMag, posDisplay));

        var velMag = (body.velocity ? body.velocity.magnitude() : undefined);
        var velDisplay = (velMag ? velMag.toExponential(4) : " ")
        cells.push(this.createCell(cells.length, BodyColumns[i++], velMag, velDisplay));

        return this.Tr(
        {
            key: i
        }, cells);
    },
});
