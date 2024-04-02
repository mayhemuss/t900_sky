import {Entrance, Home} from "../models/models.js";



class EntranceService {
  async createEntrance(req, homeId) {
    const {numberOfEntrance} = req
    try {
      const candidateEntrance = await Entrance.findOne({where: {homeId, numberOfEntrance: String(numberOfEntrance)}})

      if (!candidateEntrance) {
        const id = await Entrance.create({numberOfEntrance: String(numberOfEntrance), homeId})
        return await id.id
      } else {
        return await candidateEntrance?.dataValues?.id
      }
    } catch (error) {
      return  {message: error.message};
    }
  }

}


export default new EntranceService()
