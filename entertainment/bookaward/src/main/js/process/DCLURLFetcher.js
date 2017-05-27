define(["Award", "Book", "Library", "Nomination", "process/ui/UrlGenerator"],
   function(Award, Book, Library, Nomination, UrlGenerator)
   {
      "use strict";

      function DCLURLFetcher(book, callback)
      {
         InputValidator.validateNotNull("book", book);
         InputValidator.validateNotNull("callback", callback);

         this.book = function()
         {
            return book;
         };

         var that = this;
         var dclUrl;
         var xmlDocument;
         var BASE_URL = "https://dcl.bibliocommons.com";

         this.fetchData = function()
         {
            LOGGER.trace("DCLURLFetcher.fetchData() start");

            var url = createUrl();
            $.ajax(url).done(this.receiveData).fail(function(jqXHR, textStatus, errorThrown)
            {
               LOGGER.error(errorThrown);
            });

            LOGGER.trace("DCLURLFetcher.fetchData() end");
         };

         this.receiveData = function(xmlDocumentIn)
         {
            InputValidator.validateNotNull("xmlDocument", xmlDocumentIn);

            LOGGER.trace("DCLURLFetcher.receiveData() start");

            xmlDocument = xmlDocumentIn;
            LOGGER.trace("book = " + book);
            LOGGER.trace("xmlDocument = " + (new XMLSerializer()).serializeToString(xmlDocument));
            parse();
            LOGGER.debug("dclUrl = " + dclUrl);
            callback(book, dclUrl);

            LOGGER.trace("DCLURLFetcher.receiveData() end");
         };

         function createUrl()
         {
            var baseUrl = "https://query.yahooapis.com/v1/public/yql?q=";

            var library = Library.properties[Library.DCL];
            var subject = book.toString();
            var sourceUrl = UrlGenerator.createLibrarySearchUrl(library, subject);

            var query = "select * from html where url='" + sourceUrl + "'";
            var answer = baseUrl + encodeURIComponent(query);
            LOGGER.debug("url = " + answer);

            return answer;
         }

         function parse()
         {
            LOGGER.trace("DCLURLFetcher.parse() start");

            // This gives the book set.
            var xpath = "//span[@class='title']/a/@title['(Book)' = substring(., string-length(.)- string-length('(Book)') +1)]/../@href";
            var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
            var rows = xmlDocument.evaluate(xpath, xmlDocument, null, resultType, null);
            var row = rows.iterateNext();
            LOGGER.trace("row = " + row);
            var title = processTitle(book.title());
            LOGGER.trace("title = " + title);

            while (row)
            {
               var myTitle = row.value;
               LOGGER.trace("myTitle = " + myTitle);

               if (myTitle.endsWith(title))
               {
                  dclUrl = BASE_URL + row.value;
                  break;
               }

               row = rows.iterateNext();
            }

            if (dclUrl === undefined)
            {
               LOGGER.warn("missing row for book = " + book);
            }

            LOGGER.trace("DCLURLFetcher.parse() end");
         }

         function processTitle(title)
         {
            var answer = title;

            answer = answer.replace(/\u2019/g, "'");
            answer = answer.replace(/'/g, "");
            answer = answer.replace(/ /g, "_");
            answer = answer.toLowerCase();

            return answer;
         }
      }

      return DCLURLFetcher;
   });
