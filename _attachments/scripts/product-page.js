var ProductPageController = function() {

    function handleView() {
        // Watch for bound hide of page to clear from cache.
        var docId = $("#product_details").data("identity");
        var productPage = $(document.getElementById("_show/product/" + docId));
        productPage.bind( "pagehide", handlePageViewHide );
    }

    function handlePageViewHide() {
        var docId = $("#product_details").data("identity");
        var productPageCache =  $(document.getElementById("_show/product/" + docId));
        productPageCache.unbind( "pagehide", handlePageViewHide );
        productPageCache.empty();
        productPageCache.remove();
    }

    return {
        initialize : function() {
            $("div[data-role='page']").live( "pageshow", function() {
                $("div[data-role='page']").die( "pageshow" );
                handleView();
            });
        }
    };
}();

function handlePageViewReady() {
    ProductPageController.initialize();
}

$().ready( handlePageViewReady );