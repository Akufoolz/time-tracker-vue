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
        calcHours: function () {
            let v = this;
            v.entries.forEach(el => {
                let dateStart = new Date(`January 01, 1970 ${el.start}:00`);
                //el.start = dateStart.toLocaleString('en-US', {hour:'numeric', minute:'numeric', hour12: true})
                let dateEnd = new Date(`January 01, 1970 ${el.end}:00`);
                //el.end = dateEnd.toLocaleString('en-US', {hour:'numeric', minute:'numeric', hour12: true})
                let hours = parseFloat((((dateEnd - dateStart) / 1000) / 60) / 60).toFixed(2);
                v.$set(el, 'hours', hours);
            });
        },
        addEntry: function (index) {
            //let newEntry = { type: "", start: "", end: "", hours: "" };
            let newEntry = {type: "-None-"};
            this.entries.splice((index + 1), 0, newEntry);
        },
        delEntry: function (index) {
            if (this.entries.length != 1) {
                this.entries.splice(index, 1);
            } else {
                alert("You cannot remove the only existing row.");
            }
        }
    },
    computed: {
        entryTypes: function () {
            let v = this;
            let array = ["-None-"];
            v.entries.forEach(el => {
                if (array.indexOf(el.type) < 0) {
                    array.push(el.type);
                }
            });
            return array;
        },
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
        this.calcHours();
        this.setEntryTypes;
    }
});