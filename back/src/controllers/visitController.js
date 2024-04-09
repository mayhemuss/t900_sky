import MonterService from "../service/MonterService.js";
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
      const {monterId, dateStart, dateEnd} = req.query
      const name = await MonterService.getMonterName({id : +monterId})
      const entrance = await visitService.getDateVisitsSumm({monterId, dateStart, dateEnd})
      return await res.json(await {entrance , name: name.name})
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
