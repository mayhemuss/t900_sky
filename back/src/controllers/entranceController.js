import EntranceService from "../service/EntranceService.js";

class entranceController {

  async getHomeEntrance (req, res) {
    try {
      const {homeId} = req.query
      const entrance = await EntranceService.getAllHomeEntrance(homeId)
      return await res.json(entrance)
    } catch (error) {
      return res.json(error)
    }
  }
}

export default new entranceController()
