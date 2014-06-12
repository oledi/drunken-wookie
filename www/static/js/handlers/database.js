function getExercise(exercise) {
    $.ajax({
        async: false,
        type: "GET",
        url: "api.floydvanboksel.com/drunken-monkey/exercise/" + exercise,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
        	return data;
        },
        error: function () {
            alert("There was an error loading the feed");
        }
    });
}