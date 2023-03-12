export function search()
{
    resetProductPanel()
    modifyLoadingPanel("1) Searching for products...")
    var query = document.getElementById('search-bar').value;
    var link = 'https://74k4v7u3g3u4pbd362visxgvwu0eowzx.lambda-url.us-east-1.on.aws/?search_string='+query;
    $.ajax({
        type: 'GET',
        url: link,
        success: function(data){
            initializeProductList(data)
            getProductInfo(data)
        },
        error: function () {
            alert("The connection to the server failed. Check permissions and try again.");
        }
    });
}

function resetProductPanel()
{
    var panel = document.getElementsByClassName("ProductPanel")[0]
    panel.remove()

    var newPanel = document.createElement("div")
    newPanel.setAttribute("class", "ProductPanel")
}

function getProductInfo(products)
{
    modifyLoadingPanel("2) Products found, running analysis...")
    for(var i = 0; i < products.length; i++)
    {
        var link = 'https://ltkneyupgtn5qppfgm75aaxbdu0ggcva.lambda-url.us-east-1.on.aws/?store=amazon&product='+products[i];
        executeSingleSearch(link)
    }
}

function executeSingleSearch(link) {
    $.ajax({
        type: 'GET',
        url: link,
        success: function(data){
            populateProduct(data)
        },
        error: function () {
            alert("The connection to the server failed. Check permissions and try again.");
        }
    });
}

function modifyLoadingPanel(loadText)
{
    var load = document.getElementById("loadText")
    load.innerHTML = loadText
}

function populateProduct(productInfo)
{
    console.log(productInfo)
    var img = document.getElementById(productInfo["product_id"]+'-img')
    img.setAttribute('src', productInfo["product_image"])

    var p = document.getElementById(productInfo["product_id"]+'-p')
    p.innerText = "Title: " + productInfo["product_name"] + "\nOriginal Score: " + productInfo["original_rating"] + "\nScout Score: " + productInfo["scout_rating"] + "\nCategory: " + productInfo["score_category"]
    
    var a = document.getElementById(productInfo["product_id"]+'-a')
    a.appendChild(document.createTextNode("Go to product page"))
    a.title = "Go to product page"
    a.href = "https://www.amazon.com/dp/" + productInfo["product_id"]
}

function initializeProductList(products)
{
    console.log(products)
    var prodPanel = document.getElementsByClassName("ProductPanel")[0]
    for(var i = 0; i < products.length; i++)
    {
        var div = document.createElement("div");
        div.setAttribute('id', products[i]);

        var img = document.createElement("img")
        img.setAttribute('id', products[i]+'-img')

        var p = document.createElement("p")
        p.setAttribute('id', products[i]+'-p')

        var a = document.createElement("a")
        a.setAttribute('id', products[i]+'-a')

        var hr = document.createElement("hr")

        div.appendChild(img);
        div.appendChild(p);
        div.appendChild(a);
        div.appendChild(hr);
        prodPanel.appendChild(div);
    }
}

window.search = search;
