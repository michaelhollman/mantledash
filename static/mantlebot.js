var mantlebot = {};

$(function(){

    var playdoh = function(text) {
        text = text.replace('@mantlebot', '');

        var buzzWords = [
            "[Cc]loud",
            "[Dd]ata",
            "[Bb]usiness",
            "[Ll]eadership",
            "[Ss]ynergy",
            "[Ll]everage"
        ];
        var flag = false;
        buzzWords.forEach(function(word) {
            var match = text.match(word);
            if(match !== null) {
                flag = flag || (text !== null);
                text = text.replace(new RegExp(match, 'g'), 'playdoh');
            }
        });

        if(flag) {
            return [{
                "command": "chat",
                "emit": "][[gib;yellow;]mantlebot" + "> Did you mean:" + text + "?"
            }];
        }
        return [];
    };

    var listeners = [
        playdoh
    ];

    var respond = function(msg) {
        if(msg.match('^@mantlebot') !== null) {
            listeners.forEach(function(get_responses) {
                var responses = get_responses(msg);
                responses.forEach(function(resp) {
                    socket.emit(resp['command'], resp['emit']);
                });
            });
        }
    };

    mantlebot.respond = respond;
});