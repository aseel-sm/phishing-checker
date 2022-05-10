$(document).ready(function () {
  $("#loading").hide();
  $("#chk-btn").click(() => {
    $("#loading").show();
    $("#result").html("<p><p>");
    $("#remedy-list").html("<p><p>");
    let url = $("#ip-domain").val();
    console.log(url);

    $.ajax({
      type: "POST",
      url: "/predict",
      data: JSON.stringify(url),
      contentType: "application/json",
      success: function (data) {
        $("#loading").hide();
        let btn = "<button class='btn btn-success'>Good</button>";
        if (data["op"] == "bad") {
          btn = "<button class='btn btn-danger'>Bad</button>";
        }
        let ip;
        console.log(data);
        $("#result").append(btn);
        let links = data["links"];

        console.log(links.length);
        if (data["op"] == "bad") {
          for (let i = 0; i < links.length; i++) {
            $("#remedy-list").append(
              " <li class='list-group-item'>" + links[i] + "</li>"
            );
            console.log(links[i]);
            if (i > 10) {
              break;
            }
          }
          console.log("t", url);
          $.ajax({
            url: "https://api.geekflare.com/dnsrecord",
            type: "POST",
            data: JSON.stringify({ url: url }),
            dataType: "jsonp",
            headers: {
              "x-api-key": "53401fd5-1dd3-479c-9826-e949598451ab",
            },
            success: function (result) {
              console.log(JSON.stringify(result));
            },
          });
        }
      },
    });
  });
});
