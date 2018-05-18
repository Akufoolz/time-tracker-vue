var vm = new Vue({
    el: '#app',
    data: {
        entries: [
            {
                id: 0,
                type: "Cases",
                start: "8:00 AM",
                end: "8:45 AM",
                hours: ""
            },
            {
                id: 1,
                type: "Meeting",
                start: "8:45 AM",
                end: "12:00 PM",
                hours: ""
 
            },
            {
                id: 2,
                type: "Training",
                start: "12:30 PM",
                end: "4:30 PM",
                hours: ""
 
            }
        ]
    }
});