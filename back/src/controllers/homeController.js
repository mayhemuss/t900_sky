import {Home} from "../models/models.js";

class homeController {

  async getAllHome(req, res) {
    try {
      const homes = await Home.findAll()
      return await res.json(homes)
    } catch (error) {
      return res.json(error)
    }
  }

  async getAllHomeMonters(req, res) {
    try {
      const {monterId} = req.query
      const homes = await Home.findAll({where: {monterId}})
      return await res.json(homes)
    } catch (error) {
      return res.json(error)
    }
  }

  async patchHome(req, res) {
    try {
      const {address, id, region, numbOfFloors, apartmentsCount} = req.body
      const home = await Home.findOne({id})
      home.address = address
      home.region = region
      home.numbOfFloors = numbOfFloors
      home.apartmentsCount = apartmentsCount

      home.save()
      return res.json(home)
    } catch (error) {
      return res.json(error)
    }
  }
}

export default new homeController()
