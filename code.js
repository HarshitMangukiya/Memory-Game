$(document).ready(function () {
  var BoxOpened = "";
  var ImgOpened = "";
  var Counter = 0;
  var ImgFound = 0;

  var Source = "#boxcard";
  console.log(Source);

  var ImgSource = 48;

  var ImgSourceActual = [
    "images/card_1.png",
    "images/card_2.png",
    "images/card_3.png",
    "images/card_4.png",
    "images/card_5.png",
    "images/card_6.png",
    "images/card_7.png",
    "images/card_8.png",
    "images/card_9.png",
    "images/card_10.png",
    "images/card_11.png",
    "images/card_12.png",
    "images/card_13.png",
    "images/card_14.png",
    "images/card_15.png",
    "images/card_16.png",
    "images/card_17.png",
    "images/card_18.png",
    "images/card_19.png",
    "images/card_20.png",
    "images/card_21.png",
    "images/card_22.png",
    "images/card_23.png",
    "images/card_24.png",
  ];

  function RandomFunction(MaxValue, MinValue) {
    return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
  }

  function ShuffleImages() {
    var ImgAll = $(Source).children();
    var ImgThis = $(Source + " a:first-child");
    var ImgArr = new Array();

    for (var i = 0; i < ImgAll.length; i++) {
      ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
      ImgThis = ImgThis.next();
      console;
    }

    ImgThis = $(Source + " a:first-child");

    for (var z = 0; z < ImgAll.length; z++) {
      var RandomNumber = RandomFunction(0, ImgArr.length - 1);

      $("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
      ImgArr.splice(RandomNumber, 1);
      ImgThis = ImgThis.next();
    }
  }

  $("#Reset_btn").click(() => {
    console.log("hello reset");
    ShuffleImages();
    $(Source + " div img").hide();
    $(Source + " div").css("visibility", "visible");
    Counter = 0;
    $("#success").remove();
    $("#counter").html("" + Counter);
    BoxOpened = "";
    ImgOpened = "";
    ImgFound = 0;
    // return false;

    if (sessionStorage["playername"]) {
      let personName = sessionStorage.getItem("playername");
      $("#player").html("Player:" + personName);
    }
    let num_cards = sessionStorage.getItem("cards");
    ImgSource = num_cards;
    $(Source).empty();
    cardGenerator();
    console.log("gfg");
    $("#high_score").css("visibility", "hidden");
    $("#correct").css("visibility", "hidden");
  });

  function OpenCard() {
    var id = $(this).attr("id");

    if ($("#" + id + " img").is(":hidden")) {
      $(Source + " div").unbind("click", OpenCard);

      $("#" + id + " img").fadeIn(500);

      if (ImgOpened == "") {
        BoxOpened = id;
        ImgOpened = $("#" + id + " img").attr("src");
        setTimeout(function () {
          $(Source + " div").bind("click", OpenCard);
        }, 500);
      } else {
        CurrentOpened = $("#" + id + " img").attr("src");
        if (ImgOpened != CurrentOpened) {
          setTimeout(function () {
            $("#" + id + " img").fadeOut(500);
            $("#" + BoxOpened + " img").fadeOut(500);
            BoxOpened = "";
            ImgOpened = "";
          }, 500);
        } else {
          setTimeout(() => {
            $("#" + id + " img")
              .parent()
              .css("visibility", "hidden");
            $("#" + BoxOpened + " img")
              .parent()
              .css("visibility", "hidden");
            BoxOpened = "";
            ImgOpened = "";
          }, 500);
          ImgFound++;
        }
        setTimeout(function () {
          $(Source + " div").bind("click", OpenCard);
        }, 500);
      }
      Counter++;
      $("#counter").html("" + Counter);

      if (ImgFound == ImgSource) {
        var name = $("#player_name").val();
        setTimeout(function () {
          alert(name + " You win the Game....");

          $("#high_score").css("visibility", "visible");
          $("#correct").css("visibility", "visible");
          let high_score = parseFloat(
            5 * ImgSource + 500 / Counter + 5000 / (Counter * 500)
          ).toFixed(2);
          $("#high_score").html("High Score: " + high_score);
          let correct = ImgFound;
          $("#correct").html("Correct: " + correct);
        }, 1000);
        // $("#counter").prepend(
        //   '<span id="success">You Found All Pictues With </span>'
        // );
      }
    }
  }

  cardGenerator();

  function cardGenerator() {
    $("#high_score").css("visibility", "hidden");
    $("#correct").css("visibility", "hidden");

    ImgSource = parseInt(ImgSource / 2);
    let images = ImgSourceActual.slice(0, ImgSource);

    for (var y = 1; y < 3; y++) {
      for (const [index, item] of images.entries()) {
        var imagename = item.replace(/^.*[\\\/]/, "");
        $(Source).append(
          "<a href='#' class='grid-item' id=card" +
            y +
            index +
            "><img src=" +
            item +
            " alt=" +
            imagename +
            "  />"
        );
      }
    }
    $(Source + " a").click(OpenCard);
    ShuffleImages();
  }

  //click on save_settings
  $("#save_settings").click(function () {
    var name = $("#player_name").val();
    $("#player").html("Player:" + name);

    console.log("hello");
    var cards = $("#num_cards").val();
    ImgSource = cards;

    sessionStorage.setItem("playername", name);
    sessionStorage.setItem("cards", cards);

    // let personName = sessionStorage.getItem("playername");
    // let num_cards = sessionStorage.getItem("cards");

    $(Source).empty();
    cardGenerator();
  });

  //for newgame
  $("#newgame").click(() => {
    console.log("new game");
    ShuffleImages();
    $(Source + " div img").hide();
    $(Source + " div").css("visibility", "visible");
    Counter = 0;
    $("#success").remove();
    $("#counter").html("" + Counter);
    BoxOpened = "";
    ImgOpened = "";
    ImgFound = 0;

    $("#player").html("");
    $("#player_name").val("");
    $("#num_cards").prop("selectedIndex", 0);
    sessionStorage.clear();
    $(Source).empty();
    ImgSource = 48;
    cardGenerator();
  });

  // Tabs widget
  $(function () {
    $("#tabs").tabs();
  });
});
