import {Course} from '../src/Course.js'

let name = 'Economics 101'
let times = [[1,9,11], [3,9,11], [5,9,11]]

describe('new', () => {
  let course = new Course( name, times )

  it('should instantiate the class', () => {
    expect(course).toBeInstanceOf(Course)
  })
  it('yield object with name property', () => {
    expect(course.name).toBe(name)
  })
  it('yield object with classTimes property', () => {
    expect(course.classTimes).toEqual(expect.arrayContaining(times))
  })
})

describe('addClassTime', () => {
  let course = new Course( name )
  times.forEach(x => course.addClassTime(...x))

  it('should add elements to course.classTimes property array', () => {
    expect(course.classTimes).toEqual(expect.arrayContaining(times))
  })
})
