import {Home, Monter, MonterHome} from "../models/models.js";
import {Op} from "sequelize";

class HomeService {
  async createHome(req) {
    const {address} = req
    try {
      const candidateHome = await Home.findOne({where: {address}})

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

  async homeMonterLink(req) {
    try {

      const {address, name, homeId, monterId} = req.body
      if (homeId && monterId) {
        const monterhome = await MonterHome.create({
          homeId: home.dataValues.id,
          monterId: monter.id
        })
        return monterhome
      } else {
        const home = await Home.findOne({where: {address}})
        const monter = await Monter.findOne({where: {name}})
        if (!home?.dataValues?.id) {
          return {message: "дом не найден"}
        }
        if (!monter?.id) {
          return {message: "монтажник не найден"}
        }
        const monterhome = await MonterHome.create({
          homeId: home.dataValues.id,
          monterId: monter.id
        })
        return monterhome
      }
    } catch (error) {
      return {message: error.message};
    }
  }

  async home_Monter(req) {
    try {
      const {monterId, homeId} = req
      const monter_home = await MonterHome.findOne({where: {monterId, homeId}})
      if (monter_home) {
        return monter_home.id
      } else {
        const monterhome = await MonterHome.create({monterId, homeId})
        return monterhome.id
      }
    } catch (error) {
      throw (error)
    }
  }

  async findHome_monter({monterId}) {

    try {
      const monter_home = await MonterHome.findAll({where: {monterId}})
      return monter_home.map(elem=>elem.homeId)
    } catch (error) {
      throw (error)
    }
  }


  async getAllHome(req) {
    try {
      const homes = await Home.findAll()
      return homes
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
