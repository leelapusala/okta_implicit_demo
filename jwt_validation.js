var accessToken = signIn.tokenManager.get('access_token').accessToken
var idToken = signIn.tokenManager.get('id_token').idToken


$(document).ready(function () {
    console.log("ready!");
    $("#idTokenText").val(idToken)
    $("#accessTokenText").val(accessToken)

    $("#accessTokenButton").click(function () {
        $.ajax({
            url: "/accessToken/validate", beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + $('#accessTokenText').val());
            }, 
            success: function (result) {
                $("#accessTokenResult").html(result);
            }
        });
    });


    $("#idTokenButton").click(function () {
        $.ajax({
            url: "/idToken/validate",
            data: { id_token: $('#idTokenText').val() }, success: function (result) {
                $("#idTokenResult").html(result);
            }
        });
    });

});
