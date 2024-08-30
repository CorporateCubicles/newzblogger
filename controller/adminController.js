const blogController1 = async(req, res)=>{
    res.send('1st controller');
}

const blogController2 = async(req, res)=>{
    res.send('2nd controller');
}

const blogController3 = async(req, res)=>{
    res.send('3rd controller');
}

module.exports= { 
    blogController1,
    blogController2,
    blogController3
}