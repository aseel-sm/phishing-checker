$(document).ready(function () {
  $("#chk-btn").click(() => {
    let url = $("#ip-domain").val();
    console.log(url);

    $.ajax({
      type: "POST",
      url: "/predict",
      data: JSON.stringify(url),
      contentType: "application/json",
      success: function (data) {
        let btn = "<button class='btn btn-success'>Good</button>";
        if (data["op"] == "bad") {
          color = "<button class='btn btn-danger'>Bad</button>";
        }

        $("#result").append(btn);
        if (data["op"] == "bad") {
          let payload = { url: url };
          console.log(JSON.stringify(payload));
          $.ajax({
            type: "POST",
            dataType: "json",
            cors: true,
            url: `https://api.geekflare.com/dnsrecord`,
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
            data: JSON.stringify({
              url: "https://www.ezeephones.com/",
            }),
            contentType: "application/json",
            success: function (res) {
              console.log(res);
            },
          });
        }
      },
    });
  });
});
