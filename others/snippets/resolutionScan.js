// https://github.com/webrtcHacks/WebRTC-Camera-Resolution/blob/master/js/resolutionScan.js

/*
WebRTC - Camera - Resolution / js / resolutionScan.js /
@chadwallacehart
chadwallacehart support for safari
…
Latest commit faafe5c on Mar 19, 2021
History
3 contributors
@derMani @fippo @chadwallacehart
470 lines(393 sloc)  13.8 KB
*/

/**
 * Main js file for WebRTC-Camera-Resolution finder
 * Created by chad on 7/19/2014.
 * Modified January 1, 2016
 */

'use strict';

//Global variables
let video = $('#video')[0],     //where we will put & test our video output
    deviceList = $('#devices')[0],          //device list dropdown
    devices = [],                        //getSources object to hold various camera options
    selectedCamera = [],            //used to hold a camera's ID and other parameters
    tests,                          //holder for our test results
    r = 0,                          //used for iterating through the array
    camNum = 0,                     //used for iterating through number of camera
    scanning = false;               //variable to show if we are in the middle of a scan

function gotDevices(deviceInfos) {
    $('#selectArea').show();
    let camcount = 1;   //used for labeling if the device label is not enumerated
    for (let i = 0; i !== deviceInfos.length; ++i) {
        let deviceInfo = deviceInfos[i];
        let option = document.createElement('option');
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === 'videoinput') {
            option.text = deviceInfo.label || 'camera ' + camcount;
            devices.push(option);
            deviceList.add(option);
            camcount++;
        }
    }
}

function errorCallback(error) {
    console.log('navigator.getUserMedia error: ', error);
}


//find & list camera devices on load
$(document).ready(() => {

    console.log("adapter.js says this is " + adapter.browserDetails.browser + " " + adapter.browserDetails.version);

    if (!navigator.getUserMedia) {
        alert('You need a browser that supports WebRTC');
        $("div").hide();
        return;
    }

    //Call gUM early to force user gesture and allow device enumeration
    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
        .then((mediaStream) => {

            window.stream = mediaStream; // make globally available
            video.srcObject = mediaStream;

            //Now enumerate devices
            navigator.mediaDevices.enumerateDevices()
                .then(gotDevices)
                .catch(errorCallback);

        })
        .catch((error) => {
            console.error('getUserMedia error!', error);
        });

    //Localhost unsecure http connections are allowed
    if (document.location.hostname !== "localhost") {
        //check if the user is using http vs. https & redirect to https if needed
        if (document.location.protocol !== "https:") {
            $(document).html("This doesn't work well on http. Redirecting to https");
            console.log("redirecting to https");
            document.location.href = "https:" + document.location.href.substring(document.location.protocol.length);
        }
    }
    //Show text of what res's are used on QuickScan
    let quickText = "Sizes:";
    for (let q = 0; q < quickScan.length; q++) {
        quickText += " " + quickScan[q].label
    }
    $('#quickLabel').text(quickText);

});

//Start scan by controlling the quick and full scan buttons
$('button').click(function () {

    //setup for a quick scan using the hand-built quickScan object
    if (this.innerHTML === "Quick Scan") {
        console.log("Quick scan");
        tests = quickScan;
    }
    //setup for a full scan and build scan object based on inputs
    else if (this.innerHTML === "Full Scan") {
        let highRes = $('#hiRes').val();
        let lowRes = $('#loRes').val();
        console.log("Full scan from " + lowRes + " to " + highRes);
        tests = createAllResolutions(parseInt(lowRes), parseInt(highRes));
    }
    else {
        return
    }

    scanning = true;
    $('button').prop("disabled", true);
    $('table').show();
    $('#jump').show();

    //if there is device enumeration
    if (devices) {

        //run through the deviceList to see what is selected
        for (let deviceCount = 0, d = 0; d < deviceList.length; d++) {
            if (deviceList[d].selected) {
                //if it is selected, check the label against the getSources array to select the proper ID
                for (let z = 0; z < devices.length; z++) {
                    if (devices[z].value === deviceList[d].value) {

                        //just pass along the id and label
                        let camera = {};
                        camera.id = devices[z].value;
                        camera.label = devices[z].text;
                        selectedCamera[deviceCount] = camera;
                        console.log(selectedCamera[deviceCount].label + "[" + selectedCamera[deviceCount].id + "] selected");
                        deviceCount++;
                    }
                }
            }
        }

        //Make sure there is at least 1 camera selected before starting
        if (selectedCamera[0]) {
            gum(tests[r], selectedCamera[0]);
        }
        else {
            console.log("No camera selected. Defaulting to " + deviceList[0].text);
            //$('button').prop("disabled",false);

            selectedCamera[0] = { id: deviceList[0].value, label: deviceList[0].text };
            gum(tests[r], selectedCamera[0]);

        }
    }
    //if no device enumeration don't pass a Camera ID
    else {
        selectedCamera[0] = { label: "Unknown" };
        gum(tests[r]);
    }

});

