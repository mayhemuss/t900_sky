import {Home} from "../models/models.js";

class HomeService {
  async createHome(req, monterId) {
    const {address,  numbOfFloors, apartmentsCount, region} = req

    try {
      const candidateHome = await Home.findOne({where: { address}})

      if (!candidateHome) {
        const id = await Home.create({ address, numbOfFloors, apartmentsCount, region, monterId})
        return  await id.id
      } else {
        return  await candidateHome?.dataValues?.id
      }
    } catch (error) {
      return  {message: error.message};
    }
  }

}


export default new HomeService()
