var vm = new Vue({

    el: '#app',

    data: {

        entries: {

        },

        activeEntry: [
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

        newDateValue: new Date().getFullYear() + (((new Date().getMonth + 1) > 9) ? "-" : "-0") + (new Date().getMonth() + 1) + ((new Date().getDate > 9) ? "-" : "-0") + new Date().getDate(),

        filterSelect: "Select Type",

        selectedEntry: "Select Date",

        newDateToggle: [true, false],

        exportToggle: [true, false],

        exportTextData: "",

    },

    methods: {

        checkMonth: function () {
            if ((new Date().getMonth + 1) > 9) {
                return "-";
            } else {
                return "-0";
            }
        },

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

            this.saveAllData();

            alert("Save successful.")

        },

        // function to clear all rows and add one blank row. Pass boolean to use confirm alert or not.
        clearAllRows: function (bool) {
            if (bool == true) {
                let answer = confirm("Are you sure you want to clear all rows?");
                if (answer == true) {
                    this.clearActiveEntry();
                    this.addRow(0);
                } else {
                    return;
                }
            } else if (bool == false) {
                this.clearActiveEntry();
                this.addRow(0);
            }

        },

        resetDate: function () {
            let answer = confirm("Are you sure yout want to revert to the last save?")
            if (answer == true) {
                this.loadActiveEntry();
            } else {
                return;
            }
        },

        // calculate hour total on current row
        rowHours: function (entry) {

            let dateStart = 0;
            let dateEnd = 0;

            if (entry.start != "" && entry.end != "") {

                dateStart = new Date(`January 01, 1970 ${entry.start}:00`);
                dateEnd = new Date(`January 01, 1970 ${entry.end}:00`);

            }

            if ((!(isNaN(dateStart))) && (!(isNaN(dateEnd)))) {

                // convert miliseconds to hours and mask to two decimal places
                let hours = parseFloat((((dateEnd - dateStart) / 1000) / 60) / 60).toFixed(2);

                entry.hours = hours;

                return entry.hours;

            }  else {
                let total = 0;
                return total.toFixed(2);
            }

        },

        // add a new object to the entries array
        addRow: function (index) {

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
        delRow: function (index) {

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
            let date2 = new Date(date.getTime() - date.getTimezoneOffset() * -60000)

            return date2.toDateString();
        },

        showDatePicker: function () {
            this.newDateToggle.reverse();
        },

        addNewDate: function (date) {

            let v = this;
            let newDate = [];
            this.clearAllRows(false);
            v.activeEntry.forEach(row => {
                newDate.push(row);
            });
            v.$set(v.entries, v.newDateValue, newDate);
            v.selectedEntry = this.newDateValue;
            v.showDatePicker();

        },

        deleteDate: function (date) {
            let answer = confirm("Are you sure you want to delete this date?");
            if (answer == true) {
                Vue.delete(this.entries, date);
                this.clearAllRows(false);
                this.saveAllData();
                this.selectedEntry = "Select Date";

            } else {
                return;
            }
        },

        saveAllData: function () {
            let allData = this.entries;
            localStorage.setItem('allData', JSON.stringify(allData, null, "\t"));
            console.log("Saved data to LocalStorage.");
        },

        loadAllData: function () {
            let allData = JSON.parse(localStorage.getItem('allData'));
            Object.assign(this.$data.entries, allData)
            console.log("Loaded data from LocalStorage.");
        },

        deleteEntries: function () {
            let obj = {};
            vm.$set(vm.data, 'entries', obj);
        },

        exportData: function () {
            this.saveAllData();
            let exportData = {};
            exportData[this.selectedEntry] = this.$data.entries[this.selectedEntry];
            this.exportTextData = JSON.stringify(exportData, null, "\t");
        },

        toggleExport: function () {
            this.exportToggle.reverse();
        },

    },

    computed: {

        // populate array with existing types from entry objects
        entryTypes: function () {

            let v = this;

            v.activeEntry.forEach(entry => {
                if (v.types.indexOf(entry.type) < 0) {
                    if (entry.type != "") {
                        v.types.push(entry.type);
                    }
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
            /* 
                        v.activeEntry.forEach(el => {
                            if (!(isNaN(el.hours))) {
                                total += parseFloat(el.hours);
                            }
                        });
            */
            v.activeEntry.forEach(el => {
                if (isNaN(el.hours) || el.hours == "" || el.hours == undefined || el.hours == "0.00") {
                } else {
                    total += parseFloat(el.hours);
                }
            });

            return total.toFixed(2);

        },

        disableButton: function () {
            return (this.selectedEntry === "Select Date") ? true : false;
        }

    },

    beforeMount() {
        this.loadAllData();
    }
});