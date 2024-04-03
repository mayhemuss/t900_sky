import {Visit} from "../models/models.js";
import {Op} from 'sequelize'

class visitController {

  async getOneEntranceVisits(req, res) {
    try {
      const {entranceId} = req.query
      const entrance = await Visit.findAll({where: {entranceId}})
      return await res.json(entrance
        .sort((a, b) =>
          a.date > b.date ? 1 : -1))
    } catch (error) {
      return res.json(error)
    }
  }

  async getDateVisits(req, res) {
    try {
      const {monterId, dateStart, dateEnd} = req.query
      const entrance = await Visit.findAll({where: {monterId, date: {[Op.between]: [dateStart, dateEnd]}}})
      const summ = {
        shieldsOk: 0,
        shieldsNew: 0,
        shieldsReNew: 0,
        mirrorOk: 0,
        mirrorNew: 0,
        mirrorReNew: 0,
        a4: 0,
        visitsCounter: entrance.length
      }
      await entrance.forEach(e => {
          summ.shieldsOk += isNaN(e.shieldsOk) ? 0 : +e.shieldsOk
          summ.shieldsNew += isNaN(e.shieldsNew) ? 0 : +e.shieldsNew
          summ.shieldsReNew += isNaN(e.shieldsReNew) ? 0 : +e.shieldsReNew
          summ.mirrorOk += isNaN(e.mirrorOk) ? 0 : +e.mirrorOk
          summ.mirrorNew += isNaN(e.mirrorNew) ? 0 : +e.mirrorNew
          summ.mirrorReNew += isNaN(e.mirrorReNew) ? 0 : +e.mirrorReNew
          summ.a4 += isNaN(e.a4) ? 0 : +e.a4
        }
      )
      return await res.json(summ)
    } catch (error) {
      return res.json(error)
    }
  }

  async getMaxMinDateVisits(req, res) {
    try {
      const {monterId} = req.query
      const days = new Set()
      const entrance = await Visit.findAll({where: {monterId}})
      entrance.forEach(e => days.add(e.date))
      const dates = Array.from(days).sort((a, b) =>
        a > b ? 1 : -1).slice(1)
      return await res.json({
        maxDate: array[array.length - 1], minDate: array[0], dates
      })
    } catch (error) {
      return res.json(error)
    }
  }

}

export default new visitController()
