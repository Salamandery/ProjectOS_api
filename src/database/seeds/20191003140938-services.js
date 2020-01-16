module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            'services',
            [
                {
                    name: 'Encontro dos programadores metaleiros',
                    description:
                        'Evento voltado a estudo da tecnologia reactjs / react-native / nodejs. Sem Rei das Festas.',
                    location_id: 1,
                    date: '2019-12-10T09:00:00-03:00',
                    user_id: 1,
                    file_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: 'Encontro dos programadores pagodeiros',
                    description:
                        'Encontro estadual para todos os interessados em discutir sobre as novas tecnologias do mercado, e a comunidade react. E teremos um convidado especial, o Rei das Festas.',
                    location_id: 1,
                    date: '2019-11-11T10:00:00-03:00',
                    user_id: 1,
                    file_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: 'Encontro com Filipe Deschamps Teló',
                    description:
                        'Evento destinados a todos os programadores que curtem um arrocha com nosso grande e ilustre Filipe Teló.',
                    location_id: 1,
                    date: '2019-11-12T11:00:00-03:00',
                    user_id: 1,
                    file_id: 3,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: queryInterface => {
        return queryInterface.bulkDelete('services', null, {});
    },
};
