/**
 * Created by Paul Poulsen on 2/5/2015.
 */

var greetings = "   *                           (                   \n\
 (  `                 ) (      )\\ )             )\n\
 )\\))(     )       ( /( )\\  ( (()/(     )    ( /(\n\
((_)()\\ ( /(  (    )\\()|(_)))\\ /(_)) ( /( (  )\\())\n\
(_()((_))(_)) )\\ )(_))/ _ /((_|_))_  )(_)))\\((_)\\\n\
|  \\/  ((_)_ _(_/(| |_ | (_))  |   \\((_)_((_) |(_)\n\
| |\\/| / _` | ' \\))  _|| / -_) | |) / _` (_-< ' \\\n\
|_|  |_\\__,_|_||_| \\__||_\\___| |___/\\__,_/__/_||_|\n";

$(function() {
  var t;

  var user = "md";
  commands= {
    "alert": function(title, text, type) {
      socket.emit('alert', {title: title, text: text, type: type});
    },
    "gif": function(img, text, size) {
      socket.emit('gif', {img: img, text: text, size: size});
    },
    "chat": function(a){
      socket.emit('chat', user + "> " + a);
        mantlebot.respond(a);
    },
    "user": function(a){
      user = a;
      t.set_prompt(user + "> ");
    },
    "help": function() {
      t.echo("alert \"My Title\" \"My text\" [warning|error|success|info]");
      t.echo("gif http://url.com/path/to/img.gif \"My subtitle\" 300x500");
      t.echo("chat \"My chat message\"");
      t.echo("user username");
    }
  };

  // Initialize terminal
  t = $('#terminal').terminal(commands, {
    greetings: greetings,
    name: 'MantleDash_Terminal',
    height: 150,
    prompt: "md> "
  });
  // Hide terminal by default
  $('#terminal').toggle();
  // Toggle terminal on with press of 'ESC'
  $(document).keydown(function(e) {
    if(e.which === 27) {
      $('#terminal').toggle();
    }
  })

  socket.on('chat', function(msg) {
    t.echo("[[;teal;]" + msg + "]");
  });

});
