export class ClassSchedule {
    constructor() {
        this.courses = new Set()
        this.schedule = [ [], [], [], [], [], [], [] ] // Days of week, starting on Sunday
    }

    add(course) {
      if ( this.isDuplicate(course) )
        return this.duplicateError()

      let conflicts
      if ( conflicts = this.isConflict(course))
        return this.conflictError(conflicts)

      // Add Course object to courses Set
      this.courses.add(course)

      // Add class times for new class
      course.classTimes.forEach(([day,start,end]) => {
        for (let i = start; i < end; i++) {
          // console.log(`Adding ${course.name} to day ${day} slot ${i}`)
          this.schedule[day][i] = course
        }
      })
      return true
    }

    isDuplicate(course) {
      return this.courses.has(course)
          || Array.from(this.courses).some( x => x.name == course.name )
    }

    isConflict(course) {
      let reducer = (acc,cur) => this.findConflicts(acc,cur)
      let conflicts = course.classTimes.reduce(reducer, [])
      if (conflicts.length) return conflicts
    }

    findConflicts(conflicts, [day, start, end]) {
      // console.log('Checking for conflicts on ', day, start, end)
      let today = this.schedule[day]
      if (! today.length)
        return conflicts

      // console.log('Schedule: ', today)
      let conflictSet = new Set()
      for (let i = start; i < end; i++) {
        if (today[i]) {
          console.warn(`conflict detected at ${day} ${i}`, today[i])
          conflictSet.add(today[i])
        }
      }
      if (conflictSet.size) {
        (conflicts[day] = conflicts[day] || []).push(conflictSet)
      }
      return conflicts
    }

    throw(err) { throw new Error(err) }

    duplicateError() { this.throw('You already added this course') }

    conflictError(conflicts) {
      this.throw('Schedule conflict(s) detected. Cannot add: '+conflicts)
    }

    // getScheduledClasses(day, start, end) {
    //   return new Set(this.schedule[day].slice(start, end).filter(x => x !== undefined))
    // }
}
