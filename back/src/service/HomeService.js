import {Home} from "../models/models.js";
import {Op} from "sequelize";

class HomeService {
  async createHome(req) {
    const {address, numbOfFloors, apartmentsCount, region, date, idFromSky} = req
//     console.log("req")
// console.log(req)
    try {
      const candidateHome = await Home.findOne({where: {address}})
      console.log(candidateHome)
      if (!candidateHome) {
        const id = await Home.create(req)
          
        return await id.id
      } else {
        return await candidateHome?.dataValues?.id
      }
    } catch (error) {
      return {message: error.message};
    }
  }

  async getAllHome(req) {
    try {
      const homes = await Home.findAll()
      return await res.json(homes)
    } catch (error) {
      throw (error)
    }
  }

  async getAllHomeMonters(req) {
    try {
      const {monterId} = req
      const homes = await Home.findAll({monterId})
      return homes
    } catch (error) {
      throw (error)
    }
  }

  async patchHome(req) {
    try {
      const {address, id, region, numbOfFloors, apartmentsCount} = req
      const home = await Home.findOne({id})
      home.address = address
      home.region = region
      home.numbOfFloors = numbOfFloors
      home.apartmentsCount = apartmentsCount
      home.save()
    } catch (error) {
      throw (error)
    }
  }

  async getAllHomeFromId({ids}) {
    try {
      const homes = await Home.findAll({where: {id: {[Op.in]: ids}}})
      return homes
    } catch (error) {
      throw (error)
    }
  }
}


export default new HomeService()
