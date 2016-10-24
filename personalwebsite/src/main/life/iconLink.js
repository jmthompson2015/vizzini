function displayIconLink(href, imgSrc) {
	displayIconLink(href, imgSrc, label, -1);
}
function displayIconLinkMedium(href, imgSrc, label) {
	displayIconLink(href, imgSrc, label, 64);
}
function displayIconLinkSmall(href, imgSrc, label) {
	displayIconLink(href, imgSrc, label, 32);
}

function displayIconLink(href, imgSrc, label, height) {

	document.write('<td class="icon-link-cell">');
	document.write('<table class="icon-link-cell">');
	document.write('<tbody>');
	document.write('<tr class="icon-link-cell">');
	document.write('<td class="center">');

	document.write('<a href="');
	document.write(href);
	document.write('">');
	if (height > 0) {
		document.write('<img height="');
		document.write(height);
		document.write('"');
	} else {
		document.write('<img');
	}
	document.write(' src="');
	document.write(imgSrc);
	document.write('" title="');
	document.write(label);
	document.write('"/>');
	document.write('</a>');

	document.write('</td>');
	document.write('</tr>');
	document.write('<tr>');
	document.write('<td>');

	document.write('<a href="');
	document.write(href);
	document.write('">');
	document.write(label);
	document.write('</a>');

	document.write('</td>');
	document.write('</tr>');
	document.write('</tbody>');
	document.write('</table>');
	document.write('</td>');
}

function displayIcon(href, imgSrc, label, height) {

	document.write('<table class="icon-link-cell">');
	document.write('<tbody>');
	document.write('<tr class="icon-link-cell">');
	document.write('<td class="center">');

	document.write('<a href="');
	document.write(href);
	document.write('">');
	if (height > 0) {
		document.write('<img height="');
		document.write(height);
		document.write('"');
	} else {
		document.write('<img');
	}
	document.write(' src="');
	document.write(imgSrc);
	document.write('" title="');
	document.write(label);
	document.write('"/>');
	document.write('</a>');

	document.write('</td>');
	document.write('</tr>');
	document.write('</tbody>');
	document.write('</table>');
}