//calls getUserMedia for a given camera and constraints
function gum(candidate, device) {
    console.log("trying " + candidate.label + " on " + device.label);

    //Kill any running streams;
    if (window.stream) {
        stream.getTracks().forEach((track) => {
            track.stop();
        });
    }

    //create constraints object
    let constraints = {
        audio: false,
        video: {
            deviceId: device.id ? { exact: device.id } : undefined,
            width: { exact: candidate.width },    //new syntax
            height: { exact: candidate.height }   //new syntax
        }
    };

    setTimeout(() => {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(gotStream)
            .catch((error) => {
                console.log('getUserMedia error!', error);

                if (scanning) {
                    captureResults("fail: " + error.name);
                }
            });
    }, (window.stream ? 200 : 0));  //official examples had this at 200


    function gotStream(mediaStream) {

        //change the video dimensions
        console.log("Display size for " + candidate.label + ": " + candidate.width + "x" + candidate.height);
        video.width = candidate.width;
        video.height = candidate.height;

        window.stream = mediaStream; // make globally available
        video.srcObject = mediaStream;

    }
}


function displayVideoDimensions() {
    //This should only happen during setup
    if (tests === undefined)
        return;

    //Wait for dimensions if they don't show right away
    if (!video.videoWidth) {
        setTimeout(displayVideoDimensions, 500);  //was 500
    }

    if (video.videoWidth * video.videoHeight > 0) {
        if (tests[r].width + "x" + tests[r].height !== video.videoWidth + "x" + video.videoHeight) {
            captureResults("fail: mismatch");
        }
        else {
            captureResults("pass");
        }
    }
}


video.onloadedmetadata = displayVideoDimensions;


//Save results to the candidate so
function captureResults(status) {
    console.log("Stream dimensions for " + tests[r].label + ": " + video.videoWidth + "x" + video.videoHeight);

    if (!scanning)   //exit if scan is not active
        return;

    tests[r].status = status;
    tests[r].streamWidth = video.videoWidth;
    tests[r].streamHeight = video.videoHeight;

    let row = $('table#results')[0].insertRow(-1);
    let browserVer = row.insertCell(0);
    let deviceName = row.insertCell(1);
    let label = row.insertCell(2);
    let ratio = row.insertCell(3);
    let ask = row.insertCell(4);
    let actual = row.insertCell(5);
    let statusCell = row.insertCell(6);
    let deviceIndex = row.insertCell(7);
    let resIndex = row.insertCell(8);

    //don't show these
    deviceIndex.style.display = "none";
    resIndex.style.display = "none";

    deviceIndex.class = "hidden";
    resIndex.class = "hidden";

    browserVer.innerHTML = adapter.browserDetails.browser + " " + adapter.browserDetails.version;
    deviceName.innerHTML = selectedCamera[camNum].label;
    label.innerHTML = tests[r].label;
    ratio.innerHTML = tests[r].ratio;
    ask.innerHTML = tests[r].width + "x" + tests[r].height;
    actual.innerHTML = tests[r].streamWidth + "x" + tests[r].streamHeight;
    statusCell.innerHTML = tests[r].status;
    deviceIndex.innerHTML = camNum;     //used for debugging
    resIndex.innerHTML = r;             //used for debugging

    r++;

    //go to the next tests
    if (r < tests.length) {
        gum(tests[r], selectedCamera[camNum]);
    }
    else if (camNum < selectedCamera.length - 1) {     //move on to the next camera
        camNum++;
        r = 0;
        gum(tests[r], selectedCamera[camNum])
    }
    else { //finish up
        video.removeEventListener("onloadedmetadata", displayVideoDimensions); //turn off the event handler
        $('button').off("click"); //turn the generic button handler  off

        scanning = false;

        $(".pfin").show();
        $('#csvOut').click(function () {
            exportTableToCSV.apply(this, [$('#results'), 'gumResTestExport.csv']);
        });

        //allow to click on a row to test (only works with device Enumeration
        if (devices) {
            clickRows();
        }
    }
}

