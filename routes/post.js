const express = require('express');
const Post = require('../models/posts');
const router = express.Router();
router.post('/ajout', (req, res) => {
    let posts = req.body;
    let post = new Post(posts);

  post.save().then(
        (data) => {
            console.log(data);
         
            res.send(data);
        },
        (error) => {
            console.log(error);
            res.send(error);
        }

    )
});
router.get('/getall',(req,res)=>{
    Post.find().then(
         (data)=>{
             res.send(data);
         },
         (err)=>{res.send(err);
         }
     )
     
 });
 router.delete('/delete/:id',(req,res)=>{
    let id =req.params.id;
    Post.findByIdAndDelete({_id:id}).then(
        (deleted)=>{
            res.send(deleted);
        },
        (err)=>{
            res.send(err);
        }
    );
    
});
router.get('/getbyid/:id',(req,res)=>{
    let id = req.params.id;
    Post.findById({_id:id}).then(
        (data)=>{
            res.send(data);
    
        },
        (err)=>{
        res.send(err)
    }
    )
    
    
    });
    router.put('/update/:id',(req,res)=>{
        let id = req.params.id;
        let a =req.body;
       
        Post.findOneAndUpdate(
            {_id:id},
            a,{new:true}
        ).then(
            (updated)=>{
            res.send(updated);},
            (err)=>{
                res.send(err)
            }
        );
        });
module.exports=router;