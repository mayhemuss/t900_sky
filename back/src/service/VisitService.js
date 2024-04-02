import {Home, Visit} from "../models/models.js";
import {DataTypes} from "sequelize";



class VisitService {
  async createVisit(req, entranceId) {
    const {
      date,
      shieldsOk,
      shieldsNew,
      shieldsReNew,
      mirrorOk,
      mirrorNew,
      mirrorReNew,
      stand,
      a4,
    } = req
    try {
      if (date === undefined) return
      const candidateVisit = await Visit.findOne({where: {entranceId, date}})

      if (!candidateVisit) {
        const id = await Visit.create({
          entranceId,
          date,
          shieldsOk,
          shieldsNew,
          shieldsReNew,
          mirrorOk,
          mirrorNew,
          mirrorReNew,
          stand,
          a4,
        })
        return await id.id
      } else {
        return await candidateVisit?.dataValues?.id
      }
    } catch (error) {
      return  {message: error.message};
    }
  }

}


export default new VisitService()
