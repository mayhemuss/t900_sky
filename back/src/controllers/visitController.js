import visitService from "../service/VisitService.js";

class visitController {

  async getOneEntranceVisits(req, res) {
    try {
      const {entranceId} = req.query
      const entrance = await visitService.getOneEntranceVisits({entranceId})
      return await res.json(entrance)
    } catch (error) {
      return res.json(error)
    }
  }

  async getDateVisits(req, res) {
    try {
      const entrance = await visitService.getDateVisitsSumm(req.query)
      return await res.json(entrance)
    } catch (error) {
      return res.json(error)
    }
  }

  async getMaxMinDateVisits(req, res) {
    try {
      const {monterId} = req.query
      const entrance = await visitService.getMaxMinDateVisits(monterId)
      return await res.json(entrance)
    } catch (error) {
      return res.json(error)
    }
  }

}

export default new visitController()