//allow clicking on a row to see the camera capture
//To do: figure out why this doesn't work in Firefox
function clickRows() {
    $('tr').click(function () {
        r = $(this).find("td").eq(8).html();

        //lookup the device id based on the row label
        for (let z = 0; z < selectedCamera.length; z++) {
            if (selectedCamera[z].label === $(this).find("td").eq(1).html()) {
                var thisCam = selectedCamera[z]; //devices[z].value;
                console.log(this)
            }
        }

        console.log("table click! clicked on " + thisCam + ":" + tests[r].label);
        gum(tests[r], thisCam);
    })
}


//Variables to use in the quick scan
const quickScan = [
    {
        "label": "4K(UHD)",
        "width": 3840,
        "height": 2160,
        "ratio": "16:9"
    },
    {
        "label": "1080p(FHD)",
        "width": 1920,
        "height": 1080,
        "ratio": "16:9"
    },
    {
        "label": "UXGA",
        "width": 1600,
        "height": 1200,
        "ratio": "4:3"
    },
    {
        "label": "720p(HD)",
        "width": 1280,
        "height": 720,
        "ratio": "16:9"
    },
    {
        "label": "SVGA",
        "width": 800,
        "height": 600,
        "ratio": "4:3"
    },
    {
        "label": "VGA",
        "width": 640,
        "height": 480,
        "ratio": "4:3"
    },
    {
        "label": "360p(nHD)",
        "width": 640,
        "height": 360,
        "ratio": "16:9"
    },
    {
        "label": "CIF",
        "width": 352,
        "height": 288,
        "ratio": "4:3"
    },
    {
        "label": "QVGA",
        "width": 320,
        "height": 240,
        "ratio": "4:3"
    },
    {
        "label": "QCIF",
        "width": 176,
        "height": 144,
        "ratio": "4:3"
    },
    {
        "label": "QQVGA",
        "width": 160,
        "height": 120,
        "ratio": "4:3"
    }

];

//creates an object with all HD & SD video ratios between two heights
function createAllResolutions(minHeight, maxHeight) {
    const ratioHD = 16 / 9;
    const ratioSD = 4 / 3;

    let resolutions = [],
        res;

    for (let y = maxHeight; y >= minHeight; y--) {
        //HD
        res = {
            "label": (y * ratioHD).toFixed() + "x" + y,
            "width": parseInt((y * ratioHD).toFixed()), //this was returning a string
            "height": y,
            "ratio": "16:9"
        };
        resolutions.push(res);

        //SD
        res = {
            "label": (y * ratioSD).toFixed() + "x" + y,
            "width": parseInt((y * ratioSD).toFixed()),
            "height": y,
            "ratio": "4:3"
        };
        resolutions.push(res);

        //square
        //noinspection JSSuspiciousNameCombination
        res = {
            "label": y + "x" + y,
            "width": y,
            "height": y,
            "ratio": "1:1"
        };
        resolutions.push(res);

    }
    console.log("resolutions length: " + resolutions.length);
    return resolutions;
}


/*
 Export results table to a CSV file in new window for download
 source: http://jsfiddle.net/terryyounghk/KPEGU/
 */
function exportTableToCSV($table, filename) {

    let $rows = $table.find('tr:has(th), tr:has(td)'),

        // Temporary delimiter characters unlikely to be typed by keyboard
        // This is to avoid accidentally splitting the actual contents
        tmpColDelim = String.fromCharCode(11), // vertical tab character
        tmpRowDelim = String.fromCharCode(0), // null character

        // actual delimiter characters for CSV format
        colDelim = '","',
        rowDelim = '"\r\n"',

        // Grab text from table into CSV formatted string
        csv = '"' + $rows.map((i, row) => {
            let $row = $(row),
                $cols = $row.find('th, td');

            return $cols.map((j, col) => {
                let $col = $(col),
                    text = $col.text();

                return text.replace(/"/g, '""'); // escape double quotes

            }).get().join(tmpColDelim);

        }).get().join(tmpRowDelim)
            .split(tmpRowDelim).join(rowDelim)
            .split(tmpColDelim).join(colDelim) + '"',

        // Data URI
        csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

    $(this)
        .attr({
            'download': filename,
            'href': csvData,
            'target': '_blank'
        });
}
