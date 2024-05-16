import {Home} from "../models/models.js";
import HomeService from "../service/HomeService.js";
import homeService from "../service/HomeService.js";

class homeController {

  async createHomes(req,res){
    try {
      const homes = JSON.parse(req.files.file.data);

      const inserIntoDataBase = async (data) => {
        try {
          for(const home of homes ){
            const homeId = await HomeService.createHome(home)
         }
          // fs.unlinkSync(filePath)
          res.send('Файл успешно загружен!')
          console.log('Файл успешно загружен!')

        } catch (error) {
          console.log(error)
          // fs.unlinkSync(filePath)
          res.status(500).json(error);
        }

      };

      inserIntoDataBase(homes);



      
      // console.log(homes)
       
       
      //  return await res.json("done")
    } catch (error) {
      console.log(error)
    }
    
  }

  async getAllHome(req, res) {
    try {
      const homes = await HomeService.getAllHome()
      return await res.json(homes)
    } catch (error) {
      return res.json(error)
    }
  }

  async getAllHomeMonters(req, res) {
    try {
      const {monterId} = req.query
      const homes = await homeService.getAllHomeMonters(monterId)
      return await res.json(homes)
    } catch (error) {
      return res.json(error)
    }
  }

  async patchHome(req, res) {
    try {
      const home = await homeService.patchHome(req.body)
      return await res.json(home)
    } catch (error) {
      return res.json(error)
    }
  }
}

export default new homeController()
