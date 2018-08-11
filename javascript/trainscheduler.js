

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAMkomkP3MkwazJ7aDnNfQAnzeyYZm76w0",
    authDomain: "my-firebase-project-fe683.firebaseapp.com",
    databaseURL: "https://my-firebase-project-fe683.firebaseio.com",
    projectId: "my-firebase-project-fe683",
    storageBucket: "my-firebase-project-fe683.appspot.com",
    messagingSenderId: "666480205708"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//   button for adding train
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // create a way to retrieve train information from the train database.
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrainTime = $("#military-time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();


    // Creates local "temporary" object for holding train data.

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firsttime: firstTrainTime,
        frequency: trainFrequency,

    };
    // Uploads train data to the database

    database.ref("/TrainTable").push(newTrain);

    alert("Train successfully added");

    // Clear all of the text-boxes

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#military-time-input").val("");
    $("#frequency-input").val("");


});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry.

database.ref("/TrainTable").on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // store everything into a variable.

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firsttime;
    var trainFrequency = childSnapshot.val().frequency;
    
    
    var firstTimeConverted = moment(firstTrainTime, "HH:mm");
    // calculate current time.
    var currentTime = moment().format("HH:mm");

    // time difference in between first train time - current time.
    var timeDiff= moment().diff(moment(firstTimeConverted), "minutes");
    
    // find Remainder of the time left and save in a variable.
    var timeRemainder = timeDiff % trainFrequency;
    
    // to calculate minutes till train,we store it in a variable
  var minToTrain = trainFrequency - timeRemainder;

// next train
var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");

var nextArrival = moment(nxTrain, 'HH:mm').format('hh:mm a');
    
    // Create the new row

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minToTrain)
    );

    // Append the new row to the table

    $("#train-table > tbody").append(newRow);

});
