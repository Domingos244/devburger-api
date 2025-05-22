import multer from "multer";
import { v4 } from "uuid";

import { extname, resolve } from 'nose:path';

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'uploads'),
        filename: (request, file, callback) => 
            callback(null, v4() + extname(file.originalname)),
    }),
};