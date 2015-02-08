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

  var user = "i4o";
  commands= {
    "alert": function(img, text) {
      socket.emit('alert', {img: img, text: text});
    },
    "chat": function(a){
      socket.emit('chat', user + "> " + a);
    },
    "user": function(a){
      user = a;
      t.set_prompt(user + "> ");
    },
    "help": function() {
      t.echo("alert http://url.com/path/to/img.gif \"My subtitle\"");
      t.echo("chat \"My chat message\"");
      t.echo("user username");
    }
  };

  // Initialize terminal
  t = $('#terminal').terminal(commands, {
    greetings: greetings,
    name: 'MantleDash_Terminal',
    height: 150,
    prompt: "i4o> "
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
