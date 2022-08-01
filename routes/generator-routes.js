import express from 'express'
import multer from 'multer'
import { authenticateToken, currentUser } from '../middleware/authorization.js'
import { generateNFT } from '../src/generate.js'
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

let date_ob = new Date();

router.get('/get_all_user_projects',authenticateToken, async (req,res) =>{
    try{
        
        const users_projects = await prisma.users_projects.findMany({
          where: {
              id: currentUser.user_id
          }
        })

        res.json({userProject: users_projects});
    } catch(error){
        res.status(500).json({error:error.message});
    }
});

router.post('/create_project', authenticateToken, async (req,res) =>{
    try{
        const newUserProject = await prisma.users_projects.create({
          data: {
            id : currentUser.user_id,
            project_title: req.body.project_title,
            date_created: date_ob
          }
        })
        
        res.json("You have succesfully created a new project");
    } catch(error){
        res.status(500).json({error:error.message});
    }
});

router.post('/delete_project', authenticateToken, async (req,res) =>{
    try{
      const deleteProject = await prisma.users_projects.delete({
        where:{
          project_id: req.body.project_id
        }
      })
      
      res.json("project " + req.body.project_id + " has been deleted")

    }catch(error){
        res.status(500).json({error:error.message});
    }
})
//Accessories

const accessories = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null,'./input/Accessories/original')},
    filename: (req, file, cb)=>{
      const { originalname} = file;
      cb(null, originalname);
    }
    
  });
  const upload_accessories = multer(
    {storage: accessories, maxCount: 5}
  );

router.post('/upload_accessories', upload_accessories.array('accessories'), authenticateToken, async(req,res) =>{
    try{

          const uploadfiles = req.files.map((file) => {
            return {
              project_id: req.body.project_id,
              asset_type: "accessories",
              image_name: file.originalname+ '-' + Date.now() + '-' + Math.round(Math.random() * 19),
              image_file: file.path,
              date_created: date_ob
            }
          })

          uploadfiles.map(async (file) => {
            const files = await prisma.assets.createMany({
              data:[
                file
              ]
            })
          })
        
        res.json("ACCESSORIES UPLOADED SUCCEFULLY")

    }catch(error){
        res.status(500).json({error:error.message});
    }
})

//Arms
const arms = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null,'./input/Arms/original')},
    filename: (req, file, cb)=>{
      const { originalname} = file;
      cb(null, originalname);
    }
    
  });
  const upload_arms = multer(
    {storage: arms, maxCount: 5}
  );

router.post('/upload_arms', upload_arms.array('arms'), authenticateToken, async(req,res) =>{
    try{
      const uploadfiles = req.files.map((file) => {
        return {
          project_id: req.body.project_id,
          asset_type: "arms",
          image_name: file.originalname+ '-' + Date.now() + '-' + Math.round(Math.random() * 19),
          image_file: file.path,
          date_created: date_ob
        }
      })

      uploadfiles.map(async (file) => {
        const files = await prisma.assets.createMany({
          data:[
            file
          ]
        })
      })
        
        res.json("ARMS UPLOADED SUCCEFULLY")

    }catch(error){
        res.status(500).json({error:error.message});
    }
})

//Background
const background = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null,'./input/Background/original')},
    filename: (req, file, cb)=>{
      const { originalname} = file;
      cb(null, originalname);
    }
    
  });
  const upload_background = multer(
    {storage: background, maxCount: 5}
  );

router.post('/upload_background', upload_background.array('background'), authenticateToken, async(req,res) =>{
    try{
      const uploadfiles = req.files.map((file) => {
        return {
          project_id: req.body.project_id,
          asset_type: "background",
          image_name: file.originalname+ '-' + Date.now() + '-' + Math.round(Math.random() * 19),
          image_file: file.path,
          date_created: date_ob
        }
      })

      uploadfiles.map(async (file) => {
        const files = await prisma.assets.createMany({
          data:[
            file
          ]
        })
      })
        
        res.json("BACKGROUND UPLOADED SUCCEFULLY")

    }catch(error){
        res.status(500).json({error:error.message});
    }
});

//Base Head
const base_head = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null,'./input/Base Head/original')},
    filename: (req, file, cb)=>{
      const { originalname} = file;
      cb(null, originalname);
    }
    
  });
  const upload_base_head = multer(
    {storage: base_head, maxCount: 5}
  );

router.post('/upload_base_head', upload_base_head.array('base_head'), authenticateToken, async(req,res) =>{
    try{
      const uploadfiles = req.files.map((file) => {
        return {
          project_id: req.body.project_id,
          asset_type: "base head",
          image_name: file.originalname+ '-' + Date.now() + '-' + Math.round(Math.random() * 19),
          image_file: file.path,
          date_created: date_ob
        }
      })

      uploadfiles.map(async (file) => {
        const files = await prisma.assets.createMany({
          data:[
            file
          ]
        })
      })
        
        res.json("BASE HEAD UPLOADED SUCCEFULLY")

    }catch(error){
        res.status(500).json({error:error.message});
    }
});

//Based Torso
const base_torso = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null,'./input/Base Torso/original')},
    filename: (req, file, cb)=>{
      const { originalname} = file;
      cb(null, originalname);
    }
    
  });
  const upload_base_torso = multer(
    {storage: base_torso, maxCount: 5}
  );

