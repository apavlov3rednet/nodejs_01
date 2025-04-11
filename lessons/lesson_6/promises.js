const p1 = new Promise((res, rej) => { //res - response, rej - reject
   try {
    let value = 0;
    setTimeout(function() {
        value = 2000;
    }, 1000);

    res = value;
   }
   catch(err) {
    return err;
   }
    
});

const p2 = [];
const p3 = new Promise();

p1.then(res => value).catch(rej => err);

Promise.all([p1, p2, p3]).then(values => {
    
}).catch(err => err);