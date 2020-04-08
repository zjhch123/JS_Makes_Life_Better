const superBaby = function(name) {
  class Baby {
    constructor(name) {
      this.name = name
      this.stack = []
      console.log(`I am ${name}`)
      setTimeout(() => {
        this.next()
      })
    }

    eat(fruit) {
      this.stack.push(() => {
        console.log(`Eating ${fruit}`)
        this.next()
      })
      return this
    }

    sleep(timeout) {
      this.stack.push(() => {
        setTimeout(() => {
          console.log(`Start eat after ${timeout} seconds - sleep`)
          this.next()
        }, timeout * 1000)
      })
      return this
    }

    sleepFirst(timeout) {
      this.stack.unshift(() => {
        setTimeout(() => {
          console.log(`Start eat after ${timeout} seconds - sleepFirst`)
          this.next()
        }, timeout * 1000)
      })
      return this
    }

    next() {
      if (this.stack.length <= 0) { return }
      const fn = this.stack.shift()
      fn.call(this)
    }
  }

  return new Baby(name)
}

superBaby('tom').sleepFirst(5).sleep(3).eat('banana')