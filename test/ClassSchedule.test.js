import {Course} from '../src/Course.js'
import {ClassSchedule} from '../src/ClassSchedule.js'

let myClasses = new ClassSchedule()

describe('new', () => {
  it('should instantiate the class', () => {
    expect(myClasses).toBeInstanceOf(ClassSchedule)
  })
  it('yield object with courses property (Set)', () => {
    expect(myClasses.courses).toBeInstanceOf(Set)
  })
  it('yield object with schedule property (Array)', () => {
    expect(Array.isArray(myClasses.schedule)).toBeTruthy()
    expect(myClasses.schedule.length).toEqual(7)
  })
})

// Test data of non-conflicting courses
let courses = [
  ['Economics 101', [1,9,11], [3,9,11], [5,9,11] ],
  ['History 101', [1,11,12], [3,11,12], [5,11,12] ],
  ['Basketweaving', [1,2,3], [3,2,3], [5,2,3] ],
  ['Fluid dynamics', [2,9,12], [4,9,12] ],
].map( x => new Course(x.shift(), x) )


describe('add', () => {
  let added = courses.every(course => {
    return myClasses.add(course)
  })
  it('should successfully add unconflicting courses', () => {
    expect(added).toEqual(true)
    expect(myClasses.courses.size).toEqual(courses.length)
  })
  it('should throw an error for duplicate course', () => {
    expect(
      () => myClasses.add(courses[0])
    ).toThrow(/already added/)
  })
  it('should throw an error for course with duplicate name', () => {
    expect(
      () => myClasses.add(new Course(courses[0].name, [[1,4,5]]))
    ).toThrow(/already added/)
  })
  it('should throw an error for a schedule conflict', () => {
    expect(
      () => myClasses.add(new Course('Foo', [[3,9,11]]))
    ).toThrow(/Schedule conflict/)
  })
})
