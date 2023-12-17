import VisitList from './VisitList.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import MonterList from "./MonterList.js";
import AddressEntranceList from "./AddressEntranceList.js";

const generateAccessToken = (id, name) => {
  const payload = {id, name};
  return jwt.sign(payload, config.secret, {expiresIn: '24h'});
};


const parseDate = (rawDate) => {
  if (rawDate) {
    return new Date(rawDate + "\/12:00")
  }
  return "нет даты " + Math.random()
}


class HomeService {
  async addVisits(req) {
    const {
      address,
      numberOfEntrance,
      date, name, ...rest
    } = req;
    const candidateName = await MonterList.findOne({name})
    if (!candidateName) {
      const monter = new MonterList({
        name
      })
      await monter.save();
    }
    const candidateAddress = await AddressEntranceList.findOne({
      address,
      numberOfEntrance,
    })
    if (!candidateAddress) {
      const add = new AddressEntranceList({
        address,
        numberOfEntrance,
      })
      await add.save()
    }
    const candidateVisits = await VisitList.findOne({
      address,
      numberOfEntrance,
      date: parseDate(date),
    });
    if (!candidateVisits) {
      const home = new VisitList({
        address,
        numberOfEntrance, name,
        date: parseDate(date), ...rest
      })

      await home.save();
      return home
    } else {
      return candidateVisits
    }
    return {message: "done"}
  }

  async getHome(req) {
    const body = req.body
    const {name, address, numberOfEntrance, date} = body
    const home = VisitList.find({name, address})
  }

  async getMonterAddress(req) {
    let set = new Set
    const {name} = req.query
    const home = await VisitList.find({name})
    // console.log(await home)
    await home.forEach((elem) => {
      // console.log(elem);
      set.add(elem.address)
    })
    // console.log(await set)
    return await Array.from(set)
  }

  async getAllMonter() {
    const monter = await MonterList.find()
    return await monter
  }

}

export default new HomeService();
