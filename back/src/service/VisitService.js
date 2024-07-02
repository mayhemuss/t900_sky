import {Visit} from "../models/models.js";
import {Op} from "sequelize";


class VisitService {
  async createVisit(
    {date, comments, ...rest},
    entranceId,
    monterId) {

    try {
      if (date === undefined) return
      const candidateVisit = await Visit
        .findOne({where: {entranceId, date}})

      if (!candidateVisit) {
        const id = await Visit.create({
          entranceId,
          monterId,
          date,
          comments,
          ...rest
        })
        return await id.id
      } else {
        return await candidateVisit?.dataValues?.id
      }
    } catch (error) {
      throw error
    }
  }

  async getOneEntranceVisits({entranceId}) {
    try {
      const entrance = await Visit
        .findAll({where: {entranceId}})
      return entrance
    } catch (error) {
      throw error
    }
  }

  async getDateAllVisits({monterId, dateStart, dateEnd}) {
    try {
      const entrances = await Visit.findAll({where: {monterId, date: {[Op.between]: [dateStart, dateEnd]}}})
      return entrances
    } catch (error) {
      throw error
    }
  }

  async getDateVisitsSumm({monterId, dateStart, dateEnd}) {
    try {
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

      return await summ
    } catch (error) {
      throw error
    }
  }

  async getMaxMinDateVisits(monterId) {
    try {
      const days = new Set()
      const entrance = await Visit
        .findAll({where: {monterId}})
      entrance.forEach(e => days.add(e.date))
      const dates = Array
        .from(days).sort((a, b) =>
          a > b ? 1 : -1).slice(1)
      return {
        maxDate: array[array.length - 1],
        minDate: array[0],
        dates
      }
    } catch (error) {
      throw error
    }

  }

  async Allvisits({dateStart, dateEnd}) {
    try {
      const visitsArray = await Visit.findAll({where: {date: {[Op.between]: [dateStart, dateEnd]}}})
      return await visitsArray
    } catch (error) {
      throw error
    }
  }

}


export default new VisitService()
