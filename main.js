var vm = new Vue({

    el: '#app',

    data: {

        entries: [

            {
                type: "Cases",
                start: "08:00",
                end: "08:45",
                hours: ""
            },
            {
                type: "Meeting",
                start: "08:45",
                end: "12:00",
                hours: ""

            },
            {
                type: "Training",
                start: "12:30",
                end: "16:30",
                hours: ""
            }
        ]

    },

    methods: {

        // calculate hour total on current row
        rowHours: function (entry) {

            let dateStart = new Date(`January 01, 1970 ${entry.start}:00`);
            let dateEnd = new Date(`January 01, 1970 ${entry.end}:00`);

            // convert miliseconds to hours and mask to two decimal places
            let hours = parseFloat((((dateEnd - dateStart) / 1000) / 60) / 60).toFixed(2);

            entry.hours = hours;

            return entry.hours;

        },

        // add a new object to the entries array
        addEntry: function (index) {

            let newEntry = { type: "-None-" };

            // create a new table row by adding a new entry to entries array.
            this.entries.splice((index + 1), 0, newEntry);

        },

        // remove entry from entries array
        delEntry: function (index) {

            // only remove entry if there are more than one
            if (this.entries.length != 1) {
                this.entries.splice(index, 1);
            } else {
                alert("You cannot remove the only existing row.");
            }
        }

    },

    computed: {

        // populate array with existing types from entry objects
        entryTypes: function () {

            let v = this;

            // initialize array with default -None- type
            let array = ["-None-"];

            v.entries.forEach(el => {
                if (array.indexOf(el.type) < 0) {
                    array.push(el.type);
                }
            });

            return array;
        },

        // calculate total hours by summing all entry hours
        totalHours: function () {

            let v = this;
            let total = 0;

            v.entries.forEach(el => {
                total += parseFloat(el.hours);
            });

            return total.toFixed(2);
        }

    },

    beforeMount() {

        this.setEntryTypes;

    }
});