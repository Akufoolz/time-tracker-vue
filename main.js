//          TODO:
//          Implement delete date button
//          Save/Load data from LocalStorage
//          Add date dropdown to mobile view
//          Add clear button to mobile view 

var vm = new Vue({

    el: '#app',

    data: {

        entries: {

            "2018-05-26": [

                {
                    type: "Heart",
                    start: "08:00",
                    end: "08:45",
                    hours: ""
                },
                {
                    type: "My",
                    start: "08:45",
                    end: "09:15",
                    hours: ""
                },
                {
                    type: "Honey",
                    start: "09:15",
                    end: "12:00",
                    hours: ""

                },
                {
                    type: "Bunny",
                    start: "12:30",
                    end: "16:30",
                    hours: ""
                }
            ],

            "2018-05-25": [

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

        },

        activeEntry: [
            {
                type: "",
                start: "00:00",
                end: "12:00",
                hours: ""
            },
            {
                type: "",
                start: "",
                end: "",
                hours: ""
            }
        ],

        types: [],

        addTypeValue: "",

        delTypeValue: "",

        newDateValue: "",

        filterSelect: "Select Type",

        selectedEntry: "Select Date",

        newDateToggle: [true, false]
    },

    methods: {

        loadActiveEntry: function () {

            let v = this;

            this.clearActiveEntry();

            v.entries[v.selectedEntry].forEach(item => {
                v.activeEntry.push(item);
            });

        },

        clearActiveEntry: function () {

            let v = this;

            for (let i = 0; i < v.activeEntry.length;) {
                let item = v.activeEntry[i];
                v.activeEntry.pop(item);
            }

        },

        saveEntry: function (entry) {

            let v = this;

            for (let i = 0; i < v.entries[entry].length;) {
                let item = v.entries[entry][i];
                v.entries[entry].pop(item);
            }

            v.activeEntry.forEach(item => {
                v.entries[entry].push(item);
            });

            alert("Save successful.")

        },

        clearAllRows: function () {
            this.clearActiveEntry();
            this.addEntry(0);
        },

        // calculate hour total on current row
        rowHours: function (entry) {

            let dateStart = new Date(`January 01, 1970 ${entry.start}:00`);
            let dateEnd = new Date(`January 01, 1970 ${entry.end}:00`);

            // convert miliseconds to hours and mask to two decimal places
            let hours = parseFloat((((dateEnd - dateStart) / 1000) / 60) / 60).toFixed(2);

            entry.hours = hours;

            if (!(isNaN(entry.hours))) {
                return entry.hours;
            } else {
                return "0.00";
            }

        },

        // add a new object to the entries array
        addEntry: function (index) {

            let newEntry = {
                type: "",
                start: "",
                end: "",
                hours: ""
            };

            // create a new table row by adding a new entry to entries array.
            this.activeEntry.splice((index + 1), 0, newEntry);

        },

        // remove entry from entries array
        delEntry: function (index) {

            // only remove entry if there are more than one
            if (this.activeEntry.length != 1) {
                this.activeEntry.splice(index, 1);
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

            v.activeEntry.forEach(el => {
                if (el.type == type) {
                    hours += parseFloat(el.hours);
                }
            });

            return hours.toFixed(2);

        },

        convertDate: function (string) {

            let date = new Date(string);
            
            // remove unwanted offset to avoid date being one day off
            let date2 = new Date( date.getTime() - date.getTimezoneOffset() * -60000 )

            return date2.toDateString();
        },

        showDatePicker: function () {
            this.newDateToggle.reverse();
        },

        addNewDate: function (date) {

            let v = this;
            let newDate = [];
            this.clearAllRows();
            v.activeEntry.forEach(row => {
                newDate.push(row);
            });
            v.$set(v.entries, v.newDateValue, newDate);
            v.selectedEntry = this.newDateValue;
            v.showDatePicker();

        }

    },

    computed: {

        // populate array with existing types from entry objects
        entryTypes: function () {

            let v = this;

            v.activeEntry.forEach(entry => {
                if (v.types.indexOf(entry.type) < 0) {
                    v.types.push(entry.type);
                }
            });

            v.types.forEach(type => {
                let exists = false;
                v.activeEntry.forEach(entry => {
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

            v.activeEntry.forEach(el => {
                if (!(isNaN(el.hours))) {
                    total += parseFloat(el.hours);
                }
            });

            return total.toFixed(2);
        }

    },

    beforeMount() {

    }
});