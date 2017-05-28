define(["Award", "Book", "Nomination"], function(Award, Book, Nomination)
{
   "use strict";

   function SYKMNomineeFetcher(award, callback)
   {
      InputValidator.validateNotNull("award", award);
      InputValidator.validateNotNull("callback", callback);

      this.award = function()
      {
         return award;
      };

      var that = this;
      var books = [];
      var bookToNomination = {};
      var xmlDocument;

      this.fetchData = function()
      {
         LOGGER.trace("SYKMNomineeFetcher.fetchData() start");

         var url = createUrl();
         $.ajax(url).done(this.receiveData).fail(function(jqXHR, textStatus, errorThrown)
         {
            LOGGER.error(errorThrown);
         });

         LOGGER.trace("SYKMNomineeFetcher.fetchData() end");
      };

      this.receiveData = function(xmlDocumentIn)
      {
         InputValidator.validateNotNull("xmlDocument", xmlDocumentIn);

         LOGGER.trace("SYKMNomineeFetcher.receiveData() start");

         xmlDocument = xmlDocumentIn;
         LOGGER.trace("award = " + award.name);
         LOGGER.trace("xmlDocument = " + (new XMLSerializer()).serializeToString(xmlDocument));
         parse();
         LOGGER.info(award.name + " books.length = " + books.length);
         callback(books, bookToNomination);

         LOGGER.trace("SYKMNomineeFetcher.receiveData() end");
      };

      function createUrl()
      {
         var baseUrl = "https://query.yahooapis.com/v1/public/yql?q=";
         var sourceUrl = award.url;

         var query = "select * from html where url='" + sourceUrl + "'";
         var answer = baseUrl + encodeURIComponent(query);
         LOGGER.debug("url = " + answer);

         return answer;
      }

      function forEachRow(rows, callback)
      {
         var thisRow = rows.iterateNext();

         while (thisRow)
         {
            callback(thisRow);

            thisRow = rows.iterateNext();
         }
      }

      function parse()
      {
         LOGGER.trace("SYKMNomineeFetcher.parse() start");

         // This gives the year set.
         var xpath = "//p[@class='AuthorSub']/parent::td";
         var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
         var rows = xmlDocument.evaluate(xpath, xmlDocument, null, resultType, null);
         forEachRow(rows, parseNominees);

         LOGGER.trace("SYKMNomineeFetcher.parse() end");
      }

      function parseNominees(xmlFragment)
      {
         LOGGER.trace("SYKMNomineeFetcher.parseNominees() start");
         LOGGER.trace("xmlFragment = " + (new XMLSerializer()).serializeToString(xmlFragment));

         // This gives the year.
         var xpath0 = "p[@class='AuthorSub']";
         var resultType0 = XPathResult.FIRST_ORDERED_NODE_TYPE;
         var element = xmlDocument.evaluate(xpath0, xmlFragment, null, resultType0, null);
         LOGGER.debug("element.singleNodeValue = " + element.singleNodeValue);
         LOGGER.debug("element.singleNodeValue.textContent = " + element.singleNodeValue.textContent);
         var year = Number(element.singleNodeValue.textContent.substring(0, 4));
         LOGGER.debug("year = " + year);
         var callback;

         if (award.value === Award.DAGGER)
         {
            callback = function(xmlFragment)
            {
               parseNomineeDagger(xmlFragment, year);
            };
         }
         else
         {
            callback = function(xmlFragment)
            {
               parseNominee(xmlFragment, year);
            };
         }

         var maxTables = (award.value === Award.DAGGER ? 9 : 5);

         for (var j = 1; j < maxTables; j++)
         {
            // This gives the year set.
            var xpath = "table[" + j + "]";
            var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
            var rows = xmlDocument.evaluate(xpath, xmlFragment, null, resultType, null);
            forEachRow(rows, callback);
         }

         LOGGER.trace("SYKMNomineeFetcher.parseNominees() end");
      }

      function parseNominee(xmlFragment, year)
      {
         LOGGER.trace("SYKMNomineeFetcher.parseNominee() start");
         LOGGER.trace("xmlFragment = " + (new XMLSerializer()).serializeToString(xmlFragment));

         // This gives the data cells (td).
         var xpath = "tbody/tr/td";
         var resultType = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
         var cells = xmlDocument.evaluate(xpath, xmlFragment, null, resultType, null);
         for (var i = 0; i < cells.snapshotLength; i++)
         {
            LOGGER.debug(i + " snapshotItem = " + cells.snapshotItem(i).textContent);
         }

         var category = parseCategory(cells.snapshotItem(0).textContent.trim());
         LOGGER.debug("category = " + category);

         if (category !== undefined)
         {
            for (var j = 2; j < cells.snapshotLength; j += 2)
            {
               var isWinner = (cells.snapshotItem(j - 1).textContent.trim() === "*");
               LOGGER.debug("isWinner ? " + isWinner);
               var book = parseBook(cells.snapshotItem(j).textContent.trim());
               var nomination = new Nomination(award, category, year, isWinner);
               add(book, nomination);
            }
         }

         LOGGER.trace("SYKMNomineeFetcher.parseNominee() end");
      }

      function parseNomineeDagger(xmlFragment, year)
      {
         LOGGER.trace("SYKMNomineeFetcher.parseNominee() start");
         LOGGER.trace("xmlFragment = " + (new XMLSerializer()).serializeToString(xmlFragment));

         var xpath0 = "tbody/tr/th";
         var resultType0 = XPathResult.FIRST_ORDERED_NODE_TYPE;
         var element = xmlDocument.evaluate(xpath0, xmlFragment, null, resultType0, null);
         LOGGER.debug("element.singleNodeValue = " + element.singleNodeValue);

         if (element.singleNodeValue)
         {
            LOGGER.debug("element.singleNodeValue.textContent = " + element.singleNodeValue.textContent);
            var category = parseCategory(element.singleNodeValue.textContent.trim());
            LOGGER.debug("category = " + category);

            if (category !== undefined)
            {
               // This gives the data cells (td).
               var xpath = "tbody/tr/td";
               var resultType = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
               var cells = xmlDocument.evaluate(xpath, xmlFragment, null, resultType, null);
               for (var i = 0; i < cells.snapshotLength; i++)
               {
                  LOGGER.debug(i + " snapshotItem = " + cells.snapshotItem(i).textContent);
               }

               for (var j = 1; j < cells.snapshotLength; j += 2)
               {
                  var isWinner = (cells.snapshotItem(j - 1).textContent.trim() === "*");
                  LOGGER.debug("isWinner ? " + isWinner);
                  var book = parseBook(cells.snapshotItem(j).textContent.trim());
                  var nomination = new Nomination(award, category, year, isWinner);
                  add(book, nomination);
               }
            }
         }

         LOGGER.trace("SYKMNomineeFetcher.parseNominee() end");
      }

      function add(book, nomination)
      {
         if (!books.vizziniContainsUsingEquals(book, function(a, b)
            {
               return a.title() === b.title() && a.author() === b.author();
            }))
         {
            books.push(book);
            bookToNomination[book] = [];
         }
         var nominations = bookToNomination[book];

         if (!nominations.vizziniContains(nomination))
         {
            nominations.push(nomination);
         }
      }

      function parseAuthor(author)
      {
         InputValidator.validateNotNull("author", author);

         var answer = author;

         var index = answer.indexOf("[");

         if (index >= 0)
         {
            answer = answer.substring(0, index).trim();
         }

         return answer;
      }

      function parseBook(titleAuthor)
      {
         InputValidator.validateNotNull("titleAuthor", titleAuthor);

         var myTitleAuthor = titleAuthor.replace(/\n/g, " ");
         LOGGER.debug("myTitleAuthor = " + myTitleAuthor);
         var index = myTitleAuthor.indexOf(" by ");
         var title;
         var author;

         if (index >= 0)
         {
            title = myTitleAuthor.substring(0, index).trim();
            // Special case for 2016
            title = title.replace("Del and Louise", "Del & Louise");
            author = parseAuthor(myTitleAuthor.substring(index + 3).trim());
         }

         LOGGER.debug("title = _" + title + "_");
         LOGGER.debug("author = _" + author + "_");

         return new Book(title, author);
      }

      function parseCategory(categoryName)
      {
         InputValidator.validateNotNull("categoryName", categoryName);

         var myCategoryName = categoryName.replace("  ", " ");
         myCategoryName = myCategoryName.replace(":", "");
         LOGGER.debug("myCategoryName = _" + myCategoryName + "_");
         var properties = award.categories.properties;

         return Award.findByName(properties, myCategoryName);
      }
   }

   return SYKMNomineeFetcher;
});
