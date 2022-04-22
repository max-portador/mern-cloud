const fs = require('fs');
const path = require('path');
const config = require('config');

class FileService{
    createDir(file){
        const filePath = this.getPath(file);
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

    deleteFile(file) {
        const path = this.getPath(file)
        if (file.type === 'dir'){
            fs.rmdirSync(path)
        }
        else {
            fs.unlinkSync(path)
        }

    }

    rootPath = path.dirname( path.dirname(__dirname))

    getPath(file) {
        return path.join(
            this.rootPath,
            config.get('filePath'),
            file.user.toString(),
            file.path
        );
    }
}

module.exports = new FileService()