export class Course {
    constructor(name, classTimes = Array()) {
        this.name = name             // String - Will serve as unique ID
        this.classTimes = classTimes // Array of Arrays [dayIdx, start, end]
    }
    addClassTime(day, start, end) {
      console.log(this)
      this.classTimes.push([day, start, end])
    }
}
