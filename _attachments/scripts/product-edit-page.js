var ProductEditPageController = function() {

    var editableProduct;

    function handleEditPageViewHide()
    {
        $("#cancelButton").die( "click", handleCancelEdit );
        $("#cancelBackButton").die( "click" );
        $("#submitButton").die( "click" );
        editableProduct = null;

        var docId = $("#productform").data("identity");
        var pageCache =  $(document.getElementById("_show/product-edit/" + docId));
        pageCache.unbind( "pagehide", handleEditPageViewHide );
        pageCache.empty();
        pageCache.remove();
    }

    function handleEditView()
    {
        // Watch for bound hide of page to clear from cache.
        var docId = $("#productform").data("identity");
        var productPage = $(document.getElementById("_show/product-edit/" + docId));
        productPage.bind( "pagehide", handleEditPageViewHide );

        storeUneditedDocument();
    }

    function navigateToProductPage( docId )
    {
        $.mobile.changePage( "_show/product/" + docId, "slide", true, true );
    }

    function storeUneditedDocument()
    {
        var name = $("input#nameField").val();
        var type = $("input#typeField").val();
        var description = $("textarea#descriptionField").val();
        editableProduct = {name:name, type:type, description:description};
    }

    function saveDocument( document )
    {
        $db.saveDoc( document, {
            success: function( response )  {
                updateEditableProduct( document );
                navigateToProductPage( document._id );
            },
            error: function() {
                alert( "Cannot save document: " + document._id );
            }
        });
    }

    function updateEditableProduct( document )
    {
        editableProduct.name = document.name;
        editableProduct.type = document.type;
        editableProduct.description = document.description;
    }

    function revertEdits()
    {
        $("input#nameField").val( editableProduct.name );
        $("input#typeField").val( editableProduct.type );
        $("textarea#descriptionField").val( editableProduct.description );
    }

    function handleCancelEdit()
    {
        revertEdits();
        var docId = $("#productform").data("identity");
        navigateToProductPage( docId );
    }

    return {
        initialize: function() {
            $("#cancelButton").live( "click", handleCancelEdit );
            $("#cancelBackButton").live( "click", function( event ) {
                event.preventDefault();
                handleCancelEdit();
                return false;
            });
            $("#submitButton").live( "click", function( event ) {
                var docId = $("#productform").data("identity");
                $db.openDoc( docId, {
                    success: function( document ) {
                        document.name = $("input#nameField").val();
                        document.type = $("input#typeField").val();
                        document.description = $("textarea#descriptionField").val();
                        saveDocument( document );
                    },
                    error: function() {
                        alert( "Cannot open document: " + docId );
                    }
                });
            });
            $("div[data-role='page']").live( "pageshow", function() {
                $("div[data-role='page']").die( "pageshow" );
                handleEditView();
            });
        }
    };
}();

function handleEditPageReady()
{
    ProductEditPageController.initialize();
}
$().ready( handleEditPageReady )