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
        ],

        newEntry: {
            type: "",
            start: "",
            end: "",
            hours: ""
        },

        types: [],

        addTypeValue: "",

        delTypeValue: "",

        filterSelect: ""

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

            // create a new table row by adding a new entry to entries array.
            this.entries.splice((index + 1), 0, this.newEntry);

        },

        // remove entry from entries array
        delEntry: function (index) {

            // only remove entry if there are more than one
            if (this.entries.length != 1) {
                this.entries.splice(index, 1);
            } else {
                alert("You cannot remove the only existing row.");
            }
        },

        addType: function (el) {
            if (this.types.indexOf(el) < 0) {
                this.types.push(el);
            }
            this.addTypeValue = "";
        },

        delType: function (el) {
            let index = this.types.indexOf(el);
            if (index > 0) {
                this.types.splice(index, 1);
            }
        },

        filterHours: function (type) {

            let v = this;
            let hours = 0;

            v.entries.forEach(el => {
                if (el.type == type) {
                    hours += parseFloat(el.hours);
                }
            });

            return hours.toFixed(2);

        }

    },

    computed: {

        // populate array with existing types from entry objects
        entryTypes: function () {

            let v = this;

            v.entries.forEach(entry => {
                if (v.types.indexOf(entry.type) < 0) {
                    v.types.push(entry.type);
                }
            });

            v.types.forEach(type => {
                let exists = false;
                v.entries.forEach(entry => {
                    if (type == entry.type) {
                        exists = true;
                    }
                });
                if (exists == false) {
                    v.types.splice(v.types.indexOf(type), 1);
                }
            });

            return v.types;
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