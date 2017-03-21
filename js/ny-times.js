/* Initialize API key */
var apikey = '5d1ef0ce5f6c4598bf96e86294c9108c';

/* Initialize variables */     
var search_term;
var numOfRecords;
var startYear;
var endYear;

$("#clearBtn").on("click", function (){
    console.log("Button triggers");
    $("#searchTerm").val("");
    $("#numRecordsSelect").val("");
    $("#startYear").val("");
    $("#endYear").val("");

});

$("#searchBtn").on("click", function () {

    /* Grabs the values of the inputs */
    search_term = $("#searchTerm").val();
    startYear = $("#startYear").val();
    endYear = $("#endYear").val();
    numOfRecords = $("#numRecordsSelect").val();


    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    /* Conditionals to make year filters optional */
    if ((startYear != "") && (endYear != "")){
        url += '?' + $.param({
            'api-key': "5d1ef0ce5f6c4598bf96e86294c9108c",
            'q': search_term,
            'begin_date': startYear + "0101",
            'end_date': endYear + "1231"
        })

    } else if((startYear == "")&&(endYear != "")){
        url += '?' + $.param({
            'api-key': "5d1ef0ce5f6c4598bf96e86294c9108c",
            'q': search_term,
            'end_date': endYear + "1231"
        })

    } else if ((startYear != "")&&(endYear == "")){
        url += '?' + $.param({
            'api-key': "5d1ef0ce5f6c4598bf96e86294c9108c",
            'q': search_term,
            'begin_date': startYear + "0101"
        })

    } else if ((startYear == "")&&(endYear == "")){
        url += '?' + $.param({
            'api-key': "5d1ef0ce5f6c4598bf96e86294c9108c",
            'q': search_term
        })

    };

    /* AJAX call to New York Times API */
    $.ajax({
         url: url,
         method: "GET"
    }).done(function(response) {

        console.log(response); 

        $("#searchParam").empty().append($("<div>").addClass("col-sm-12").attr("id","indResults"));

        $("#indResults")
          .append($("<div>")
            .addClass("panel panel-primary").attr("id","resultsPanel")

          .append($("<div>")
            .addClass("panel-heading")
              .html('<h3 class="panel-title"><strong>Top Article\'s</strong></h3>'))

          .append($("<div>")
            .addClass("panel-body")
              .append($("<ol>")
                .attr("id","resultsList"))
        ));

    /* Dynamically create results */
    for (var i = 0; i < numOfRecords; i++) {

        var headline = response.response.docs[i].headline.main;
        var articleLink = "<a href=response.response.docs[i].web_url>Read Full Article</a>";
                    
        /* Only some articles contain something byline, and then again only some of those contain something in original */
        if ((jQuery.isEmptyObject(response.response.docs[i].byline)== true)||(jQuery.isEmptyObject(response.response.docs[i].byline.original) == true)) {
            var onClick = response.response.docs[i].web_url;
            console.log(onClick);

            //Creates a new line in resultsList and inserts headline
            $("#resultsList")
                .append($("<div>")
                    .addClass("indResultDiv").attr("id","resultD_"+i)
                        .append($('<a href=' + onClick + ' target="_blank">')
                            .html("<li>"+headline)));

        } else {

            //Creates a new line in resultsList, inserts headline, and Author
            var onClick = response.response.docs[i].web_url;
            console.log(onClick);

            $("#resultsList")
                .append($("<div>")
                    .addClass("indResultDiv").attr("id","resultD_"+i)
                        .append($('<a href=' + onClick + ' target="_blank">')
                             .html("<li>"+headline)
                                .append($("<p>")
                                    .html(response.response.docs[i].byline.original))));
        }

      }

   });

});

