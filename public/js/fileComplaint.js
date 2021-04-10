filesList = [];
filesListURL = [];
var tot = 0;
var index = 0;
function readURL(input) {
    if (input.files && input.files[0]) {
        input_filesList = [];
        for (const element in input.files) {
            input_filesList[element] = input.files[element];
        }
        console.log(input_filesList);
        console.log(input.files);
        index = parseInt($('.img-index').text());
        tot = parseInt($('.img-tot').text());
        filesList.splice.apply(filesList, [index, 0].concat(input_filesList));
        tot = filesList.length;
        // for (var i = 0; i < tot; i++) {
            // input.files[i] = filesList[i];
            // console.log('i=',i, input.files[i] , filesList[i], '***');
        // }
        // console.log('new input.files ==');
        // console.log(input.files);
        $('.img-index').text(index + 1);
        $('.img-tot').text(tot);
        j = 0;
        for (i = 0; i < input_filesList.length; i++) {
            var fileReader = new FileReader();
            fileReader.onload = async function (e) {

                filesListURL.splice(index, 0, e.target.result);
                // index=index+1;
                console.log(`j= ${j}`);
                if (j == input_filesList.length - 1) {
                    index = parseInt($('.img-index').text());
                    // console.log(index-1,filesListURL[index-1]);
                    $('.productImg').attr('src', filesListURL[index - 1]).width('100%').height('100%');
                }
                j++;
                index++;
            };

            fileReader.readAsDataURL(input.files[i]);
        }
    }
}
$('#img').change(function () {
    console.log('*************');
    console.log($(this).val());
    readURL(this);
    console.log("after fun call");
})

$(".img-left").click(
    function (event) {
        event.preventDefault();
    }
);
$(".img-right").click(
    function (event) {
        event.preventDefault();
    }
);

$(".img-right").click(function () {
    index = parseInt($('.img-index').text());
    if (index < tot) {
        index = index + 1;
        $('.productImg').attr('src', filesListURL[index - 1]).width('100%').height('100%');
    }
    $('.img-index').text(index);
});
$(".img-left").click(function () {
    index = parseInt($('.img-index').text());
    if (index > 1) {
        index = index - 1;
        $('.productImg').attr('src', filesListURL[index - 1]).width('100%').height('100%');
    }
    $('.img-index').text(index);
});

$('.del-img').click(
    function (event) {
        event.preventDefault();
        index = parseInt($('.img-index').text());
        tot = parseInt($('.img-tot').text());
        if (tot > 0) {
            filesList.splice(index - 1, 1);
            filesListURL.splice(index - 1, 1);
            tot = tot - 1;
            $('.img-tot').text(tot);
            if (tot == 0) {
                index = 0;
                $('.productImg').attr('src', '');
                $('.img-index').text(index);
            }
            else {
                if (index == tot + 1) {
                    index = index - 1;
                }
                $('.productImg').attr('src', filesListURL[index - 1]).width('100%').height('100%');
                $('.img-index').text(index);

            }
        }
    });















// filesList=[];
// var tot=0;
// var index=0;
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


// // $(document).ready(function () {
// //     var options = {
// //         beforeSubmit: showRequest,// pre-submit callback 
// //         success: showResponse // post-submit callback 
// //     }; // bind to the form's submit event 
// //     $('#frmUploader').submit(function () {
// //         $(this).ajaxSubmit(options); // always return false to prevent standard browser submit and page navigation 
// //         return false;
// //     });
// // }); // pre-submit callback 
// // function showRequest(formData, jqForm, options) { alert('Uploading is starting.'); return true; } // post-submit callback 
// // function showResponse(responseText, statusText, xhr, $form) {
// //     alert('status: ' + statusText + '\n\nresponseText: \n' + responseText);
// // }



// // $(document).ready(function () {
// //     console.log('helloooo');
// //     var options = {
// //         beforeSubmit: showRequest, // pre-submit callback 
// //         success: showResponse // post-submit callback 
// //     }; // bind to the form's submit event 
// //     $('#product-form-id').submit(function () { $(this).ajaxSubmit(options); // always return false to prevent standard browser submit and page navigation 
// //         return false;
// //      }); 
// // });
// // // pre-submit callback 
// // function showRequest(formData, jqForm, options) { alert('Uploading is starting.'); return true; }
// // // post-submit callback 
// // function showResponse(responseText, statusText, xhr, $form) { alert('status: ' + statusText + '\n\nresponseText: \n' + responseText ); }