router.post('/upload_base_torso', upload_base_torso.array('base_torso'), authenticateToken, async(req,res) =>{
    try{
      const uploadfiles = req.files.map((file) => {
        return {
          project_id: req.body.project_id,
          asset_type: "base torso",
          image_name: file.originalname+ '-' + Date.now() + '-' + Math.round(Math.random() * 19),
          image_file: file.path,
          date_created: date_ob
        }
      })

      uploadfiles.map(async (file) => {
        const files = await prisma.assets.createMany({
          data:[
            file
          ]
        })
      })
        
        res.json("BASE TORSO UPLOADED SUCCEFULLY")

    }catch(error){
        res.status(500).json({error:error.message});
    }
}); 

//Eyes
const eyes = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null,'./input/Eyes/original')},
    filename: (req, file, cb)=>{
      const { originalname} = file;
      cb(null, originalname);
    }
    
  });
  const upload_eyes = multer(
    {storage: eyes, maxCount: 5}
  );

router.post('/upload_eyes', upload_eyes.array('eyes'), authenticateToken, async(req,res) =>{
    try{
      const uploadfiles = req.files.map((file) => {
        return {
          project_id: req.body.project_id,
          asset_type: "eyes",
          image_name: file.originalname+ '-' + Date.now() + '-' + Math.round(Math.random() * 19),
          image_file: file.path,
          date_created: date_ob
        }
      })

      uploadfiles.map(async (file) => {
        const files = await prisma.assets.createMany({
          data:[
            file
          ]
        })
      })
        
        res.json("EYES UPLOADED SUCCEFULLY")

    }catch(error){
        res.status(500).json({error:error.message});
    }
});

//Mouths
const mouths = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null,'./input/mouths/original')},
    filename: (req, file, cb)=>{
      const { originalname} = file;
      cb(null, originalname);
    }
    
  });
  const upload_mouths = multer(
    {storage: mouths, maxCount: 5}
  );

router.post('/upload_mouths', upload_mouths.array('mouths'), authenticateToken, async(req,res) =>{
    try{
      const uploadfiles = req.files.map((file) => {
        return {
          project_id: req.body.project_id,
          asset_type: "mouths",
          image_name: file.originalname+ '-' + Date.now() + '-' + Math.round(Math.random() * 19),
          image_file: file.path,
          date_created: date_ob
        }
      })

      uploadfiles.map(async (file) => {
        const files = await prisma.assets.createMany({
          data:[
            file
          ]
        })
      })
        
        res.json("MOUTHS UPLOADED SUCCEFULLY")

    }catch(error){
        res.status(500).json({error:error.message});
    }
});

//Noses
const noses = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null,'./input/Noses/original')},
    filename: (req, file, cb)=>{
      const { originalname} = file;
      cb(null, originalname);
    }
    
  });
  const upload_noses = multer(
    {storage: noses, maxCount: 5}
  );

router.post('/upload_noses', upload_noses.array('noses'), authenticateToken, async(req,res) =>{
    try{
      const uploadfiles = req.files.map((file) => {
        return {
          project_id: req.body.project_id,
          asset_type: "noses",
          image_name: file.originalname+ '-' + Date.now() + '-' + Math.round(Math.random() * 19),
          image_file: file.path,
          date_created: date_ob
        }
      })

      uploadfiles.map(async (file) => {
        const files = await prisma.assets.createMany({
          data:[
            file
          ]
        })
      })
        
        res.json("NOSES UPLOADED SUCCEFULLY")

    }catch(error){
        res.status(500).json({error:error.message});
    }
});

//Torso
const torso = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null,'./input/Torso/original')},
    filename: (req, file, cb)=>{
      const { originalname} = file;
      cb(null, originalname);
    }
    
  });
  const upload_torso = multer(
    {storage: torso, maxCount: 5}
  );

router.post('/upload_torso', upload_torso.array('torso'), authenticateToken, async(req,res) =>{
    try{
      const uploadfiles = req.files.map((file) => {
        return {
          project_id: req.body.project_id,
          asset_type: "torso",
          image_name: file.originalname+ '-' + Date.now() + '-' + Math.round(Math.random() * 19),
          image_file: file.path,
          date_created: date_ob
        }
      })

      uploadfiles.map(async (file) => {
        const files = await prisma.assets.createMany({
          data:[
            file
          ]
        })
      })
        
        res.json("TORSO UPLOADED SUCCEFULLY")

    }catch(error){
        res.status(500).json({error:error.message});
    }
});

//general api calls for assets

router.post('/get_project_assets', authenticateToken, async(req, res)=>{
    try {
      const project_assets = await prisma.assets.findMany({
        where: {
            project_id: req.body.project_id
        }
      })

      res.json({projectAssets: project_assets})
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

router.post('/delete_asset', authenticateToken, async (req,res) =>{
    try{
      const deleteAsset = await prisma.assets.delete({
        where:{
          asset_id: req.body.asset_id
        }
      })
            res.json("Asset with id " + req.body.asset_id + " has been deleted")
    }catch(error){
        res.status(500).json({error:error.message});
    }
});

router.post('/generate_project_nfts', authenticateToken, async (req, res)=>{
    try {
      const project_assets = await prisma.assets.findMany({
        where: {
            project_id: req.body.project_id
        }
      })
     
    const generatedNFT = generateNFT(project_assets, req.body.counter, req.body.project_id)
    
    res.json(generatedNFT)
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});


export default router;
