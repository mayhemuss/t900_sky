import monterService from "../service/MonterService.js";
import homeService from "../service/HomeService.js";
import HomeService from "../service/HomeService.js";
import entranceService from "../service/EntranceService.js";
import visitService from "../service/VisitService.js";
import VisitService from "../service/VisitService.js";

class monterController {

  async createMonters(req, res) {
    try {
      for (const name of req.body) {
        const monters = await monterService.createMonter({name})
      }


      return res.json("done")
    } catch (error) {
      return res.json(error)
    }
  }

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
      const {monterId, dateStart, dateEnd, limit, page} = req.query
      const name = await monterService
        .getMonterName({id: monterId})
      const result = {name: name.name, homes: {}}
      const visits = await visitService
        .getDateAllVisits({
          monterId, dateStart, dateEnd
        })
      if (visits.length == 0) return res
        .status(200)
        .json({
          "name": "Синюшкин",
          "homes": {
            "дом не найден": {
              "home": {
                "id": 0,
                "address": "дом не найден",
                "region": "дом не найден",
                "date": "0000-00-00",

              },
              "entrances": {
                "1": [
                  {
                    "id": 0,
                    "date": "0000-00-00",
                    "comments": 'дом не найден',

                    "entranceId": 0,
                    "monterId": 1
                  }]
              }
            }
          }
        })
      await visits.forEach(visit => uniqueEntranceId
        .add(visit.entranceId))

      const entrances = await entranceService
        .getEntrancesFromId({
          ids: await Array
            .from(uniqueEntranceId)
        })
      await entrances.forEach(entrance => uniqueHomeId
        .add(entrance.homeId))

      const homes = await homeService
        .getAllHomeFromId({
          ids: Array
            .from(uniqueHomeId)
        })
      result.count = homes.length
      const start = +limit * +page
      const end = start + +limit
      const filtredHomes = homes
        .sort((a, b) => {
          return a.address - b.address;
        })
        .slice(start, end)

      for (const home of filtredHomes) {
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
    } catch
      (error) {
      console.log(error)
      res.status(500).json({message: error.message});
    }
  }

  async montersHome(req, res) {
    try {


      const {monterId, dateStart, dateEnd, limit, page} = req.query
      const result = {homes: {}}
      const name = await monterService
        .getMonterName({id: monterId})
      result.name = name.name
      const home_monterIDs = await HomeService
        .findHome_monter({monterId})
      const homes = await HomeService.getAllHomeFromId({ids: home_monterIDs})
      const sortedHome = homes.sort((a, b) => {
        return a.address - b.address;
      })
      const start = +limit * +page
      const end = start + +limit
      const homesPart = sortedHome.slice(start, end)
      for (const home of homesPart) {
        const address = await home.address
        result.homes[address] = {home}
        result.homes[address].entrances = {}
        const entrances = await entranceService
          .getAllHomeEntrance({homeId: home.id})
        for (const entrance of entrances) {
          const numberOfEntrance = await entrance.numberOfEntrance
          const entranceId = await entrance.id
          result.homes[address].entrances[numberOfEntrance] ??= await []
          const visits = await VisitService
            .getDateAllVisits({
              monterId, entranceId, dateStart, dateEnd
            })
          result.homes[address].entrances[numberOfEntrance] = visits
        }
      }


      result.count = home_monterIDs.length

      return await res.json(await result)
    } catch (error) {
      console.log(error)
      res.status(500).json({message: error.message});
    }
  }

}

export default new

monterController()
