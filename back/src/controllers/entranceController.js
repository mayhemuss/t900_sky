import {Entrance} from "../models/models.js";

class entranceController {

  async getHomeEntrance (req, res) {
    try {
      const {homeId} = req.query
      const entrance = await Entrance.findAll({where: {homeId}})
      return await res.json(entrance)
    } catch (error) {
      return res.json(error)
    }
  }
}

export default new entranceController()
