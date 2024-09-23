import multer from "multer";

const storage = multer.diskStorage({        // diskstorage is used to save files on disk..
    destination: function (req, file, cb){
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() +  '_' + Math.round(Math.random() * 1E9)  // it generates unique name after file name..
        // cb(null, file.fieldname + '_' + uniqueSuffix)        // it add name after original name..
        cb(null, file.originalname)     // it allows to use original name of the file..
    }
})

export const upload = multer({ storage: storage})