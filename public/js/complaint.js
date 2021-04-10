// filesList=[];

// $('.productImg').attr('src', "/product_images/<%= product._id %>/<%= product.image[index] %>").width('100%').height('100%');
                    
var hlo=$('.data').text();
console.log(hlo);
var tot=0;
var index;
$( ".img-left" ).click(function() {
    index=parseInt($('.img-index').text());
    if(index>1){
        $('.productImg').attr('src', "/product_images/<%= product._id %>/<%= product.image['0'] %>").width('100%').height('100%');
    }
  });
// function readURL(input) {
//     if (input.files && input.files[0]) {
//         // console.log("input:");
//         // console.log(input);
//         // console.log("typeof");
//         // console.log(typeof input.files, input.files.length);
//         input_filesList = [];
//         console.log("input.files:");
//         console.log(input.files);
//         for(const element in input.files){
//             input_filesList[element]= input.files[element];
//         }
//         console.log(input_filesList);
//         // console.log("input.files[0]:");
//         // console.log(input.files[0]);
//         var fileReader = new FileReader();
//         fileReader.onload = function (e) {
//             index=parseInt($('.img-index').text());
//             tot=parseInt($('.img-tot').text());
//             // filesList.insertAt(index,input_filesList);
//             // filesList=
//             filesList.splice.apply(filesList,[index,0].concat(input_filesList));
//             tot=filesList.length;
//             console.log("filesList:");
//             console.log(filesList);
//             console.log('aq');
//             console.log(filesList[0]);
//             console.log('aq');
//             console.log(filesList['0']);
//             // filesList.append(input.files);
//             // console.log("e:");
//             // console.log(e);
//             console.log("e.target:");
//             console.log(e.target);
//             console.log('e.target.result');
//             console.log(e.target.result);
            
//             console.log('filesList[index]',index ,typeof index);
//             console.log(filesList[index]);
//             console.log(filesList[index].name);
//             // $('.productImg').attr('src', filesList[index]).width('100%').height('100%');
//             $('.productImg').attr('src', e.target.result).width('100%').height('100%');
//         }

//         fileReader.readAsDataURL(input.files[0]);
//     }
// }
// $('#img').change(function () {
    
//     readURL(this);
//     // console.log("after fun call");
// })



$(document).ready(function () {
    console.log('helloooo');
    // var options = {
    //     beforeSubmit: showRequest, // pre-submit callback 
    //     success: showResponse // post-submit callback 
    // }; // bind to the form's submit event 
    // $('#product-form-id').submit(function () { $(this).ajaxSubmit(options); // always return false to prevent standard browser submit and page navigation 
    //     return false;
    //  }); 
});
