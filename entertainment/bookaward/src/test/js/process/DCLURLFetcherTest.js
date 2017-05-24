define(["Award", "Book", "process/DCLURLFetcher"],
   function(Award, Book, DCLURLFetcher)
   {
      "use strict";
      QUnit.module("DCLURLFetcher");

      QUnit.skip("fetchData()", function(assert)
      {
         // Setup.
         var book = createBook1();
         var callback = function(book, dclUrl)
         {
            // Verify.
            assert.ok(book);
            assert.ok(dclUrl);
            assert.equal(dclUrl, "https://dcl.bibliocommons.com/item/show/1337567114_the_wrong_side_of_goodbye");
            done();
         };
         var fetcher = new DCLURLFetcher(book, callback);

         // Run.
         var done = assert.async();
         fetcher.fetchData();
      });

      QUnit.test("receiveData()", function(assert)
      {
         // Setup.
         var book = createBook1();
         var callback = function(book, dclUrl)
         {
            // Verify.
            assert.ok(book);
            assert.ok(dclUrl);
            assert.equal(dclUrl, "https://dcl.bibliocommons.com/item/show/1337567114_the_wrong_side_of_goodbye");
            done();
         };
         var fetcher = new DCLURLFetcher(book, callback);
         var xmlDocument = load(book);

         // Run.
         var done = assert.async();
         fetcher.receiveData(xmlDocument);
      });

      function createBook1()
      {
         var title = "The Wrong Side of Goodbye";
         var author = "Michael Connelly";

         return new Book(title, author);
      }

      function load(book)
      {
         var name = book.title();
         name = name.replace(/ /g, "_");
         var request = new XMLHttpRequest();
         var url = "../resources/" + name + ".xml";
         LOGGER.debug("url = " + url);
         var isAsync = false;
         request.open("GET", url, isAsync);
         request.send();

         return request.responseXML;
      }
   });
