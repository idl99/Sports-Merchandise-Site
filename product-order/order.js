var modal = document.getElementById("modal-order-confirmation");
var orderFormFields = document.querySelectorAll(".order-form-field");
var productTypeDropdowns = document.getElementsByClassName("dropdown-select-product-type");
var productSizeDropdowns = document.getElementsByClassName("dropdown-select-product-size");
var summaryBody = document.getElementById("order-summary");

function isAllFieldsChosen(){

    var isAllProductTypesChosen = false;

    var isAllProductSizeChosen = false;

    for(let i=0; i<productTypeDropdowns.length; i++){
        console.log(productTypeDropdowns);
        if(productTypeDropdowns[i].value!="-Select your desired merchandise item-") isAllProductTypesChosen = true;
        else isAllProductTypesChosen = false;
    }

    for(let i=0; i<productSizeDropdowns.length; i++){
        if(productSizeDropdowns[i].value!="-Select item size-") isAllProductSizeChosen = true;
        else isAllProductTypesChosen = false;
    }

    let submitFormButton = document.getElementById("btnSubmitForm");

    if(isAllProductTypesChosen && isAllProductSizeChosen)
        submitFormButton.disabled = false;
    else if(!isAllProductTypesChosen || !isAllProductSizeChosen) submitFormButton.disabled = true;
};

function processOrder() {
    let order = getOrder();
    showOrderConfirmation(order);
}

function getOrder() {
 
    let arrOfProducts = [];
    for(let i=0; i<productTypeDropdowns.length; i++){
        arrOfProducts.push(productTypeDropdowns[i].value);
    }

    // Getting list of Product Sizes
    let arrOfProductSizes = [];
    for(let i=0; i<productSizeDropdowns.length; i++){
        arrOfProductSizes.push(productSizeDropdowns[i].value);
    }

    // Getting list of Item Quantities
    let itemQtyFields = document.getElementsByClassName("textfield-item-quantity");
    let arrOfItemQtys = [];
    for(let i=0; i<itemQtyFields.length; i++){
        arrOfItemQtys.push(itemQtyFields[i].value);
    }

    return getListOfOrderItems(arrOfProducts,arrOfProductSizes,arrOfItemQtys);

}

function getListOfOrderItems(productsAry, productSizesAry, itemQtyAry){
    // A function to get a list of order products and their details
    let listOfOrderItems = [];
    for(let i=0; i<productsAry.length;i++){
        listOfOrderItems.push(
            {
                'quantity':itemQtyAry[i],
                'item':productSizesAry[i] + " " + productsAry[i],
                'cost':Number(productsAry[i].split(":")[1].replace('$',''))*itemQtyAry[i]
            }
        );
    }

    return listOfOrderItems;

}

function showOrderConfirmation(order) {
    modal.style.display = "block";

    let template = document.getElementById("template-summary-data");
    let item_template = document.importNode(template.content, true);

    var total = 0;

    for(let i = 0; i < order.length; i++){
        let item = order[i];
        let row = item_template.cloneNode(true);
        row.querySelector(".quantity").innerHTML = item.quantity;
        row.querySelector(".item").innerHTML = item.item;
        row.querySelector(".cost").innerHTML = item.cost;
        total += item.cost;
        summaryBody.appendChild(row);
    }

    document.getElementById("grandTotal").innerHTML = total;

}

function resetOrderSummary() {
    summaryBody.querySelectorAll(".order-item").forEach(function (item) {
        summaryBody.removeChild(item);
    })
}

function closeOrderModal() {
    resetOrderSummary();
    modal.style.display = "none";
}

/*
* ==================================================
*                   FORM CONTROLS
* ==================================================
* */
function bindItemSizes(node) {
    node.parentElement.getElementsByClassName('dropdown-select-product-size')[0].innerHTML =
    '<option disabled selected>-Select item size-</option>' +
    '<option>Small</option>' +
    '<option>Medium</option>' +
    '<option>Large</option>' +
    '<option>XL</option>';
}

function addNewOrderItem(node) {
    if(productTypeDropdowns.length==5){
        alert("Maximum number of product items selected");
    } else{
        let to_append = node.parentElement.cloneNode(true);
        to_append.querySelector(".textfield-item-quantity").value = 1;
        node.parentElement.parentElement.appendChild(to_append);
    }
}

function removeOrderItem(node) {
    node.parentElement.parentElement.removeChild(node.parentElement);
}