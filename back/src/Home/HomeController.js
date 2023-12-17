import HomeService from './HomeService.js';

async function perebor(inp) {
  const home = await HomeService.addVisits(inp)
  return home
}

class HomeController {
  async addVisits(req, res) {
    const body = req.body
    // console.log(body)
    try {
      const body = req.body

      for (let i = 0; i < body.length;) {
        await perebor(body[i])
        await i++
      }
      return res.json({message: "done"});
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  }

  async getMonterAddress(req, res) {
    // console.log(req.query.name)
    try {
      const search = req.body.name;
      const home = await HomeService.getMonterAddress(req);

      return res.json(await home);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  }


  async getAllMonter(req, res) {
    try {
      const monter = await HomeService.getAllMonter();
      return res.json(await monter);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  }


}

export default new HomeController();
