import {Entrance} from "../models/models.js";
import {Op} from "sequelize"


class EntranceService {
  async createEntrance(req, homeId) {
    const {numberOfEntrance} = req
    try {
      const candidateEntrance = await Entrance.findOne({where:{homeId, numberOfEntrance: String(numberOfEntrance)}})
      if (!candidateEntrance) {
        const id = await Entrance.create({numberOfEntrance: String(numberOfEntrance), homeId})
        return await id.id
      } else {
        return await candidateEntrance?.dataValues?.id
      }
    } catch (error) {
      return {message: error.message};
    }
  }

  async getAllHomeEntrance(req) {
    const {homeId} = req
    try {
      const entrances = await Entrance.findAll({where: {homeId}})
      return entrances
    } catch (error) {
      throw error
    }
  }

  async getEntrancesFromId({ids}) {
    try {
      const entrances = await Entrance
        .findAll({where:{ id:{[Op.in]:ids}}})
      return entrances
    } catch (error) {
      throw error
    }
  }

}


export default new EntranceService()
