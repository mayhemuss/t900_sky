import pool from "../db.js"

class monterController {
    async createMonter(req,res){
     try {
      const newMonter = await pool.query('INSERT INTO monter (name) values ($1) RETURNING * ;', ['кирилюк'])
      res.json(newMonter)
     } catch (error) {
        console.log(error)
      
     }
      
    }
}

export default new monterController()