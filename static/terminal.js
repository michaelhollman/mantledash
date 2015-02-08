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
  commands= {
    echo: function(a) {
      this.echo(a);
    }
  };

  // Initialize terminal
  $('#terminal').terminal(commands, {
    greetings: greetings,
    name: 'MantleDash_Terminal',
    height: 150,
    prompt: 'i4o> '
  });
  // Hide terminal by default
  $('#terminal').toggle();
  // Toggle terminal on with press of 'ESC'
  $(document).keydown(function(e) {
    if(e.which === 27) {
      $('#terminal').toggle();
    }
  })
});
