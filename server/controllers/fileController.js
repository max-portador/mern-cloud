const path = require('path');
const config = require('config');
const fs = require('fs');
const fileService = require('../services/fileService');
const File = require('../models/File');
const User = require('../models/User');

class FileController {
    async createDir(req, res) {
        try {
            const { name, type, parent } = req.body;
            const file = new File({name, type, parent, user: req.user.id})
            const parentFile = await File.findOne({_id: parent})
            if (!parentFile){
                file.path = name;
                await fileService.createDir(file);
            }
            else {
                file.path = path.join( parentFile.path, name);
                await fileService.createDir(file);
                parentFile.children.push(file._id);
                await parentFile.save();
            }

            await file.save();
            return res.json(file);
        }
        catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async getFiles(req, res) {
        try{
            const files = await File.find({user: req.user.id, parent: req.query.parent});
            return res.json(files)
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({ message: 'Can not get files'})
        }
    }

    async uploadFile(req, res) {
        try {
            const file = req.files.file;
            const parent = await File.findOne({user: req.user.id, _id: req.body.parent});
            const user = await User.findOne({_id: req.user.id});

            if (user.usedSpace + file.size > user.diskSPace) {
                return res.status(400).json({message: 'There is no enough space on the disk!'});
            }

            user.usedSpace = user.usedSpace + file.size;

            let filePath;

            if (parent) {
                filePath = path.join(fileService.rootPath, config.get('filePath'), user._id.toString(), parent.path, file.name);
            } else {
                filePath = path.join(fileService.rootPath, config.get('filePath'), user._id.toString(), file.name);
            }

            if (fs.existsSync(filePath)) {
                return res.status(400).json({message: 'File already exists'});
            }

            file.mv(filePath);

            const type = file.name.split('.').pop();

            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: parent?.path,
                parent: parent?._id,
                user: user._id
            })

            await dbFile.save()
            await user.save()

            res.json(dbFile)
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Upload Error'})
        }
    }

}

module.exports = new FileController()