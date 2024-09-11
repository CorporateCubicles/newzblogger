const Post = require('../model/postModel')


const loadBlogs = async(req, res) =>{
    try{

        const posts = await Post.find({});
        res.render('blog', {posts: posts});

    } catch(error){
        console.log(error.message);

    }
}

module.exports = {
    loadBlogs
}