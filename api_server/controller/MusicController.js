const express = require('express')
const router = express.Router()


router.get('/newMusic/:musicName', (req, res) => {
    res.send(req.params.musicName)
})


module.exports = router