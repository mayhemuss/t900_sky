import HomeService from "../service/HomeService.js";


class homeController {

  async createHomes(req, res) {
    try {
      const homes = JSON.parse(req.files.file.data);
      for (const home of homes) {
        const homeId = await HomeService.createHome(home)
      }
      return await res.json("done")
    } catch (error) {
      console.log(error)
    }
  }

  async homeCheck(req, res) {
    try {

      const file = req.files.file
      const homes = JSON.parse(file.data)
      const allHomes = await HomeService.getAllHome()
      const allhom = allHomes.map(home => home.address)
      const clearAddress = new Set(homes.map(e => e.address))
      const notAllowHomes = Array.from(clearAddress).filter(home => {
        return !allhom.includes(home)
      }).sort()
      res.json(notAllowHomes)
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  }

  async homeMonterLink(req, res) {
    try {
      const monterhome = await HomeService.homeMonterLink(req)
      return res.json(monterhome)

    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  }


  async getAllHome(req, res) {
    try {
      const homes = await HomeService.getAllHome()
      return await res.json(homes)
    } catch (error) {
      return res.json(error)
    }
  }

  async getAllHomeMonters(req, res) {
    try {
      const {monterId} = req.query
      const homes = await homeService.getAllHomeMonters(monterId)
      return await res.json(homes)
    } catch (error) {
      return res.json(error)
    }
  }

  async patchHome(req, res) {
    try {
      const home = await homeService.patchHome(req.body)
      return await res.json(home)
    } catch (error) {
      return res.json(error)
    }
  }
}

export default new homeController()
