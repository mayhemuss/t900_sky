import monterService from "../service/MonterService.js";
import homeService from "../service/HomeService.js";
import entranceService from "../service/EntranceService.js";
import visitService from "../service/VisitService.js";

class monterController {

  async getAllMonter(req, res) {
    try {
      const monters = await monterService.getAllMonter()
      return res.json(monters)
    } catch (error) {
      return res.json(error)
    }
  }

  async patchMonter(req, res) {
    try {
      const {name, id} = req.body
      const monter = await monterService.patchMonter({name, id})
      return res.json(monter)
    } catch (error) {
      return res.json(error)
    }
  }

  async montersAllVisits(req, res) {
    try {
      const {monterId} = req.query
      const result = {}
      const homes = await homeService.getAllHomeMonters({monterId})
      for (const home of homes) {
        const entrances = await entranceService
          .getAllHomeEntrance({homeId: home.id})
        for (const entrance of entrances) {
          const visits = await visitService
            .getOneEntranceVisits({entranceId: entrance.id})
          if (visits) {
            result[home.address] ??= {};
            result[home.address][entrance.numberOfEntrance] = visits;
          }
        }
      }
      return await res.json(result)
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  }

  async montersDateVisits(req, res) {
    try {

      const uniqueEntranceId = new Set()
      const uniqueHomeId = new Set()
      const {monterId, dateStart, dateEnd} = req.query
      const name = await monterService.getMonterName({id: monterId})
      const result = {name: name.name, homes:{}}
      const visits = await visitService
        .getDateAllVisits({monterId, dateStart, dateEnd})
      if (visits.length == 0) return res
        .status(400)
        .json({message: "not found"})
      await visits.forEach(visit => uniqueEntranceId.add(visit.entranceId))

      const entrances = await entranceService
        .getEntrancesFromId({ids: await Array.from(uniqueEntranceId)})
      await entrances.forEach(entrance => uniqueHomeId.add(entrance.homeId))

      const homes = await homeService
        .getAllHomeFromId({ids: Array.from(uniqueHomeId)})

      for (const home of homes) {
        result.homes[home.address] ??= {home, entrances: {}}

        const filtredEntrance = entrances
          .filter(entrance => entrance.homeId == home.id)

        for (const entrance of filtredEntrance) {

          const filtredVisits = visits
            .filter(visit => visit.entranceId == entrance.id)

          result.homes[home.address]
            .entrances[entrance.numberOfEntrance] =
            filtredVisits
              .sort((a, b) => a.date > b.date ? -1 : 1)
        }
      }
      return await res.json(result)
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  }

}

export default new monterController()
