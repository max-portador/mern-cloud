const path = require('path');
const config = require('config');
const fs = require('fs');
const uuid = require('uuid')
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
            const { sort } = req.query
            let files;
            switch (sort){
                case 'name':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({name: 1});
                    break;
                case 'type':
                    files = await File.find({user: req.user.id, parent: req.query.parent})
                        // .sort({type: 1});
                    break;
                case 'date':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({date: 1});
                    break;
                default:
                    files = await File.find({user: req.user.id, parent: req.query.parent});
                    break;
            }
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

            let shortPath = file.name
            if (parent){
                shortPath = path.join(parent.path, file.name)
            }

            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: shortPath,
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

    async downloadFile(req, res) {
        try {
            const file = await File.findOne({ _id: req.query.id, user: req.user.id})
            const filePath = path.join(
                fileService.rootPath,
                config.get('filePath'),
                req.user.id,
                file.path,
                file.name
                )

            if (fs.existsSync(filePath)){
                return res.download(filePath, file.name)
            }

            return  res.status(400).json({message: 'Download error'})
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Download Error'})
        }
    }

    async deleteFile(req, res){
        try{
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            if (!file){
                return res.status(400).json({message: 'File not found'})
            }

            fileService.deleteFile(file)
            await file.remove()
            return res.json({message: 'File was removed'})
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Dir is not empty'})
        }
    }

    async searchFile(req, res){
        try{
            const searchName = req.query.search;
            let files = await File.find({user: req.user.id});
            files = files.filter( file => file.name.toLowerCase().includes(searchName.toLowerCase()))
            return res.json(files)
        }
        catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Search Error'})
        }
    }

    async uploadAvatar(req, res){
        try {
            const file = req.files.file;
            const user = await User.findById(req.user.id)
            const avatarName = uuid.v4() + '.jpg'
            file.mv(path.join(
                fileService.rootPath,
                config.get('staticPath'),
                avatarName))

            user.avatar = avatarName;
            await user.save()
            return res.json(user)
        }
        catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Upload Avatar Error'})
        }
    }

    async deleteAvatar(req, res){
        try {
            const user = await User.findById(req.user.id)
            const avatarName = path.join(
                fileService.rootPath,
                config.get('staticPath'),
                user.avatar);

            fs.unlinkSync(avatarName)
            user.avatar = null
            await user.save()
            return res.json(user)
        }
        catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Delete Avatar Error'})
        }
    }
}

module.exports = new FileController()