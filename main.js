var vm = new Vue({
    el: '#app',
    data: {
        entries: [
            {
                id: 0,
                type: "Cases",
                start: "08:00:00",
                end: "08:45:00",
                hours: ""
            },
            {
                id: 1,
                type: "Meeting",
                start: "08:45:00",
                end: "12:00:00",
                hours: ""
 
            },
            {
                id: 2,
                type: "Training",
                start: "12:30:00",
                end: "16:30:00",
                hours: ""
 
            }
        ]
    },
    computed: {
        calcHours: function() {

        }
    }
});