import {Home} from "../models/models.js";
import HomeService from "../service/HomeService.js";
import homeService from "../service/HomeService.js";

class homeController {

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
