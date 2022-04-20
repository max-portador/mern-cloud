const fs = require('fs');
const path = require('path');
const config = require('config');

const rootPath =  path.dirname( path.dirname(__dirname))

class FileService{
    createDir(file){
        const filePath = path.join( rootPath , config.get('filePath'), `${file.user}`, file.path)
        return new Promise((res, rej) => {
            try {
                if (!fs.existsSync(filePath)){
                    fs.mkdirSync(filePath)
                    return res({ message: 'File was created' })
                }
                else {
                    return rej( { message: 'File already exists'})
                }
            }
            catch (e){
                return rej({message: 'File error' + e})
            }
        })
    }

    rootPath = path.dirname( path.dirname(__dirname))
}

module.exports = new FileService()