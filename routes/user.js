const express = require('express');
const Admin = require('../models/users_model');
const bcrypt = require('bcrypt');
const jwt = require( 'jsonwebtoken');
const res = require('express/lib/response');
const router=express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - name
 *         - lastname
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *         lastname:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum:
 *             - admin
 *             - user
 */

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin user endpoints
 * 
 * /admin:
 *   post:
 *     summary: Create a new admin user
 *     description: Create a new admin user with a name, lastname, email, password, and role.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       '201':
 *         description: Admin user created successfully
 *       '400':
 *         description: Bad request
 */

router.post('/register',(req,res)=>{
    let adminfrombody=req.body;
    let admin = new Admin(adminfrombody);
    //cryptage
    let Key =bcrypt.genSaltSync(10);
    admin.password=bcrypt.hashSync(adminfrombody.password,Key);
    admin.save().then(
        (data)=>{
            filename = '';
            res.send(data);
        },
        (err)=>{
            res.send(err);
        }
    )
    });
    //login
    router.post('/login',(req,res)=>{
        let adminData=req.body;
    
        Admin.findOne({email:adminData.email}).then(
            (data)=>{
              
                let validPass=bcrypt.compareSync(adminData.password,data.password);
                if(validPass == false){
                    console.log(validPass);
                    res.send('email or pass incorrect')
                }else{
                    let token = jwt.sign({_id : data._id, email: data.email, role:data.role},'123@456');
                    res.send({myToken :token});
                }
            },
            (err)=>{
                res.send('email or pass invalid')
            }
        )
        
        
        
    });
    module.exports=router;