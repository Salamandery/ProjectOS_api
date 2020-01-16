import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        filename: (req, file, callback) => {
            crypto.randomBytes(16, (err, res) => {
                // Retorna erro
                if (err) return callback(err);
                // Retorna arquivo com nome modificado em hexadecimal
                return callback(
                    null,
                    res.toString('hex') + extname(file.originalname)
                );
            });
        },
    }),
};
