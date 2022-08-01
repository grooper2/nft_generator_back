import pkg from "canvas";
import fs from 'fs'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const { createCanvas, loadImage } = pkg;

const generateNFT = async (assets, counter, project_id) => {
    const canvas = createCanvas(1000, 1000)
    let layout = canvas.getContext('2d', { alpha: false})

    const backgrounds = assets.filter(asset => asset.asset_type === "background");
    const baseTorsos = assets.filter(asset => asset.asset_type === "base torso");
    const baseHeads = assets.filter(asset => asset.asset_type === "base head");
    const torsos = assets.filter(asset => asset.asset_type === "torso");
    const arms = assets.filter(asset => asset.asset_type === "arms");
    const mouths = assets.filter(asset => asset.asset_type === "mouths");
    const eyes = assets.filter(asset => asset.asset_type === "eyes");
    const accessories = assets.filter(asset => asset.asset_type === "accessories");
    const noses = assets.filter(asset => asset.asset_type === "noses");

    const arrLengths = [backgrounds.length, baseTorsos.length, baseHeads.length, torsos.length, arms.length, mouths.length, eyes.length, accessories.length, noses.length];

    const uploadFolder = `./output/${project_id}/`;

    const maxNfts = backgrounds.length * baseTorsos.length* baseHeads.length* torsos.length* arms.length* mouths.length* eyes.length* accessories.length * noses.length

    let nfts = []
    let date_ob = new Date();

    console.log("this is max size -------->>> " + maxNfts)
    
    if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder);
    }

    const nftsInAFolder = () => {
        return new Promise( resolve => {
            fs.readdir(uploadFolder, (err, files) => {
                try {
                    resolve(files) 
                } catch (error) {
                    console.log(error)
                }
            });
        })
    }

    async function fileReader() {
        console.log('=========== reading ==========')

        const getRandomAssets = () =>{
            let randomAssets = [];
            for(let i=0; i<9; i++){
                let randomNumber = Math.floor(0 + Math.random() * arrLengths[i]);
        
                randomAssets.push(randomNumber);
            }
            return randomAssets
        }
    
    
        const dna = (randomAssets) => {
            let subString1 = backgrounds[randomAssets[0]].asset_id
            let subString2 = baseTorsos[randomAssets[1]].asset_id
            let subString3 = baseHeads[randomAssets[2]].asset_id
            let subString4 = torsos[randomAssets[3]].asset_id 
            let subString5 = arms[randomAssets[4]].asset_id
            let subString6 = mouths[randomAssets[5]].asset_id
            let subString7 = eyes[randomAssets[6]].asset_id
            let subString8 = accessories[randomAssets[7]].asset_id
            let subString9 = noses[randomAssets[8]].asset_id
    
            let filename =  subString1.substring(0, 13) + 
                            subString2.substring(0, 13) + 
                            subString3.substring(0, 13) + 
                            subString4.substring(0, 13) + 
                            subString5.substring(0, 13) + 
                            subString6.substring(0, 13) + 
                            subString7.substring(0, 13) + 
                            subString8.substring(0, 13) + 
                            subString9.substring(0, 13) + '.png'
            return filename
        }
        const results = await nftsInAFolder()

        // to be implemented
        if(maxNfts === results.length ){
            return "You generated all the NFT's that was possible for this project"
        }else{
            let i=0;
            while( i < counter){
                const newResults = await nftsInAFolder()
                const randomAssets = getRandomAssets()
                const filename = dna(randomAssets)
                console.log(i + " - " + counter)

                if(maxNfts !== newResults.length){
        
                    if(newResults.indexOf(filename) > -1) {
                        console.log("--------------->>> We found duplicate <<<--------------- " + i)
                        
                    }else{
        
                        const image= await loadImage(`${backgrounds[randomAssets[0]].image_file}`)
                        layout.drawImage(image, 0, 0)
                            
            
                        const image1 = await loadImage(`${baseTorsos[randomAssets[1]].image_file}`)
                        layout.drawImage(image1, 0, 0)
                            
            
                        const image2 = await loadImage(`${baseHeads[randomAssets[2]].image_file}`)
                        layout.drawImage(image2, 0, 0)
                            
            
                        const image3 = await loadImage(`${torsos[randomAssets[3]].image_file}`)
                        layout.drawImage(image3, 0, 0)
                            
            
                        const image4 = await loadImage(`${arms[randomAssets[4]].image_file}`)
                        layout.drawImage(image4, 0, 0)
            
                        const image5 = await loadImage(`${mouths[randomAssets[5]].image_file}`)
                        layout.drawImage(image5, 0, 0)
            
                        const image6 = await loadImage(`${eyes[randomAssets[6]].image_file}`)
                        layout.drawImage(image6, 0, 0)
            
                        const image7 = await loadImage(`${accessories[randomAssets[7]].image_file}`)
                        layout.drawImage(image7, 0, 0)
            
                        const image8 = await loadImage(`${noses[randomAssets[8]].image_file}`)
                        layout.drawImage(image8, 0, 0)
            
                        let filetype = "image/png";
        
                        fs.writeFileSync(`./output/${project_id}/${filename}`, canvas.toBuffer(filetype));

                        const nft_obj = {
                            project_id: project_id,
                            nft_name: filename,
                            nft_file: `./output/${project_id}/${filename}`,
                            date_created: date_ob
                        }

                        nfts.push(nft_obj)
                        
                        console.log("created one here ----------> " + i)

                        i++;
                    }
                }else{
                    console.log("max number of nft's reached")
                    break
                }
            }
        }

        console.log('=========== finished reading ==========')
        console.log('this is my nfts ----------------------->', nfts)
        nfts.map(async (nft) => {
            const files = await prisma.users_nfts.createMany({
                data:[
                    nft
                ]
            })
        })
        return results
    }

    return fileReader()

}

export { generateNFT };