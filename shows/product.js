function (doc, req) {

	var html = "<div id='product_page' data-role='page'>"+
					"<div data-role='header'>"+
            			"<h2 id='product_name'>"+ doc.name +"</h2>"+
					"</div>"+
					"<div id='product_details' data-role='content'>"+
						"<p>" + doc.type + "</p>" +
	                    "<p>" + doc.description + "</p>"+
	                    "<p>" + doc.price + "</p>"+
	                "</div>"+
					"<div data-role='footer' data-position='fixed'><h4>Made on a couch</h4></div>"+
				"</div>";
				
	return html;
}