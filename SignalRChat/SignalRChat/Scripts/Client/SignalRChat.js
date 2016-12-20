$(function() {
    //Reference the auto-generated proxy for the hub.
    var chat = $.connection.chatHub;

    //create a function that the hub can call back to display messages.
    chat.client.addNewMessageToPage = function(name, message) {
        //add the message to the page
        $('#discussion').append('<li><strong>' + htmlEncode(name) +
                '</strong>: ' + htmlEncode(message) + '</li>');
    };

    //get the user name and store it to prepend to messages.
    $('#displayName').val(prompt('Enter your name: ', ''));
    //set initial focus to message input box
    $('#message').focus();
    //Start the connection
    $.connection.hub.start().done(function() {
            $('#sendMessage').click(function() {
                //call the send method on the hub
                chat.server.send($('#displayName').val(), $('#message').val());
                //clear text box and reset focus for the next comment
                $('#message').val('').focus();
             });
        });
});

//This optional function html-encodes messages for display in the page
function htmlEncode(value) {
    var encodedValue = $('<div/>').text(value).html();
    return encodedValue;
}
