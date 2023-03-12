export function search()
{
    var query = document.getElementById('search-bar').value;
    var link = 'https://74k4v7u3g3u4pbd362visxgvwu0eowzx.lambda-url.us-east-1.on.aws/?search_string='+query;
    $.ajax({
        type: 'GET',
        url: link,
        success: function(data){
            initializeProductList(products)
        },
        error: function () {
            alert("The connection to the server failed. Check permissions and try again.");
        }
    });
}

function initializeProductList(products)
{
    var ol = document.getElementById("prod-list");
    for(var i = 0; i < products.length; i++)
    {
        var li = document.createElement("li");
        li.setAttribute('id', products[i]);
        li.appendChild(document.createTextNode(products[i]));
        ol.appendChild(li);
    }
}
