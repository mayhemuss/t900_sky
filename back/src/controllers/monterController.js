import {Monter} from "../models/models.js";

class monterController {

  async getAllMonter(req, res) {
    try {
      const monters = await Monter.findAll()
      return res.json(monters)
    } catch (error) {
      return res.json(error)
    }
  }

  async patchMonter(req, res) {
    try {
      const {name, id} = req.body
      const monter = await Monter.findOne({id})
      monter.name = name
      monter.save()
      return res.json(monter)
    } catch (error) {
      return res.json(error)
    }
  }
}

export default new monterController()
