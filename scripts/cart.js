function calculateTotal(){
    $('#total').text(parseInt($('#item-quantity').text())*parseInt($('#item-price').text()))
}

$(function(){
    calculateTotal()
    $('#increment').on('click',function(){
        quantity = parseInt($('#item-quantity').text())
        quantity++
        $('#item-quantity').text(quantity)
        calculateTotal()
    })
    $('#decrement').on('click',function(){
        quantity = parseInt($('#item-quantity').text())
        if(quantity>0)
            quantity--
        $('#item-quantity').text(quantity)
        calculateTotal()
    })
})