define(["Award", "Book", "Nomination"],
   function(Award, Book, Nomination)
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

            var title = book.title();
            title = title.replace(/ /g, "+");
            var sourceUrl = "https://dcl.bibliocommons.com/search?t=smart&q=" + title;

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
            if (row)
            {
               dclUrl = BASE_URL + row.value;
            }

            LOGGER.trace("DCLURLFetcher.parse() end");
         }
      }

      return DCLURLFetcher;
   });
