const Router = require('express');
const authMiddleware = require('../middleware/auth.middleware')
const fileController = require('../controllers/fileController')

const router = new Router();


router.post('', authMiddleware, fileController.createDir)
router.post('/upload', authMiddleware, fileController.uploadFile)
router.post('/avatar', authMiddleware, fileController.uploadAvatar)
router.get('', authMiddleware, fileController.getFiles)
router.get('/search', authMiddleware, fileController.searchFile)
router.get('/download', authMiddleware, fileController.downloadFile)
router.delete('/delete', authMiddleware, fileController.deleteFile)
router.delete('/avatar', authMiddleware, fileController.deleteAvatar)



module.exports = router