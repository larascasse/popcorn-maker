// PLUGIN: YAOOBOASS

(function ( Popcorn ) {

	var _queries = {},
	
	yahooBossCallback = function( o ) {
		var databack = {};

	    if(typeof o.bossresponse.web !== 'undefined' && o.bossresponse.web.count>0){
	      databack.web = [];
	      databack.webHTML = '<ul>';
	      for(var i=0,j=o.bossresponse.web.count;i<j;i++){
	        var item = o.bossresponse.web.results[i];
	        //alert(item);
	        databack.web.push(
	          {
	            abstract:item.abstract,
	            title:item.title,
	            url:item.clickurl,
	            displayurl:item.dispurl
	          }
	        );
	        var html = config.webItemHTML.replace('{clickurl}',item.clickurl);
	        html = html.replace('{title}',item.title);
	        html = html.replace('{abstract}',item.abstract);
	        databack.webHTML += html;
	      }
	      databack.webHTML += '</ul>';
	      //alert(databack.webHTML);
	    }
	    if(typeof o.bossresponse.images !== 'undefined' && o.bossresponse.images.count>0 ){
	    	//alert("num images"+o.bossresponse.images.count)
	      databack.images = [];
	      databack.imagesHTML = '<ul>';
	      for(var i=0,j=o.bossresponse.images.count;i<j;i++){
	        var item = o.bossresponse.images.results[i];
	        var referer = item.refererurl;
	        var shorter = referer.replace('http://www.','').substring(0,39);
	        databack.images.push(
	          {
	            abstract:item.abstract,
	            title:item.title,
	            url:item.clickurl,
	            page:item.refererclickurl,
	            pagedisplay:item.refererurl,
	            shorturl:shorter+'&hellip;',
	            filename:item.filename,
	            imageurl:item.url,
	            thumbnail:item.thumnail_url,
	            thumbnaildimensions:[item.thumbnail_width,item.thumbnail_height],
	            dimensions:[item.width,item.height],
	            format:item.format
	          }
	        );
	        var html = config.imageItemHTML.replace('{url}',item.url);
	        html = html.replace('{clickurl}',item.refererclickurl);
	        html = html.replace('{shortened}',shorter);
	        html = html.replace('{thumbnail}',item.thumbnailurl);
	        html = html.replace('{thumbnailwidth}',item.thumbnailwidth);
	        html = html.replace('{thumbnailheight}',item.thumbnailheight);
	        html = html.replace('{title}',item.title);
	        databack.imagesHTML += html;
	      }
	      databack.imagesHTML += '</ul>';
	    }
	    if(typeof o.bossresponse.news !== 'undefined' && o.bossresponse.news.count>0){
	      databack.news = [];
	      databack.newsHTML = '<ul>';
	      for(var i=0,j=o.bossresponse.news.count;i<j;i++){
	        var item = o.bossresponse.news.results[i];
	        databack.news.push(
	          {
	            abstract:item.abstract,
	            title:item.title,
	            url:item.clickurl,
	            language:item.language,
	            source:item.source,
	            sourceurl:item.sourceurl
	          }
	        );
	        var html = config.newsItemHTML.replace('{language}',item.language);
	        html = html.replace('{clickurl}',item.clickurl);
	        html = html.replace('{abstract}',item.abstract);
	        html = html.replace('{title}',item.title);
	        html = html.replace('{source}',item.source);
	        html = html.replace('{sourceurl}',item.sourceurl);
	        databack.newsHTML += html;
	      }
	      databack.newsHTML += '</ul>';
	      
	    }

	     var htmlString = "";
        if ( databack.imagesHTML ) {
        	htmlString+=databack.imagesHTML; 
        }
        if ( databack.webHTML ) {
        	htmlString+=databack.webHTML; 
        }
        if ( databack.newsHTML ) {
        	htmlString+=databack.newsHTML; 
        }
        //alert(o.query.name.toLowerCase()+"    "+_queries[ o.query.name.toLowerCase()])
        _queries[ o.query.name.toLowerCase() ].htmlString = htmlString;
        if(_queries[ o.query.name.toLowerCase() ].started) {
        	startContainer(_queries[ o.query.name.toLowerCase() ].container,o.query.name.toLowerCase())
        }
      },
      config = {
    		    webItemHTML:'<li><a href="{clickurl}">{title}</a><p>{abstract}</p></li>',
    		    newsItemHTML:'<li lang="{language}"><a href="{clickurl}">{title}</a><p>{abstract} ({source})</p></li>',
    		    imageItemHTML:'<li><a href="{url}"><img src="{thumbnail}" width="{thumbnailwidth}" height="{thumbnailheight}"></a></li>'
    		  },
   clean =  function(s) {
  	    return encodeURIComponent(s);
    },
    
    startContainer = function (container,query) {
    	container.innerHTML = _queries[query].htmlString;
    	container.style.display = "inline"
    }
    ;
     // logger.log("TOTO");
  /**
   * LastFM popcorn plug-in
   * Appends information about a LastFM artist to an element on the page.
   * Options parameter will need a start, end, target, artist and apikey.
   * Start is the time that you want this plug-in to execute
   * End is the time that you want this plug-in to stop executing
   * Artist is the name of who's LastFM information you wish to show
   * Target is the id of the document element that the images are
   *  appended to, this target element must exist on the DOM
   * ApiKey is the API key registered with LastFM for use with their API
   *
   * @param {Object} options
   *
   * Example:
     var p = Popcorn('#video')
        .yahooboss({
          start:          5,                                    // seconds, mandatory
          end:            15,                                   // seconds, mandatory
          query:         'yacht',                              // mandatory
          target:         'lastfmdiv',                          // mandatory
          apikey:         '1234567890abcdef1234567890abcdef'    // mandatory
        } )
   *
   */
      Popcorn.plugin( "yahooboss", {
    	
    	  manifest: {
    	  about:{
          name: "Popcorn YahooBoss Plugin",
          version: "0.1",
          author: "Florent Berenger",
          website: "http://www.lesmecaniques.net"
        },
        options: {
          start: {
            elem: "input",
            type: "text",
            label: "In"
          },
          end: {
            elem: "input",
            type: "text",
            label: "Out"
          },
          target: "yahooboss-container",
          query: {
            elem: "input",
            type: "text",
            label: "Query"
          } ,
          searchtype: {
            elem: "input",
            type: "text",
            label: "Type : web,news,images"
          }
        }
        },
    	

      _setup: function( options ) {
    	options._container = document.createElement( "div" );
        options._container.style.display = "none";
        options._container.innerHTML = "";
        options.query = options.query && options.query.toLowerCase() || "";
        
        options.searchtype = (options.searchtype && options.searchtype.length>0)?options.searchtype : "images,web,news";

        var target = document.getElementById( options.target );

        if ( !target && Popcorn.plugin.debug ) {
          throw new Error( "target container doesn't exist" );
        }
        target && target.appendChild( options._container );
        if ( !_queries[ options.query ] && options.query.length>0 ) {

          _queries[ options.query ] = {
            count: 0,
            htmlString: "loading ...",
            searchtype : options.searchtype,
            started: false,
            //container: options._container
            container: target
          };
          target.innerHTML = "loading.."+options.query;
          var APIurl = 'http://www.lesmecaniques.net/labex/yahooboss.php?q=' + clean(options.query)+"&type="+clean(options.searchtype)+"&callback=jsonp";
          Popcorn.getJSONP( APIurl, function( data ) {
        	    data.query={};
        	    data.query.name = options.query;
                yahooBossCallback(data);
            });

        }
        _queries[ options.query ].count++;

      },
      
     
      /**
       * @member LastFM
       * The start function will be executed when the currentTime
       * of the video  reaches the start time provided by the
       * options variable
       */
      start: function( event, options ) {
    	_queries[ options.query ].started = true;
    	startContainer(options._container,options.query);
        //options._container.innerHTML = _queries[ options.query ].htmlString;
        //options._container.style.display = "inline";
      },
      /**
       * @member LastFM
       * The end function will be executed when the currentTime
       * of the video  reaches the end time provided by the
       * options variable
       */
      end: function( event, options ) {
    	  _queries[ options.query ].started = false;
        options._container.style.display = "none";
        options._container.innerHTML = "";
      },
      _teardown: function( options ) {
        // cleaning possible reference to _artist array;
        --_queries[ options.query ].count || delete _queries[ options.query ];
        document.getElementById( options.target ) && document.getElementById( options.target ).removeChild( options._container );
      }
     });
})( Popcorn );
