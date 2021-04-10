// const products = require('./models/products');
// const users = require('./models/users');
const userId = $('#user-id').text();
let user;
// async function getUser() {
//     user = await users.findById(userId);
// }

$(document).ready(function () {
    $('.product-link').each(function(index){
        let pid=$(this).attr('id');
        // console.log($(this));
        console.log('ko');
        // console.log($(this).children('div.content').children('div.others').children('span.others-right').children('#addToCart').text());
        $(this).children('div.content').children('div.others').children('span.others-right').children('.addToCart').click(
            function(event){
                event.preventDefault();
                event.stopPropagation();
                console.log($);
                console.log($(this));
                // $.get(`/sellItem`);
                // $(this).post(`/addToCart/${pid}`);
            }
        )
    });
    // getUser();
    // console.log(user);
    // $(".addToCart").each(function (index) {
    //     // let pid=$(this).id;
    //     console.log($(this));
    //     $(this).click(
    //         let 
    //         function (event) {
                
    //             event.preventDefault();
    //             event.stopPropagation();
    //             $.post( `/addToCart/$(this)` , productData, result => {
    //                 console.log("Response from Node : ", result)
    //             })
    //             // user.update(
    //             //     { $addToSet: { cart: $(this).id } }
    //             // );
    //             // user.cart.push($(this).id);

    //             // console.log(index + ": " + $(this).attr('id'));
    //             // console.log($(this));
    //         }
    //     );
    // });
    // console.log("ready!");
});