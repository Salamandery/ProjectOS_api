module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            'users',
            [
                {
                    name: 'Rodolfo M F Abreu',
                    login: 'admin',
                    password_hash: '$2a$08$TxUIROlo/uA419ZADIVuFuuXWCeqOld7moKZzF6snDvA5UqboNH4K',
                    email: 'Rodolfo@atomiccodes.com.br',
                    provider: true,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: queryInterface => {
        return queryInterface.bulkDelete('users', null, {});
    },
};
