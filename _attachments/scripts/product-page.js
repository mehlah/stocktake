var ProductPageController = function() {

    function handleView()
    {
        $("#editbutton").live( "click", handleEdit );

        // Watch for bound hide of page to clear from cache.
        var docId = $("#product_details").data("identity");
        var productPage = $(document.getElementById("_show/product/" + docId));
        productPage.bind( "pagehide", handlePageViewHide );
    }

    function handleEdit( event )
    {
        // Prevent default link event.
        event.preventDefault();
        // Access document id from data-identity.
        var docId = $("#product_details").data("identity");
        // Change page.
        $.mobile.changePage( "_show/product-edit/" + docId, "slide", false, true );
        return false;
    }

    function handlePageViewHide()
    {
        $("#editbutton").die( "click", handleEdit );

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

function handlePageViewReady()
{
    ProductPageController.initialize();
}
$().ready( handlePageViewReady );