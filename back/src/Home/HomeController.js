import HomeService from './HomeService.js';
import fs from 'fs';

class HomeController {
  async addVisits(req, res) {
    try {
      // console.log(req)
      const file = req.files.file;
      const filePath = `./uploads/${file.name}`;

      await fs.writeFile(filePath, file.data, async (err) => {
        if (err) {
          return res.status(500).send('Ошибка загрузки файла!');
        }

        await fs.readFile(filePath, function (error, data) {
          if (error) {  // если возникла ошибка
            return res.send('jib,rf');
          }

          const promises = JSON.parse(data).map(e => {
            return () => new Promise(async function (resolve) {
              await HomeService.addVisits(e)
              resolve(null)
            });
          })

          async function chain(arr) {
            const result = [];
            for (const item of arr) {
              result.push(await item(result[result.length - 1]));
            }
            fs.unlinkSync(filePath)
          }

          chain(promises)
          res.send('Файл успешно загружен!')
        });
      })
    }


    catch(e){console.log(e)}
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

  async getOneEntrance(req, res) {
    try {
      const entrance = await HomeService.getOneEntrance(req)
      return res.json(entrance)
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

  async getAddressEntranceList(req, res) {
    try {
      const entranceList = await HomeService.getAddressEntranceList(req)
      return res.json(await entranceList);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  }


}

export default new HomeController();
