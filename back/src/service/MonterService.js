import {Monter} from "../models/models.js";

class MonterService {
  async createMonter(req, res) {
    const {name} = req
    try {
      const candidateMonter = await Monter.findOne({
        where: {
          name
        }
      })

      if (!candidateMonter) {
        const id = await Monter.create({name})

        return await id.id
      } else {
        return await candidateMonter?.dataValues?.id
      }
    } catch (error) {
     return  {message: error.message};
    }
  }

}


export default new MonterService()
