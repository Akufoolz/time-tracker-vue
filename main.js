var vm = new Vue({
    el: '#app',
    data: {
        entries: [
            {
                id: 0,
                type: "Cases",
                start: "08:00",
                end: "08:45",
                hours: ""
            },
            {
                id: 1,
                type: "Meeting",
                start: "08:45",
                end: "12:00",
                hours: ""
 
            },
            {
                id: 2,
                type: "Training",
                start: "12:30",
                end: "16:30",
                hours: ""
 
            }
        ],
        dateTest: ""
    },
    methods: {
        calcHours: function() {
            let v = this;
             v.entries.forEach(el => {
                let dateStart = new Date(`January 01, 1970 ${el.start}:00`);
                //el.start = dateStart.toLocaleString('en-US', {hour:'numeric', minute:'numeric', hour12: true})
                let dateEnd = new Date(`January 01, 1970 ${el.end}:00`);
                //el.end = dateEnd.toLocaleString('en-US', {hour:'numeric', minute:'numeric', hour12: true})
                let hours = (((dateEnd - dateStart)/1000)/60)/60;
                v.$set(el, 'hours', hours);
            });
        },
        dateChange: function() {
            console.log(`Date1: ${this.dateTest}`);
            
            console.log(`Date2: ${date}`);
            
            console.log(`Date3: ${this.dateTest}`);
            
        }
    },
    beforeMount() {
        this.calcHours();
    }
});