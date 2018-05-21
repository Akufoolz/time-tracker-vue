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
            },
            {
                type: "Training",
                start: "12:30",
                end: "16:30",
                hours: ""
            }
        ],
        entryTypes: []
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
            let newEntry = { type: "", start: "", end: "", hours: "" };
            this.entries.splice((index + 1), 0, newEntry);
            //this.entries.splice((this.id + 1), 0, this.newEntry);
            //this.$set(this.entries, (this.id + 1), this.newEntry);

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
        setEntryTypes: function () {
            let v = this;
            v.entries.forEach(el => {
                if (v.entryTypes.indexOf(el.type) < 0) {
                    v.entryTypes.push(el.type);
                }
            });
        }
    },
    beforeMount() {
        this.calcHours();
        this.setEntryTypes;
    }
});