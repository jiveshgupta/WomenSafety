$('.edit-user-details').click(
    function (event) {
    event.preventDefault();
    $('.edito').addClass('open-editor');
})
$('.cancel-edit').click(
    function (event) {
        event.preventDefault();
    $('.edito').removeClass('open-editor');
})
function readURL(input, output) {
    if (input.files && input.files[0]) {
        var fileReader = new FileReader();
        fileReader.onload = async function (e) {
            $(output).attr('src', e.target.result);
        };

            fileReader.readAsDataURL(input.files[0]);
    }
}
$('.edit-cover-pic').change(function () {

    readURL(this,'.cover-pic-editor');
})

$('.edit-display-pic').change(function () {

    readURL(this,'.display-pic-editor');
})


