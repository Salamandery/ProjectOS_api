import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

module.exports = function formatDate(date) {
    //date = parseISO(date);
    return format(date, 'dd/MM/yyyy HH:mm');
};
