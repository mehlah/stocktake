function (doc, req) {
    var Mustache = require("vendor/couchapp/lib/mustache");
    var stash = {
            name: doc.name,
            type : doc.type,
            description: doc.description,
            price: doc.price,
            document: doc._id
    };
    return Mustache.to_html(this.templates.product_edit, stash, this.templates.partials.product_edit);
}