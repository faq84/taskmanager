const math = require('../src/math')

test ('Calculate total with TIP',()=>{
    const total = math.calculateTip(10,0.3)
    expect(total).toBe(13)
    // if(total !== 13){
    //     throw new Error('Total TIP should be 13. Got'+total)
    // }
})


test('Add Function',(a)=>{
    math.add(2,3).then((sum)=>{
        expect(sum).toBe(5)
        a()
    })
})

test('Should add 2 number async/await', async ()=>{
    const sum = await math.add(10,32)
    expect(sum).toBe(42)
})

test('Fahrenheit to Celsius',()=>{
    const temp = math.fahrenheitToCelsius(32)
    expect(temp).toBe(0)

})

test('Celsiuc to Fahrenheit',()=>{
    const temp = math.celsiusToFahrenheit(0)
    expect(temp).toBe(32)
})

test('Async Test Demo',()=>{
    setTimeout(()=>{
        expect(2).toBe(2)
        a()
    },2000)
})
// test('hello world',()=>{

// })

// test('this shoudl fail',()=>{
//     throw new Error('error')
// })