define(["Award", "Book", "process/DCLURLFetcher"],
   function(Award, Book, DCLURLFetcher)
   {
      "use strict";
      QUnit.module("DCLURLFetcher");

      QUnit.skip("fetchData() 0", function(assert)
      {
         // Setup.
         var book = createBook0();
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

      QUnit.test("fetchData() 1", function(assert)
      {
         // Setup.
         var book = createBook1();
         var callback = function(book, dclUrl)
         {
            // Verify.
            assert.ok(book);
            assert.equal(dclUrl, undefined);
            done();
         };
         var fetcher = new DCLURLFetcher(book, callback);

         // Run.
         var done = assert.async();
         fetcher.fetchData();
      });

      QUnit.skip("fetchData() 2", function(assert)
      {
         // Setup.
         var book = createBook2();
         var callback = function(book, dclUrl)
         {
            // Verify.
            assert.ok(book);
            assert.ok(dclUrl);
            assert.equal(dclUrl, "https://dcl.bibliocommons.com/item/show/1268318114_freedoms_child");
            done();
         };
         var fetcher = new DCLURLFetcher(book, callback);

         // Run.
         var done = assert.async();
         fetcher.fetchData();
      });

      QUnit.skip("fetchData() 3", function(assert)
      {
         // Setup.
         var book = createBook3();
         var callback = function(book, dclUrl)
         {
            // Verify.
            assert.ok(book);
            assert.ok(dclUrl);
            assert.equal(dclUrl, "https://dcl.bibliocommons.com/item/show/1300042114_orphan_x");
            done();
         };
         var fetcher = new DCLURLFetcher(book, callback);

         // Run.
         var done = assert.async();
         fetcher.fetchData();
      });

      QUnit.skip("fetchData() 4", function(assert)
      {
         // Setup.
         var book = createBook4();
         var callback = function(book, dclUrl)
         {
            // Verify.
            assert.ok(book);
            assert.ok(dclUrl);
            assert.equal(dclUrl, "https://dcl.bibliocommons.com/item/show/1285826114_the_great_swindle");
            done();
         };
         var fetcher = new DCLURLFetcher(book, callback);

         // Run.
         var done = assert.async();
         fetcher.fetchData();
      });

      QUnit.skip("fetchData() 5", function(assert)
      {
         // Setup.
         var book = createBook5();
         var callback = function(book, dclUrl)
         {
            // Verify.
            assert.ok(book);
            assert.ok(dclUrl);
            assert.equal(dclUrl, "https://dcl.bibliocommons.com/item/show/1309150114_before_the_fall");
            done();
         };
         var fetcher = new DCLURLFetcher(book, callback);

         // Run.
         var done = assert.async();
         fetcher.fetchData();
      });

      QUnit.test("receiveData() 0", function(assert)
      {
         // Setup.
         var book = createBook0();
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

      QUnit.test("receiveData() 2", function(assert)
      {
         // Setup.
         var book = createBook2();
         var callback = function(book, dclUrl)
         {
            // Verify.
            assert.ok(book);
            assert.ok(dclUrl);
            assert.equal(dclUrl, "https://dcl.bibliocommons.com/item/show/1268318114_freedoms_child");
            done();
         };
         var fetcher = new DCLURLFetcher(book, callback);
         var xmlDocument = load(book);

         // Run.
         var done = assert.async();
         fetcher.receiveData(xmlDocument);
      });

      QUnit.test("receiveData() 3", function(assert)
      {
         // Setup.
         var book = createBook3();
         var callback = function(book, dclUrl)
         {
            // Verify.
            assert.ok(book);
            assert.ok(dclUrl);
            assert.equal(dclUrl, "https://dcl.bibliocommons.com/item/show/1300042114_orphan_x");
            done();
         };
         var fetcher = new DCLURLFetcher(book, callback);
         var xmlDocument = load(book);

         // Run.
         var done = assert.async();
         fetcher.receiveData(xmlDocument);
      });

      QUnit.test("receiveData() 4", function(assert)
      {
         // Setup.
         var book = createBook4();
         var callback = function(book, dclUrl)
         {
            // Verify.
            assert.ok(book);
            assert.ok(dclUrl);
            assert.equal(dclUrl, "https://dcl.bibliocommons.com/item/show/1285826114_the_great_swindle");
            done();
         };
         var fetcher = new DCLURLFetcher(book, callback);
         var xmlDocument = load(book);

         // Run.
         var done = assert.async();
         fetcher.receiveData(xmlDocument);
      });

      QUnit.test("receiveData() 5", function(assert)
      {
         // Setup.
         var book = createBook5();
         var callback = function(book, dclUrl)
         {
            // Verify.
            assert.ok(book);
            assert.ok(dclUrl);
            assert.equal(dclUrl, "https://dcl.bibliocommons.com/item/show/1309150114_before_the_fall");
            done();
         };
         var fetcher = new DCLURLFetcher(book, callback);
         var xmlDocument = load(book);

         // Run.
         var done = assert.async();
         fetcher.receiveData(xmlDocument);
      });

      function createBook0()
      {
         var title = "The Wrong Side of Goodbye";
         var author = "Michael Connelly";

         return new Book(title, author);
      }

      function createBook1()
      {
         var title = "Circling the Runway";
         var author = "J.L. Abramo";

         return new Book(title, author);
      }

      function createBook2()
      {
         var title = "Freedom's Child";
         var author = "Jax Miller";

         return new Book(title, author);
      }

      function createBook3()
      {
         var title = "Orphan X";
         var author = "Gregg Hurwitz";

         return new Book(title, author);
      }

      function createBook4()
      {
         var title = "The Great Swindle";
         var author = "Pierre Lemaître";

         return new Book(title, author);
      }

      function createBook5()
      {
         var title = "Before the Fall";
         var author = "Noah Hawley";

         return new Book(title, author);
      }

      function load(book)
      {
         var name = book.title();
         name = name.replace(/ /g, "_");
         name = name.replace(/\u2019/g, "");
         name = name.replace(/'/g, "");
         var request = new XMLHttpRequest();
         var url = "../resources/" + name + ".xml";
         LOGGER.debug("url = " + url);
         var isAsync = false;
         request.open("GET", url, isAsync);
         request.send();

         return request.responseXML;
      }
   });
