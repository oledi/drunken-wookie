(function () {
    'use strict';

    var exercise = null;

    var sensors = {
        accelerometer: null
    };

    var controller = {
        init: function () {
            sensors.accelerometer = new Accelerometer();
            exercise = new Exercise(sensors.accelerometer);

            controller.clickEvents();
            navigator.splashscreen.hide();
        }, update: function () {

            setInterval(function () {
                if (sensors.accelerometer.breakpoint) {


                    sensors.accelerometer.breakpoint = false;
                }
            }, 500);
        }, clickEvents: function () {

            $('.btn_start').click(function () {
                $('.btn_start').toggle();
                $('.btn_stop').toggle();

                exercise.startRecord();
            });

            $('.btn_stop').click(function () {
                $('.btn_start').toggle();
                $('.btn_stop').toggle();

                exercise.saveRecord();

            });

            $('.btn_record_start').click(function () {
                $('.btn_record_start').toggle();
                $('.btn_record_stop').toggle();

                exercise.startWatch();
            });

            $('.btn_record_stop').click(function () {
                $('.btn_record_start').toggle();
                $('.btn_record_stop').toggle();

                exercise.stopWatch();
            });

        }
    };

    document.addEventListener("deviceready", controller.init, false);
})();