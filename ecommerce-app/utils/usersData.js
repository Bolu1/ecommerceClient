import bcrypt from 'bcryptjs'
const data = [{
    users: [{
        name: 'John',
        email: 'Preston@gmail.com',
        password: bcrypt.hashSync('satc'),
        isAdmin: true
        },
        {
        name: 'Carrie',
        email: 'Bradshaw@gmail.com',
        password: bcrypt.hashSync('satc'),
        isAdmin: false
        },

    ]
}]

export default data