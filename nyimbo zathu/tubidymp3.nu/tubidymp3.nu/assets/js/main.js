$(document).ready(function() {
    $(".basicAutoComplete").autoComplete({
        resolver: "custom",
        events: {
            search: function(a, b, c) {
                $.ajax({
                    url: "https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&q=" + a,
                    type: "GET",
                    dataType: "jsonp",
                    success: function(a) {
                        b(a[1].map(function(a) {
                            return a[0]
                        }))
                    },
                    error: function(a, b, c) {
                        console.log(a, b, c)
                    }
                })
            },
            select: function(a, b) {
                console.log(a, b)
            }
        }
    }), $(".basicAutoComplete").on("autocomplete.select", function(a, b) {
        $(this).closest('form').submit();
    })
})