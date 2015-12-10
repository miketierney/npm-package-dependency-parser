$(function(){
  $("#inputForm").on("submit", function(evt) {
    var _input, _json, $output, $ul;
    evt.preventDefault();

    _input = $("#input").val();
    $output = $("#output");
    $ul = $("<ul/>");

    $output.empty();
    $output.append($ul);

    if (_input) {
      _json = JSON.parse(_input);
    }

    $output.prepend($("<p />", {
      html: _json.name + "@" + _json.version,
    }));
    parseAndWrite(_json.dependencies, $ul);
  });

  function parseAndWrite(json, $target) {
    $.each(json, function (k, v) {
      var $node, $ul, $content, text;

      if (v.pkgMeta) { // Bower support
        v.version = v.pkgMeta.version;
        v.homepage = v.pkgMeta.homepage;
      }

      text = k + "@" + v.version;

      if (v.homepage) {
        $content = $("<a />", {
          text: text,
          href: v.homepage,
        });
      } else {
        $content = text;
      }

      $node = $("<li />", {
        html: $content,
      });

      if (v.dependencies) {
        $ul = $("<ul />");

        parseAndWrite(v.dependencies, $ul);
        $node.append($ul);
      }

      $target.append($node);
    });
  }
});
