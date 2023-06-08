const { getUnitsService, createUnitService } = require("../services/unit.service")
const responseGenerate = require("../utils/responseGenerate ")

exports.getUnits = async (req, res,next) => {
    try {
      const units = await getUnitsService()
      return res.status(200).json(responseGenerate(units, "Unit gated successfully!", false))
    } catch (error) {
      next(error)
    }
  }
  
  exports.createUnit = async (req, res,next) => {
    try {
      const unit = await createUnitService(req.body)
      return res.status(200).json(responseGenerate(unit, "Unit added successfully!", false))
    } catch (error) {
      next(error)
    }
  }