import {Monter} from "../models/models.js";

class MonterService {
  async createMonter({name}) {
    // const {name} = req
    try {
      const candidateMonter = await Monter.findOne( {where: {name}})
      // console.log(await candidateMonter?.dataValues?.id)
      if (!candidateMonter) {
        const id = await Monter.create({name})

        return await id.id
      } else {
        return await candidateMonter?.dataValues?.id
      }
    } catch (error) {
      return {message: error.message};
    }
  }

  async getAllMonter() {
    try {
      const monters = await Monter.findAll()
      return monters
    } catch (error) {
      throw error
    }
  }

  async patchMonter({name, id}) {
    try {
      const monter = await Monter.findOne({id})
      monter.name = name
      await monter.save()
      return await monter
    } catch (error) {
      throw error
    }
  }

  async getMonterName(req) {
    try {
      const {id} = req
      console.log({id})
      const monter = await Monter.findOne({where:{id}})
      return monter
    } catch (error) {
      throw error
    }
  }

}


export default new MonterService()
