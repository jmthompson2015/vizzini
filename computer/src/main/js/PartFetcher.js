function PartFetcher()
{
    var that = this;

    this.fetchData = function()
    {
        LOGGER.trace("fetchData() start");

        var url = createUrl();
        $.get(url, this.receiveData);

        LOGGER.trace("fetchData() end");
    }

    this.receiveData = function(xmlDocument)
    {
        LOGGER.trace("receiveData() start");

        var parts = {};
        ComputerProperty.values().forEach(function(property)
        {
            parts[property] = [];
        });

        // Special case: add Seagate Barracuda 1 TB.
        var xpath = "//h4[contains(., 'Seagate Barracuda 1 TB')]/../..";
        var barracuda1TB = addPart(xmlDocument, xpath, parts,
                ComputerProperty.STORAGE_DRIVE);

        // Special case: add Seagate Barracuda 2 TB.
        var xpath = "//h4[contains(., 'Seagate Barracuda 2 TB')]/../..";
        var barracuda2TB = addPart(xmlDocument, xpath, parts,
                ComputerProperty.STORAGE_DRIVE);

        // Special case: add Seagate Barracuda 3 TB.
        var xpath = "//h4[contains(., 'Seagate Barracuda 3 TB')]/../..";
        var barracuda3TB = addPart(xmlDocument, xpath, parts,
                ComputerProperty.STORAGE_DRIVE);

        // Special case: add EVGA GT 740 SC 2GB.
        var evgaGt740Sc2GB = addEvgaGt740Sc2GB(parts);

        // Special case: add EVGA GT 740 SC 4GB.
        var evgaGt740Sc4GB = addEvgaGt740Sc4GB(parts);

        var computers = {};

        var computerKeys = [ "CustoMac_Mini", "CustoMac_Mini_Deluxe",
                "CustoMac_mATX", "CustoMac_Budget_ATX", "CustoMac_Pro" ];

        computerKeys.forEach(function(computerKey)
        {
            // This gives each section of the build.
            var xpath = "//table[@class='table table-condensed']//a[@name='"
                    + computerKey
                    + "']/../../../..//table[@class='buildsection']";
            var nsResolver = null;
            var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
            var result = null;
            var rows = xmlDocument.evaluate(xpath, xmlDocument, nsResolver,
                    resultType, result);
            var thisRow = rows.iterateNext();
            var i = 0;
            var myParts = [];

            while (thisRow)
            {
                var newParts = parseParts(xmlDocument, thisRow);
                newParts.forEach(function(newPart)
                {
                    if (newPart.value !== "barracuda_1tb"
                            && newPart.value !== "evga_gt_740_sc")
                    {
                        myParts.push(newPart);
                    }
                });

                thisRow = rows.iterateNext();
                i++;
            }

            // Special cases.
            myParts.push(barracuda1TB);
            myParts.push(barracuda2TB);
            myParts.push(barracuda3TB);

            if (computerKey !== "CustoMac_Mini"
                    && computerKey !== "CustoMac_Budget_ATX")
            {
                myParts.push(evgaGt740Sc2GB);
                myParts.push(evgaGt740Sc4GB);
            }

            myParts.forEach(function(part)
            {
                if (part.type && !containsPart(parts[part.type], part))
                {
                    parts[part.type].push(part);
                }
            });

            sortParts(myParts);
            computers[computerKey] = that.createComputer(computerKey, myParts);
            myParts = [];
        });

        // Sort parts.
        ComputerProperty.values().forEach(function(property)
        {
            sortParts(parts[property]);
        });

        document.getElementById("part").innerHTML = PartFetcher
                .writeParts(parts);
        document.getElementById("computer").innerHTML = PartFetcher
                .writeComputers(computers);

        LOGGER.trace("receiveData() end");
    }

    this.createComputer = function(computerKey, parts)
    {
        var computerName = computerKey.replace(/_/g, " ");
        var answer =
        {
            name: computerName,
            value: computerKey,
        };

        if (parts)
        {
            parts.forEach(function(part)
            {
                if (answer[part.type])
                {
                    if (Array.isArray(answer[part.type]))
                    {
                        answer[part.type].push(part.value);
                    }
                    else
                    {
                        var previous = answer[part.type];
                        answer[part.type] = [ previous, part.value ];
                    }
                }
                else
                {
                    answer[part.type] = part.value;
                }
            });

            if (answer.accessory && !Array.isArray(answer.accessory))
            {
                var previous = answer.accessory;
                answer.accessory = [ "*none*", previous ];
            }

            if (answer.graphicsCard)
            {
                if (!Array.isArray(answer.graphicsCard))
                {
                    var previous = answer.graphicsCard;
                    answer.graphicsCard = [ "*none*", previous ];
                }
                else
                {
                    var previous = answer.graphicsCard;
                    answer.graphicsCard = [ "*none*" ];
                    previous.forEach(function(card)
                    {
                        answer.graphicsCard.push(card);
                    });
                }
            }
        }

        return answer;
    }

    function addEvgaGt740Sc2GB(parts)
    {
        var answer = {};

        answer.name = "EVGA GT 740 SC 2GB";
        answer.value = "evga_gt_740_sc_2gb";
        answer.type = ComputerProperty.GRAPHICS_CARD;
        answer.url = "http://www.amazon.com/dp/B00KK8MEU6/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20";

        return answer;
    }

    function addEvgaGt740Sc4GB(parts)
    {
        var answer = {};

        answer.name = "EVGA GT 740 SC 4GB";
        answer.value = "evga_gt_740_sc_4gb";
        answer.type = ComputerProperty.GRAPHICS_CARD;
        answer.url = "http://www.amazon.com/dp/B00KJGYOGG/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20";

        return answer;
    }

    function addPart(xmlDocument, xpath, parts, computerProperty)
    {
        var answer;
        var nodes = xmlDocument.evaluate(xpath, xmlDocument, null,
                XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

        if (nodes)
        {
            var myPart = parsePart(xmlDocument, nodes.iterateNext());
            if (myPart)
            {
                answer = myPart;
                parts[computerProperty].push(myPart);
            }
        }

        return answer;
    }

    function containsPart(array, part)
    {
        var answer = false;

        array.forEach(function(element)
        {
            if (element.value === part.value)
            {
                answer = true;
            }
        });

        return answer;
    }

    function createUrl()
    {
        var baseUrl = "https://query.yahooapis.com/v1/public/yql?q=";
        var sourceUrl = "http://www.tonymacx86.com/building-customac-buyers-guide-october-2015.html";

        var query = "select * from html where url='" + sourceUrl + "'";
        var answer = baseUrl + encodeURIComponent(query);

        return answer;
    }

    function parsePart(xmlDocument, xmlFragment)
    {
        var answer;

        var name = parseName(xmlDocument, xmlFragment);

        if (name)
        {
            var url = parseUrl(xmlDocument, xmlFragment);

            answer =
            {
                name: name,
                type: PartFetcher.determineType(name),
                url: url,
                value: PartFetcher.createValue(name),
            };
        }

        return answer;
    }

    function parseParts(xmlDocument, xmlFragment)
    {
        var answer = [];

        var xpath = "./tbody/tr";
        var nsResolver = null;
        var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
        var result = null;
        var rows = xmlDocument.evaluate(xpath, xmlFragment, nsResolver,
                resultType, result);
        var thisRow = rows.iterateNext();
        var i = 0;

        while (thisRow)
        {
            var part = parsePart(xmlDocument, thisRow);

            if (part)
            {
                answer.push(part);
            }

            thisRow = rows.iterateNext();
            i++;
        }

        return answer;
    }

    function parseName(xmlDocument, xmlFragment)
    {
        var xpath = "./td[2]/h4";
        var nsResolver = null;
        var resultType = XPathResult.STRING_TYPE;
        var result = null;
        var string = xmlDocument.evaluate(xpath, xmlFragment, nsResolver,
                resultType, result);

        return string.stringValue;
    }

    function parseUrl(xmlDocument, xmlFragment)
    {
        var xpath = "./td[3]/h5/p/a/@href";
        var nsResolver = null;
        var resultType = XPathResult.STRING_TYPE;
        var result = null;
        var string = xmlDocument.evaluate(xpath, xmlFragment, nsResolver,
                resultType, result);

        return string.stringValue;
    }

    function sortParts(parts)
    {
        parts.sort(function(a, b)
        {
            if (a.type > b.type)
            {
                return 1;
            }
            else if (a.type < b.type)
            {
                return -1;
            }
            else
            {
                if (a.value > b.value)
                {
                    return 1;
                }
                else if (a.value < b.value) { return -1; }

                return 0;
            }
        });
    }
}

PartFetcher.createKey = function(value)
{
    var answer = value;

    if (value)
    {
        answer = value.toUpperCase();
    }

    return answer;
}

PartFetcher.createValue = function(name)
{
    var answer = name;

    if (name)
    {
        var removes = [ "Apex", "BitFenix", "Corsair", "Crucial",
                "Fractal Design", "Gigabyte", "Seagate", "TP-Link",
                "Thermaltake", "mini-ITX", "(w/ 250W Power Supply)", "(", ")", ];

        removes.forEach(function(removeMe)
        {
            answer = answer.replace(removeMe, "");
        });

        answer = answer.trim();
        answer = answer.replace(/-/g, "_");
        answer = answer.replace(/ /g, "_");
        answer = answer.toLowerCase();

        if (answer === "budget_8gb")
        {
            answer = "budget_08gb";
        }
        else if (answer === "ballistix_tactical_8gb")
        {
            answer = "ballistix_tactical_08gb";
        }
    }

    return answer;
}

PartFetcher.determineType = function(name)
{
    var answer;

    if (name)
    {
        if (name.indexOf("Gigabyte") >= 0)
        {
            answer = ComputerProperty.MOTHERBOARD;
        }
        else if (name.indexOf("Core i") >= 0)
        {
            answer = ComputerProperty.CPU;
        }
        else if (name.indexOf("Thermaltake") >= 0)
        {
            answer = ComputerProperty.CPU_COOLER;
        }
        else if (name.indexOf("Crucial") >= 0)
        {
            answer = ComputerProperty.RAM;
        }
        else if (name.indexOf("EVGA") >= 0)
        {
            answer = ComputerProperty.GRAPHICS_CARD;
        }
        else if (name.indexOf("Samsung") >= 0)
        {
            answer = ComputerProperty.SYSTEM_DRIVE;
        }
        else if (name.indexOf("Seagate") >= 0)
        {
            answer = ComputerProperty.STORAGE_DRIVE;
        }
        else if (name.indexOf("Apex") >= 0 || name.indexOf("BitFenix") >= 0
                || name.indexOf("Carbide") >= 0
                || name.indexOf("Fractal Design") >= 0)
        {
            answer = ComputerProperty.ENCLOSURE;
        }
        else if (name.indexOf("Corsair") >= 0)
        {
            answer = ComputerProperty.POWER_SUPPLY;
        }
        else if (name.indexOf("TP-Link") >= 0)
        {
            answer = ComputerProperty.ACCESSORY;
        }
    }

    if (!answer) { throw "ERROR: can't determine type for name = _" + name
            + "_"; }

    return answer;
}

PartFetcher.writeComputers = function(computers)
{
    var answer = "";

    if (computers)
    {
        answer += "var Computer =\n";
        answer += "{\n";
        Object.getOwnPropertyNames(computers).forEach(function(computerKey)
        {
            var computer = computers[computerKey];
            answer += computerKey;
            answer += ":\n";
            answer += "{\n";
            answer += "name: \"" + computer.name + "\",\n";
            answer += "value: \"" + computer.value + "\",\n";
            ComputerProperty.values().forEach(function(property)
            {
                if (computer[property])
                {
                    answer += property + ": ";
                    if (Array.isArray(computer[property]))
                    {
                        answer += "[";
                        answer += computer[property].map(function(element)
                        {
                            return "\"" + element + "\"";
                        });
                        answer += "],\n";
                    }
                    else
                    {
                        answer += "\"" + computer[property] + "\",\n";
                    }
                }
            });
            answer += "},\n\n";
        });

        answer += "values: function()\n";
        answer += "{\n";
        answer += "return [";
        answer += Object.getOwnPropertyNames(computers).map(function(name)
        {
            return "\"" + name + "\"";
        });
        answer += "];\n";
        answer += "},\n";

        answer += "}\n";
    }

    return answer;
}

PartFetcher.writeParts = function(parts)
{
    var answer = "var Part = {};\n\n";

    if (parts)
    {
        ComputerProperty.values().forEach(function(property)
        {
            if (parts[property])
            {
                answer += "Part.";
                answer += property;
                answer += " =\n";
                answer += "{\n";
                parts[property].forEach(function(part)
                {
                    answer += PartFetcher.createKey(part.value);
                    answer += ": \"";
                    answer += part.value;
                    answer += "\",\n";
                });
                answer += "properties:\n";
                answer += "{\n";
                parts[property].forEach(function(part)
                {
                    answer += "\"";
                    answer += part.value;
                    answer += "\":\n";
                    answer += "{\n";
                    answer += "name: \"" + part.name + "\",\n";
                    answer += "type: \"" + part.type + "\",\n";
                    answer += "url: \"" + part.url + "\",\n";
                    answer += "value: \"" + part.value + "\",\n";
                    answer += "},\n";
                });
                answer += "},\n";
                answer += "values: function()\n";
                answer += "{\n";
                answer += "    return Object.getOwnPropertyNames(Part.";
                answer += property;
                answer += ".properties);\n";
                answer += "},\n";
                answer += "}\n\n";
            }
        });
    }

    return answer;
}
