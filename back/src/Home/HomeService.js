import VisitList from './VisitList.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import MonterList from "./MonterList.js";
import AddressEntranceList from "./AddressEntranceList.js";
import fs from "fs";

const generateAccessToken = (id, name) => {
  const payload = {id, name};
  return jwt.sign(payload, config.secret, {expiresIn: '24h'});
};


const parseDate = (rawDate) => {

  // return new Date(rawDate)
  return rawDate
}


class HomeService {

  async addVisits(req) {


    try {




      const {
        address,
        numberOfEntrance,
        date, name, ...rest
      } = req;
      // console.log(req)

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
        name,
      })
      if (!candidateAddress) {
        const add = new AddressEntranceList({
          address,
          numberOfEntrance, name
        })
        await add.save()
      }
      const candidateVisits = await VisitList.findOne({
        address,
        numberOfEntrance,
        date,
      });
      if (!candidateVisits) {
        const home = new VisitList({
          address,
          numberOfEntrance, name,
          date, ...rest
        })

        await home.save();
        return home
      } else {
        return candidateVisits
      }
      return {message: "done"}


    } catch (error) {
      return console.log({message: error.message})
    }
  }



  async getOneEntrance(req) {
    const body = req.query
    // console.log(body)
    const {address, numberOfEntrance, dateStart, dateEnd} = body
    const dst = parseDate(dateStart)
    const den = parseDate(dateEnd)

    const date = {}

    const home = await VisitList.find({
      address,
      numberOfEntrance,
      date: dateStart ? {"$gte": dateStart, "$lte": dateEnd} : {"$gte": "2000-01-01"}
    })
    // console.log(await home)
    return home
  }

  async getMonterAddress(req) {
    let set = new Set
    const {name} = req.query
    const home = await AddressEntranceList.find({name})
    // console.log(await home)
    await home.forEach((elem) => {
      // console.log(elem);
      set.add(elem.address)
    })
    // console.log(await set)
    return await Array.from(set)
  }

  async getAddressEntranceList(req) {
    const address = req.query.address
    const entrance = await AddressEntranceList.find({address})
    const arr = []
    await entrance.forEach((elem) => arr.push(elem.numberOfEntrance))
    console.log(await arr)
    return await {address, entranceList: arr}
  }

  async getAllMonter() {
    const monter = await MonterList.find()
    const arr = new Set
    await monter.forEach(elem => {
      arr.add(elem.name)
    })
    return await {monterList: Array.from(arr)}
  }

}

export default new HomeService();
