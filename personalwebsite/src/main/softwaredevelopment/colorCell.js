function colorRow(name, colorOne, colorDec, colorHex, components)
{
    document.write('<tr>');
    document.write('<td style="background-color: ');
    document.write(colorHex);
    document.write('" class="table-cell-details">&nbsp;</td>');
    document.write('<td class="table-cell-details">');
    document.write(name);
    document.write('</td>');
    document.write('<td class="table-cell-details">');
    document.write(colorOne);
    document.write('</td>');
    document.write('<td class="table-cell-details">');
    document.write(colorDec);
    document.write('</td>');
    document.write('<td class="table-cell-details">');
    document.write(colorHex);
    document.write('</td>');
    if (components != null)
    {
        document.write('<td class="table-cell-details">');
        document.write(components);
        document.write('</td>');
    }
    document.write('</tr>');
}

function colorRow0(name, colorDec, colorHex, components)
{
    document.write('<tr>');
    document.write('<td style="background-color: ');
    document.write(colorHex);
    document.write('" class="table-cell-details">&nbsp;</td>');
    document.write('<td class="table-cell-details">');
    document.write(name);
    document.write('</td>');
    document.write('<td class="table-cell-details">');
    document.write(colorDec);
    document.write('</td>');
    document.write('<td class="table-cell-details">');
    document.write(colorHex);
    document.write('</td>');
    if (components != null)
    {
        document.write('<td class="table-cell-details">');
        document.write(components);
        document.write('</td>');
    }
    document.write('</tr>');
}

function colorCell(colorHex)
{

    document.write('<td style="background-color: ');
    document.write(colorHex);
    document
            .write('" class="table-cell-details">&nbsp;&nbsp;&nbsp;&nbsp;</td>');
}

function colorCells(colorDec, colorHex)
{

    colorCell(colorHex);
    document.write('<td class="center table-cell-details">');
    document.write(colorDec);
    document.write('<br/>');
    document.write(colorHex);
    document.write('</td>');
}

function colorCubeSlice(rHex)
{

    document.write('<table class="full-width table-details">');

    var step = 32;

    var g;
    for (g = -1; g < 256; g += step)
    {
        document.write('<tr>');

        var gHex = toHex(g);
        var bHex;

        if (g <= 0)
        {
            document.write('<td>G \\ B</td>');

            for (b = -1; b < 256; b += step)
            {
                var bHex = toHex(b);
                document
                        .write('<td class="center padding-5 table-cell-details">#'
                                + bHex + '</td>');
            }

            document.write('</tr>');
            document.write('<tr>');
        }

        document.write('<td class="center padding-5 table-cell-details">#'
                + gHex + '</td>');

        for (b = -1; b < 256; b += step)
        {
            var bHex = toHex(b);
            var colorHex = '#' + rHex + gHex + bHex;
            colorCell(colorHex);
        }

        document.write('</tr>');
    }

    document.write('</table>');
}

function tableHeader()
{
    tableHeader0();
    document.write('<th class="table-header-cell-details">Components</th>');
    document.write('</tr>');
}

function tableHeader0()
{
    document.write('<tr>');
    document.write('<th class="table-header-cell-details">Color</th>');
    document.write('<th class="table-header-cell-details">Name</th>');
    document.write('<th class="table-header-cell-details">RGB (dec)</th>');
    document.write('<th class="table-header-cell-details">RGB (dec)</th>');
    document.write('<th class="table-header-cell-details">RGB (hex)</th>');
}

function tableHeader00()
{
    document.write('<tr>');
    document.write('<th class="table-header-cell-details">Color</th>');
    document.write('<th class="table-header-cell-details">Name</th>');
    document.write('<th class="table-header-cell-details">RGB (dec)</th>');
    document.write('<th class="table-header-cell-details">RGB (hex)</th>');
}

function toHex(number)
{
    return (number <= 0 ? '00' : number.toString(16).toUpperCase());
}
